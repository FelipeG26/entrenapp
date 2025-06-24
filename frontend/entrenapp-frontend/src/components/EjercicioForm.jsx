import React, { useState } from 'react';
import axios from 'axios';

const EjercicioForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'FUERZA',
    fecha: '',
    horaInicio: '',
    duracion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/ejercicios', formData);
      alert('Ejercicio creado con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al crear ejercicio');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

      <label>Tipo:</label>
      <select name="tipo" value={formData.tipo} onChange={handleChange}>
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
