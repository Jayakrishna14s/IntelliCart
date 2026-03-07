package com.app.intellicart.controller;

import com.app.intellicart.config.JwtProperties;
import com.app.intellicart.dto.auth.LoginRequest;
import com.app.intellicart.dto.auth.SignupRequest;
import com.app.intellicart.dto.auth.UserResponse;
import com.app.intellicart.entity.User;
import com.app.intellicart.mapper.UserMapper;
import com.app.intellicart.security.adapter.SecurityUserDetails;
import com.app.intellicart.service.AuthService;
import com.app.intellicart.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final Long cookieMaxAge;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    public AuthController(AuthService authService, JwtProperties jwtProperties, JwtService jwtService, UserMapper userMapper) {
        this.authService = authService;
        this.cookieMaxAge = jwtProperties.getExpiration() / 1000;
        this.jwtService = jwtService;
        this.userMapper = userMapper;
    }


    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody @Valid SignupRequest signupRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userMapper.toResponse(authService.signup(signupRequest)));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody @Valid LoginRequest payload, HttpServletResponse response) {
        User user = authService.login(payload);
        String jwtToken = jwtService.generateToken(user.getId().toString());

        Cookie cookie = new Cookie("intellicart-jwt", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);

        cookie.setPath("/");
        cookie.setMaxAge(Math.toIntExact(cookieMaxAge));

        response.addCookie(cookie);
        return ResponseEntity.ok(userMapper.toResponse(user));
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("intellicart-jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logout Successful");
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(@AuthenticationPrincipal SecurityUserDetails userDetails) {
        return ResponseEntity.ok(userMapper.toResponse(userDetails.getUser()));
    }
}
