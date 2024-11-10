import React, { useState, useEffect } from 'react';
import styles from '../Styles/Equipamiento.module.css';

const Equipamiento = () => {
    // const [activeAgregar, setActiveAgregar] = useState(false);
    const [equipamiento, setEquipamiento] = useState([]);

    /* const handleAbrirModal = (e) => {
        e.preventDefault();
        setActiveAgregar(true);
    }

    const closeModal = () => {
        setActiveAgregar(false);
    }; */

    useEffect(() => {
        const mockEquipamiento = [
          { id: 1, id_actividad: 1, descripcion: 'Tablas de esquiar', costo: 500 },
          { id: 2, id_actividad: 1, descripcion: 'Tablas de esquiar', costo: 500 },
          { id: 3, id_actividad: 2, descripcion: 'Moto de nieve', costo: 2500 },
        ];
        
        setEquipamiento(mockEquipamiento);
      }, []);

    return (
        <div className={styles.equipamientoContainer}>
            <h2>Equipamiento</h2>

            <ul>
                {equipamiento.map((equipo, index) => (
                <li key={index} className={styles.equipamientoCard}>
                    {equipo.descripcion} - ${equipo.costo}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Equipamiento;