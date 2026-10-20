package com.example.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dtos.notas.NotasRequestDTO;
import com.example.backend.entity.Nota;

@Mapper(componentModel =  "spring",nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE) 
public interface MapperNota {
 
    @Mapping(target = "idNota",ignore = true)
    @Mapping(target = "iCuaderno",ignore = true)
    @Mapping (target = "updateAt",ignore = true)
    
    void updateNotaFormDTO(NotasRequestDTO requestDTO ,@MappingTarget Nota entity);
}
