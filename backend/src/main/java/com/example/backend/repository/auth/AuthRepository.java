package com.example.backend.repository.auth;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.dtos.auth.Role;
import com.example.backend.entity.Usuario;

import jakarta.transaction.Transactional;

public interface AuthRepository
                extends JpaRepository<Usuario, String> {

        Optional<Usuario> findByEmail(String email);

        boolean existsByEmail(String email);

        boolean existsByIdUsuario(String idUsuario);

        int countAllByRole(Role role);

        Page<Usuario> findAllByRole(Role role, Pageable pageable);

        @Transactional
        @Modifying
        @Query("UPDATE Usuario u SET u.activo = :activo WHERE u.idUsuario =:idUsuario")
        int updateUser(
                        @Param("activo") boolean activo,
                        @Param("idUsuario") String idUsuario);
}
