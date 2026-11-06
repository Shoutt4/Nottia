package com.example.backend.controller.usuario;

import com.example.backend.service.auth.AuthService;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.usuario.UserResponseDto;
import com.example.backend.dtos.usuario.UsuarioRequestDto;
import com.example.backend.service.usuario.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final AuthService authService;
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService, AuthService authService) {
        this.usuarioService = usuarioService;
        this.authService = authService;
    }

    @PreAuthorize("hasRole('USUARIO')")
    @PutMapping("/Update")

    public ResponseEntity<Map<String, Object>> updateUser(@Valid @RequestHeader("Authorization") String token,
            @RequestBody UsuarioRequestDto requestDto) {
        return ResponseEntity.status(200).body(this.usuarioService.updateUser(token, requestDto));
    }

    @PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getDetaills(@Valid @RequestHeader("Authorization") String token) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.usuarioService.getDetaiillsUser(token));

    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<Page<UserResponseDto>> getAllUsers(@Valid Pageable page) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.usuarioService.getAllByUser(page));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/update/{id}/{activo}")

    public ResponseEntity<Map<String, Object>> suspenderUser(@Valid @PathVariable String id,
            @PathVariable boolean activo) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.usuarioService.updateUserByAdmin(id, activo));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteUserByAdmin(@Valid @PathVariable String id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.usuarioService.deleteByUser(id));
    }
}
