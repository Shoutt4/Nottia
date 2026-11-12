package com.example.backend.repository.actividades;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.DiaSemana;

@Repository
public interface DiaSemanaRepository extends JpaRepository<DiaSemana, String> {

}
