import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EjercicioList = ({ recargar }) => {
  const [ejercicios, setEjercicios] = useState([]);
  const [error, setError] = useState(null);

  const cargarEjercicios = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/ejercicios');
      setEjercicios(res.data);
    } catch (err) {
      setError('No se pudieron cargar los ejercicios');
    }
  };

  useEffect(() => {
    cargarEjercicios();
  }, [recargar]); // Se vuelve a ejecutar cada vez que `recargar` cambie

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Lista de Ejercicios</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ejercicios.length === 0 ? (
        <p>No hay ejercicios registrados.</p>
      ) : (
        <ul>
          {ejercicios.map((e) => (
            <li key={e.id}>
              <strong>{e.nombre}</strong> - {e.tipo} - {e.fecha} {e.horaInicio} ({e.duracion} min)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EjercicioList;
