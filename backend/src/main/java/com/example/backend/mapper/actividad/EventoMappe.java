package com.example.backend.mapper.actividad;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.backend.dtos.actividades.EventoRequestDTO;
import com.example.backend.dtos.actividades.EventoResponseDTO;
import com.example.backend.entity.Evento;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)

public interface EventoMappe {
    @Mapping(target = "idEvento", source = "idEvento")
    @Mapping(target = "titulo", source = "titulo")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "fecha", source = "fecha")
    @Mapping(target = "idUsuario", source = "usuario.idUsuario")
    @Mapping(target = "createAt", source = "createAt")
    @Mapping(target = "updateAt", source = "updateAt")
    EventoResponseDTO toResponse(Evento evento);

    @Mapping(target = "idEvento", ignore = true)
    @Mapping(target = "titulo", source = "titulo")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "fecha", source = "fecha")
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    Evento toSave(EventoRequestDTO requestDTO);

}
