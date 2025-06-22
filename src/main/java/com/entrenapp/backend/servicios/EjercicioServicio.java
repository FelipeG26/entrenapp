package com.entrenapp.backend.servicios;

import com.entrenapp.backend.entidades.Ejercicio;
import com.entrenapp.backend.repositorios.EjercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EjercicioServicio {

    @Autowired
    private EjercicioRepository ejercicioRepository;

    public Ejercicio guardarEjercicio(Ejercicio ejercicio) {
        return ejercicioRepository.save(ejercicio);
    }

    public List<Ejercicio> listarEjercicios() {
        return ejercicioRepository.findAll();
    }

    public void eliminarEjercicio(Long id) {
        ejercicioRepository.deleteById(id);
    }

    public Ejercicio obtenerPorId(Long id) {
        return ejercicioRepository.findById(id).orElse(null);
    }
}
