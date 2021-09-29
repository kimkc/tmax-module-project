package com.example.cartservice.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CartDto implements Serializable {

    private Long cartId;
    private Long productId;
    private Integer qty;
    private Integer unitPrice;
    private Integer totalPrice;

    private String userId;
}
