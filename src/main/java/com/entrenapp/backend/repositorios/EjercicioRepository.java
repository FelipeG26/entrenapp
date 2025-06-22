package com.entrenapp.backend.repositorios;

import com.entrenapp.backend.entidades.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {

    List<Ejercicio> findByFecha(LocalDate fecha);
    
}
