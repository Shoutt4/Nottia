package com.example.backend.service.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.config.authentication.PasswordEncoderParser;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.auth.AuthRequestDTO;
import com.example.backend.dtos.auth.Role;
import com.example.backend.dtos.auth.TokenResponseDTO;
import com.example.backend.entity.auth.Usuario;
import com.example.backend.exception.auth.authExceotion;
import com.example.backend.repository.auth.AuthRepository;
import com.example.backend.security.JwtService;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AuthRepository authRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public Usuario convertirUsuarioRequest(AuthRequestDTO requestDTO) {

        return Usuario.builder().nombre(requestDTO.getNombre()).apellido(requestDTO.getApellido())
                .email(requestDTO.getEmail())
                .password(passwordEncoder.encode(requestDTO.getPassword())).role(Role.USUARIO).build();
    }

    public TokenResponseDTO createUsuario(AuthRequestDTO requestDTO) {

        if (!this.authRepository.existsByEmail(requestDTO.getEmail())) {
            Usuario usuario = this.authRepository.save(convertirUsuarioRequest(requestDTO));
            return new TokenResponseDTO(this.jwtService.generateToken(usuario));
        } else {
            throw new authExceotion("El correo ya esta registrado", 404, false);
        }
    }
}
