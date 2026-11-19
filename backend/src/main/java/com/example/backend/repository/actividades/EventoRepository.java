package com.example.backend.repository.actividades;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, String> {

    int countByUsuario_idUsuario(String idUsuario);

    boolean existsByUsuario_idUsuarioAndIdEvento(String idUsuario, String idEvento);

    Evento findByIdEventoAndUsuario_idUsuario(String idEvento ,String idUsuario);
}
