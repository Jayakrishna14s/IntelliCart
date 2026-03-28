package com.app.intellicart.dto.model;

import lombok.*;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModelPredictionResponse {

    private Double predicted_price;
    private Double suggested_price;
    private Double confidence_score;
    private String pricing_band;
    private String demand_forecast;
    private String recommendation;
    private OffsetDateTime predicted_for_date;
}