package com.app.intellicart.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceHistoryPointDto {
    private OffsetDateTime date;
    private BigDecimal price;
}