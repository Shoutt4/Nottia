package com.example.backend.exception;

public class ErrorGlobal extends RuntimeException {
    private int code;
    private Boolean succes;

    public ErrorGlobal(String message, int code, boolean succes) {
        super(message);
        this.code = code;
        this.succes = succes;
    }

    public int getCodie() {
        return this.code;
    }

    public boolean getSucces() {
        return this.succes;
    }
}
