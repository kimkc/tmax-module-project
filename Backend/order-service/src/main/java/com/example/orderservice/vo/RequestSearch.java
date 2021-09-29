package com.example.orderservice.vo;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RequestSearch {
        private String value;

        private LocalDate start;

        private LocalDate end;

    }
