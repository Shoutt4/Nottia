package com.example.backend.entity;

import java.security.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity

public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String idNota;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cuaderno", referencedColumnName = "id_cuaderno")
    private Cuaderno iCuaderno;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario idUsuario;
    @Size(max = 200)
    private String titulo;
    @Column(columnDefinition = "TEXT")
    private String contenido;
    private boolean bloqueado;
    private boolean fijado;
    private Timestamp createAt;
    private Timestamp updateAt;
}
