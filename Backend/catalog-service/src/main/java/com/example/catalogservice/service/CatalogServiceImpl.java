package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.entity.CatalogEntity;
import com.example.catalogservice.jpa.CatalogRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Service
@Slf4j
public class CatalogServiceImpl implements CatalogService{
    CatalogRepository repository;

    Environment env;


    @Autowired
    public CatalogServiceImpl(CatalogRepository repository, Environment env){
        this.repository = repository;
        this.env = env;
    }

    @Override
    public List<CatalogEntity> getAllCatalogs() {
        return repository.findAll();
    }

    @Override
    public Page<CatalogEntity> getAllCatalogs(final Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public CatalogDto createCatalog(CatalogDto catalogDto) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogEntity catalogEntity = mapper.map(catalogDto, CatalogEntity.class);
//        catalogEntity.setCreater("userid");
//        catalogEntity.setModifer("userid");
        repository.save(catalogEntity);
        return null;
    }

    @Override
    public CatalogDto updateCatalog(CatalogDto catalogDto) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogEntity catalogEntity = mapper.map(catalogDto, CatalogEntity.class);
        //todo 디비에서 가져와서 creater, createAt 설정 => 다른 방안 찾아보기(여러 해결법있음)
        CatalogEntity creater = repository.findById(catalogDto.getProductId()).get();
        catalogEntity.setCreater(creater.getCreater());
        catalogEntity.setCreatedAt(creater.getCreatedAt());
        catalogEntity.setModifer("modifiedid");
        catalogEntity.setModifiedAt(LocalDateTime.now());
        repository.save(catalogEntity);
        return null;
    }

    @Override
    public void deleteByCartId(Long productId) {
        repository.deleteById(productId);
    }
}
