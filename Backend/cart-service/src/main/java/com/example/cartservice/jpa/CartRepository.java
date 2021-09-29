package com.example.cartservice.jpa;

import com.example.cartservice.entity.CartEntity;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CartRepository extends CrudRepository<CartEntity, Long> {
    CartEntity findByCartId(Long cartId);
    List<CartEntity> findByUserId(Long userId);

    @Transactional
    void deleteByCartId(Long cartId);
}
