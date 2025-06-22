package com.entrenapp.backend.repositorios;

import com.entrenapp.backend.entidades.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {
    // Puedes agregar métodos personalizados aquí si los necesitas luego
}
