package com.example.backend.repository.notas;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.JpqlQueryBuilder.Select;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.dtos.notas.NotasResponse;
import com.example.backend.entity.Nota;

import jakarta.transaction.Transactional;

@Repository
public interface NotasRepository extends JpaRepository<Nota, String> {
        Page<Nota> findByIdUsuario_IdUsuario(String idUsuario, Pageable page);

        boolean existsByIdUsuario_IdUsuario(String idUsuario);

        Nota findByIdNotaAndIdUsuario_IdUsuario(String idNota, String idUsuario);

        boolean existsByIdNotaAndIdUsuario_IdUsuario(String idNota, String idUsuario);

        Optional<Nota> findByIdNota(String idNota);

        @Transactional
        @Modifying
        int deleteByIdNotaAndIdUsuario_IdUsuario(String idNota, String idCuaderno);

        @Query("SELECT n FROM Nota  n  Where n.fijado=true AND n.iCuaderno.idUsuario.idUsuario = :idUsuario")
        Page<Nota> optenerNotasFijadas(String idUsuario, Pageable page);

        @Query("SELECT COUNT(n.idNota) FROM Nota n where n.fijado=true AND n.iCuaderno.idUsuario.idUsuario = :idUsuario")
        int countBy(String idUsuario);

        @Query("SELECT n FROM Nota n WHERE n.iCuaderno.idCuader=:idCuaderno AND n.iCuaderno.idUsuario.idUsuario=:idUsuario")
        Page<Nota> findAllByCuaderno(
                        @Param("idCuaderno") String idCuaderno,
                        @Param("idUsuario") String idUsuario,
                        Pageable page);

        @Transactional
        @Modifying
        @Query("UPDATE Nota n SET n.fijado=:estado WHERE n.idNota=:idNota AND n.idUsuario.idUsuario=:idUsuario")
        int updateNotaFijado(
                        @Param("estado") boolean estado,
                        @Param("idNota") String idNota,
                        @Param("idUsuario") String idUsuario);
}
