package com.app.intellicart.mapper;


import com.app.intellicart.entity.Inventory;
import com.app.intellicart.entity.ProductListing;
import org.springframework.stereotype.Component;

@Component
public class InventoryMapper {

    public Inventory toEntity(Long listingId, ProductListing productListing, Integer quantity, Integer reservedQuantity) {

        return Inventory.builder()
                .listingId(listingId)
                .productListing(productListing)
                .quantity(quantity)
                .reservedQuantity(reservedQuantity)
                .build();

    }
}
