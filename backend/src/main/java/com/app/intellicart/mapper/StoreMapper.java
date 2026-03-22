package com.app.intellicart.mapper;


import com.app.intellicart.entity.Store;
import com.app.intellicart.entity.User;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class StoreMapper {

    public Store toEntity(User owner, String name, String description, String location, BigDecimal latitude, BigDecimal longitude) {
        return Store.builder()
                .owner(owner)
                .name(name)
                .description(description)
                .location(location)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
