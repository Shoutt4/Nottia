package com.example.backend.repository.auth;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.EmailVerificationToken;

@Repository
public interface EmailVerificationTokenRepository
                extends JpaRepository<EmailVerificationToken, String>,
                JpaSpecificationExecutor<EmailVerificationToken> {

        Optional<EmailVerificationToken> findByTokenHashAndFechaConsumoIsNull(String tokenHash);

        Optional<EmailVerificationToken> findByUsuario_Email(String email);

        Optional<EmailVerificationToken> findByResetTokenAndUsuario_Email(
                        String tokenReset, String email);

        boolean existsByResetTokenAndTokenResetExpirationAfter(String token,
                        LocalDateTime fecha);

}
