import React, { useState, useEffect } from 'react';
import styles from '../../Styles/AgregarHorarioModal.module.css';

const AgregarHorarioModal = ({ closeModal, fetchData, horario }) => {
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');

    useEffect(() => {
        if (horario) {
            setHoraInicio(horario.hora_inicio.slice(0, 5));
            setHoraFin(horario.hora_fin.slice(0, 5));
        }
    }, [horario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = horario ? 'PUT' : 'POST';
        const url = horario ? `http://localhost:8000/turnos/${horario.id}` : 'http://localhost:8000/turnos';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hora_inicio: horaInicio,
                hora_fin: horaFin
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
                <h2 className={styles.title}>{horario ? 'Editar horario' : 'Agregar horario'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>Hora Inicio</label>
                        <div>
                            <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label>Hora Fin</label>
                        <div>
                            <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.modalButton}>{horario ? 'Actualizar' : 'Registrar'}</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AgregarHorarioModal;