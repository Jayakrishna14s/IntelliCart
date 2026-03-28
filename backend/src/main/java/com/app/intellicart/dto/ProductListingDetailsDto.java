package com.app.intellicart.dto;

import com.app.intellicart.dto.model.ModelPredictionRequest;
import com.app.intellicart.dto.model.ModelPredictionResponse;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductListingDetailsDto {

    // Listing
    private Long listingId;
    private BigDecimal price;
    private String currency;
    private Map<String, Object> listingAttributes;

    // Product
    private Long productId;
    private String productName;
    private String productDescription;
    private String productImage;
    private String productBrand;
    private String productSku;
    private Map<String, Object> productAttributes;

    // Store
    private Long storeId;
    private String storeName;
    private String storeDescription;
    private String storeLocation;
    private BigDecimal storeLatitude;
    private BigDecimal storeLongitude;

    // Category
    private Long categoryId;
    private String categoryName;
    private Long parentCategoryId;

    // Derived Features Used for ML
    private BigDecimal estimatedCostPrice;
    private Double sellerScore;
    private Double productRating;
    private Integer primeEligible;

    // Historical price series with dates
    private List<PriceHistoryPointDto> priceHistory;

    // Payload sent to model
    private ModelPredictionRequest modelInput;

    // Prediction response
    private ModelPredictionResponse prediction;
}