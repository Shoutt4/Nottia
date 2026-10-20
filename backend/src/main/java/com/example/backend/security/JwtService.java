package com.example.backend.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Usuario;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKeyString;
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSignigkey() {
        byte[] keyBytes = secretKeyString.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Usuario user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("id_usuario", user.getIdUsuario())
                .claim("role", user.getRole())
                .claim("nombre", user.getNombre())
                .claim("email", user.getEmail())
                .claim("urlAvatar", user.getUrlAvatar())
                .claim("phone", user.getPhone())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignigkey())
                .compact();
    }

    public String getName(String token) {
        return Jwts.parser()
                .verifyWith(getSignigkey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String getIdUsuario(String token) {
        String auxToken = token.substring(7);
        return Jwts.parser()
                .verifyWith(getSignigkey())
                .build()
                .parseSignedClaims(auxToken)
                .getPayload()
                .get("id_usuario", String.class);

    }
}
