package com.example.backend.controller.notas;

import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backend.service.notas.NotasService;

import jakarta.validation.Valid;

import com.example.backend.dtos.notas.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/notas")
public class NotasController {
    private final NotasService notasService;

    public NotasController(NotasService notasService) {
        this.notasService = notasService;
    }

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/all")
    public ResponseEntity<Page<NotasResponse>> getNotasAllPagination(
            @Valid @RequestHeader("Authorization") String token,
            Pageable pageable) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.notasService.getNotasByUser(token, pageable));
    }
    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/{id}")
    public ResponseEntity<NotasResponse> getByIdNota(@Valid @PathVariable  String id ,@RequestHeader("Authorization")  String token){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.notasService.getNotaById(id, token));
    }
    @PreAuthorize("hasRole('USUARIO')")
    @PutMapping("/update/{id}")
    public ResponseEntity<NotasResponse> updateNota(@Valid  @PathVariable String id , @RequestParam  NotasRequestDTO requestDTO ,@RequestHeader("Authorization") String token){
        return  ResponseEntity.status(HttpStatus.ACCEPTED).body(this.notasService.updateNota(requestDTO, id, token));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String,Object>> DeleteNota(@Valid @PathVariable String id ,@RequestHeader("Authorization") String token ){
        return  ResponseEntity.status(200).body(this.notasService.deleteNota(id, token));
    }
  

}
