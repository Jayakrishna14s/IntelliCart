package com.app.intellicart.service;


import com.app.intellicart.dto.auth.LoginRequest;
import com.app.intellicart.dto.auth.SignupRequest;
import com.app.intellicart.entity.User;
import com.app.intellicart.mapper.UserMapper;
import com.app.intellicart.repository.UserRepository;
import com.app.intellicart.security.adapter.SecurityUserDetails;
import com.app.intellicart.validator.AuthValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AuthValidator authValidator;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public User signup(SignupRequest payload) {
        authValidator.validate(payload);
        User user = userMapper.toEntity(payload);
        // user.setPassword(passwordEncoder.encode(payload.getPassword()));
        userRepository.save(user);
        return user;
    }

    public User login(LoginRequest payload) {
        authValidator.validate(payload);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(payload.getEmail(), payload.getPassword())
        );

        if(!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Invalid email or password");
        }

        SecurityUserDetails userDetails = (SecurityUserDetails) authentication.getPrincipal();
        assert userDetails != null;

        return userDetails.getUser();
    }
}
