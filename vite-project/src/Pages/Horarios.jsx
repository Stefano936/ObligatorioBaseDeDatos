import React, { useState, useEffect } from 'react';
import styles from '../Styles/Horarios.module.css';
import AgregarHorarioModal from '../components/AgregarHorarioModal/AgregarHorarioModal.jsx';

const Horarios = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState(null);

    const handleAbrirModal = (horario = null) => {
        setSelectedHorario(horario);
        setActiveAgregar(true);
    };

    const closeModal = () => {
        setActiveAgregar(false);
        setSelectedHorario(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/turnos');
            const data = await response.json();
            const formattedData = data.map(turno => ({
                ...turno,
                hora_inicio: turno.hora_inicio.slice(0, 5),
                hora_fin: turno.hora_fin.slice(0, 5)
            }));
            setHorarios(formattedData);
        } catch (error) {
            console.error('Error fetching horarios:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/turnos/${id}`, {
                method: 'DELETE'
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting horario:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.horariosContainer}>
            <h2>Horarios</h2>
            <button onClick={() => handleAbrirModal()}>Agregar horario</button>

            {activeAgregar && <AgregarHorarioModal closeModal={closeModal} fetchData={fetchData} horario={selectedHorario} />}

            <ul>
                {horarios.map((turno, index) => (
                    <li key={index} className={styles.turnoCard}>
                        {turno.hora_inicio} - {turno.hora_fin}
                        <button onClick={() => handleAbrirModal(turno)}>Editar</button>
                        <button onClick={() => handleDelete(turno.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Horarios;