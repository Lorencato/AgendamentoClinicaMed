import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Pacientes from './pages/Pacientes'
import Medicos from './pages/Medicos'
import Consultas from './pages/Consultas'

function Sidebar() {
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
      </nav>
    </aside>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/medicos" element={<Medicos />} />
            <Route path="/consultas" element={<Consultas />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
