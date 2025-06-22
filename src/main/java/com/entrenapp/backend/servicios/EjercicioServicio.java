package com.entrenapp.backend.servicios;

import com.entrenapp.backend.entidades.Ejercicio;
import com.entrenapp.backend.excepciones.ConflictoHorarioException;
import com.entrenapp.backend.repositorios.EjercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class EjercicioServicio {

    @Autowired
    private EjercicioRepository ejercicioRepository;

    public Ejercicio guardarEjercicio(Ejercicio nuevo) {
        List<Ejercicio> existentes = ejercicioRepository.findAll();

        for (Ejercicio e : existentes) {
            // Validar si son del mismo día
            if (e.getFecha().equals(nuevo.getFecha())) {
                // Rango del ejercicio existente
                LocalTime inicioExistente = e.getHoraInicio();
                LocalTime finExistente = inicioExistente.plusMinutes(e.getDuracion());

                // Rango del nuevo ejercicio
                LocalTime inicioNuevo = nuevo.getHoraInicio();
                LocalTime finNuevo = inicioNuevo.plusMinutes(nuevo.getDuracion());

                // Verificamos si hay solapamiento
                boolean haySolapamiento = (inicioNuevo.isBefore(finExistente) && finNuevo.isAfter(inicioExistente));

                if (haySolapamiento) {
                    System.out.println("Lanzando excepción por conflicto de horario");
                    throw new ConflictoHorarioException("Conflicto de horario con el ejercicio: " + e.getNombre());
                }

            }
        }

        return ejercicioRepository.save(nuevo);
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
