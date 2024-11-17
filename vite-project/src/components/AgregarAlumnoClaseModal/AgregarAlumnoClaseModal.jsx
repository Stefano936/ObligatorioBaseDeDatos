import React, { useState, useEffect } from 'react';
import styles from '../../Styles/AgregarActividadModal.module.css';

const AgregarAlumnoClaseModal = ({ closeModal, fetchData, alumnoClase }) => {
    const [idClase, setIdClase] = useState('');
    const [ci, setCi] = useState('');
    const [idEquipamiento, setIdEquipamiento] = useState('');

    useEffect(() => {
        if (alumnoClase) {
            setIdClase(alumnoClase.id_clase);
            setCi(alumnoClase.ci);
            setIdEquipamiento(alumnoClase.id_equipamiento);
        }
    }, [alumnoClase]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = alumnoClase ? 'PUT' : 'POST';
        const url = alumnoClase ? `http://localhost:8000/alumnosclase/${idClase}/${ci}/${idEquipamiento}` : 'http://localhost:8000/alumnosclase';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_clase: idClase,
                ci: ci,
                id_equipamiento: idEquipamiento
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
                <h2 className={styles.title}>{alumnoClase ? 'Editar Alumno Clase' : 'Agregar Alumno Clase'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>ID Clase</label>
                        <div>
                            <input type="number" value={idClase} onChange={(e) => setIdClase(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>CI</label>
                        <div>
                            <input type="text" value={ci} onChange={(e) => setCi(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>ID Equipamiento</label>
                        <div>
                            <input type="number" value={idEquipamiento} onChange={(e) => setIdEquipamiento(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.modalButton}>{alumnoClase ? 'Actualizar' : 'Registrar'}</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AgregarAlumnoClaseModal;