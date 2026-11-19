package com.example.backend.dtos.actividades;

import java.time.LocalTime;


import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class PlanificacionSemanaRequestDTO {

    private ActividadRequestDTIO actividad;
    @Enumerated(EnumType.STRING)
    private DiaSemana diaSemana;
    private LocalTime horaInicio;
    private LocalTime horaFin;

}
