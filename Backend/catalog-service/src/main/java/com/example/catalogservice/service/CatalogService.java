package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.entity.CatalogEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CatalogService {
    List<CatalogEntity> getAllCatalogs();
    Page<CatalogEntity> getAllCatalogs(final Pageable pageable);
    CatalogDto createCatalog(CatalogDto catalogDto);
    CatalogDto updateCatalog(CatalogDto catalogDto);
    void deleteByCartId(Long productId);
}
