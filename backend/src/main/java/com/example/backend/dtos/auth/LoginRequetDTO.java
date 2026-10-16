package com.example.backend.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LoginRequetDTO {
    @Email(message = "el campo rquiere un email exaplme@gmail.com")
    @NotBlank
    private String email;
    @NotBlank(message = "la contraseña no puede ser nula")
    @Size(min = 8, max = 30, message = "la contraseña debe superar los 8 caracteres y deebe ser nebir a 30 caracteres")
    private String password;
}
