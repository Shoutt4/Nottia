package com.example.backend.mapper.nota;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dtos.notas.SaveNotaRequestDTO;
import com.example.backend.entity.Cuaderno;
import com.example.backend.entity.Nota;
import com.example.backend.entity.Usuario;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface SaveNotaMapper {

    @Mapping(target = "idNota", ignore = true)
    @Mapping(target = "idUsuario", source = "idUsuario")
    @Mapping(target = "iCuaderno", source = "idCuaderno")
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)

    Nota toEnty(SaveNotaRequestDTO requestDTO);

    default Cuaderno mapCuaderno(String idCuaderno) {
        if (idCuaderno == null) {
            return null;
        }

        Cuaderno cuaderno = new Cuaderno();
        cuaderno.setIdCuader(idCuaderno);
        return cuaderno;
    }

    default Usuario mapUsuario(String idUsuario) {
        if (idUsuario == null) {
            return null;
        }

        Usuario usuario = new Usuario();
        usuario.setIdUsuario(idUsuario);
        return usuario;
    }
}
