import React, { useState, useEffect } from 'react';
import styles from '../Styles/Alumnos.module.css';
import AgregarAlumnoModal from '../components/AgregarAlumnoModal/AgregarAlumnoModal';

const Alumnos = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [students, setStudents] = useState([]);

    const handleAbrirModal = (e) => {
        e.preventDefault();
        setActiveAgregar(true);
    }

    const closeModal = () => {
        setActiveAgregar(false);
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const alumnosResponse = await fetch('http://localhost:8000/alumnos');
            const alumnosData = await alumnosResponse.json();
            setStudents(alumnosData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    fetchData();
    }, []);

    return (
        <div className={styles.alumnosContainer}>
            <h2>Alumnos</h2>
            <button onClick={handleAbrirModal}>Agregar alumno</button>

            {activeAgregar && <AgregarAlumnoModal closeModal={closeModal} />}

            <ul>
                {students.map((student, index) => (
                <li key={index} className={styles.alumnoCard}>
                    {student.nombre} {student.apellido}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Alumnos;