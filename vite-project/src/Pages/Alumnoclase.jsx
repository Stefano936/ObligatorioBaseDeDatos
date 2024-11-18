import React, { useEffect, useState } from "react";
import styles from '../Styles/Alumnosclase.module.css';
import AgregarAlumnoClaseModal from '../components/AgregarAlumnoClaseModal/AgregarAlumnoClaseModal';

function Alumnoclase() {
  const [alumnosClase, setAlumnosClase] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [equipamientos, setEquipamientos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [actividadCount, setActividadCount] = useState({});
  const [actividadIngresos, setActividadIngresos] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [alumnosResponse, actividadesResponse, equipamientosResponse] = await Promise.all([
        fetch('http://localhost:8000/alumnosclase'),
        fetch('http://localhost:8000/actividades'),
        fetch('http://localhost:8000/equipamiento')
      ]);
      const alumnosData = await alumnosResponse.json();
      const actividadesData = await actividadesResponse.json();
      const equipamientosData = await equipamientosResponse.json();
      setAlumnosClase(alumnosData);
      setActividades(actividadesData);
      setEquipamientos(equipamientosData);
      calculateActividadCount(alumnosData);
      calculateActividadIngresos(alumnosData, actividadesData, equipamientosData);
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

  const calculateActividadIngresos = (alumnosData, actividadesData, equipamientosData) => {
    const ingresos = alumnosData.reduce((acc, alumno) => {
      const key = `${alumno.id_clase}-${alumno.ci}`;
      if (!acc[key]) {
        const actividad = actividadesData.find(a => a.id === alumno.id_clase);
        const costoActividad = actividad ? actividad.costo : 0;
        acc[key] = costoActividad;
      }
      const equipamiento = equipamientosData.find(e => e.id === alumno.id_equipamiento);
      const costoEquipamiento = equipamiento ? equipamiento.costo : 0;
      acc[key] += costoEquipamiento;
      return acc;
    }, {});
    
    const ingresosPorClase = Object.entries(ingresos).reduce((acc, [key, totalCosto]) => {
      const [id_clase] = key.split('-');
      acc[id_clase] = (acc[id_clase] || 0) + totalCosto;
      return acc;
    }, {});
    
    setActividadIngresos(ingresosPorClase);
  };

  const handleDelete = async (id_clase, ci, equipamientos) => {
    try {
      await Promise.all(equipamientos.map(id_equipamiento =>
        fetch(`http://localhost:8000/alumnosclase/${id_clase}/${ci}/${id_equipamiento}/`, { method: 'DELETE' })
      ));
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const sortedActividadCount = Object.entries(actividadCount).sort((a, b) => b[1] - a[1]);
  const sortedActividadIngresos = Object.entries(actividadIngresos).sort((a, b) => b[1] - a[1]);

  const groupedAlumnos = alumnosClase.reduce((acc, alumno) => {
    const key = `${alumno.id_clase}-${alumno.ci}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(alumno.id_equipamiento);
    return acc;
  }, {});

  return (
    <div className={styles.alumnosClaseContainer}>
      <h2>Alumnos Clase</h2>
      <button onClick={handleAdd}>Agregar Alumno Clase</button>
      <div className={styles.actividadCount}>
        <h3>Actividad con más alumnos:</h3>
        <ul>
          {sortedActividadCount.slice(0, 1).map(([id_clase, count]) => {
            const actividad = actividades.find(act => act.id === parseInt(id_clase));
            return (
              <li key={id_clase}>
                Actividad: {actividad ? actividad.descripcion : 'Desconocida'} - Alumnos: {count}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.actividadIngresos}>
        <h3>Actividad que más ingresos genera:</h3>
        <ul>
          {sortedActividadIngresos.slice(0, 1).map(([id_clase, ingresos]) => {
            const actividad = actividades.find(act => act.id === parseInt(id_clase));
            return (
              <li key={id_clase}>
                Actividad: {actividad ? actividad.descripcion : 'Desconocida'} - Ingresos: ${ingresos}
              </li>
            );
          })}
        </ul>
      </div>
      <ul>
        {Object.entries(groupedAlumnos).map(([key, equipamientos]) => {
          const [id_clase, ci] = key.split('-');
          return (
            <li key={key} className={styles.alumnoClaseCard}>
              <div>Clase ID: {id_clase}</div>
              <div>CI: {ci}</div>
              <div>Equipamiento ID: {equipamientos.join(', ')}</div>
              <button onClick={() => handleDelete(id_clase, ci, equipamientos)}>Eliminar</button>
            </li>
          );
        })}
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