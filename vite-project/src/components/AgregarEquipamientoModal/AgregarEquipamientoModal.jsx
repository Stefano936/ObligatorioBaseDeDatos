import React, { useState, useEffect } from 'react';
import styles from '../../Styles/AgregarEquipamientoModal.module.css';

const AgregarEquipamientoModal = ({ closeModal, fetchData, equipamiento }) => {
    const [idActividad, setIdActividad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');

    useEffect(() => {
        if (equipamiento) {
            setIdActividad(equipamiento.id_actividad);
            setDescripcion(equipamiento.descripcion);
            setCosto(equipamiento.costo);
        }
    }, [equipamiento]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = equipamiento ? 'PUT' : 'POST';
        const url = equipamiento ? `http://localhost:8000/equipamiento/${equipamiento.id}` : 'http://localhost:8000/equipamiento';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_actividad: idActividad,
                descripcion,
                costo
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
                <h2 className={styles.title}>{equipamiento ? 'Editar equipamiento' : 'Agregar equipamiento'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>Id Actividad</label>
                        <div>
                            <input type="text" placeholder="Actividad..." value={idActividad} onChange={(e) => setIdActividad(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Descripción</label>
                        <div>
                            <input type="text" placeholder="Descripción..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Costo</label>
                        <div>
                            <input type="text" placeholder="Costo..." value={costo} onChange={(e) => setCosto(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.modalButton}>{equipamiento ? 'Actualizar' : 'Agregar'}</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarEquipamientoModal;