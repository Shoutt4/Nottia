package com.example.backend.controller.actividad;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.actividades.ActividadesService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import com.example.backend.dtos.actividades.ActividadRequestDTIO;
import com.example.backend.dtos.actividades.ActividadResponseDTO;

@RestController
@RequestMapping("/api/actividades")

@RequiredArgsConstructor
public class ActividadContoller {
    private final ActividadesService actividadesService;

    @PreAuthorize("hasRole('USUARIO')")
    @PostMapping("/save")
    public ResponseEntity<ActividadResponseDTO> saveActividad(
            @Valid @RequestBody ActividadRequestDTIO actividadRequestDTIO) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(this.actividadesService.saveActividad(actividadRequestDTIO));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/all")
    public ResponseEntity<Page<ActividadResponseDTO>> getAllActividadesByUser(Pageable pageable) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(this.actividadesService.getAllActiviadedesByUser(pageable));
    }

}
