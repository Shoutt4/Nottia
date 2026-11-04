package com.example.backend.mapper.actividad;

import com.example.backend.dtos.actividades.ActividadRequestDTIO;
import com.example.backend.dtos.actividades.ActividadResponseDTO;
import com.example.backend.entity.Actividades;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
public interface ActividadMapper {

    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "nombreActividad", source = "nombreActividad")
    @Mapping(target = "descripcionActividad", source = "descripcionActividad")
    @Mapping(target = "fechaInicio", source = "fechaInicio")
    @Mapping(target = "fechaFin", source = "fechaFin")
    Actividades toEntity(ActividadRequestDTIO actividadRequestDTIO);

    @Mapping(target = "idActividad", source = "idActividad")
    @Mapping(target = "idUsuario", source = "idUsuario.idUsuario")
    @Mapping(target = "nombreActividad", source = "nombreActividad")
    @Mapping(target = "descripcionActividad", source = "descripcionActividad")
    @Mapping(target = "fechaInicio", source = "fechaInicio")
    @Mapping(target = "fechaFin", source = "fechaFin")
    ActividadResponseDTO toResponseDTO(Actividades actividad);

}
