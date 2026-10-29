package com.example.backend.controller.email;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.email.EmailDTO;
import com.example.backend.service.EmailService;
import com.example.backend.service.auth.EmailVerificationTokenService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;
    private EmailVerificationTokenService emailVerificationTokenService;

    public EmailController(EmailService emailService, EmailVerificationTokenService emailVerificationTokenService) {
        this.emailService = emailService;
        this.emailVerificationTokenService = emailVerificationTokenService;
    }

    @PostMapping("/verify")
    public ResponseEntity<String> sendEmail(@Valid @RequestBody EmailDTO requEmailDTO) throws MessagingException {
        this.emailService.sendEmail(requEmailDTO);
        return ResponseEntity.status(200).body("email enviado");
    }

    @GetMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifiEmail(@RequestParam String token) {
        this.emailVerificationTokenService.verifiCorreo(token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(
                Map.of("suces", "email verificado correstamente"));
    }
}
