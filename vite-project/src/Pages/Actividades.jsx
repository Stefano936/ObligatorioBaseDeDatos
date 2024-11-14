import React, { useState, useEffect } from 'react';
import styles from '../Styles/Actividades.module.css';
import AgregarActividadModal from '../components/AgregarActividadesModal/AgregarActividadModal.jsx'; 

const Actividades = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [actividades, setActividades] = useState([]);
    const [selectedActividad, setSelectedActividad] = useState(null);

    const handleAbrirModal = (actividad = null) => {
        setSelectedActividad(actividad);
        setActiveAgregar(true);
    };

    const closeModal = () => {
        setActiveAgregar(false);
        setSelectedActividad(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/actividades');
            const data = await response.json();
            setActividades(data);
        } catch (error) {
            console.error('Error fetching actividades:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/actividades/${id}`, {
                method: 'DELETE'
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting actividad:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.actividadesContainer}>
            <h2>Actividades</h2>
            <button onClick={() => handleAbrirModal()}>Agregar actividad</button>

            {activeAgregar && <AgregarActividadModal closeModal={closeModal} fetchData={fetchData} actividad={selectedActividad} />}

            <ul>
                {actividades.map((actividad, index) => (
                    <li key={index} className={styles.actividadCard}>
                        {actividad.descripcion} - ${actividad.costo}
                        <button onClick={() => handleAbrirModal(actividad)}>Editar</button>
                        <button onClick={() => handleDelete(actividad.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Actividades;