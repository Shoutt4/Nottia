package com.example.backend.dtos.usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
    private String idUsuario;
    private String nombre;
    private String apellido;
    private String email;
    private String urlAvatar;
    private String phone;
    private Data createAt;
    private Data updateAt;
}
