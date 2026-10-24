package com.example.backend.entity;

import java.security.Timestamp;
import java.sql.Date;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class EmailVerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String idVerify;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;
    private String tokenHash;

    private LocalDateTime fechaExperiracion;
    private LocalDateTime fechaConsumo;

    private LocalDateTime creatAt;

    @PrePersist
    void prePersist() {
        if (creatAt == null) {
            creatAt = LocalDateTime.now();
        }
    }
}
