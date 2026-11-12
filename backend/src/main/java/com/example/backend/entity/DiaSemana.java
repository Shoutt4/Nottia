package com.example.backend.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiaSemana {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String idDiaSemana;
    private String diaSemana;
    private String descripcion;
    @OneToMany(mappedBy = "diaSemana", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlanificacionSemana> planificaciones;
}
