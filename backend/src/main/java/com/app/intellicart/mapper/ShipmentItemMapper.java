package com.app.intellicart.mapper;


import com.app.intellicart.entity.OrderItem;
import com.app.intellicart.entity.Shipment;
import com.app.intellicart.entity.ShipmentItem;
import org.springframework.stereotype.Component;

@Component
public class ShipmentItemMapper {

    public ShipmentItem toEntity(Shipment shipment, OrderItem orderItem, Integer quantity) {
        return ShipmentItem.builder()
                .shipment(shipment)
                .orderItem(orderItem)
                .quantity(quantity)
                .build();
    }
}
