package com.example.orderservice.controller;

import com.example.orderservice.client.CartServiceClient;
import com.example.orderservice.client.CatalogServiceClient;
import com.example.orderservice.dto.CartDto;
import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.entity.OrderEntity;
import com.example.orderservice.jpa.OrderRepository;
import com.example.orderservice.mq.KafkaProducer;
//import com.example.orderservice.mq.OrderProducer;
import com.example.orderservice.service.OrdersService;
import com.example.orderservice.vo.RequestOrder;
import com.example.orderservice.vo.RequestSearch;
import com.example.orderservice.vo.ResponseCatalog;
import com.example.orderservice.vo.ResponseOrder;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.criterion.Order;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrdersService orderService;
    private final KafkaProducer kafkaProducer;
    private final CatalogServiceClient catalogServiceClient;
    private final CartServiceClient cartServiceClient;
    private final OrderRepository orderRepository;
//    private final OrderProducer orderProducer;
    private final Environment env;

    private final String KEYWORD = "keyword";
    private final String ID = "id";
    private final String DATE = "date";

    @ApiOperation(value="결제 하기", notes="결제 하기")
    @PostMapping(value="/{userId}/orders")
    public ResponseEntity<List<ResponseOrder>> createOrder(@PathVariable("userId") Long userId, @RequestBody RequestOrder requestOrder, HttpServletRequest req){

        log.info("Before add orders data");

        List<ResponseOrder> responseOrderList = new ArrayList<>();

        boolean isAvailabe = true;

        //카트에 담긴 각각의 수량 파악
        for(CartDto cart: requestOrder.getCartList()){
            ResponseCatalog responseCatalog = catalogServiceClient.getCatalog(cart.getProductId());

            if(responseCatalog == null || responseCatalog.getStock() <= 0 || responseCatalog.getStock() - cart.getQty() < 0){
                isAvailabe = false;
            }
        }

        if(isAvailabe){
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

            OrderDto orderDto = modelMapper.map(requestOrder, OrderDto.class);
            orderDto.setUserId(userId);

            String uuid = UUID.randomUUID().toString();
            // 여러 카트(상품)목록을 꺼내어 생성해줌
            for(CartDto cart: requestOrder.getCartList()){
                OrderDto eachOrder = modelMapper.map(requestOrder, OrderDto.class);

                eachOrder.setUserId(userId);
                eachOrder.setOrderUuid(uuid);
                //todo 카트 클래스에 담을 수 있음
                eachOrder.setProductId(cart.getProductId());
                eachOrder.setProductName(cart.getProductName());
                eachOrder.setUnitPrice(cart.getUnitPrice());
                eachOrder.setQty(cart.getQty());
                eachOrder.setTotalPrice(cart.getQty() * cart.getUnitPrice());

                eachOrder.setOrderState(1);

                OrderDto createDto = orderService.createOrder(eachOrder);
                ResponseOrder responseOrder = modelMapper.map(createDto, ResponseOrder.class);

                responseOrderList.add(responseOrder);

                // feign client로 장바구니 삭제
                cartServiceClient.deleteCart(cart.getCartId());

                // 수량 줄이기, feign client써도되지만... //todo 트랜잭션..
                kafkaProducer.send("order-catalog-stock-topic", createDto);
            }


//            orderProducer.send("orders", orderDto);


            log.info("After added orders data");
            return ResponseEntity.status(HttpStatus.CREATED).body(responseOrderList);
        }else{
            log.info("수량 부족");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @ApiOperation(value="내역 조회", notes="사용자 주문 내역 조회")
    @GetMapping(value= "/{userId}/orders")
    public ResponseEntity<List<ResponseOrder>> getOrder(@PathVariable("userId") Long userId) throws Exception{
        log.info("Before retrieve orders data");
        Iterable<OrderEntity> orderList = orderService.getOrdersByUserId(userId);
        List<ResponseOrder> result = new ArrayList<>();
        orderList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseOrder.class));
        });

        log.info("After retrieve orders data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value="모든 내역 조회", notes="관리자 내역 조회")
    @GetMapping(value= "/orders")
    public ResponseEntity<List<ResponseOrder>> getOrderByAdmin(HttpServletRequest req) throws Exception{
        if(!req.getHeader("email").equals("admin@admin.com")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        log.info("Before retrieve orders data");
        Iterable<OrderEntity> orderList = orderService.getAllOrders();
        List<ResponseOrder> result = new ArrayList<>();
        orderList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseOrder.class));
        });

        log.info("After retrieve orders data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value="주문 상태 수정", notes="상품 수정")
    @PutMapping("/orders/{orderId}/state/{state}")
    public ResponseEntity updateCatalogsById(@PathVariable Long orderId, @PathVariable Integer state, HttpServletRequest req){
        if(!req.getHeader("email").equals("admin@admin.com")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        OrderDto orderDto = orderService.updateOrderState(orderId, state);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        ResponseOrder responseOrder = mapper.map(orderDto, ResponseOrder.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseOrder);
    }

    // todo 주문 검색으로 변경하기
    @ApiOperation(value = "주문 검색", notes = "상품 아이디, 상품 이름, 출판일 검색")
    // value, start, end post형태로 보내기
    @PostMapping("/orders/{type}")
    public ResponseEntity searchCategory(@PathVariable("type") String type, @RequestBody RequestSearch requestSearch, HttpServletRequest req){
        List<OrderEntity> orderEntityList = new ArrayList<>();
        if(req.getHeader("email").equals("admin@admin.com")){
            // todo 검색 논리 더 단순화 가능할 것 같음
            if(type.equals(ID)){
//                orderEntityList.add(orderRepository.findByUserId(Long.parseLong(requestSearch.getValue())).get());
                orderEntityList = orderRepository.findByOrderUuid(requestSearch.getValue());
            }else if(type.equals(KEYWORD)){
                //todo 리팩토링 필요, 동적 쿼리
            orderEntityList = orderRepository.findByProductNameContaining(requestSearch.getValue());
            }else if(type.equals(DATE)){
                orderEntityList =
                        orderRepository.findByCreatedAtBetween(requestSearch.getStart(), requestSearch.getEnd().plusDays(1));
            }
        }else{
            if(type.equals(ID)){
                orderEntityList = orderRepository.findByOrderUuidAndUserId(requestSearch.getValue(), Long.parseLong(req.getHeader("userid")));
            }else if(type.equals(KEYWORD)){
                //todo 리팩토링 필요, 동적 쿼리
            orderEntityList = orderRepository.findByProductNameContainingAndUserId(requestSearch.getValue(), Long.parseLong(req.getHeader("userid")));
            }else if(type.equals(DATE)){
                // 2021-09-11은 2021-09-11 00:00:00
                orderEntityList =
                        orderRepository.findByCreatedAtBetweenAndUserId(requestSearch.getStart(), requestSearch.getEnd().plusDays(1), Long.parseLong(req.getHeader("userid")));
            }
        }


        List<ResponseOrder> result = new ArrayList<>();
        //log.info("After retrieve catalgos data");
        orderEntityList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseOrder.class));
        });
        //log.info("After retrieve catalgos data");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
