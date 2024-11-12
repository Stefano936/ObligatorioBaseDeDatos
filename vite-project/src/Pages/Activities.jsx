import React, { useEffect, useState } from "react";
import styles from '../Styles/Activities.module.css';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [equipamiento, setEquipamiento] = useState([]);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitiesResponse = await fetch('http://localhost:8000/actividades');
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData);
  
        const equipamientoResponse = await fetch('http://localhost:8000/equipamiento');
        const equipamientoData = await equipamientoResponse.json();
        setEquipamiento(equipamientoData);

        const turnosResponse = await fetch('http://localhost:8000/turnos');
        const turnosData = await turnosResponse.json();
        setTurnos(turnosData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.activitiesContainer}>
        <h2>Actividades</h2>
        <div>
          <label htmlFor="actividades">Selecciona una actividad:</label>
          <select id="actividades" name="actividades">
            {activities.map((act, index) => (
              <option key={index} value={act.descripcion}>{act.descripcion} - ${act.costo}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.equipamientoContainer}>
        <h2>Equipamiento</h2>
        <div>
          <label>Selecciona un equipamiento:</label>
          <div>
            {equipamiento.map((equip, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`equipamiento-${index}`}
                  name="equipamiento"
                  value={equip.descripcion}
                />
                <label htmlFor={`equipamiento-${index}`}>
                  {equip.descripcion} - ${equip.costo}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.turnosContainer}>
        <h2>Turnos</h2>
        <div>
          <label htmlFor="turnos">Selecciona un turno:</label>
          <select id="turnos" name="turnos">
            {turnos.map((turno, index) => (
              <option key={index} value={turno.hora_inicio}>{turno.hora_inicio.substring(0,5)} - {turno.hora_fin.substring(0,5)}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Activities;