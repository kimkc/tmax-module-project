package com.example.orderservice.service;

import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.entity.OrderEntity;
import org.hibernate.criterion.Order;

import java.util.List;

public interface OrdersService {
    OrderDto createOrder(OrderDto eachOrder);
    OrderDto getOrderByOrderId(Long orderId);
    OrderDto updateOrderState(Long orderId, Integer state);
    Iterable<OrderEntity> getOrdersByUserId(Long userId);
    Iterable<OrderEntity> getAllOrders();
}
