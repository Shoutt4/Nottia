package com.example.backend.mapper.actividad;

import com.example.backend.dtos.actividades.ActividadRequestDTIO;
import com.example.backend.dtos.actividades.ActividadResponseDTO;
import com.example.backend.entity.Actividades;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
public interface ActividadMapper {

    @Mapping(target = "idActividad", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "nombreActividad", source = "nombreActividad")
    @Mapping(target = "descripcionActividad", source = "descripcionActividad")
    @Mapping(target = "color", source = "color")
    Actividades toEntity(ActividadRequestDTIO actividadRequestDTIO);

    @Mapping(target = "idActividad", source = "idActividad")
    @Mapping(target = "nombreActividad", source = "nombreActividad")
    @Mapping(target = "descripcionActividad", source = "descripcionActividad")
    @Mapping(target = "color", source = "color")
    ActividadResponseDTO toResponseDTO(Actividades actividad);

    @Mapping(target = "idActividad", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "nombreActividad", source = "nombreActividad")
    @Mapping(target = "descripcionActividad", source = "descripcionActividad")
    @Mapping(target = "color", source = "color")

    Actividades updateActividad(ActividadRequestDTIO requestDTIO, @MappingTarget Actividades entity);

}
