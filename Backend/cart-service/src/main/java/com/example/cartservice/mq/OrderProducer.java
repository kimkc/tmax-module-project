//package com.example.cartservice.mq;
//
//import com.example.cartservice.dto.*;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.Arrays;
//import java.util.List;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//public class OrderProducer {
//
//    private final KafkaTemplate<String, String> kafkaTemplate;
//
//    List<Field> fields = Arrays.asList(new Field("string", true, "order_id"),
//            new Field("string", true, "user_id"),
//            new Field("string", false, "product_id"),
//            new Field("int32", true, "qty"),
//            new Field("int32", true, "total_price"),
//            new Field("int32", true, "unit_price"),
//            new Field("string", true, "instance_id")); //인스턴스 아이디는 kafka connect 실습 때, 어떤 instance에서 보냇는지 확인 위해 추가
//
//    Schema schema = Schema.builder()
//            .type("struct")
//            .fields(fields)
//            .optional(false)
//            .name("orders")
//            .build();
//
//    public CartDto send(String kafkaTopic, CartDto cartDto){
//        Payload payload = Payload.builder()
//                .order_id(cartDto.getOrderId())
//                .user_id(cartDto.getUserId())
//                .product_id(cartDto.getProductId())
//                .qty(cartDto.getQty())
//                .unit_price(cartDto.getUnitPrice())
//                .total_price(cartDto.getTotalPrice())
//                .instance_id(cartDto.getInstanceId())
//                .build();
//
//        KafkaOrderDto kafkaOrderDto = new KafkaOrderDto(schema, payload);
//
//        ObjectMapper mapper = new ObjectMapper();
//        String jsonInString = "";
//        try {
//            jsonInString = mapper.writeValueAsString(kafkaOrderDto);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        kafkaTemplate.send(kafkaTopic, jsonInString);
//        log.info("Kafka Producer send data from the Order microservice: " + kafkaOrderDto);
//
//        return cartDto;
//    }
//}
