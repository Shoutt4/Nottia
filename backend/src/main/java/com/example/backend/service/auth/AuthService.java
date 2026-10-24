package com.example.backend.service.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.authentication.PasswordEncoderParser;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.auth.AuthRequestDTO;
import com.example.backend.dtos.auth.LoginRequetDTO;
import com.example.backend.dtos.auth.Role;
import com.example.backend.dtos.auth.TokenResponseDTO;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.auth.authExceotion;
import com.example.backend.repository.auth.AuthRepository;
import com.example.backend.security.JwtService;

import jakarta.transaction.Transactional;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private EmailVerificationTokenService emailVerificationTokenService;

    public AuthService(AuthRepository authRepository, PasswordEncoder passwordEncoder, JwtService jwtService,
            AuthenticationManager authenticationManager, EmailVerificationTokenService emailVerificationTokenService) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailVerificationTokenService = emailVerificationTokenService;
    }

    public Usuario convertirUsuarioRequest(AuthRequestDTO requestDTO) {

        return Usuario.builder().nombre(requestDTO.getNombre()).apellido(requestDTO.getApellido())
                .email(requestDTO.getEmail())
                .password(passwordEncoder.encode(requestDTO.getPassword())).role(Role.USUARIO).build();
    }

    @Transactional
    public Map<String, Object> createUsuario(AuthRequestDTO requestDTO) {

        if (!this.authRepository.existsByEmail(requestDTO.getEmail())) {
            Usuario usuario = this.authRepository.save(convertirUsuarioRequest(requestDTO));
            this.emailVerificationTokenService.enviarEmailVerification(usuario);

            return (Map.of("suces", true, "message", "usuario creado correctamente revisa tu correo para  verifica tu cuenta"));

        } else {
            throw new authExceotion("El correo ya esta registrado", 409, false);
        }
    }

    public TokenResponseDTO loginUser(LoginRequetDTO requetDTO) {

        if (this.authRepository.existsByEmail(requetDTO.getEmail())) {

            Authentication authentication = this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requetDTO.getEmail(), requetDTO.getPassword()));
            Usuario usuario = this.authRepository.findByEmail(authentication.getName()).orElseThrow();
            if (!usuario.isEmailVerifi()) {
                throw new authExceotion("veificar  email", 404, false);
            }
            return TokenResponseDTO.builder()
                    .token(this.jwtService
                            .generateToken(usuario))
                    .build();
        } else {
            throw new authExceotion("usuario no registrado", 403, false);
        }
    }
}
