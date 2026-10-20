package com.example.backend.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.backend.exception.auth.authExceotion;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(authExceotion.class)
    public ResponseEntity<Map<String, Object>> handleAuthException(authExceotion exception) {
        return ResponseEntity.status(exception.getStatus())
                .body(Map.of(
                        "message", exception.getMessage(),
                        "status", exception.getStatus(),
                        "succes", false));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, Object> res = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(err -> res.put(err.getField(),
                        err.getDefaultMessage()));
        Map<String, Object> resspuesta = new HashMap<>();
        resspuesta.put("message", "errores de campo");
        resspuesta.put("error", res);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resspuesta);
    }

    @ExceptionHandler(ErrorGlobal.class)
    public ResponseEntity<Map<String, Object>> errorGlobal(ErrorGlobal ex) {
        return ResponseEntity.status(404)
                .body(Map.of("succes", ex.getSucces(), "code", ex.getCodie(), "message", ex.getMessage()));
    }
}
