package com.example.backend.service.auth;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dtos.email.EmailDTO;
import com.example.backend.entity.EmailVerificationToken;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.ErrorGlobal;
import com.example.backend.repository.auth.AuthRepository;
import com.example.backend.repository.auth.EmailVerificationTokenRepository;
import com.example.backend.service.EmailService;

@Service
@PropertySource("classpath:email.properties")
public class EmailVerificationTokenService {
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final AuthRepository authRepository;
    private final EmailService emailService;
    private final SecureRandom secureRandom = new SecureRandom();;

    private final String frontedUrl;

    public EmailVerificationTokenService(
            EmailVerificationTokenRepository emailVerificationTokenRepository,
            AuthRepository authRepository,
            EmailService emailService,
            @Value("${app.frontend.url}") String frontedUrl) {
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.authRepository = authRepository;
        this.emailService = emailService;
        this.frontedUrl = frontedUrl;

    }

    @Transactional
    public void enviarEmailVerification(Usuario usuario) {
        byte[] bytes = new byte[32];
        this.secureRandom.nextBytes(bytes);
        String token = Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
        EmailVerificationToken emailVerificationToken = EmailVerificationToken.builder()
                .tokenHash(token)
                .usuario(usuario)
                .fechaExperiracion(LocalDateTime.now().plusMinutes(15))
                .build();
        this.emailVerificationTokenRepository.save(emailVerificationToken);
        String enlace = frontedUrl + "verify-email?token=" + token;

        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setDestino(usuario.getEmail());
        emailDTO.setAsunto("Verifica tu correo - Nottia");
        emailDTO.setMensaje(
                "Hola " + usuario.getNombre() + ",<br><br>"
                        + "Gracias por registrarte en Nottia.<br>"
                        + "Para activar tu cuenta, haz clic en el siguiente enlace:<br><br>"
                        + "<a href=\"" + enlace + "\">Verificar mi correo</a><br><br>"
                        + "Este enlace caduca en 15 minutos.");
        try {
            this.emailService.sendEmail(emailDTO);
        } catch (Exception e) {
            throw new ErrorGlobal("no se pudo enviar el enlace", 404, false);
        }
    }

    @Transactional
    public void verifiCorreo(String token) {
        if (token == null || token.isBlank()) {
            throw new ErrorGlobal("token obligatorio", 404, false);
        }
        EmailVerificationToken registro = this.emailVerificationTokenRepository
                .findByTokenHashAndFechaConsumoIsNull(token)
                .orElseThrow(() -> new ErrorGlobal("el token no es valido", 403, false));
        if (!registro.getFechaExperiracion().isAfter(LocalDateTime.now())) {
            throw new ErrorGlobal("token expirado", 404, false);
        }
        Usuario usuario = registro.getUsuario();
        usuario.setEmailVerifi(true);
        registro.setFechaConsumo(LocalDateTime.now());
        authRepository.save(usuario);
        emailVerificationTokenRepository.save(registro);

    }

    private String hashToken(String token) {
        try {
            byte[] has = MessageDigest.getInstance("SHA-256")
                    .digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(has);
        } catch (NoSuchAlgorithmException e) {
            throw new ErrorGlobal("error al haseah token ", 404, false);
        }
    }
}
