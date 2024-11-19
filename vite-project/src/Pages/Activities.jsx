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
  const [userInscriptions, setUserInscriptions] = useState([]);
  const [ci, setCi] = useState(JSON.parse(localStorage.getItem('user'))["ci"]);
  const [classIdToUnsubscribe, setClassIdToUnsubscribe] = useState('');
  const [equipmentIdToUnsubscribe, setEquipmentIdToUnsubscribe] = useState('');

  const handleActivityChange = (event) => {
    const activity = activities.find(act => act.descripcion === event.target.value);
    setSelectedActivity(activity);
  };

  const handleEquipmentChange = (event, equip) => {
    const { checked } = event.target;
    setSelectedEquipment(prevSelectedEquipment => {
      const newSelectedEquipment = checked 
        ? [...prevSelectedEquipment, equip] 
        : prevSelectedEquipment.filter(e => e.id !== equip.id);
      return newSelectedEquipment;
    });
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
    selectedEquipment.forEach(equip => {
      totalCost += equip.costo;
    });
    return totalCost;
  };

  const fetchAlumnoInscriptions = async () => {
    try {
        const response = await fetch("http://localhost:8000/alumnosclase");
        const data = await response.json();
        const filteredData = data.filter(inscripcion => inscripcion.ci == ci && inscripcion.id_turno == selectedTurno);
        return filteredData;
    } catch (error) {
        console.error('Error fetching instructor inscriptions:', error);
        return [];
    }
  }; 

  const fetchUserInscriptions = async () => {
    try {
      const response = await fetch(`http://localhost:8000/alumnosclase`);
      const data = await response.json();
      const datafiltrada = data.filter(inscripcion => inscripcion.ci === ci);
      setUserInscriptions(datafiltrada);
      console.log('User inscriptions:', datafiltrada);
      console.log(JSON.parse(localStorage.getItem('user'))["ci"]);
      console.log('User inscriptions:', data);
    } catch (error) {
      console.error('Error fetching user inscriptions:', error);
    }
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

        await fetchUserInscriptions(); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInscribirse = async () => {
    const existingInscriptions = await fetchAlumnoInscriptions();
    if (existingInscriptions.length > 0) {
        alert('El alumno ya está inscripto en una actividad en este horario.');
        return;
    }
    const clasesResponse = await fetch('http://localhost:8000/clases');
    const clasesData = await clasesResponse.json();
    setClases(clasesData);

    const filteredClases = clasesData.filter(clase => clase.id_actividad === selectedActivity.id && clase.id_turno === selectedTurno.id);

    if (filteredClases.length === 0) {
      alert('No hay clases disponibles');
      return;
    }

    const inscripcionBase = {
      id_clase: filteredClases[0].id,
      ci: ci,
    };

    for (const equip of selectedEquipment) {
      const inscripcion = {
        ...inscripcionBase,
        id_equipamiento: equip.id,
      };

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

    await fetchUserInscriptions(); 
  }

  const handleUnsubscribe = async () => {
    if (!classIdToUnsubscribe || !ci || !equipmentIdToUnsubscribe) {
      alert('Por favor, ingrese un ID de clase y un ID de equipamiento válidos.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/alumnosclase/${classIdToUnsubscribe}/${ci}/${equipmentIdToUnsubscribe}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Dado de baja exitosamente');
        await fetchUserInscriptions();
      } else {
        const errorData = await response.json();
        alert(`Error al dar de baja: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al dar de baja:', error);
      alert(`Error al dar de baja: ${error.message}`);
    }
  };

  const groupInscriptionsByClass = (inscriptions) => {
    const grouped = inscriptions.reduce((acc, inscription) => {
      const { id_clase, id_equipamiento } = inscription;
      if (!acc[id_clase]) {
        acc[id_clase] = [];
      }
      acc[id_clase].push(id_equipamiento);
      return acc;
    }, {});

    return Object.entries(grouped).map(([id_clase, equipamientos]) => ({
      id_clase,
      equipamientos,
    }));
  };

  const groupedInscriptions = groupInscriptionsByClass(userInscriptions);

  return (
    <div className={styles.activitiesPage}>
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
      <div className={styles.userInscriptionsContainer}>
        <h2>Mis Inscripciones</h2>
        <ul>
          {groupedInscriptions.map((group, index) => (
            <li key={index}>
              Clase ID: {group.id_clase}, Equipamientos: {group.equipamientos.join(', ')}
            </li>
          ))}
        </ul> 
      </div>
      <div className={styles.unsubscribeContainer}>
        <h2>Darse de Baja</h2>
        <input
          type="text"
          placeholder="ID de la clase"
          value={classIdToUnsubscribe}
          onChange={(e) => setClassIdToUnsubscribe(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID del equipamiento"
          value={equipmentIdToUnsubscribe}
          onChange={(e) => setEquipmentIdToUnsubscribe(e.target.value)}
        />
        <button onClick={handleUnsubscribe}>Darse de Baja</button>
      </div>
    </div>
  );
};

export default Activities;