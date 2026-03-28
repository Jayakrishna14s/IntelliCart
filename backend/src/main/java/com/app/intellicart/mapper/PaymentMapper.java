package com.app.intellicart.mapper;


import com.app.intellicart.entity.Order;
import com.app.intellicart.entity.Payment;
import com.app.intellicart.enums.PaymentProvider;
import com.app.intellicart.enums.PaymentStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PaymentMapper {

    public Payment toEntity(Order order, PaymentProvider provider, String transactionId, BigDecimal amount, PaymentStatus status) {
        return Payment.builder()
                .order(order)
                .provider(provider)
                .transactionId(transactionId)
                .amount(amount)
                .status(status)
                .build();
    }
}
