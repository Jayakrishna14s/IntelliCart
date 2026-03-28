package com.app.intellicart.service;

import com.app.intellicart.dto.ProductListingDetailsDto;
import com.app.intellicart.dto.PriceHistoryPointDto;
import com.app.intellicart.dto.model.ModelPredictionRequest;
import com.app.intellicart.dto.model.ModelPredictionResponse;
import com.app.intellicart.entity.Category;
import com.app.intellicart.entity.PriceHistory;
import com.app.intellicart.entity.Product;
import com.app.intellicart.entity.ProductListing;
import com.app.intellicart.entity.Store;
import com.app.intellicart.repository.PriceHistoryRepository;
import com.app.intellicart.repository.ProductListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductListingService {

    private final ProductListingRepository productListingRepository;
    private final PriceHistoryRepository priceHistoryRepository;
    private final PredictionService predictionService;

    public ProductListingDetailsDto getListingDetailsWithPrediction(Long productListingId) {

        ProductListing listing = productListingRepository.findById(productListingId)
                .orElseThrow(() -> new RuntimeException("Product listing not found"));

        Product product = listing.getProduct();
        Store store = listing.getStore();
        Category category = product.getCategory();

        // ---------------------------
        // Derived values for now
        // ---------------------------
        double latestPrice = listing.getPrice().doubleValue();
        double estimatedCostPrice = latestPrice * 0.75;
        double sellerScore = 4.2;
        double productRating = 4.0;
        int primeEligible = 0;

        // ---------------------------
        // Fetch last 7 prices
        // ---------------------------
        List<PriceHistory> latestPriceHistoryRows =
                priceHistoryRepository.findTop7ByProductListingIdOrderByCreatedAtDesc(listing.getId());

        // oldest -> latest
        List<PriceHistory> sortedHistory = latestPriceHistoryRows.stream()
                .sorted(Comparator.comparing(PriceHistory::getCreatedAt))
                .toList();

        // ---------------------------
        // API response format (date + price)
        // ---------------------------
        List<PriceHistoryPointDto> priceHistoryPoints = sortedHistory.stream()
                .map(ph -> PriceHistoryPointDto.builder()
                        .date(ph.getCreatedAt())
                        .price(ph.getPrice())
                        .build())
                .collect(Collectors.toList());

        // ---------------------------
        // Model input format (only numeric values)
        // ---------------------------
        List<Double> modelPriceHistory = sortedHistory.stream()
                .map(ph -> ph.getPrice().doubleValue())
                .collect(Collectors.toList());

        // fallback if no history exists
        if (modelPriceHistory.isEmpty()) {
            modelPriceHistory = List.of(latestPrice);

            priceHistoryPoints = List.of(
                    PriceHistoryPointDto.builder()
                            .date(OffsetDateTime.now())
                            .price(listing.getPrice())
                            .build()
            );
        }

        // ---------------------------
        // Predicted date logic
        // Assuming model predicts next price point
        // ---------------------------
        OffsetDateTime predictedForDate;

//        if (!sortedHistory.isEmpty()) {
//            predictedForDate = sortedHistory.get(sortedHistory.size() - 1)
//                    .getCreatedAt()
//                    .plusDays(1);
//        } else {
            predictedForDate = OffsetDateTime.now().plusDays(7);
//        }

        // ---------------------------
        // Exact payload expected by model
        // ---------------------------
        ModelPredictionRequest modelInput = ModelPredictionRequest.builder()
                .listing_id(listing.getId())
                .product_id(product.getId())
                .store_id(store.getId())
                .brand(product.getBrand())
                .category_id(category != null ? category.getId() : null)
                .product_name(product.getName())
                .latitude(store.getLatitude() != null ? store.getLatitude().doubleValue() : null)
                .longitude(store.getLongitude() != null ? store.getLongitude().doubleValue() : null)
                .estimated_cost_price(estimatedCostPrice)
                .seller_score(sellerScore)
                .product_rating(productRating)
                .prime_eligible(primeEligible)
                .price_history(modelPriceHistory)
                .build();

        ModelPredictionResponse prediction = predictionService.getPrediction(modelInput);

        // inject predicted date into response
        if (prediction != null) {
            prediction.setPredicted_for_date(predictedForDate);
        }

        return ProductListingDetailsDto.builder()
                .listingId(listing.getId())
                .price(listing.getPrice())
                .currency(listing.getCurrency())
                .listingAttributes(listing.getAttributes())

                .productId(product.getId())
                .productName(product.getName())
                .productDescription(product.getDescription())
                .productImage(product.getImage())
                .productBrand(product.getBrand())
                .productSku(product.getSku())
                .productAttributes(product.getAttributes())

                .storeId(store.getId())
                .storeName(store.getName())
                .storeDescription(store.getDescription())
                .storeLocation(store.getLocation())
                .storeLatitude(store.getLatitude())
                .storeLongitude(store.getLongitude())

                .categoryId(category != null ? category.getId() : null)
                .categoryName(category != null ? category.getName() : null)
                .parentCategoryId(
                        category != null && category.getParent() != null
                                ? category.getParent().getId()
                                : null
                )

                .estimatedCostPrice(BigDecimal.valueOf(estimatedCostPrice))
                .sellerScore(sellerScore)
                .productRating(productRating)
                .primeEligible(primeEligible)

                .priceHistory(priceHistoryPoints)

                .modelInput(modelInput)
                .prediction(prediction)
                .build();
    }
}