package com.example.backend.repository.cuaderno;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Cuaderno;

public interface CuadernoRepository extends JpaRepository<Cuaderno,String> {

    boolean existsByIdCuader(String idCuaderno);
    
}
