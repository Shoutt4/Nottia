package com.example.backend.mapper.cuaderno;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dtos.cuaderno.CuadernoRequestDTO;
import com.example.backend.dtos.cuaderno.CuadernoResponseDTO;
import com.example.backend.entity.Cuaderno;
import com.example.backend.entity.Usuario;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CuadernoResponseMapper {

    @Mapping(target = "idCuader", source = "idCuader")
    @Mapping(target = "idUsuario", source = "idUsuario.idUsuario")
    CuadernoResponseDTO toResponseCuaderno(Cuaderno cuaderno);

    default Usuario map(String idUsuario) {
        if (idUsuario == null) {
            return null;
        }

        Usuario usuario = new Usuario();
        usuario.setIdUsuario(idUsuario);
        return usuario;
    }

    @Mapping(target = "idCuader", ignore = true)
    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    Cuaderno saveCuaderno(CuadernoRequestDTO cuadernoRequestDTO);

    @Mapping(target = "idCuader", ignore = true)
    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    Cuaderno updateCuadernoMap(CuadernoRequestDTO cuadernoRequestDTO, @MappingTarget Cuaderno entity);

    default Usuario getUsuario(String idUsuario) {
        if (idUsuario == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(idUsuario);
        return usuario;
    }
}
