import React, { useEffect, useState } from "react";
import styles from '../Styles/Alumnosclase.module.css';
import AgregarAlumnoClaseModal from '../components/AgregarAlumnoClaseModal/AgregarAlumnoClaseModal';

function Alumnoclase() {
  const [alumnosClase, setAlumnosClase] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [actividadCount, setActividadCount] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [alumnosResponse, actividadesResponse] = await Promise.all([
        fetch('http://localhost:8000/alumnosclase'),
        fetch('http://localhost:8000/actividades')
      ]);
      const alumnosData = await alumnosResponse.json();
      const actividadesData = await actividadesResponse.json();
      setAlumnosClase(alumnosData);
      setActividades(actividadesData);
      calculateActividadCount(alumnosData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateActividadCount = (data) => {
    const count = data.reduce((acc, alumno) => {
      acc[alumno.id_clase] = (acc[alumno.id_clase] || 0) + 1;
      return acc;
    }, {});
    setActividadCount(count);
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

  const sortedActividadCount = Object.entries(actividadCount).sort((a, b) => b[1] - a[1]);

  return (
    <div className={styles.alumnosClaseContainer}>
      <h2>Alumnos Clase</h2>
      <button onClick={handleAdd}>Agregar Alumno Clase</button>
      <div className={styles.actividadCount}>
        <h3>Actividades con más alumnos:</h3>
        <ul>
          {sortedActividadCount.map(([id_clase, count]) => {
            const actividad = actividades.find(act => act.id === parseInt(id_clase));
            return (
              <li key={id_clase}>
                Actividad: {actividad ? actividad.descripcion : 'Desconocida'} - Alumnos: {count}
              </li>
            );
          })}
        </ul>
      </div>
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