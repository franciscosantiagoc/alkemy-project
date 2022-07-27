import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import './Login.styles.css';

export const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  }

  const validate = values => {
    const errors = {};

    if(!values.email){
      errors.email = 'El email es requerido';
    }
    if(!values.password) {
      errors.password = 'El password es requerido';
    }

    return errors;
  }

  const onSubmit = (event) => {
    localStorage.setItem('logged', 'yes');
    navigate('/', { replace: true });
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  })

  return (
    <div className="auth">
      <form onSubmit={formik.handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={formik.values.email} onChange={formik.handleChange}/>
          {formik.errors.email && (<span>{formik.errors.email}</span>)}
        </div>
        <div>
          <label>Contraseña</label>
          <input name="password" type="password" value={formik.values.password} onChange={formik.handleChange}/>
          {formik.errors.password && (<span>{formik.errors.password}</span>)}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
      
    </div>
  )
}