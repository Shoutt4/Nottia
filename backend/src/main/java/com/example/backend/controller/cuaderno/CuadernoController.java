package com.example.backend.controller.cuaderno;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.cuaderno.CuadernoRequestDTO;
import com.example.backend.dtos.cuaderno.CuadernoResponseDTO;
import com.example.backend.service.cuaderno.CuadernoService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/cuaderno")
public class CuadernoController {
    private final CuadernoService cuadernoService;

    public CuadernoController(CuadernoService cuadernoService) {
        this.cuadernoService = cuadernoService;
    }

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/all")
    public ResponseEntity<Page<CuadernoResponseDTO>> fetAll(@Valid @RequestHeader("Authorization") String token,
            Pageable page) {

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.cuadernoService.findAll(token, page));
    }

    @PreAuthorize("hasRole('USUARIO')")
    @GetMapping("/byUser/{id}")

    public ResponseEntity<CuadernoResponseDTO> getByUser(@Valid @RequestHeader("Authorization") String token,
            @PathVariable String id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.cuadernoService.getCuaderno(id, token));
    }

    @PreAuthorize("hasRole(USUARIO)")
    @PostMapping("/create")
    public ResponseEntity<CuadernoResponseDTO> saveCuaderno(@Valid @RequestBody CuadernoRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.cuadernoService.saveCuaderno( requestDTO));
    }

}
