package com.example.cartservice.service;

import com.example.cartservice.dto.CartDto;
import com.example.cartservice.entity.CartEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface CartService {
    CartDto createCart(CartDto orderDetails);
    CartDto getCartByCartId(Long cartId);
    List<CartDto> getCartByUserId(Long userId);
    void deleteByCartId(Long cartId);
}
