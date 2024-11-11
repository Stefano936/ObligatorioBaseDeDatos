import React, { useState, useEffect } from 'react';
import styles from '../Styles/Clases.module.css';

const Clases = () => {
    // const [activeAgregar, setActiveAgregar] = useState(false);
    const [clases, setClases] = useState([]);

    /* const handleAbrirModal = (e) => {
        e.preventDefault();
        setActiveAgregar(true);
    }

    const closeModal = () => {
        setActiveAgregar(false);
    }; */

    useEffect(() => {
        const mockClases = [
            { id: 1, ci_instructor: '12345678', id_actividad: 1, id_turno: 3, dictada: true },
            { id: 2, ci_instructor: '23456789', id_actividad: 2, id_turno: 3, dictada: true },
            { id: 3, ci_instructor: '34567890', id_actividad: 3, id_turno: 3, dictada: true },
            { id: 4, ci_instructor: '45678901', id_actividad: 1, id_turno: 2, dictada: true },
            { id: 5, ci_instructor: '56789012', id_actividad: 2, id_turno: 1, dictada: true },
            { id: 6, ci_instructor: '67890123', id_actividad: 3, id_turno: 3, dictada: true },
            { id: 7, ci_instructor: '78901234', id_actividad: 1, id_turno: 1, dictada: true },
            { id: 8, ci_instructor: '89012345', id_actividad: 2, id_turno: 3, dictada: true },
            { id: 9, ci_instructor: '90123456', id_actividad: 3, id_turno: 1, dictada: true },
            { id: 10, ci_instructor: '01234567', id_actividad: 1, id_turno: 2, dictada: true },
            { id: 11, ci_instructor: '12345098', id_actividad: 2, id_turno: 1, dictada: true },
            { id: 12, ci_instructor: '23456109', id_actividad: 3, id_turno: 3, dictada: true },
            { id: 13, ci_instructor: '34567210', id_actividad: 1, id_turno: 1, dictada: true },
            { id: 14, ci_instructor: '45678321', id_actividad: 2, id_turno: 2, dictada: true },
            { id: 15, ci_instructor: '56789432', id_actividad: 3, id_turno: 1, dictada: true },
            { id: 16, ci_instructor: '67890543', id_actividad: 1, id_turno: 2, dictada: true },
            { id: 17, ci_instructor: '78901654', id_actividad: 2, id_turno: 1, dictada: true },
            { id: 18, ci_instructor: '89012765', id_actividad: 3, id_turno: 2, dictada: true },
            { id: 19, ci_instructor: '90123876', id_actividad: 1, id_turno: 1, dictada: true },
            { id: 20, ci_instructor: '01234987', id_actividad: 2, id_turno: 2, dictada: true }
        ];        
        setClases(mockClases);
      }, []);

    return (
        <div className={styles.clasesContainer}>
            <h2>Clases disponibles</h2>

            <table>
                <tr>
                    <th></th>
                    <th>Turno 1</th>
                    <th>Turno 2</th>
                    <th>Turno 3</th>
                </tr>
                <tr>
                    <th>Snowboard</th>
                    <td>{clases.filter(clase => clase.id_actividad === 1 && clase.id_turno === 1).length}</td>
                    <td>{clases.filter(clase => clase.id_actividad === 1 && clase.id_turno === 2).length}</td>
                    <td>{clases.filter(clase => clase.id_actividad === 1 && clase.id_turno === 3).length}</td>
                </tr>
                <tr>
                    <th>Ski</th>
                    <td>{clases.filter(clase => clase.id_actividad === 2 && clase.id_turno === 1).length}</td>
                    <td>{clases.filter(clase => clase.id_actividad === 2 && clase.id_turno === 2).length}</td>
                    <td>{clases.filter(clase => clase.id_actividad === 2 && clase.id_turno === 3).length}</td>
                </tr>
                <tr>
                    <th>Moto de nieve</th>
                    <td>{clases.filter(clase => clase.id_actividad === 3 && clase.id_turno === 1).length}</td>
                    <td>{clases.filter(clase => clase.id_actividad === 3 && clase.id_turno === 2).length}</td>
                    <td>{clases.filter(clase => clase.id_actividad === 3 && clase.id_turno === 3).length}</td>
                </tr>
            </table>
        </div>
    );
}

export default Clases;