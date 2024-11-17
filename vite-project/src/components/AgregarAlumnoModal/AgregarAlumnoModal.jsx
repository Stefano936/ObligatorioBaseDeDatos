import React, { useState, useEffect } from 'react';
import styles from '../../Styles/AgregarAlumnoModal.module.css';

const AgregarAlumnoModal = ({ closeModal, fetchData, student }) => {
    const [ci, setCi] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');

    useEffect(() => {
        if (student) {
            setCi(student.ci);
            setNombre(student.nombre);
            setApellido(student.apellido);
            setFechaNacimiento(student.fecha_nacimiento);
            setTelefono(student.telefono);
            setCorreo(student.correo);
        }
    }, [student]);

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const age = calculateAge(fecha_nacimiento);
        if (age < 18) {
            alert('User must be at least 18 years old.');
            return;
        }

        const method = student ? 'PUT' : 'POST';
        const url = student ? `http://localhost:8000/alumnos/${student.ci}` : 'http://localhost:8000/alumnos';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ci,
                nombre,
                apellido,
                fecha_nacimiento,
                telefono,
                correo
            })      
        }).then(() => {
            closeModal();
            fetchData();
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{student ? 'Editar alumno' : 'Agregar alumno'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>Cédula de identidad</label>
                        <div>
                            <input type="text" placeholder="Cédula de identidad..." value={ci} onChange={(e) => setCi(e.target.value)} disabled={!!student} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Nombre</label>
                        <div>
                            <input type="text" placeholder="Nombre..." value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Apellido</label>
                        <div>
                            <input type="text" placeholder="Apellido..." value={apellido} onChange={(e) => setApellido(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Fecha de nacimiento</label>
                        <div>
                            <input 
                                type="date" 
                                placeholder="Fecha de nacimiento" 
                                value={fecha_nacimiento} 
                                onChange={(e) => setFechaNacimiento(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Teléfono</label>
                        <div>
                            <input type="text" placeholder="Teléfono..." value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Correo electrónico</label>
                        <div>
                            <input type="text" placeholder="Correo electrónico..." value={correo} onChange={(e) => setCorreo(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.modalButton}>{student ? 'Actualizar' : 'Registrar'}</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarAlumnoModal;