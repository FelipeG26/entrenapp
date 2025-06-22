package com.entrenapp.backend.excepciones;

public class ConflictoHorarioException extends RuntimeException {
    public ConflictoHorarioException(String mensaje) {
        super(mensaje);
    }
}
