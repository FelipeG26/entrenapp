import React, { useState } from 'react';
import '../styles/DuracionTotal.css';
import axios from 'axios';

const DuracionTotal = () => {
    const [fecha, setFecha] = useState('');
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState(null);

    const consultarDuracion = async () => {
        if (!fecha) {
            alert('Por favor selecciona una fecha');
            return;
        }

        try {
            const res = await axios.get(`http://localhost:8080/api/ejercicios/tiempo-total?fecha=${fecha}`);
            setResultado(res.data);
            setError(null);
        } catch (err) {
            setResultado(null);
            setError('No se pudo obtener la duración total');
        }
    };

    return (
        <div className="duracion-container">
            <h2>Consultar duración total</h2>
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
            <button onClick={consultarDuracion} style={{ marginLeft: '1rem' }}>
                Consultar
            </button>

            {resultado && (
                <p style={{ marginTop: '1rem' }}>
                    🏋️‍♂️ Has entrenado <strong>{resultado.totalMinutos}</strong> minutos el <strong>{resultado.fecha}</strong>
                </p>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DuracionTotal;
