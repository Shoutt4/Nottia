package com.example.backend.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class ResetPasswordResquestDTO {
    @Email(message = "el email debe contener ejemplo@example.com")
    private String email;
    @Size(min = 8, max = 30, message = "la cantidad de caracteres es entre 8 y 30")
    private String password;
}
