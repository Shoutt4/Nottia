package com.example.backend.repository.tablero;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Tablero;

@Repository
public interface TableroRepository extends JpaRepository<Tablero, String> {
    boolean existsByIdTableroAndIdUsuario_IdUsuario(String idTablero, String idUsuario);

    boolean existsByIdUsuario_IdUsuario(String idUsuario);

    Tablero findByIdUsuario_IdUsuario(String idUsuario);

    @Modifying
    int deleteByIdUsuario_IdUsuario(String idUsuario);
}
