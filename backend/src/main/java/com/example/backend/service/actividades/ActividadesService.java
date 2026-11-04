package com.example.backend.service.actividades;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.actividades.ActividadRequestDTIO;
import com.example.backend.dtos.actividades.ActividadResponseDTO;
import com.example.backend.entity.Actividades;
import com.example.backend.entity.Usuario;
import com.example.backend.mapper.actividad.ActividadMapper;
import com.example.backend.repository.actividades.ActividadRespository;
import com.example.backend.repository.auth.AuthRepository;
import com.example.backend.service.auth.CurrentUserService;
import com.example.backend.exception.ErrorGlobal;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActividadesService {
    private final ActividadRespository actividadRespository;
    private final AuthRepository authRepository;
    private final CurrentUserService currentUserService;
    private final ActividadMapper actividadMapper;

    public ActividadResponseDTO saveActividad(ActividadRequestDTIO actividadRequestDTIO) {
        if (this.authRepository.existsById(this.currentUserService.getCurrentUserId())) {
            Actividades actividad = this.actividadMapper.toEntity(actividadRequestDTIO);
            Usuario usuario = this.authRepository.findById(this.currentUserService.getCurrentUserId()).orElseThrow();
            actividad.setIdUsuario(usuario);
            return this.actividadMapper.toResponseDTO(this.actividadRespository.save(actividad));
        } else {
            throw new ErrorGlobal("error  usuario no encotrado", 404, false);
        }
    }

    public Page<ActividadResponseDTO> getAllActiviadedesByUser(Pageable pageable) {
        if (this.authRepository.existsById(this.currentUserService.getCurrentUserId())) {
            return this.actividadRespository
                    .findByIdUsuario_IdUsuario(this.currentUserService.getCurrentUserId(), pageable)
                    .map((p) -> this.actividadMapper.toResponseDTO(p));
        }
        throw new ErrorGlobal("error  usuario no encotrado", 404, false);
    }

}
