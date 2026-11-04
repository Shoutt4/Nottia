package com.example.backend.config;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.auth.CustomUserDetails;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.auth.authExceotion;
import com.example.backend.repository.auth.AuthRepository;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final AuthRepository authRepository;

    public CustomUserDetailsService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) {
        Usuario usuario = this.authRepository.findByEmail(userName)
                .orElseThrow(() -> new authExceotion("usuario no esta registado", 404, false));

        return new CustomUserDetails(usuario.getIdUsuario(), usuario.getEmail(), usuario.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRole().name())));
    }
}
