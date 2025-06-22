package com.entrenapp.backend.entidades;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ejercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Enumerated(EnumType.STRING)
    private TipoEjercicio tipo;

    private int duracionMinutos; // duración en minutos

    private LocalDate fecha;

    private LocalTime horaInicio;

}
