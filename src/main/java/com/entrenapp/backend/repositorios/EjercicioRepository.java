package com.entrenapp.backend.repositorios;

import com.entrenapp.backend.entidades.Ejercicio;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {
    List<Ejercicio> findByFecha(LocalDate fecha);
}
