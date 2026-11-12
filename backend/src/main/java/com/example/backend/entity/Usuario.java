package com.example.backend.entity;

import java.sql.Date;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.backend.dtos.auth.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
public class Usuario implements UserDetails {
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
    private boolean activo = true;
    @Column(columnDefinition = "TEXT")
    private String urlAvatar;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_palnificacion", referencedColumnName = "idPlanificacionSemana")
    private PlanificacionSemana planificacion;
    @CreationTimestamp
    private Date createAt;
    @UpdateTimestamp
    private Date updateAt;

    public String getIdUsuario() {
        return idUsuario;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role == null ? List.of() : List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return emailVerifi;
    }
}
