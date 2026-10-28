package com.example.backend.service.tablero;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.backend.dtos.tablero.RequestTableroAllDTO;
import com.example.backend.dtos.tablero.ResponseTableroAllDTO;
import com.example.backend.entity.Tablero;
import com.example.backend.exception.ErrorGlobal;
import com.example.backend.mapper.tablero.UpdateMapper;
import com.example.backend.repository.tablero.TableroRepository;
import com.example.backend.security.JwtService;

import jakarta.transaction.Transactional;

@Service
public class TableroService {
    private final TableroRepository tableroRepository;
    private final JwtService jwtService;
    private final UpdateMapper updateMapper;

    public TableroService(TableroRepository tableroRepository, JwtService jwtService, UpdateMapper updateMapper) {
        this.tableroRepository = tableroRepository;
        this.jwtService = jwtService;
        this.updateMapper = updateMapper;
    }

    public ResponseTableroAllDTO convertirTablero(Tablero tablero) {
        return ResponseTableroAllDTO.builder().idUsuario(tablero.getIdUsuario().getIdUsuario())
                .idTablero(tablero.getIdTablero())
                .titulo(tablero.getTitulo()).tipoPortada(tablero.getTipoPortada())
                .portadaValor(tablero.getPortadaValor()).createAt(tablero.getCreateAt()).updateAt(tablero.getUpdateAt())
                .build();
    }

    public ResponseTableroAllDTO getTableroByUser(String token) {
        String idUser = this.jwtService.getIdUsuario(token);
        if (this.tableroRepository.existsByIdUsuario_IdUsuario(idUser)) {
            return convertirTablero(this.tableroRepository.findByIdUsuario_IdUsuario(idUser));
        } else {
            throw new ErrorGlobal("tablero no existente para este usuario", 404, false);
        }
    }

    @Transactional
    public Map<String, Object> updateTablero(RequestTableroAllDTO requestTableroAllDTO, String token) {
        String idUser = this.jwtService.getIdUsuario(token);
        if (this.tableroRepository.existsByIdUsuario_IdUsuario(idUser)) {
            Tablero tablero = this.tableroRepository.findByIdUsuario_IdUsuario(idUser);
            this.updateMapper.updateTablero(requestTableroAllDTO, tablero);
            return Map.of("succes", true, "data", convertirTablero(this.tableroRepository.save(tablero)));
        } else {
            throw new ErrorGlobal("NO EXISTE TABLERO PARA ESTE USUARIO", 404, false);
        }
    }

    public Map<String, Object> deleteTablero(String token) {
        String idUser = this.jwtService.getIdUsuario(token);
        if (this.tableroRepository.existsByIdUsuario_IdUsuario(idUser)) {
            return Map.of("succes", true, "cantidad eliminada",
                    this.tableroRepository.deleteByIdUsuario_IdUsuario(idUser));
        } else {
            throw new ErrorGlobal("tablero no encontrado", 404, false);
        }
    }
}
