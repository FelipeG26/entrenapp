package com.entrenapp.backend.controladores;

import com.entrenapp.backend.entidades.Ejercicio;
import com.entrenapp.backend.servicios.EjercicioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/ejercicios")
@CrossOrigin(origins = "*") // Permitir peticiones desde el frontend (React)
public class EjercicioControlador {

    @Autowired
    private EjercicioServicio ejercicioServicio;

    @PostMapping
    public ResponseEntity<Ejercicio> crearEjercicio(@RequestBody Ejercicio ejercicio) {
        return ResponseEntity.ok(ejercicioServicio.guardarEjercicio(ejercicio));
    }

    @GetMapping
    public ResponseEntity<List<Ejercicio>> obtenerTodos() {
        return ResponseEntity.ok(ejercicioServicio.listarEjercicios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ejercicio> obtenerPorId(@PathVariable Long id) {
        Ejercicio ejercicio = ejercicioServicio.obtenerPorId(id);
        return ejercicio != null ? ResponseEntity.ok(ejercicio) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ejercicioServicio.eliminarEjercicio(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/por-fecha")
    public ResponseEntity<List<Ejercicio>> obtenerPorFecha(
            @RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(ejercicioServicio.obtenerPorFecha(fecha));
    }

    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<Ejercicio>> obtenerPorFecha(@PathVariable String fecha) {
        LocalDate fechaParseada = LocalDate.parse(fecha);
        List<Ejercicio> ejercicios = ejercicioServicio.listarEjerciciosPorFecha(fechaParseada);
        return ResponseEntity.ok(ejercicios);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ejercicio> actualizarEjercicio(@PathVariable Long id, @RequestBody Ejercicio ejercicio) {
        Ejercicio actualizado = ejercicioServicio.actualizarEjercicio(id, ejercicio);
        return ResponseEntity.ok(actualizado);
    }

    @GetMapping("/tiempo-total")
    public ResponseEntity<Map<String, Object>> obtenerTiempoTotalPorFecha(
            @RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        int totalMinutos = ejercicioServicio.calcularDuracionTotalPorFecha(fecha);
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("fecha", fecha);
        respuesta.put("totalMinutos", totalMinutos);
        return ResponseEntity.ok(respuesta);
    }

}
