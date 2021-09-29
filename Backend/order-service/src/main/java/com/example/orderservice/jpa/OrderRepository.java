package com.example.orderservice.jpa;

import com.example.orderservice.entity.OrderEntity;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends CrudRepository<OrderEntity, Long> {
    OrderEntity findByOrderId(Long orderId);
    Iterable<OrderEntity> findByUserId(Long userId);
    List<OrderEntity> findByProductNameContaining(String productName);
    List<OrderEntity> findByCreatedAtBetween(LocalDate start, LocalDate end);

    List<OrderEntity> findByOrderUuid(String uuid);
    List<OrderEntity> findByOrderUuidAndUserId(String uuid, Long userId);
    List<OrderEntity> findByProductNameContainingAndUserId(String productName, Long userId);
    List<OrderEntity> findByCreatedAtBetweenAndUserId(LocalDate start, LocalDate end, Long userId);
}
