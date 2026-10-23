package com.example.backend.controller.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.email.EmailDTO;
import com.example.backend.service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/verify")
    public ResponseEntity<String> sendEmail(@Valid @RequestBody EmailDTO requEmailDTO) throws MessagingException {
        this.emailService.sendEmail(requEmailDTO);
        return ResponseEntity.status(200).body("email enviado");
    }
}
