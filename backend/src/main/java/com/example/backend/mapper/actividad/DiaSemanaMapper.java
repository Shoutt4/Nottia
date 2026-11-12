package com.example.backend.mapper.actividad;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.backend.dtos.actividades.DiaSemanaRespones;
import com.example.backend.entity.DiaSemana;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)

public interface DiaSemanaMapper {

    @Mapping(target = "idDiaSemana", source = "idDiaSemana")
    @Mapping(target = "diaSemana", source = "diaSemana")
    @Mapping(target = "descripcion", source = "descripcion")
    DiaSemanaRespones toResponse(DiaSemana request);
}
