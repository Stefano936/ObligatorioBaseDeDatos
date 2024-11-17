import React, { useState } from 'react';
import styles from '../../Styles/AgregarActividadModal.module.css';

const AgregarAlumnoClaseModal = ({ closeModal, fetchData }) => {
    const [idClase, setIdClase] = useState('');
    const [ci, setCi] = useState('');
    const [idEquipamiento, setIdEquipamiento] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = 'http://localhost:8000/alumnosclase';

        fetch(url, {
            method: 'POST',
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
                <h2 className={styles.title}>Agregar Alumno Clase</h2>
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
                        <button type="submit" className={styles.modalButton}>Registrar</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AgregarAlumnoClaseModal;