import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [])

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  return { usuario, logout }
}