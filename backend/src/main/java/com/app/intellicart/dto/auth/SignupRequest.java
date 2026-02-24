package com.app.intellicart.dto.auth;


import com.app.intellicart.enums.AccountType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignupRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email Format")
    private String email;

    @NotBlank
    @Size(min=2, max=50)
    private String firstName;

    @NotBlank
    @Size(min=2, max=50)
    private String lastName;

    @NotBlank
    @Size(min = 8, max = 20,
            message = "Password must be between 8 and 20 characters")

    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).*$",
            message = "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
    )
    private String password;

    @NotNull
    private AccountType role;
}
