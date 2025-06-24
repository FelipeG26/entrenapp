import React, { useState } from 'react';
import EjercicioForm from './components/EjercicioForm';
import EjercicioList from './components/EjercicioList';

function App() {
  const [refrescar, setRefrescar] = useState(false);

  const handleEjercicioCreado = () => {
    setRefrescar(prev => !prev); // Cambia el valor para que useEffect se dispare
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>EntrenaApp</h1>
      <EjercicioForm onEjercicioCreado={handleEjercicioCreado} />
      <EjercicioList recargar={refrescar} />
    </div>
  );
}

export default App;
