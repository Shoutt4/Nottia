package com.example.backend.dtos.usuario;

import javax.management.relation.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder

@Data
public class UpdateRoleEstado {
    private Role role;
    private boolean estado;
}
