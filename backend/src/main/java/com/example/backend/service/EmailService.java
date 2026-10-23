package com.example.backend.service;

import com.example.backend.dtos.email.EmailDTO;

import jakarta.mail.MessagingException;

public interface EmailService {

    public void sendEmail(EmailDTO emailDTO) throws MessagingException;
}
