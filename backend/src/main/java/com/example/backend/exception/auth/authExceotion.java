package com.example.backend.exception.auth;

public class authExceotion extends RuntimeException {
    private int status;
    private boolean succes;

    public authExceotion(String exceotion, int status, boolean succes) {
        super(exceotion);
        this.status = status;
        this.succes = succes;
    }

    public int getStatus() {
        return status;
    }

}
