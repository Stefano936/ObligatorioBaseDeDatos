import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../Styles/Login.module.css';

function Login() {
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const validateForm = (e) => {
    if (!e.target.ci.value || !e.target.password.value) {
      return 'Por favor, completa todos los campos';
    }
    /* const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.email.value)) {
      return 'Ingresa un email válido';
    } */
    if (e.target.password.value.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  };

  function handleSubmit(e){
    e.preventDefault();
    const validationError = validateForm(e);
    if (validationError) {
      setError(validationError);
      return alert(validationError);
    }

    let data = {ci: e.target.ci.value, contraseña: e.target.password.value};

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid CI or password');
      }
      return response.json();
    })
    .then(data => {
      console.log('Login successful');
      navigate('/inscripciones');
      localStorage.setItem('ci_alumno', e.target.ci.value);
    })
    .catch(error => {
      setError(error.message);
      alert(error.message);
    });


  }

  return (
    <>
    <div className={styles.login_container}>
      <div className={styles.logo_container}>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mHTSm37W4mp-tlLh8OQrx-LpOiwptxLmRg&s" 
          alt="UCU logo" 
          className={styles.logo}
        />
      </div>
      <h1 className={styles.title}>Inicia Sesión</h1>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="cédula..."
          id="ci"
          className={styles.login_input}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          id="password"
          className={styles.login_input}
        />
        <br />
        <button type="submit" className={styles.login_button}>Login</button>
      </form>
      <p className={styles.login_text}>
        Create account <a href="/register" className={styles.login_link}>here</a>
      </p>
    </div>
    </>
  );
}

export default Login;