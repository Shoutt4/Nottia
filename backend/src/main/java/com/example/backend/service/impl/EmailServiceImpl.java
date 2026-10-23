package com.example.backend.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.example.backend.dtos.email.EmailDTO;
import com.example.backend.exception.ErrorGlobal;
import com.example.backend.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void sendEmail(EmailDTO emailDTO) throws MessagingException {

        try {
            MimeMessage message = this.javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(emailDTO.getDestino());
            helper.setSubject(emailDTO.getAsunto());
            Context context = new Context();
            context.setVariable("message", emailDTO.getMensaje());

            String contentHTML = templateEngine.process("email", context);
            helper.setText(contentHTML, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ErrorGlobal("error al enviar mensage", 404, false);
        }
    }
}
