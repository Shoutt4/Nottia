package com.example.backend.dtos.cuaderno;

import java.sql.Timestamp;

import jakarta.persistence.Column;
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
    private String template;
    private String coverColor;
    private String accent;
    @Column(columnDefinition = "TEXT")
    private String image;
    private Timestamp createAt;
    private Timestamp updateAt;
}
