package com.example.backend.dtos.actividades;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class EventoResponseDTO {

    private String idEvento;
    private String titulo;
    private String descripcion;
    private LocalDate fecha;
    private String idUsuario;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
