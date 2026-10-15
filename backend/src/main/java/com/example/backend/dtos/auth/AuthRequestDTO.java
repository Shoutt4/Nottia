package com.example.backend.dtos.auth;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AuthRequestDTO {
    private String nombre;
    @Column(nullable = false, length = 100, unique = true)
    private String apellido;
    @Email
    @Column(nullable = false, length = 200)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(columnDefinition = "TEXT")
    private String urlAvatar;
    private String phone;
}
