import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Pacientes from './pages/Pacientes'
import Medicos from './pages/Medicos'
import Consultas from './pages/Consultas'
import Usuarios from './pages/Usuarios'
import Login from './pages/Login'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function Sidebar() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>🏥 ClinicaApp</h1>
        <span>Sistema de Agendamento</span>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section-title">Menu</div>
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span className="icon">📊</span> Dashboard
        </NavLink>
        <NavLink to="/pacientes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span className="icon">👤</span> Pacientes
        </NavLink>
        <NavLink to="/medicos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span className="icon">🩺</span> Médicos
        </NavLink>
        <NavLink to="/consultas" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span className="icon">📅</span> Consultas
        </NavLink>

        <div className="nav-section-title" style={{ marginTop: 16 }}>Administração</div>
        <NavLink to="/usuarios" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span className="icon">👥</span> Usuários
        </NavLink>
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: 4 }}>Logado como</div>
        <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 2 }}>{usuario.nome}</div>
        <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: 12 }}>{usuario.perfil}</div>
        <button onClick={logout} className="nav-link" style={{ color: '#f1948a', width: '100%' }}>
          <span className="icon">🚪</span> Sair
        </button>
      </div>
    </aside>
  )
}

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/pacientes" element={<PrivateRoute><Layout><Pacientes /></Layout></PrivateRoute>} />
        <Route path="/medicos" element={<PrivateRoute><Layout><Medicos /></Layout></PrivateRoute>} />
        <Route path="/consultas" element={<PrivateRoute><Layout><Consultas /></Layout></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><Layout><Usuarios /></Layout></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}