import React, { useState, useEffect } from 'react';
import styles from '../../Styles/AgregarClaseModal.module.css';

const AgregarClaseModal = ({ closeModal, fetchData, clase }) => {
    const [ciInstructor, setCiInstructor] = useState('');
    const [idActividad, setIdActividad] = useState('');
    const [idTurno, setIdTurno] = useState('');
    const [dictada, setDictada] = useState(false);

    useEffect(() => {
        if (clase) {
            setCiInstructor(clase.ci_instructor);
            setIdActividad(clase.id_actividad);
            setIdTurno(clase.id_turno);
            setDictada(clase.dictada);
        }
    }, [clase]);

    const fetchInstructorInscriptions = async () => {
        try {
            const response = await fetch(`http://localhost:8000/clases`);
            const data = await response.json();
            console.log(data);
            console.log(ciInstructor);
            console.log(idTurno);
            const filteredData = data.filter(inscripcion => inscripcion.ci_instructor == ciInstructor && inscripcion.id_turno == idTurno);
            console.log(filteredData);
            return filteredData;
        } catch (error) {
            console.error('Error fetching instructor inscriptions:', error);
            return [];
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const existingInscriptions = await fetchInstructorInscriptions();
        if (existingInscriptions.length > 0) {
            alert('El instructor ya está dictando una actividad en este horario.');
            return;
        }
    
        const method = clase ? 'PUT' : 'POST';
        const url = clase ? `http://localhost:8000/clases/${clase.id}` : 'http://localhost:8000/clases';
    
        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ci_instructor: ciInstructor,
                id_actividad: parseInt(idActividad, 10),
                id_turno: parseInt(idTurno, 10),
                dictada: dictada
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
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
                <h2 className={styles.title}>{clase ? 'Editar clase' : 'Agregar clase'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>CI Instructor</label>
                        <div>
                            <input type="text" value={ciInstructor} onChange={(e) => setCiInstructor(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>ID Actividad</label>
                        <div>
                            <input type="number" value={idActividad} onChange={(e) => setIdActividad(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>ID Turno</label>
                        <div>
                            <input type="number" value={idTurno} onChange={(e) => setIdTurno(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Dictada</label>
                        <div>
                            <input type="checkbox" checked={dictada} onChange={(e) => setDictada(e.target.checked)} />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.modalButton}>{clase ? 'Actualizar' : 'Registrar'}</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AgregarClaseModal;