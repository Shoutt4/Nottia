package com.example.backend.dtos.actividades;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class DiaSemanaRespones {
    private String idDiaSemana;
    private String diaSemana;
    private String descripcion;
}
