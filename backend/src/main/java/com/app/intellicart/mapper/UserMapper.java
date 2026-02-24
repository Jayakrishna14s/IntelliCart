package com.app.intellicart.mapper;

import com.app.intellicart.dto.auth.SignupRequest;
import com.app.intellicart.dto.auth.UserResponse;
import com.app.intellicart.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class UserMapper {


    public static User toEntity(SignupRequest payload) {
        if(payload == null)
            return null;

        return User.builder()
                .email(payload.getEmail())
                .password(payload.getPassword())
                .firstName(payload.getFirstName())
                .lastName(payload.getLastName())
                .role(payload.getRole())
                .build();
    }

    public static UserResponse toResponse(User payload) {
        if(payload == null) {
            return null;
        }

        return UserResponse.builder()
                .id(payload.getId())
                .email(payload.getEmail())
                .firstName(payload.getFirstName())
                .lastName(payload.getLastName())
                .role(payload.getRole().toString())
                .build();
    }

    public static List<UserResponse> toResponses(List<User> payload) {
        if(payload == null) {
            return null;
        }

        return payload
                .stream()
                .map(UserMapper::toResponse)
                .toList();
    }
}
