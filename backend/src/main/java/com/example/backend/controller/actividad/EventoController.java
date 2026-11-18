package com.example.backend.controller.actividad;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.actividades.EventoRequestDTO;
import com.example.backend.dtos.actividades.EventoResponseDTO;
import com.example.backend.service.actividades.EventoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/evento")
@RequiredArgsConstructor
public class EventoController {

    private final EventoService eventoService;

    @PreAuthorize("hasRole('USUARIO')")
    @PostMapping("/save")

    public ResponseEntity<EventoResponseDTO> saveEvento(@Valid @RequestBody EventoRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.eventoService.saveEvento(requestDTO));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/all")
    public ResponseEntity<List<EventoResponseDTO>> getAll() {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.eventoService.getALL());
    }
}
