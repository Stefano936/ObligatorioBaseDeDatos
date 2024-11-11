import React, { useState, useEffect } from 'react';
import styles from '../Styles/Horarios.module.css';

const Horarios = () => {
    // const [activeAgregar, setActiveAgregar] = useState(false);
    const [horarios, setHorarios] = useState([]);

    /* const handleAbrirModal = (e) => {
        e.preventDefault();
        setActiveAgregar(true);
    }

    const closeModal = () => {
        setActiveAgregar(false);
    }; */

    useEffect(() => {
        const mockHorarios = [
          { id: 1, hora_inicio: '09:00', hora_fin: '11:00' },
          { id: 2, hora_inicio: '12:00', hora_fin: '14:00' },
          { id: 3, hora_inicio: '16:00', hora_fin: '18:00' },
        ];
        
        setHorarios(mockHorarios);
      }, []);

    return (
        <div className={styles.horariosContainer}>
            <h2>Horarios</h2>

            <ul>
                {horarios.map((turno, index) => (
                <li key={index} className={styles.turnoCard}>
                    {turno.hora_inicio} - {turno.hora_fin}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Horarios;