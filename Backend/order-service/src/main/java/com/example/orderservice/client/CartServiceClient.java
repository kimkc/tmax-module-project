package com.example.orderservice.client;


import com.example.orderservice.vo.ResponseCatalog;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "cart-service")
public interface CartServiceClient {

    @DeleteMapping(value= "/carts/{cartId}")
    public ResponseEntity deleteCart(@PathVariable("cartId") Long cartId);
}
