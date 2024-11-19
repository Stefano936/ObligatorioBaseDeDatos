import React, { useState, useEffect } from 'react';
import styles from '../Styles/Clases.module.css';
import AgregarClaseModal from '../components/AgregarClaseModal/AgregarClaseModal.jsx';

const Clases = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [clases, setClases] = useState([]);
    const [selectedClase, setSelectedClase] = useState(null);
    const [mostFrequentHorarios, setMostFrequentHorarios] = useState([]);
    const [horarios, setHorarios] = useState([]); // Guardar todos los turnos

    const handleAbrirModal = (clase = null) => {
        setSelectedClase(clase);
        setActiveAgregar(true);
    };

    const closeModal = () => {
        setActiveAgregar(false);
        setSelectedClase(null);
    };

    const fetchClases = async () => {
        try {
            const response = await fetch('http://localhost:8000/clases');
            const data = await response.json();
            setClases(data);
            findMostFrequentHorarios(data);
        } catch (error) {
            console.error('Error fetching clases:', error);
        }
    };

    const fetchHorarios = async () => {
        try {
            const response = await fetch('http://localhost:8000/turnos');
            const data = await response.json();
            setHorarios(data);
        } catch (error) {
            console.error('Error fetching turnos:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/clases/${id}`, {
                method: 'DELETE',
            });
            fetchClases();
        } catch (error) {
            console.error('Error deleting clase:', error);
        }
    };

    const findMostFrequentHorarios = (clases) => {
        const horarioCount = clases.reduce((acc, clase) => {
            const key = `${clase.id_turno}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        const sortedHorarios = Object.entries(horarioCount).sort((a, b) => b[1] - a[1]);
        const maxCount = sortedHorarios[0][1];
        const mostFrequent = sortedHorarios.filter(([_, count]) => count === maxCount).map(([id]) => id);
        setMostFrequentHorarios(mostFrequent);
    };

    const getHorarioDetails = () => {
        if (mostFrequentHorarios.length > 0 && horarios.length > 0) {
            return mostFrequentHorarios.map((id) => horarios.find((horario) => horario.id === parseInt(id)));
        }
        return [];
    };

    useEffect(() => {
        fetchClases();
        fetchHorarios();
    }, []);

    const horarioDetails = getHorarioDetails();

    return (
        <div className={styles.clasesContainer}>
            <h2>Clases disponibles</h2>
            <button onClick={() => handleAbrirModal()}>Agregar clase</button>

            {activeAgregar && <AgregarClaseModal closeModal={closeModal} fetchData={fetchClases} clase={selectedClase} />}

            {mostFrequentHorarios.length > 0 && horarioDetails.length > 0 && (
                <div className={styles.mostFrequentHorario}>
                    <h3>Horarios más repetidos:</h3>
                    {horarioDetails.map((horario, index) => (
                        <div key={index}>
                            <h4>Turno {mostFrequentHorarios[index]}</h4>
                            <p>Hora inicio: {horario.hora_inicio}</p>
                            <p>Hora fin: {horario.hora_fin}</p>
                        </div>
                    ))}
                </div>
            )}

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
};

export default Clases;