import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ModalEditarEjercicio.css';

const ModalEditarEjercicio = ({ ejercicio, onClose, onEjercicioActualizado }) => {
  const [formData, setFormData] = useState({ ...ejercicio });

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
      await axios.put(`http://localhost:8080/api/ejercicios/${ejercicio.id}`, formData);
      alert('Ejercicio actualizado con éxito');
      onEjercicioActualizado(formData); // ✅ Actualiza la lista
      onClose();                        // ✅ Cierra el modal
    } catch (err) {
      alert('Error al actualizar el ejercicio');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>Editar Ejercicio</h3>
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

          <label>Hora Inicio:</label>
          <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} required />

          <label>Duración:</label>
          <input type="number" name="duracion" value={formData.duracion} onChange={handleChange} required />

          <div className="modal-botones">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose} className="cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarEjercicio;
