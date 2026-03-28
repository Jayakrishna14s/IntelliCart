package com.app.intellicart.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductCardDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private String currency;
    private String image;
    private Integer discount;
    private Double rating;
}