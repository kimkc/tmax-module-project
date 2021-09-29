//package com.example.catalogservice.mq;
//
//import com.example.catalogservice.entity.CatalogEntity;
//import com.example.catalogservice.jpa.CatalogRepository;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//public class KafkaConsumer {
//    private final CatalogRepository repository;
//
//    @KafkaListener(topics = "order-catalog-stock-topic")
//    public void updateQty(String kafkaMessage){ // {"productId" : "CATALOG-001", "qty":40, ..}
//        log.info("kafka Message -> " + kafkaMessage);
//
//        Map<Object, Object> map = new HashMap<>();
//        ObjectMapper mapper = new ObjectMapper();
//        try {
//            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        // 수량 업데이트
//        // 카프카 숫자형태는 Integer이기에 문자로 변환하여 다시 Long타입으로 변형하는 말도안되는.. int -> long X
//        CatalogEntity entity = repository.findById(Long.parseLong(String.valueOf(map.get("productId")))).get();
//        if(entity != null){
//            entity.setStock(entity.getStock() - (Integer)map.get("qty"));
//            repository.save(entity);
//        }
//
//    }
//}
