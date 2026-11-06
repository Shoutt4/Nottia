package com.example.backend.mapper.usuario;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.backend.dtos.usuario.UpdateRoleEstado;

import com.example.backend.entity.Usuario;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
public interface UsuarioMapper {


}
