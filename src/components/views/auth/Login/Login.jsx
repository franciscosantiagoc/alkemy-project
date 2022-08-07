import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import '../Auth.styles.css'

const { VITE_API_ENDPOINT } = import.meta.env

export const Login = () => {
  const navigate = useNavigate()
  const initialValues = {
    userName: '',
    password: '',
  }

  const onSubmit = () => {
    fetch(`${VITE_API_ENDPOINT}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: values.userName,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then(({ result }) => {
        localStorage.setItem('token', result.token)
        navigate('/', { replace: true })
      })
      .catch((error) => alert('usuario no encontrado'))
  }

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(6, 'Longitud minima de 6 caracteres')
      .required('El nombre de usuario es requirido'),
    password: Yup.string()
      .min(8, 'Longitud minima de 8 caracteres')
      .required('La contraseña es requerida'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
  } = formik

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            name="userName"
            type="text"
            value={formik.values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? 'error' : ''}
          />
          {formik.errors.userName && touched.userName && (
            <span className="message-error">{formik.errors.userName}</span>
          )}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? 'error' : ''}
          />
          {formik.errors.password && touched.password && (
            <span className="message-error">{formik.errors.password}</span>
          )}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/register">Registrarme</Link>
        </div>
      </form>
    </div>
  )
}
