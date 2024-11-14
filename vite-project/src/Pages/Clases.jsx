import React, { useState, useEffect } from 'react';
import styles from '../Styles/Clases.module.css';
import AgregarClaseModal from '../components/AgregarClaseModal/AgregarClaseModal.jsx';

const Clases = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [clases, setClases] = useState([]);
    const [selectedClase, setSelectedClase] = useState(null);

    const handleAbrirModal = (clase = null) => {
        setSelectedClase(clase);
        setActiveAgregar(true);
    };

    const closeModal = () => {
        setActiveAgregar(false);
        setSelectedClase(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/clases');
            const data = await response.json();
            setClases(data);
        } catch (error) {
            console.error('Error fetching clases:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/clases/${id}`, {
                method: 'DELETE'
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting clase:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.clasesContainer}>
            <h2>Clases disponibles</h2>
            <button onClick={() => handleAbrirModal()}>Agregar clase</button>

            {activeAgregar && <AgregarClaseModal closeModal={closeModal} fetchData={fetchData} clase={selectedClase} />}

            <ul>
                {clases.map((clase, index) => (
                    <li key={index} className={styles.claseCard}>
                        <div className={styles.claseInfo}>
                            CI Instructor: {clase.ci_instructor}, Actividad: {clase.id_actividad}, Turno: {clase.id_turno}, Dictada: {clase.dictada ? 'Sí' : 'No'}
                        </div>
                        <div className={styles.claseButtons}>
                            <button onClick={() => handleAbrirModal(clase)}>Editar</button>
                            <button onClick={() => handleDelete(clase.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clases;