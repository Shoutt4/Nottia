package com.example.backend.repository.notas;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Nota;

@Repository
public interface NotasRepository extends JpaRepository<Nota, String> {
    Page<Nota> findByIdUsuario_IdUsuario(String idUsuario, Pageable page);

    boolean existsByIdUsuario_IdUsuario(String idUsuario);
}
