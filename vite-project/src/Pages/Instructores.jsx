import React, { useState, useEffect } from 'react';
import styles from '../Styles/Instructores.module.css';
import AgregarInstructorModal from '../components/AgregarInstructorModal/AgregarInstructorModal';

const Instructores = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    const handleAbrirModal = (instructor = null) => {
        setSelectedInstructor(instructor);
        setActiveAgregar(true);
    };

    const closeModal = () => {
        setActiveAgregar(false);
        setSelectedInstructor(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/instructores');
            const data = await response.json();
            setInstructors(data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
        }
    };

    const handleDelete = async (ci) => {
        try {
            await fetch(`http://localhost:8000/instructores/${ci}`, {
                method: 'DELETE'
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting instructor:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.instructoresContainer}>
            <h2>Instructores</h2>
            <button onClick={() => handleAbrirModal()}>Agregar instructor</button>

            {activeAgregar && <AgregarInstructorModal closeModal={closeModal} fetchData={fetchData} instructor={selectedInstructor} />}

            <ul>
                {instructors.map((instructor, index) => (
                    <li key={index} className={styles.instructorCard}>
                        {instructor.nombre} {instructor.apellido}
                        <button onClick={() => handleAbrirModal(instructor)}>Editar</button>
                        <button onClick={() => handleDelete(instructor.ci)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Instructores;