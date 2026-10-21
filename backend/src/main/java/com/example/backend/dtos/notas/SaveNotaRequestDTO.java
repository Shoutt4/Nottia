package com.example.backend.dtos.notas;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SaveNotaRequestDTO {

    private String idCuaderno;
    private String idUsuario;
    private String titulo;
    private String contenido;
    private boolean bloqueado;
    private boolean fijado;

}
