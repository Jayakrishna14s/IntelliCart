package com.app.intellicart.mapper;


import com.app.intellicart.entity.Cart;
import com.app.intellicart.entity.User;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {

    public Cart toEntity(User user) {
        return Cart.builder()
                .user(user)
                .build();
    }
}
