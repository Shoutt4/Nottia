package com.example.backend.repository.actividades;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.entity.Actividades;

@Repository
public interface ActividadRespository extends JpaRepository<Actividades, String> {

    Page<Actividades> findByIdUsuario_IdUsuario(String idUsuario, Pageable pageable);

}
