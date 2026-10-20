package com.example.backend.dtos.notas;

import java.security.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class NotasResponse {
    private String idNota;
    private String idCuaderno;
    private String idUsuario;
    private String titulo;
    private String contenido;
    private boolean bloqueado;
    private boolean fijado;
    private Timestamp createAt;
    private Timestamp updateAt;
}
