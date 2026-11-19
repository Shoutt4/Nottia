package com.example.backend.service.actividades;

import com.example.backend.service.auth.CurrentUserService;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dtos.actividades.EventoRequestDTO;
import com.example.backend.dtos.actividades.EventoResponseDTO;
import com.example.backend.entity.Evento;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.ErrorGlobal;
import com.example.backend.mapper.actividad.EventoMappe;
import com.example.backend.repository.actividades.ActividadRespository;
import com.example.backend.repository.actividades.EventoRepository;
import com.example.backend.repository.auth.AuthRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final CurrentUserService currentUserService;
    private final EventoRepository EventoRepository;
    private final EventoMappe eventoMappe;
    private final AuthRepository authRepository;

    public List<EventoResponseDTO> getALL() {
        if (this.EventoRepository.countByUsuario_idUsuario(currentUserService.getCurrentUserId()) > 0) {
            return this.EventoRepository.findAll().stream().map((p) -> eventoMappe.toResponse(p)).toList();
        } else {
            throw new ErrorGlobal("no existe ningu dato", 0, false);
        }
    }

    public EventoResponseDTO saveEvento(EventoRequestDTO requestDTO) {
        Usuario usuario = this.authRepository.findById(currentUserService.getCurrentUserId()).orElseThrow(
                () -> new ErrorGlobal("error no existe usuario", 404, false));
        Evento evento = this.eventoMappe.toSave(requestDTO);
        evento.setUsuario(usuario);
        return this.eventoMappe.toResponse(this.EventoRepository.save(evento));
    }

    public EventoResponseDTO updaeEvento(String idEvento, EventoRequestDTO requestDTO) {
        if (this.EventoRepository.existsByUsuario_idUsuarioAndIdEvento(currentUserService.getCurrentUserId(),
                idEvento)) {
            return this.eventoMappe.toResponse(this.EventoRepository.save(eventoMappe.toUpdate(requestDTO,
                    this.EventoRepository.findByIdEventoAndUsuario_idUsuario(idEvento,
                            currentUserService.getCurrentUserId()))));
        } else {
            throw new ErrorGlobal("no exuste nigun evento con las especificaciones", 404, false);
        }
    }

    public EventoResponseDTO getById(String idEvento) {
        if (this.EventoRepository.existsByUsuario_idUsuarioAndIdEvento(currentUserService.getCurrentUserId(),
                idEvento)) {
            return eventoMappe.toResponse(this.EventoRepository.findById(idEvento).orElseThrow(
                    () -> new ErrorGlobal("no existe ningu registro con el id :" + idEvento, 404, false)));
        } else {
            throw new ErrorGlobal("no existe evento registrado", 404, false);
        }
    }
}
