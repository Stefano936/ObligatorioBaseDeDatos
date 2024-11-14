import React, { useState, useEffect } from 'react';
import styles from '../../Styles/AgregarInstructorModal.module.css';

const AgregarInstructorModal = ({ closeModal, fetchData, instructor }) => {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    useEffect(() => {
        if (instructor) {
            setCedula(instructor.ci);
            setNombre(instructor.nombre);
            setApellido(instructor.apellido);
        }
    }, [instructor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = instructor ? 'PUT' : 'POST';
        const url = instructor ? `http://localhost:8000/instructores/${instructor.ci}` : 'http://localhost:8000/instructores';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ci: cedula,
                nombre,
                apellido
            })
        }).then(() => {
            closeModal();
            fetchData();
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{instructor ? 'Editar instructor' : 'Agregar instructor'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>Cédula de identidad</label>
                        <div>
                            <input type="text" placeholder="Cédula de identidad..." value={cedula} onChange={(e) => setCedula(e.target.value)} disabled={!!instructor} />
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
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.modalButton}>{instructor ? 'Actualizar' : 'Registrar'}</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AgregarInstructorModal;