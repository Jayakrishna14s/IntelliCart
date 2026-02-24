package com.app.intellicart.dto.auth;

import com.app.intellicart.enums.AccountType;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
}
