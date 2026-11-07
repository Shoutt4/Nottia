package com.example.backend.specification;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.example.backend.entity.EmailVerificationToken;

public class ResetPasswordSpecification {

    public static Specification<EmailVerificationToken> findByFechaExpir() {
        return (root, query, criterioBuilder) -> {
            return criterioBuilder.lessThanOrEqualTo(root.get("tokenResetExpiration"), LocalDateTime.now());
        };
    }
}
