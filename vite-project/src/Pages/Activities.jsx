import React, { useEffect, useState } from "react";
import styles from '../Styles/Activities.module.css';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:8000/actividades');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className={styles.activitiesContainer}>
      <h2>Actividades</h2>
      <div>
        <label htmlFor="actividades">Selecciona una actividad:</label>
        <select id="actividades" name="actividades">
          {activities.map((act, index) => (
            <option key={index} value={act.descripcion}>{act.descripcion}</option>
          ))}
        </select>
        
      </div>
    </div>
  );
}

export default Activities;