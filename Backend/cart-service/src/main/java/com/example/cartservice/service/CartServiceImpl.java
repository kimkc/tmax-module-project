package com.example.cartservice.service;

import com.example.cartservice.dto.CartDto;
import com.example.cartservice.entity.CartEntity;
import com.example.cartservice.jpa.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository repository;

    @Override
    public CartDto createCart(CartDto cartDetails) {
        cartDetails.setTotalPrice(cartDetails.getQty() * cartDetails.getUnitPrice());
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        CartEntity cartEntity = modelMapper.map(cartDetails, CartEntity.class);

        repository.save(cartEntity);

        CartDto returnValue = modelMapper.map(cartEntity, CartDto.class);
        return returnValue;
    }


    @Override
    public CartDto getCartByCartId(Long cartId) {
        CartEntity cartEntity = repository.findByCartId(cartId);
        CartDto cartDto = new ModelMapper().map(cartEntity, CartDto.class);

        return cartDto;
    }

    @Override
    public List<CartDto> getCartByUserId(Long userId) {
        List<CartEntity> cartEntityList = repository.findByUserId(userId);
        List<CartDto> result = new ArrayList<>();
        //log.info("After retrieve catalgos data");
        cartEntityList.forEach(v -> {
            result.add(new ModelMapper().map(v, CartDto.class));
        });

        return result;
    }

    @Override
    public void deleteByCartId(Long cartId) {
        //todo 예외 처리
        //        try{
        //
        //        }catch (){
        //
        //        }
        repository.deleteByCartId(cartId);
    }
}
