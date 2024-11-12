import React, { useState } from 'react';
import styles from '../../Styles/AgregarAlumnoModal.module.css'

const AgregarAlumnoModal = ({ closeModal }) => {
    const [ci, setCi] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fecha_nacimiento);
        fetch('http://localhost:8000/alumnos', {
            method: 'POST',
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
            window.location.reload();
        }).catch((error) => {
            console.error('Error:', error);
        });
    } 

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Agregar alumno</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label>Cédula de identidad</label>
                        <div>
                            <input type="text" placeholder="Cédula de identidad..." value={ci} onChange={(e) => setCi(e.target.value)} />
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
                            onChange={(e) => {
                                setFechaNacimiento(e.target.value);
                            }} 
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
                        <button type="submit" className={styles.modalButton}>Register</button>
                        <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
;
export default AgregarAlumnoModal;