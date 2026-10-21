package com.example.backend.controller.tablero;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.tablero.RequestTableroAllDTO;
import com.example.backend.dtos.tablero.ResponseTableroAllDTO;
import com.example.backend.service.tablero.TableroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tablero")
public class TableroController {
    private final TableroService tableroService;

    public TableroController(TableroService tableroService) {
        this.tableroService = tableroService;

    }

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/byme")
    public ResponseEntity<ResponseTableroAllDTO> getTableroByUser(@Valid @RequestHeader("Authorization") String token) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.tableroService.getTableroByUser(token));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateTablero(
            @Valid @RequestBody RequestTableroAllDTO requestTableroAllDTO,
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.status(200).body(this.tableroService.updateTablero(requestTableroAllDTO, token));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteTablero(@Valid @RequestHeader("Authorization") String token) {
        return ResponseEntity.status(200).body(this.tableroService.deleteTablero(token));
    }

}
