package com.example.backend.controller.RutesPublic;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.actividades.PlanificacionSemanaResponseDTO;
import com.example.backend.dtos.notas.NotasResponse;
import com.example.backend.service.actividades.PlanificacionSemanaService;
import com.example.backend.service.notas.NotasService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {
    private final PlanificacionSemanaService planificacionSemanaService;
    private final NotasService notasService;

    @GetMapping("/panificacion/{id}")
    public ResponseEntity<List<PlanificacionSemanaResponseDTO>> getAllPublic(@Valid @PathVariable String id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(this.planificacionSemanaService.getPlanificacionSemanaPublic(id));
    }

    @GetMapping("/nota/{id}")
    public ResponseEntity<NotasResponse> findByNotaPublic(@Valid @PathVariable String id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.notasService.findById(id));
    }

}
