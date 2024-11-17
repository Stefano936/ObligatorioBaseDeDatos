import React, { useEffect, useState } from "react";
import styles from '../Styles/Alumnosclase.module.css';
import AgregarAlumnoClaseModal from '../components/AgregarAlumnoClaseModal/AgregarAlumnoClaseModal';

function Alumnoclase() {
  const [alumnosClase, setAlumnosClase] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/alumnosclase');
      const data = await response.json();
      setAlumnosClase(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id_clase, ci, id_equipamiento) => {
    try {
      await fetch(`http://localhost:8000/alumnosclase/${id_clase}/${ci}/${id_equipamiento}/`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.alumnosClaseContainer}>
      <h2>Alumnos Clase</h2>
      <button onClick={handleAdd}>Agregar Alumno Clase</button>
      <ul>
        {alumnosClase.map((alumno) => (
          <li key={alumno.id} className={styles.alumnoClaseCard}>
            <div>Clase ID: {alumno.id_clase}</div>
            <div>CI: {alumno.ci}</div>
            <div>Equipamiento ID: {alumno.id_equipamiento}</div>
            <button onClick={() => handleDelete(alumno.id_clase, alumno.ci, alumno.id_equipamiento)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {showModal && (
        <AgregarAlumnoClaseModal
          closeModal={() => setShowModal(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default Alumnoclase;