import React, { useState, useEffect } from 'react';
import styles from '../Styles/Instructores.module.css';
import AgregarInstructorModal from '../components/AgregarInstructorModal/AgregarInstructorModal';

const Instructores = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [instructors, setInstructors] = useState([]);

    const handleAbrirModal = (e) => {
        e.preventDefault();
        setActiveAgregar(true);
    }

    const closeModal = () => {
        setActiveAgregar(false);
    };

    useEffect(() => {
        const mockInstructors = [
          { cedula: '', nombre: 'Carlos', apellido: 'Perez', fechaNacimiento: '10/10/2000', telefono: '098123456', correo: 'carlosperez@ejemplo.com' },
          { cedula: '', nombre: 'María', apellido: 'Sánchez', fechaNacimiento: '11/05/2004', telefono: '098765432', correo: 'mariasanchez@ejemplo.com' },
          { cedula: '', nombre: 'Juan', apellido: 'Rodriguez', fechaNacimiento: '03/04/2002', telefono: '098098098', correo: 'juanrodriguez@ejemplo.com' },
        ];
        
        setInstructors(mockInstructors);
      }, []);

    return (
        <div className={styles.instructoresContainer}>
            <h2>Instructores</h2>
            <button onClick={handleAbrirModal}>Agregar instructor</button>

            {activeAgregar && <AgregarInstructorModal closeModal={closeModal} />}

            <ul>
                {instructors.map((instructor, index) => (
                <li key={index} className={styles.instructorCard}>
                    {instructor.nombre} {instructor.apellido}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Instructores;