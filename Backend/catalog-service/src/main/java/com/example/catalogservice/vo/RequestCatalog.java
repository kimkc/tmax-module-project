package com.example.catalogservice.vo;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
public class RequestCatalog {

    private String category;

    private String productName;

    private String writer;

    private String translator;

    private String publishingCompany;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
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

    private List<MultipartFile> files;
}
