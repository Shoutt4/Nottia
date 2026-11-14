package com.example.backend.repository.actividades;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dtos.actividades.PlanificacionSemanaResponseDTO;
import com.example.backend.entity.PlanificacionSemana;

public interface PlanificacionSemanaRepository extends JpaRepository<PlanificacionSemana, String> {

    Page<PlanificacionSemana> findByUsuario_IdUsuarioOrderByDiaSemanaAsc(String idUsuario, Pageable page);

    Optional<PlanificacionSemana> findByIdPlanificacionSemanaAndUsuario_IdUsuario(String idPlanificacion,
            String idUsaurio);
}
