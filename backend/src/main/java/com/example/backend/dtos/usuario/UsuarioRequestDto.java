package com.example.backend.dtos.usuario;

import jakarta.persistence.Column;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsuarioRequestDto {

    @Size(min = 3, max = 30, message = "el nombre debe contener entre 3 a 30 caracteres")
    @Column(nullable = false, length = 50)
    private String nombre;
    @Size(min = 4, max = 70, message = "el apellido debe contener entre 4 a 70 caracteres")
    @Column(nullable = false, length = 100, unique = true)
    private String apellido;
    @Column(nullable = false)
    @Size(min = 8, max = 50, message = "la contraseña debe contener entre 8 a 50 caracteres")
    private String password;

    private String urlAvatar;
    @Size(min = 8, max = 30)
    private String phone;
}
