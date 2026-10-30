package com.example.backend.dtos.cuaderno;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CuadernoRequestDTO {
    private String idUsuario;
    private String nombre;
    private String color;
    private int orden;
    private DesignRequestDTO desing;

}
