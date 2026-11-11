package com.example.backend.controller.actividad;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.actividades.ActividadesService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Map;

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

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/detaills-one/{id}")
    public ResponseEntity<ActividadResponseDTO> getActividadDetaills(@Valid @PathVariable String id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.actividadesService.getActividadByIdForIdUser(id));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ActividadResponseDTO> updateActividad(@Valid @PathVariable String id,
            @RequestBody ActividadRequestDTIO requestDTIO) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(this.actividadesService.updateActividad(id, requestDTIO));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteActiviti(@Valid @PathVariable String id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.actividadesService.deleteActividad(id));
    }

}
