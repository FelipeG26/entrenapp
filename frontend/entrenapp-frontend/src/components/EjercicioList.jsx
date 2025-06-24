import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalEditarEjercicio from './ModalEditarEjercicio';
import '../styles/App.css';

const EjercicioList = ({ recargar }) => {
  const [ejercicios, setEjercicios] = useState([]);
  const [error, setError] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

  const cargarEjercicios = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/ejercicios');
      setEjercicios(res.data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los ejercicios');
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este ejercicio?');
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8080/api/ejercicios/${id}`);
      setEjercicios(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert('Error al eliminar el ejercicio');
    }
  };

  const handleAbrirModal = (ejercicio) => {
    setEjercicioSeleccionado(ejercicio);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setEjercicioSeleccionado(null);
  };

  const handleEjercicioActualizado = (ejercicioActualizado) => {
    setEjercicios(prev =>
      prev.map(e => (e.id === ejercicioActualizado.id ? ejercicioActualizado : e))
    );
    handleCerrarModal();
  };

  useEffect(() => {
    cargarEjercicios();
  }, [recargar]);

  return (
    <div className="lista-ejercicios-container">
      <h2>Lista de Ejercicios</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ejercicios.length === 0 ? (
        <p>No hay ejercicios registrados.</p>
      ) : (
        <ul className="lista-ejercicios">
          {ejercicios.map((e) => (
            <li key={e.id} className="item-ejercicio">
              <strong>{e.nombre}</strong> - {e.tipo} - {e.fecha} {e.horaInicio} ({e.duracion} min)
              <button className="btn-eliminar" onClick={() => handleEliminar(e.id)}>Eliminar</button>
              <button className="btn-editar" onClick={() => handleAbrirModal(e)}>Editar</button>
            </li>
          ))}
        </ul>
      )}

      {mostrarModal && (
        <ModalEditarEjercicio
          ejercicio={ejercicioSeleccionado}
          onClose={handleCerrarModal}
          onEjercicioActualizado={handleEjercicioActualizado}
        />
      )}
    </div>
  );
};

export default EjercicioList;
