package com.example.backend.service.notas;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.notas.NotasRequestDTO;
import com.example.backend.dtos.notas.NotasResponse;
import com.example.backend.entity.Nota;
import com.example.backend.exception.ErrorGlobal;
import com.example.backend.mapper.NotaMapper;

import com.example.backend.repository.cuaderno.CuadernoRepository;
import com.example.backend.repository.notas.NotasRepository;
import com.example.backend.security.JwtService;

import jakarta.transaction.Transactional;

@Service
public class NotasService {
    private final NotasRepository notasRepository;
    private final JwtService jwtService;
    private final CuadernoRepository cuadernoRepository;
    private final NotaMapper mapperNota;

    public NotasService(NotasRepository notasRepository, JwtService jwtService, CuadernoRepository cuadernoRepository,
            NotaMapper nMapper) {
        this.notasRepository = notasRepository;
        this.jwtService = jwtService;
        this.cuadernoRepository = cuadernoRepository;
        this.mapperNota = nMapper;
    }

    public NotasResponse responseNotas(Nota nota) {

        return NotasResponse.builder().idNota(nota.getIdNota()).idCuaderno(nota.getICuaderno().getIdCuader())
                .idUsuario(nota.getIdUsuario().getIdUsuario()).titulo(nota.getTitulo()).contenido(nota.getContenido())
                .bloqueado(nota.isBloqueado())
                .fijado(nota.isFijado())
                .createAt(nota.getCreateAt()).updateAt(nota.getUpdateAt()).build();
    }

    public Page<NotasResponse> getNotasByUser(String token, Pageable page) {
        String idUsuario = jwtService.getIdUsuario(token);
        if (this.notasRepository.existsByIdUsuario_IdUsuario(idUsuario)) {
            return this.notasRepository.findByIdUsuario_IdUsuario(idUsuario, page).map(this::responseNotas);
        } else {
            throw new ErrorGlobal("usuario sin notas", 404, false);
        }
    }

    public NotasResponse getNotaById(String idNota, String token) {
        String idUsuari = this.jwtService.getIdUsuario(token);
        if (this.notasRepository.findById(idNota).isPresent()) {
            if (!this.notasRepository.existsByIdUsuario_IdUsuario(idUsuari)) {
                throw new ErrorGlobal("el recurso no pertenece a este usuario", 404, false);
            }
            return responseNotas(this.notasRepository.findByIdNotaAndIdUsuario_IdUsuario(idNota, idUsuari));
        } else {
            throw new ErrorGlobal("no existe ninguna nota con las especificaciones", 403, false);
        }
    }

    @Transactional
    public NotasResponse updateNota(NotasRequestDTO notasRequestDTO, String idNota, String token) {

        if (this.notasRepository.existsById(idNota)) {
            if (!this.cuadernoRepository.existsById(notasRequestDTO.getIdCuaderno())) {
                throw new ErrorGlobal("no existe un cuaderno con el id : " + notasRequestDTO.getIdCuaderno(), 403,
                        false);
            }
            Nota nota = this.notasRepository.findByIdNotaAndIdUsuario_IdUsuario(idNota,
                    this.jwtService.getIdUsuario(token));
            mapperNota.updateNotaFormDTO(notasRequestDTO, nota);
            return responseNotas(this.notasRepository.save(nota));
        } else {
            throw new ErrorGlobal("no existe una nota con id : " + idNota, 403, false);
        }
    }

    public Map<String, Object> deleteNota(String idNota, String token) {
        if (this.notasRepository.existsByIdNotaAndIdUsuario_IdUsuario(idNota, this.jwtService.getIdUsuario(token))) {
            return Map.of("succes", true, "cantidad eliminada", this.notasRepository
                    .deleteByIdNotaAndIdUsuario_IdUsuario(idNota, this.jwtService.getIdUsuario(token)));
        } else {
            throw new ErrorGlobal("nota no ecnotnrado con las especificaciones", 404, false);
        }
    }
}
