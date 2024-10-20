import React, { useEffect, useState } from "react";
import styles from '../Styles/Activities.module.css';

function Activities () {
  const [equipment, setEquipment] = useState([]);
  const [classType, setClassType] = useState('');
  const [schedule, setSchedule] = useState('');
  const [activity, setActivity] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);

  const handleEquipment = (item) => {
    setEquipment(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSubmit = () => {
    if (!activity || !schedule || !classType) {
      alert("Por favor, selecciona todos los campos requeridos.");
      return;
    }
    
    console.log(`Confirmado: Actividad: ${activity}, Equipamiento: ${equipment.join(', ')}, Clase: ${classType}, Horario: ${schedule}`);
  };

  useEffect(() => {
    const mockInstructors = [
      { name: 'Juan', activity: 'Esquí', schedule: '9:00 - 11:00' },
      { name: 'Maria', activity: 'Snowboard', schedule: '12:00 - 14:00' },
    ];
    
    const mockStudents = [
      { name: 'Carlos', activity: 'Esquí', schedule: '9:00 - 11:00' },
      { name: 'Ana', activity: 'Snowboard', schedule: '12:00 - 14:00' },
    ];
    
    setInstructors(mockInstructors);
    setStudents(mockStudents);
  }, []);

  return (
    <div className={styles.activitiesContainer}>
      <h2>Actividades</h2>
      
      <h3>Selecciona una actividad</h3>
      <div>
        <button onClick={() => setActivity('Esquí')}>Esquí</button>
        <button onClick={() => setActivity('Snowboard')}>Snowboard</button>
        <button onClick={() => setActivity('Moto de nieve')}>Moto de nieve</button>
      </div>

      <h3>Equipamiento para alquilar</h3>
      <div>
        <button onClick={() => handleEquipment('Antiparras')}>Antiparras</button>
        <button onClick={() => handleEquipment('Cascos')}>Cascos</button>
        <button onClick={() => handleEquipment('Tablas de Snowboard')}>Tablas de Snowboard</button>
        <button onClick={() => handleEquipment('Esquíes')}>Esquíes</button>
      </div>

      <h3>Clase</h3>
      <form>
        <label>
          <input type="radio" value="grupal" checked={classType === 'grupal'} onChange={() => setClassType('grupal')} />
          Grupal
        </label>
        <label>
          <input type="radio" value="individual" checked={classType === 'individual'} onChange={() => setClassType('individual')} />
          Individual
        </label>
      </form>

      <h3>Horarios</h3>
      <div>
        <button onClick={() => setSchedule('9:00 - 11:00')}>De 9:00 a 11:00</button>
        <button onClick={() => setSchedule('12:00 - 14:00')}>De 12:00 a 14:00</button>
        <button onClick={() => setSchedule('16:00 - 18:00')}>De 16:00 a 18:00</button>
      </div>
    
      <h4>Instructor</h4>
      <ul>
        {instructors.map((inst, index) => (
          <li key={index}>
            {inst.name} - Actividad: {inst.activity}, Turno: {inst.schedule}
          </li>
        ))}
      </ul>

      <h4>Alumno</h4>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.name} - Actividad: {student.activity}, Turno: {student.schedule}
          </li>
        ))}
      </ul>
      
      <button onClick={handleSubmit}>Confirmar</button>
    </div>
  );
}

export default Activities;
