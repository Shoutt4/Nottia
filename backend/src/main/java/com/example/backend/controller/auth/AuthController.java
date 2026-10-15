package com.example.backend.controller.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.auth.AuthRequestDTO;
import com.example.backend.dtos.auth.TokenResponseDTO;
import com.example.backend.service.auth.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<TokenResponseDTO> resgiterUser(@Valid @RequestBody AuthRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.authService.createUsuario(requestDTO));
    }
}
