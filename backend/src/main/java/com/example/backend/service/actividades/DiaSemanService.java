package com.example.backend.service.actividades;

import java.util.List;

import com.example.backend.dtos.actividades.DiaSemanaRespones;
import com.example.backend.mapper.actividad.DiaSemanaMapper;
import com.example.backend.repository.actividades.DiaSemanaRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DiaSemanService {

    private DiaSemanaRepository diaSemanaRepository;
    private DiaSemanaMapper diaSemanaMapper;

    public List<DiaSemanaRespones> getALL() {
        return this.diaSemanaRepository.findAll().stream().map((d) -> this.diaSemanaMapper.toResponse(d)).toList();
    }
}
