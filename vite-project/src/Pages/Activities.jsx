import React, { useEffect, useState } from "react";
import styles from '../Styles/Activities.module.css';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [equipamiento, setEquipamiento] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [clases, setClases] = useState([]);

  const handleActivityChange = (event) => {
    const activity = activities.find(act => act.descripcion === event.target.value);
    setSelectedActivity(activity);
  };

  const handleEquipmentChange = (event, equip) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedEquipment([...selectedEquipment, equip.id]);
    } else {
      setSelectedEquipment(selectedEquipment.filter(id => id !== equip.id));
    }
  };

  const handleTurnoChange = (event) => {
    const turno = turnos.find(t => t.hora_inicio === event.target.value);
    setSelectedTurno(turno);
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    if (selectedActivity) {
      totalCost += selectedActivity.costo;
    }
    selectedEquipment.forEach(equipDesc => {
      const equip = equipamiento.find(eq => eq.descripcion === equipDesc);
      if (equip) {
        totalCost += equip.costo;
      }
    });
    return totalCost;
  };

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

  const handleInscribirse = async () => {
    const clasesResponse = await fetch('http://localhost:8000/clases');
    const clasesData = await clasesResponse.json();
    setClases(clasesData);

    console.log(clasesData);

    const filteredClases = clasesData.filter(clase => clase.id_actividad === selectedActivity.id && clase.id_turno === selectedTurno.id);
    console.log(filteredClases);

    if (filteredClases.length === 0) {
      console.log('No hay clases disponibles');
      return;
    }

    const inscripcionBase = {
      id_clase: filteredClases[0].id,
      ci: localStorage.getItem('ci_alumno'),
    };

    console.log(selectedEquipment);
    for (const equipamiento of selectedEquipment) {
      console.log(equipamiento)
      const inscripcion = {
        ...inscripcionBase,
        id_equipamiento: equipamiento,
      };

      console.log(inscripcion);

      await fetch('http://localhost:8000/alumnosclase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscripcion),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    console.log('Inscripción realizada con éxito');
  }

  return (
    <div>
      <div className={styles.activitiesContainer}>
        <h2>Actividades</h2>
        <div>
          <label htmlFor="actividades">Selecciona una actividad:</label>
          <select id="actividades" name="actividades" onChange={handleActivityChange}>
            <option value="" selected disable>Selecciona una opción...</option>
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
                  onChange={(event) => handleEquipmentChange(event, equip)}
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
          <select id="turnos" name="turnos" onChange={handleTurnoChange}>
            {turnos.map((turno, index) => (
              <option key={index} value={turno.hora_inicio}>{turno.hora_inicio.substring(0,5)} - {turno.hora_fin.substring(0,5)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.totalCostContainer}>
        <h2>Costo Total</h2>
        <p>{calculateTotalCost()}</p>
      </div>
      <div>
        <button onClick={handleInscribirse}>Inscribirse</button>
      </div>
    </div>
  );
};

export default Activities;