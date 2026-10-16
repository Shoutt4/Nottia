package com.example.backend.controller.usuario;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.usuario.UsuarioRequestDto;
import com.example.backend.service.usuario.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PreAuthorize("hasRole('USUARIO')")
    @PutMapping("/Update")

    public ResponseEntity<Map<String, Object>> updateUser(@Valid @RequestHeader("Authorization") String token,
            @RequestBody UsuarioRequestDto requestDto) {
        return ResponseEntity.status(200).body(this.usuarioService.updateUser(token, requestDto));
    }
}
