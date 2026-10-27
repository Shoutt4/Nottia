package com.example.backend.service.cuaderno;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.cuaderno.CuadernoRequestDTO;
import com.example.backend.dtos.cuaderno.CuadernoResponseDTO;
import com.example.backend.exception.ErrorGlobal;
import com.example.backend.mapper.cuaderno.CuadernoResponseMapper;
import com.example.backend.repository.cuaderno.CuadernoRepository;
import com.example.backend.security.JwtService;

@Service
public class CuadernoService {
    private final CuadernoResponseMapper cuadernoResponseMapper;
    private final CuadernoRepository cuadernoRepository;
    private final JwtService jwtService;

    public CuadernoService(CuadernoRepository cuadernoRepository,
            CuadernoResponseMapper cuadernoResponseMapper, JwtService jwtService) {
        this.cuadernoRepository = cuadernoRepository;
        this.cuadernoResponseMapper = cuadernoResponseMapper;
        this.jwtService = jwtService;
    }

    public CuadernoResponseDTO getCuaderno(String idCuaderno, String token) {
        String idUsuario = this.jwtService.getIdUsuario(token);
        if (this.cuadernoRepository.existsByIdCuaderAndIdUsuario_IdUsuario(idCuaderno, idUsuario)) {
            return cuadernoResponseMapper.toResponseCuaderno(
                    this.cuadernoRepository.findByIdCuaderAndIdUsuario_IdUsuario(idCuaderno, idUsuario));
        } else {
            throw new ErrorGlobal("cuaderno no existente", 404, false);
        }
    }

    public Page<CuadernoResponseDTO> findAll(String token, Pageable page) {
        String idUser = this.jwtService.getIdUsuario(token);
        if (this.cuadernoRepository.countByIdUsuario_IdUsuario(idUser) != 0) {
            return this.cuadernoRepository.findByIdUsuario_IdUsuario(idUser, page)
                    .map((p) -> this.cuadernoResponseMapper.toResponseCuaderno(p));
        } else {
            throw new ErrorGlobal("No existen cuadernos creados para este usuario", 403, false);
        }
    }

    public CuadernoResponseDTO saveCuaderno(CuadernoRequestDTO requestDTO) {
        return this.cuadernoResponseMapper.toResponseCuaderno(this.cuadernoResponseMapper.saveCuaderno(requestDTO));
    }

}
