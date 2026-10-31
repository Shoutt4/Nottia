package com.example.backend.entity;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.backend.dtos.auth.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "usuario_ann")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_usuario")
    private String idUsuario;
    @Column(nullable = false, length = 50)
    private String nombre;
    @Column(nullable = false, length = 100)
    private String apellido;
    @Email
    @Column(nullable = false, length = 200, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(name = "email_verified", nullable = false)
    private boolean emailVerifi = false;
    @Column(columnDefinition = "TEXT")
    private String urlAvatar;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Role role;
    @CreationTimestamp
    private Date createAt;
    @UpdateTimestamp
    private Date updateAt;

}
