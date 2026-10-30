package com.example.backend.mapper.cuaderno;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dtos.cuaderno.DesignRequestDTO;
import com.example.backend.dtos.cuaderno.DesingResponseDTO;
import com.example.backend.entity.Design;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DesignMapper {
    @Mapping(target = "idDesing", source = "idDesing")
    @Mapping(target = "template", source = "template")
    @Mapping(target = "color", source = "color")
    @Mapping(target = "accent", source = "accent")
    @Mapping(target = "image", source = "image")
    DesingResponseDTO ResponseMap(Design design);

    @Mapping(target = "idDesing", ignore = true)
    @Mapping(target = "template", source = "template")
    @Mapping(target = "color", source = "color")
    @Mapping(target = "accent", source = "accent")
    @Mapping(target = "image", source = "image")
    Design saveMap(DesignRequestDTO dRequestDTO);

}
