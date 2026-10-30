package com.example.backend.dtos.cuaderno;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DesingResponseDTO {
    private String idDesing;
    private String template;
    private String color;
    private String accent;
    @Column(columnDefinition = "TEXT")
    private String image;
}
