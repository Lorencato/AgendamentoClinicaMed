import { useEffect, useState } from 'react'
import { consultasApi, pacientesApi, medicosApi } from '../api'

const EMPTY = { pacienteId: '', medicoId: '', dataHora: '', status: 'agendada', observacoes: '' }

export default function Consultas() {
  const [consultas, setConsultas] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [medicos, setMedicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const load = () =>
    Promise.all([
      consultasApi.getAll(),
      pacientesApi.getAll(),
      medicosApi.getAll(),
    ]).then(([c, p, m]) => {
      setConsultas(c.data)
      setPacientes(p.data)
      setMedicos(m.data)
    }).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(EMPTY); setEditId(null); setError(''); setModal(true) }
  const openEdit = (c) => {
    const dt = new Date(c.dataHora)
    const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    setForm({ pacienteId: c.pacienteId, medicoId: c.medicoId, dataHora: local, status: c.status, observacoes: c.observacoes || '' })
    setEditId(c.id); setError(''); setModal(true)
  }
  const closeModal = () => { setModal(false); setError('') }

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.pacienteId || !form.medicoId || !form.dataHora) {
      setError('Paciente, médico e data/hora são obrigatórios.')
      return
    }
    setSaving(true)
    try {
      const payload = { ...form, pacienteId: Number(form.pacienteId), medicoId: Number(form.medicoId) }
      if (editId) await consultasApi.update(editId, payload)
      else await consultasApi.create(payload)
      closeModal()
      load()
    } catch (e) {
      setError(e.response?.data?.message || 'Erro ao salvar.')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try {
      await consultasApi.delete(deleteModal.id)
      setDeleteModal(null)
      load()
    } catch { setError('Erro ao excluir.') }
  }

  const fmtDate = (d) => new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

  if (loading) return <div className="loading">⏳ Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Consultas</h2>
          <div className="page-subtitle">{consultas.length} consulta(s) cadastrada(s)</div>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Nova Consulta</button>
      </div>

      <div className="card">
        {consultas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <p>Nenhuma consulta agendada.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Paciente</th><th>Médico</th><th>Especialidade</th><th>Data/Hora</th><th>Status</th><th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map(c => (
                  <tr key={c.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{c.id}</td>
                    <td><strong>{c.paciente?.nome}</strong></td>
                    <td>{c.medico?.nome}</td>
                    <td>{c.medico?.especialidade}</td>
                    <td>{fmtDate(c.dataHora)}</td>
                    <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(c)}>✏️ Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(c)}>🗑️ Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editId ? '✏️ Editar Consulta' : '➕ Nova Consulta'}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label>Paciente *</label>
                <select name="pacienteId" value={form.pacienteId} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Médico *</label>
                <select name="medicoId" value={form.medicoId} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  {medicos.map(m => <option key={m.id} value={m.id}>{m.nome} — {m.especialidade}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data e Hora *</label>
                <input type="datetime-local" name="dataHora" value={form.dataHora} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="agendada">Agendada</option>
                  <option value="realizada">Realizada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Observações</label>
              <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações sobre a consulta..." />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h3>🗑️ Excluir Consulta</h3>
            <p className="confirm-text">Tem certeza que deseja excluir a consulta de <strong>{deleteModal.paciente?.nome}</strong>?</p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteModal(null)}>Cancelar</button>
              <button className="btn btn-danger" onClick={handleDelete}>Confirmar Exclusão</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
