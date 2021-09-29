package com.example.catalogservice.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "catalog")
public class CatalogEntity  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

//    @Column(nullable = false, length = 120, unique = true)
    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String writer;

    private String translator;

    @Column(nullable = false)
    private String publishingCompany;

    @Column(nullable = false)
    private LocalDate publishDate;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer unitPrice;

    @Column(nullable = false)
    private Integer deliveryFee;

    @Column(nullable = false)
    private Integer stock;

    private Integer pages;

    private Integer weight;

    private String size;

    @Column(nullable = false)
    private String isbn10;

    @Column(nullable = false)
    private String isbn13;

    @Column(nullable = false)
    private String creater;

    @Column(insertable = false)
    // auto-ddl 일때만 가능, jpa로 테이블 생성을 하지 않고 테이블을 생성할 때 디폴트값 지정 필수
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String modifer;

    @Column(insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private LocalDateTime modifiedAt;

    /*
    default 값 지정 안 했을 경우나 updatable, insertable 설정 안 되어 있을 경우
    @PrePersist
    public void prePersist() {
        this.createdAt = this.likeCount == null ? 0 : this.likeCount;
    }
     */

    // todo file 2개의 디비로 분리 필요
    @Column
    private String originalFileName;

    @Column
    private String storedFilePath;

    @Column
    private Long fileSize;
}
