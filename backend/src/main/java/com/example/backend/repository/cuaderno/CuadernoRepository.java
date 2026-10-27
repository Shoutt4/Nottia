package com.example.backend.repository.cuaderno;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Cuaderno;

public interface CuadernoRepository extends JpaRepository<Cuaderno, String> {

    boolean existsByIdCuader(String idCuaderno);

    boolean existsByIdCuaderAndIdUsuario_IdUsuario(String idCuaderno, String idUsuario);

    Cuaderno findByIdCuaderAndIdUsuario_IdUsuario(String idCuaderno, String idUsuario);

    Page<Cuaderno> findByIdUsuario_IdUsuario(String idUser, Pageable page);

    int countByIdUsuario_IdUsuario(String idUser);
}
