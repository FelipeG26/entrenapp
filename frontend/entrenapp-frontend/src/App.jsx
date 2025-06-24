import React, { useState } from 'react';
import './styles/App.css'; // Nuevo import desde la carpeta styles
import EjercicioForm from './components/EjercicioForm';
import EjercicioList from './components/EjercicioList';
import DuracionTotal from './components/DuracionTotal';

function App() {
  const [refrescar, setRefrescar] = useState(false);

  const handleEjercicioCreado = () => {
    setRefrescar(prev => !prev); // Cambia el valor para que useEffect se dispare
  };

  return (
    <div>
      <h1>EntrenaApp</h1>
      <EjercicioForm onEjercicioCreado={handleEjercicioCreado} />
      <EjercicioList recargar={refrescar} />
      <DuracionTotal />
    </div>
  );
}

export default App;
