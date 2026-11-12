package com.example.backend.dtos.actividades;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ActividadRequestDTIO {

    private String nombreActividad;
    private String descripcionActividad;
    private String color;
}
