import React, { useState } from 'react';
import { useFormik } from 'formik';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  })

  return (
    <div className="container">
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