package com.example.backend.dtos.actividades;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ActividadResponseDTO {
    private String idActividad;
    private String nombreActividad;
    private String descripcionActividad;
    private String color;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
