package com.app.intellicart.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DealsDto {
    private List<DealsSectionDto> sections;
}