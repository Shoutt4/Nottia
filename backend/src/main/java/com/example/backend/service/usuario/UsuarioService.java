package com.example.backend.service.usuario;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.example.backend.dtos.usuario.UserResponseDto;
import com.example.backend.dtos.usuario.UsuarioRequestDto;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.auth.authExceotion;
import com.example.backend.repository.auth.AuthRepository;
import com.example.backend.security.JwtService;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService {
    private final AuthRepository authRepository;

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(AuthRepository authRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDto usuarioResponseDTO(Usuario usuario) {
        return UserResponseDto.builder().idUsuario(usuario.getIdUsuario()).nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .urlAvatar(usuario.getUrlAvatar()).phone(usuario.getPhone()).build();
    }

    @Transactional
    public Map<String, Object> updateUser(String token, UsuarioRequestDto requestDto) {

        if (this.authRepository.existsById(this.jwtService.getIdUsuario(token))) {
            Usuario usuario = this.authRepository.findById(this.jwtService.getIdUsuario(token)).orElseThrow();
            usuario.setNombre(requestDto.getNombre());
            usuario.setApellido(requestDto.getApellido());
            usuario.setPassword(this.passwordEncoder.encode(requestDto.getPassword()));
            usuario.setUrlAvatar(requestDto.getUrlAvatar());
            usuario.setPhone(requestDto.getPhone());
            return Map.of("succes", true, "data", usuarioResponseDTO(this.authRepository.save(usuario)));

        } else {
            throw new authExceotion("usuario no registrado", 404, false);
        }
    }

    public Map<String, Object> getDetaiillsUser(String token) {
        Map<String, Object> response = new HashMap<>();
        String idUser = this.jwtService.getIdUsuario(token);
        if (this.authRepository.existsById(idUser)) {
            response.put("succes", true);
            response.put("data", usuarioResponseDTO(this.authRepository.findById(idUser).orElseThrow()));
            return response;
        } else {
            throw new authExceotion("error al otener usuario no autenticado", 404, false);
        }
    }
}
