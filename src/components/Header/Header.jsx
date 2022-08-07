import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.styles.css'

export const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  return (
    <header>
      <img src="/img/goscrum.png" alt="logo" />
      <div onClick={handleLogout}>X</div>
    </header>
  )
}
