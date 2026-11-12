package com.example.backend.service.actividades;

import java.util.Map;

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

import jakarta.transaction.Transactional;

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
            return this.actividadMapper.toResponseDTO(this.actividadRespository.save(actividad));
        } else {
            throw new ErrorGlobal("error  usuario no encotrado", 404, false);
        }
    }
/* 
    public Page<ActividadResponseDTO> getAllActiviadedesByUser(Pageable pageable) {
        if (this.authRepository.existsById(this.currentUserService.getCurrentUserId())) {
       
        }
        throw new ErrorGlobal("error  usuario no encotrado", 404, false);
    }

    public ActividadResponseDTO getActividadByIdForIdUser(String idActividad) {
        if (this.actividadRespository.existsByIdActividadAndIdUsuario_IdUsuario(idActividad,
                this.currentUserService.getCurrentUserId())) {
            return this.actividadMapper.toResponseDTO(
                    this.actividadRespository.findByIdActividadAndIdUsuario_IdUsuario(idActividad,
                            this.currentUserService.getCurrentUserId()));
        } else {
            throw new ErrorGlobal("actividad no existente", 404, false);
        }
    }

    @Transactional
    public ActividadResponseDTO updateActividad(String idActividad, ActividadRequestDTIO actividadRequestDTIO) {
        if (this.actividadRespository.existsByIdActividadAndIdUsuario_IdUsuario(idActividad,
                this.currentUserService.getCurrentUserId())) {
            Actividades actividades = this.actividadRespository.findByIdActividadAndIdUsuario_IdUsuario(idActividad,
                    this.currentUserService.getCurrentUserId());
            this.actividadMapper.updateActividad(actividadRequestDTIO, actividades);
            return this.actividadMapper.toResponseDTO(this.actividadRespository.save(actividades));
        } else {
            throw new ErrorGlobal("error la activadad no existe", 404, false);
        }
    }

    @Transactional
    public Map<String, Object> deleteActividad(String idActividad) {
        if (this.actividadRespository.existsByIdActividadAndIdUsuario_IdUsuario(idActividad,
                this.currentUserService.getCurrentUserId())) {
            int res = this.actividadRespository.deleteByIdActividadAndIdUsuario_IdUsuario(idActividad,
                    currentUserService.getCurrentUserId());
            return Map.of("succes", true, "message", "catidad actividades eliminadas : " + res);
        } else {
            throw new ErrorGlobal("error actividad no existente", 404, false);
        }
    }
*/
}
