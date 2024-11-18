import React, { useState, useEffect } from 'react';
import styles from '../../Styles/AgregarActividadModal.module.css';

const AgregarActividadModal = ({ closeModal, fetchData, actividad }) => {
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');

    useEffect(() => {
        if (actividad) {
            setDescripcion(actividad.descripcion);
            setCosto(actividad.costo);
        }
    }, [actividad]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = actividad ? 'PUT' : 'POST';
        const url = actividad ? `http://localhost:8000/actividades/${actividad.id}` : 'http://localhost:8000/actividades';

        fetch(url, {
            method,
            //Agregar esto en caso de que no funcione mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion,
                costo
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
                <h2 className={styles.title}>{actividad ? 'Editar actividad' : 'Agregar actividad'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>Descripción</label>
                        <div>
                            <input type="text" placeholder="Descripción..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Costo</label>
                        <div>
                            <input type="number" placeholder="Costo..." value={costo} onChange={(e) => setCosto(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.modalButton}>{actividad ? 'Actualizar' : 'Registrar'}</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AgregarActividadModal;