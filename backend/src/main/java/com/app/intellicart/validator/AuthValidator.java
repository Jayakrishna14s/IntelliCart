package com.app.intellicart.validator;

import com.app.intellicart.dto.auth.LoginRequest;
import com.app.intellicart.dto.auth.SignupRequest;
import com.app.intellicart.enums.AccountType;
import com.app.intellicart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class AuthValidator {

    private final UserRepository userRepository;

    public void validate(SignupRequest payload) {
        if(userRepository.existsByEmail(payload.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        if(payload.getRole().equals(AccountType.ADMIN)) {
            throw new RuntimeException("Admin Registration is not allowed");
        }
    }

    public void validate(LoginRequest payload) {

    }
}
