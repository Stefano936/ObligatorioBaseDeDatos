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
        const mockStudents = [
          { cedula: '', nombre: 'Carlos', apellido: 'Perez', fechaNacimiento: '10/10/2000', telefono: '098123456', correo: 'carlosperez@ejemplo.com' },
          { cedula: '', nombre: 'María', apellido: 'Sánchez', fechaNacimiento: '11/05/2004', telefono: '098765432', correo: 'mariasanchez@ejemplo.com' },
          { cedula: '', nombre: 'Juan', apellido: 'Rodriguez', fechaNacimiento: '03/04/2002', telefono: '098098098', correo: 'juanrodriguez@ejemplo.com' },
        ];
        
        setStudents(mockStudents);
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