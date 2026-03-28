package com.app.intellicart.mapper;


import com.app.intellicart.entity.Order;
import com.app.intellicart.entity.OrderItem;
import com.app.intellicart.entity.ProductListing;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class OrderItemMapper {

    public OrderItem toEntity(Order order, ProductListing productListing, Integer quantity, BigDecimal priceAtPurchase) {
        return OrderItem.builder()
                .order(order)
                .productListing(productListing)
                .quantity(quantity)
                .priceAtPurchase(priceAtPurchase)
                .build();
    }
}
