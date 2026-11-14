package com.example.backend.mapper.actividad;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.backend.dtos.actividades.PlanificacionSemanaRequestDTO;
import com.example.backend.dtos.actividades.PlanificacionSemanaResponseDTO;
import com.example.backend.entity.PlanificacionSemana;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE, uses = ActividadMapper.class)

public interface PlanificacionMapper {

    @Mapping(target = "idPlanificacionSemana", source = "idPlanificacionSemana")
    @Mapping(target = "actividad", source = "actividad")
    @Mapping(target = "diaSemana", source = "diaSemana")
    @Mapping(target = "usuario", source = "usuario.idUsuario")
    @Mapping(target = "horaInicio", source = "horaInicio")
    @Mapping(target = "horaFin", source = "horaFin")
    @Mapping(target = "createAt", source = "createAt")
    @Mapping(target = "updateAt", source = "updateAt")
    PlanificacionSemanaResponseDTO toResponse(PlanificacionSemana planificacionSemana);

    @Mapping(target = "idPlanificacionSemana", ignore = true)
    @Mapping(target = "actividad", source = "actividad")
    @Mapping(target = "diaSemana", source = "diaSemana")
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "horaInicio", source = "horaInicio")
    @Mapping(target = "horaFin", source = "horaFin")
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    PlanificacionSemana toSave(PlanificacionSemanaRequestDTO requestDTO);

    @Mapping(target = "idPlanificacionSemana", ignore = true)
    @Mapping(target = "actividad", source = "actividad")
    @Mapping(target = "diaSemana", source = "diaSemana")
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "horaInicio", source = "horaInicio")
    @Mapping(target = "horaFin", source = "horaFin")
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    PlanificacionSemana toUpdate(PlanificacionSemanaRequestDTO requestDTO, @MappingTarget PlanificacionSemana entity);
}
