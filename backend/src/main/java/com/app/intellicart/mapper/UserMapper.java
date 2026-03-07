package com.app.intellicart.mapper;

import com.app.intellicart.dto.auth.SignupRequest;
import com.app.intellicart.dto.auth.UserResponse;
import com.app.intellicart.entity.User;
import com.app.intellicart.enums.AccountType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public User toEntity(String email, String password, String firstName, String lastName, AccountType role) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .firstName(firstName)
                .lastName(lastName)
                .role(role)
                .build();
    }

    public User toEntity(SignupRequest payload) {
        if(payload == null)
            return null;

        return User.builder()
                .email(payload.getEmail())
                .password(passwordEncoder.encode(payload.getPassword()))
                .firstName(payload.getFirstName())
                .lastName(payload.getLastName())
                .role(payload.getRole())
                .build();
    }

    public UserResponse toResponse(User payload) {
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

    public List<UserResponse> toResponses(List<User> payload) {
        if(payload == null) {
            return null;
        }

        return payload
                .stream()
                .map(this::toResponse)
                .toList();
    }
}
