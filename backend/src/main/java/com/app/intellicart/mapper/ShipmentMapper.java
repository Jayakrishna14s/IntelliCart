package com.app.intellicart.mapper;


import com.app.intellicart.entity.Order;
import com.app.intellicart.entity.Shipment;
import com.app.intellicart.entity.ShipmentItem;
import com.app.intellicart.enums.ShipmentStatus;
import org.springframework.stereotype.Component;

@Component
public class ShipmentMapper {

    public Shipment toEntity(Order order, String trackingId, String courier, ShipmentStatus status) {
        return Shipment.builder()
                .order(order)
                .trackingId(trackingId)
                .courier(courier)
                .status(status)
                .build();
    }
}
