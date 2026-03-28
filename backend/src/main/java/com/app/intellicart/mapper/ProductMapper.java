package com.app.intellicart.mapper;


import com.app.intellicart.entity.Category;
import com.app.intellicart.entity.Product;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class ProductMapper {

    public Product toEntity(String name, String description, String brand, String sku, Category category,  Map<String, Object> attributes) {
        return Product.builder()
                .name(name)
                .description(description)
                .brand(brand)
                .sku(sku)
                .category(category)
                .attributes(attributes)
                .build();
    }
}
