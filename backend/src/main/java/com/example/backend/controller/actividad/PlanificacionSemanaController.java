package com.example.backend.controller.actividad;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.actividades.PlanificacionSemanaRequestDTO;
import com.example.backend.dtos.actividades.PlanificacionSemanaResponseDTO;
import com.example.backend.service.actividades.PlanificacionSemanaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/planificacion")
@RequiredArgsConstructor
public class PlanificacionSemanaController {

    private final PlanificacionSemanaService planificacionSemanaService;

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/all")
    public ResponseEntity<Page<PlanificacionSemanaResponseDTO>> getAll(Pageable page) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.planificacionSemanaService.getAll(page));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @PostMapping("/save")
    public ResponseEntity<PlanificacionSemanaResponseDTO> savePlanificacion(
            @Valid @RequestBody PlanificacionSemanaRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.planificacionSemanaService.savePlanificacion(requestDTO));
    }
}
