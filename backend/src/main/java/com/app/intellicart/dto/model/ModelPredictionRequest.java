package com.app.intellicart.dto.model;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModelPredictionRequest {

    private Long listing_id;
    private Long product_id;
    private Long store_id;
    private String brand;
    private Long category_id;
    private String product_name;
    private Double latitude;
    private Double longitude;
    private Double estimated_cost_price;
    private Double seller_score;
    private Double product_rating;
    private Integer prime_eligible;
    private List<Double> price_history;
}