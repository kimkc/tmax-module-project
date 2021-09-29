package com.example.catalogservice.jpa;

import com.example.catalogservice.entity.CatalogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface CatalogRepository extends JpaRepository<CatalogEntity, Long> {
    List<CatalogEntity> findByCategory(String category);
    List<CatalogEntity> findByProductNameContaining(String productName);
    List<CatalogEntity> findByPublishDateBetween(LocalDate start, LocalDate end);
}
