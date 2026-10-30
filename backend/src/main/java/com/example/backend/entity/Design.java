package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class Design {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_desing")
    private String idDesing;
    private String template;
    private String color;
    private String accent;
    @Column(columnDefinition = "TEXT")
    private String image;
}
