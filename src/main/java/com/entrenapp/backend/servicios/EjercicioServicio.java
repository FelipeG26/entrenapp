package com.entrenapp.backend.servicios;

import com.entrenapp.backend.entidades.Ejercicio;
import com.entrenapp.backend.excepciones.ConflictoHorarioException;
import com.entrenapp.backend.repositorios.EjercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class EjercicioServicio {

    @Autowired
    private EjercicioRepository ejercicioRepository;

    public Ejercicio guardarEjercicio(Ejercicio nuevo) {
        List<Ejercicio> existentes = ejercicioRepository.findAll();

        for (Ejercicio existente : existentes) {
            if (hayConflictoHorario(nuevo, existente)) {
                System.out.println("Lanzando excepción por conflicto de horario");
                throw new ConflictoHorarioException("Conflicto de horario con el ejercicio: " + existente.getNombre());
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

    public List<Ejercicio> obtenerPorFecha(LocalDate fecha) {
        return ejercicioRepository.findByFecha(fecha);
    }

    public List<Ejercicio> listarEjerciciosPorFecha(LocalDate fecha) {
        return ejercicioRepository.findByFecha(fecha);
    }

    public Ejercicio actualizarEjercicio(Long id, Ejercicio nuevoEjercicio) {
        Ejercicio existente = obtenerPorId(id);
        if (existente == null) {
            throw new IllegalArgumentException("El ejercicio con ID " + id + " no existe");
        }

        // Validación de conflicto de horario (como en el método guardarEjercicio)
        List<Ejercicio> ejerciciosDelDia = listarEjerciciosPorFecha(nuevoEjercicio.getFecha());
        for (Ejercicio otro : ejerciciosDelDia) {
            if (!otro.getId().equals(id) && hayConflictoHorario(nuevoEjercicio, otro)) {
                throw new ConflictoHorarioException("Conflicto de horario con el ejercicio: " + otro.getNombre());
            }
        }

        // Actualizar campos
        existente.setNombre(nuevoEjercicio.getNombre());
        existente.setTipo(nuevoEjercicio.getTipo());
        existente.setFecha(nuevoEjercicio.getFecha());
        existente.setHoraInicio(nuevoEjercicio.getHoraInicio());
        existente.setDuracion(nuevoEjercicio.getDuracion());

        return ejercicioRepository.save(existente);
    }

    private boolean hayConflictoHorario(Ejercicio nuevo, Ejercicio existente) {
        if (!nuevo.getFecha().equals(existente.getFecha())) {
            return false;
        }

        LocalTime inicioNuevo = nuevo.getHoraInicio();
        LocalTime finNuevo = inicioNuevo.plusMinutes(nuevo.getDuracion());

        LocalTime inicioExistente = existente.getHoraInicio();
        LocalTime finExistente = inicioExistente.plusMinutes(existente.getDuracion());

        return !(finNuevo.isBefore(inicioExistente) || inicioNuevo.isAfter(finExistente));
    }

    public int calcularDuracionTotalPorFecha(LocalDate fecha) {
        List<Ejercicio> ejerciciosDelDia = ejercicioRepository.findByFecha(fecha);
        return ejerciciosDelDia.stream()
                .mapToInt(Ejercicio::getDuracion)
                .sum();
    }

}
