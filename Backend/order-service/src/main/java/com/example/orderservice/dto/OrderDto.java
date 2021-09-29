package com.example.orderservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
public class OrderDto implements Serializable {
    private Long orderId;
    private String orderUuid;
    private Long userId;

    private Long productId;
    private String productName;
    private Integer qty;
    private Integer unitPrice;
    private Integer totalPrice;

    private String recipientName;
    private String recipientAddress;
    private String recipientPhone;

    private String senderName;
    private String senderPhone;
    private String senderPassword;

    private String paymentPlan;
    private Integer orderState;

    private LocalDate createdAt;
}
