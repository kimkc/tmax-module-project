package com.example.catalogservice.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CatalogDto implements Serializable {

    private Long productId;

    private String category;

    private String productName;

    private String writer;

    private String translator;

    private String publishingCompany;

    private LocalDate publishDate;

    private String content;

    private Integer unitPrice;

    private Integer deliveryFee;

    private Integer stock;

    private Integer pages;

    private Integer weight;

    private String size;

    private String isbn10;

    private String isbn13;

    private String creater;

    private LocalDateTime createdAt;

    private String modifer;

    private LocalDateTime modifiedAt;


    private Integer qty;
    private Integer totalPrice;

//    private String orderId;
    private String userId;

    // file
    private List<MultipartFile> files;


    private String originalFileName;

    private String storedFilePath;

    private long fileSize;
}
