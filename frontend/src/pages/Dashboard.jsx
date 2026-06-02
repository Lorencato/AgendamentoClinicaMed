import { useEffect, useState } from 'react'
import { pacientesApi, medicosApi, consultasApi } from '../api'

export default function Dashboard() {
  const [stats, setStats] = useState({ pacientes: 0, medicos: 0, consultas: 0, agendadas: 0 })
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      pacientesApi.getAll(),
      medicosApi.getAll(),
      consultasApi.getAll(),
    ]).then(([p, m, c]) => {
      const consultasData = c.data
      setStats({
        pacientes: p.data.length,
        medicos: m.data.length,
        consultas: consultasData.length,
        agendadas: consultasData.filter(c => c.status === 'agendada').length,
      })
      setConsultas(consultasData.slice(0, 5))
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">⏳ Carregando...</div>

  const fmtDate = (d) => new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <div className="page-subtitle">Visão geral do sistema</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">👤 Pacientes</div>
          <div className="stat-value">{stats.pacientes}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">🩺 Médicos</div>
          <div className="stat-value">{stats.medicos}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📅 Consultas Agendadas</div>
          <div className="stat-value">{stats.agendadas}</div>
        </div>
      </div>

      <div className="card">
        <div style={{ marginBottom: 16, fontWeight: 600, fontSize: '1rem' }}>Últimas Consultas</div>
        {consultas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Nenhuma consulta cadastrada ainda.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Data/Hora</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map(c => (
                  <tr key={c.id}>
                    <td>{c.paciente?.nome}</td>
                    <td>{c.medico?.nome}</td>
                    <td>{fmtDate(c.dataHora)}</td>
                    <td>
                      <span className={`badge badge-${c.status}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
