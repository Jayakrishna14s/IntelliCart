package com.app.intellicart.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DealsSectionDto {
    private CategoryDto rootCategory;
    private List<ProductCardDto> deals;
}