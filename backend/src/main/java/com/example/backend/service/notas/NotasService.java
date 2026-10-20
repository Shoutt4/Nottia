package com.example.backend.service.notas;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.notas.NotasResponse;
import com.example.backend.entity.Nota;
import com.example.backend.exception.ErrorGlobal;
import com.example.backend.repository.notas.NotasRepository;
import com.example.backend.security.JwtService;

@Service
public class NotasService {
    private final NotasRepository notasRepository;
    private JwtService jwtService;

    public NotasService(NotasRepository notasRepository, JwtService jwtService) {
        this.notasRepository = notasRepository;
        this.jwtService = jwtService;
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
}
