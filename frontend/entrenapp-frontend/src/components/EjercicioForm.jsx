import React, { useState } from 'react';
import axios from 'axios';

const EjercicioForm = ({ onEjercicioCreado }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    fecha: '',
    horaInicio: '',
    duracion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Validaciones
    if (!formData.nombre || formData.nombre.trim().length < 3) {
      alert('El nombre debe tener al menos 3 caracteres');
      return;
    }

    if (!formData.tipo) {
      alert('Debes seleccionar un tipo de ejercicio');
      return;
    }

    if (!formData.fecha) {
      alert('La fecha es obligatoria');
      return;
    }

    if (!formData.horaInicio) {
      alert('La hora de inicio es obligatoria');
      return;
    }

    const duracion = parseInt(formData.duracion);
    if (isNaN(duracion) || duracion <= 10) {
      alert('La duración debe ser mayor a 10 minutos');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/ejercicios', formData);
      alert('Ejercicio creado con éxito');
      setFormData({ nombre: '', tipo: '', duracion: '', fecha: '', horaInicio: '' });

      if (onEjercicioCreado) onEjercicioCreado();
    } catch (err) {
      alert('Ya existe un ejercicio asginado en este horario.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

      <label>Tipo:</label>
      <select name="tipo" value={formData.tipo} onChange={handleChange} required>
        <option value="">-- Selecciona --</option>
        <option value="FUERZA">FUERZA</option>
        <option value="CARDIO">CARDIO</option>
        <option value="TECNICA">TECNICA</option>
      </select>

      <label>Fecha:</label>
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

      <label>Hora de Inicio:</label>
      <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} required />

      <label>Duración (minutos):</label>
      <input type="number" name="duracion" value={formData.duracion} onChange={handleChange} required />

      <button type="submit">Crear Ejercicio</button>
    </form>
  );
};

export default EjercicioForm;
