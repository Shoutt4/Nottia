package com.example.backend.dtos.cuaderno;

import java.security.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CuadernoResponseDTO {

    private String idCuader;
    private String idUsuario;
    private String nombre;
    private String color;
    private int orden;
    private Timestamp createAt;
    private Timestamp updateAt;
}
