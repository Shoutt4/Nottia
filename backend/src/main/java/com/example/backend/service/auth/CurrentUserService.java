package com.example.backend.service.auth;

import org.springframework.stereotype.Service;

import com.example.backend.dtos.auth.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class CurrentUserService {
    public String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated");
        }
        CustomUserDetails usuario = (CustomUserDetails) authentication.getPrincipal();
        return usuario.getIdUsuario();
    }
}
