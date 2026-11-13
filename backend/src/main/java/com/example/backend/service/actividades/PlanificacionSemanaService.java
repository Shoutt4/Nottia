package com.example.backend.service.actividades;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.actividades.PlanificacionSemanaRequestDTO;
import com.example.backend.dtos.actividades.PlanificacionSemanaResponseDTO;
import com.example.backend.entity.PlanificacionSemana;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.ErrorGlobal;
import com.example.backend.mapper.actividad.PlanificacionMapper;
import com.example.backend.repository.actividades.PlanificacionSemanaRepository;
import com.example.backend.repository.auth.AuthRepository;
import com.example.backend.service.auth.CurrentUserService;

import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlanificacionSemanaService {
    private final PlanificacionSemanaRepository planificacionSemanaRepository;
    private final CurrentUserService currentUserService;
    private final PlanificacionMapper planificacionMapper;
    private final AuthRepository authRepository;

    public Page<PlanificacionSemanaResponseDTO> getAll(Pageable page) {
        if (this.authRepository.existsById(this.currentUserService.getCurrentUserId())) {
            return this.planificacionSemanaRepository
                    .findByUsuario_IdUsuarioOrderByDiaSemanaAsc(this.currentUserService.getCurrentUserId(), page)
                    .map(p -> this.planificacionMapper.toResponse(p));
        } else {
            throw new ErrorGlobal("usuario no encontrado", 404, false);
        }
    }

    public PlanificacionSemanaResponseDTO savePlanificacion(PlanificacionSemanaRequestDTO requestDTO) {
        Usuario usuario = this.authRepository.findById(this.currentUserService.getCurrentUserId()).orElseThrow(
                () -> new ErrorGlobal("usuario no encontrado", 404, false));
        PlanificacionSemana pn = this.planificacionMapper.toSave(requestDTO);
        pn.setUsuario(usuario);
        return this.planificacionMapper.toResponse(this.planificacionSemanaRepository.save(pn));
    }
}
