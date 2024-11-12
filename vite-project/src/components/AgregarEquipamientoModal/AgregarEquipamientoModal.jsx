import React, { useState } from 'react';
import styles from '../../Styles/AgregarEquipamientoModal.module.css'

const AgregarEquipamientoModal = ({ closeModal }) => {
    const [actividad, setActividad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Agregar equipamiento</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>Actividad</label>
                        <div>
                            <input type="text" placeholder="Actividad..." value={actividad} onChange={(e) => setActividad(e.target.value)} />
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
                        <button type="submit" className={styles.modalButton}>Agregar</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
;
export default AgregarEquipamientoModal;