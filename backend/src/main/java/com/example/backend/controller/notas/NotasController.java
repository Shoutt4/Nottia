package com.example.backend.controller.notas;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backend.service.notas.NotasService;

import jakarta.validation.Valid;

import com.example.backend.dtos.notas.*;

@RestController
@RequestMapping("/api/notas")
public class NotasController {
    private final NotasService notasService;

    public NotasController(NotasService notasService) {
        this.notasService = notasService;
    }

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/all")
    public ResponseEntity<Page<NotasResponse>> getNotasAllPagination(
            @Valid @RequestHeader("Authorization") String token,
            Pageable pageable) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.notasService.getNotasByUser(token, pageable));
    }
}
