package com.app.intellicart.mapper;


import com.app.intellicart.entity.Address;
import com.app.intellicart.entity.User;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class AddressMapper {

    public Address toEntity(User user, String line1, String line2, String city, String state, String country, String postalCode, BigDecimal latitude, BigDecimal longitude) {
        return Address.builder()
                .user(user)
                .line1(line1)
                .line2(line2)
                .city(city)
                .state(state)
                .country(country)
                .postalCode(postalCode)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }

    public Address toEntity(User user, String line1, String line2, String city, String state, String country, String postalCode, BigDecimal latitude, BigDecimal longitude, Boolean isDefault) {
        return Address.builder()
                .user(user)
                .line1(line1)
                .line2(line2)
                .city(city)
                .state(state)
                .country(country)
                .postalCode(postalCode)
                .latitude(latitude)
                .longitude(longitude)
                .isDefault(isDefault)
                .build();
    }
}
