package com.example.backend.mapper.tablero;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dtos.tablero.RequestTableroAllDTO;
import com.example.backend.entity.Tablero;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UpdateMapper {

    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "idTablero", ignore = true)

    Tablero updateTablero(RequestTableroAllDTO requestTableroAllDTO, @MappingTarget Tablero tablero);
}
