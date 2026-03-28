package com.app.intellicart.mapper;


import com.app.intellicart.entity.PriceHistory;
import com.app.intellicart.entity.ProductListing;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PriceHistoryMapper {

    public PriceHistory toEntity(ProductListing productListing, BigDecimal price) {
        return PriceHistory.builder()
                .productListing(productListing)
                .price(price)
                .build();
    }
}
