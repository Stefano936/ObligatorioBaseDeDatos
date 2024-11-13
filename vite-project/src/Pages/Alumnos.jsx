import React, { useState, useEffect } from 'react';
import styles from '../Styles/Alumnos.module.css';
import AgregarAlumnoModal from '../components/AgregarAlumnoModal/AgregarAlumnoModal';

const Alumnos = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleAbrirModal = (student = null) => {
        setSelectedStudent(student);
        setActiveAgregar(true);
    };

    const closeModal = () => {
        setActiveAgregar(false);
        setSelectedStudent(null);
    };

    const fetchData = async () => {
        try {
            const alumnosResponse = await fetch('http://localhost:8000/alumnos');
            const alumnosData = await alumnosResponse.json();
            setStudents(alumnosData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (ci) => {
        try {
            await fetch(`http://localhost:8000/alumnos/${ci}`, {
                method: 'DELETE'
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.alumnosContainer}>
            <h2>Alumnos</h2>
            <button onClick={() => handleAbrirModal()}>Agregar Alumno</button>

            {activeAgregar && <AgregarAlumnoModal closeModal={closeModal} fetchData={fetchData} student={selectedStudent} />}

            <ul>
                {students.map((student, index) => (
                    <li key={index} className={styles.alumnoCard}>
                        {student.nombre} {student.apellido}
                        <button onClick={() => handleAbrirModal(student)}>Editar</button>
                        <button onClick={() => handleDelete(student.ci)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alumnos;