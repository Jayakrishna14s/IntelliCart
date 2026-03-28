package com.app.intellicart.mapper;


import com.app.intellicart.entity.Order;
import com.app.intellicart.entity.User;
import com.app.intellicart.enums.OrderStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class OrderMapper {

    public Order toEntity(User user, OrderStatus status, BigDecimal totalAmount) {
        return Order.builder()
                .user(user)
                .status(status)
                .totalAmount(totalAmount)
                .build();
    }
}
