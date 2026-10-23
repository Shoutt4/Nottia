package com.example.backend.dtos.tablero;

import java.security.Timestamp;

import com.example.backend.entity.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ResponseTableroAllDTO {
    private String idTablero;
    private String idUsuario;
    private String titulo;
    private String tipoPortada;
    private String portadaValor;
    private Timestamp createAt;
    private Timestamp updateAt;
}
