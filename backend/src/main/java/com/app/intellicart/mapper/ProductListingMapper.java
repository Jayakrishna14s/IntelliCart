package com.app.intellicart.mapper;


import com.app.intellicart.entity.Product;
import com.app.intellicart.entity.ProductListing;
import com.app.intellicart.entity.Store;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;

@Component
public class ProductListingMapper {

    public ProductListing toEntity(Product product, Store store, BigDecimal price, String currency, Map<String, Object> attributes) {
        return ProductListing.builder()
                .product(product)
                .store(store)
                .price(price)
                .currency(currency)
                .attributes(attributes)
                .build();
    }
}
