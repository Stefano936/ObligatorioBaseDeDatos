import React, { useState, useEffect } from 'react';
import styles from '../Styles/Equipamiento.module.css';
import AgregarEquipamientoModal from '../components/AgregarEquipamientoModal/AgregarEquipamientoModal';

const Equipamiento = () => {
    const [activeAgregar, setActiveAgregar] = useState(false);
    const [equipamiento, setEquipamiento] = useState([]);
    const [selectedEquipamiento, setSelectedEquipamiento] = useState(null);

    const handleAbrirModal = (equipamiento = null) => {
        setSelectedEquipamiento(equipamiento);
        setActiveAgregar(true);
    };

    const closeModal = () => {
        setActiveAgregar(false);
        setSelectedEquipamiento(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/equipamiento');
            const data = await response.json();
            setEquipamiento(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/equipamiento/${id}`, {
                method: 'DELETE'
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting equipamiento:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.equipamientoContainer}>
            <h2>Equipamiento</h2>
            <button onClick={() => handleAbrirModal()}>Agregar Equipamiento</button>

            {activeAgregar && <AgregarEquipamientoModal closeModal={closeModal} fetchData={fetchData} equipamiento={selectedEquipamiento} />}

            <ul>
                {equipamiento.map((equipo, index) => (
                    <li key={index} className={styles.equipamientoCard}>
                        {equipo.descripcion} - ${equipo.costo}
                        <button onClick={() => handleAbrirModal(equipo)}>Editar</button>
                        <button onClick={() => handleDelete(equipo.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Equipamiento;