package com.example.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dtos.notas.NotasRequestDTO;
import com.example.backend.entity.Nota;
import com.example.backend.entity.Usuario;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NotaMapper {

    @Mapping(target = "idNota", ignore = true)
    @Mapping(target = "ICuaderno", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target = "createAt", ignore = true)
    void updateNotaFormDTO(NotasRequestDTO requestDTO, @MappingTarget Nota entity);

    default Usuario map(String idUsuario) {
        if (idUsuario == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(idUsuario);
        return usuario;
    }
}
