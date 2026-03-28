package com.app.intellicart.mapper;


import com.app.intellicart.entity.Cart;
import com.app.intellicart.entity.CartItem;
import com.app.intellicart.entity.ProductListing;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper {

    public CartItem toEntity(Cart cart, ProductListing productListing, Integer quantity) {
        return CartItem.builder()
                .cart(cart)
                .productListing(productListing)
                .quantity(quantity)
                .build();
    }
}
