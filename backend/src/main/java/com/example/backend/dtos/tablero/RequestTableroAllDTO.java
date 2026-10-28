package com.example.backend.dtos.tablero;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestTableroAllDTO {
    private String idUsuario;
    private String titulo;
    private String tipoPortada;
    private String portadaValor;
}
