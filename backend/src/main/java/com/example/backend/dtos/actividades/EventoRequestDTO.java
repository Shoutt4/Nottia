package com.example.backend.dtos.actividades;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class EventoRequestDTO {
    private String titulo;
    private String descripcion;
    private LocalDate fecha;
}
