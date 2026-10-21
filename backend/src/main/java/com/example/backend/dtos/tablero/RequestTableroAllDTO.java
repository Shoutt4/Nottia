package com.example.backend.dtos.tablero;

import com.example.backend.entity.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestTableroAllDTO {
    private Usuario idUsuario;
    private String titulo;
    private String tipoPortada;
    private String portadaValor;
}
