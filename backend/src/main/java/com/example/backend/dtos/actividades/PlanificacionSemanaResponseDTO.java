package com.example.backend.dtos.actividades;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.example.backend.entity.Actividades;
import com.example.backend.entity.Usuario;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class PlanificacionSemanaResponseDTO {
    private String idPlanificacionSemana;
    private ActividadResponseDTO actividad;
    @Enumerated(EnumType.STRING)
    private DiaSemana diaSemana;
    private String usuario;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
