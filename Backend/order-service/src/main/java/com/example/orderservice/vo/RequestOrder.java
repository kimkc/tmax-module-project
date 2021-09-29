package com.example.orderservice.vo;

import com.example.orderservice.dto.CartDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.Column;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestOrder {



    private List<CartDto> cartList;


    private String recipientName;

    private String recipientAddress;

    private String recipientPhone;


    private String senderName;

    private String senderPhone;

    private String senderPassword;

    private String paymentPlan;
}
