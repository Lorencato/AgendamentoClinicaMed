import { useEffect, useState } from 'react'
import { medicosApi } from '../api'

const EMPTY = { nome: '', crm: '', especialidade: '', telefone: '', email: '' }

const ESPECIALIDADES = [
  'Clínico Geral', 'Cardiologia', 'Dermatologia', 'Endocrinologia',
  'Gastroenterologia', 'Geriatria', 'Ginecologia', 'Neurologia',
  'Oftalmologia', 'Ortopedia', 'Pediatria', 'Psiquiatria', 'Urologia', 'Outro'
]

export default function Medicos() {
  const [medicos, setMedicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const load = () => medicosApi.getAll().then(r => setMedicos(r.data)).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(EMPTY); setEditId(null); setError(''); setModal(true) }
  const openEdit = (m) => { setForm({ ...m }); setEditId(m.id); setError(''); setModal(true) }
  const closeModal = () => { setModal(false); setError('') }

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.nome || !form.crm || !form.especialidade) { setError('Nome, CRM e especialidade são obrigatórios.'); return }
    setSaving(true)
    try {
      if (editId) await medicosApi.update(editId, form)
      else await medicosApi.create(form)
      closeModal()
      load()
    } catch (e) {
      setError(e.response?.data?.message || 'Erro ao salvar.')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try {
      await medicosApi.delete(deleteModal.id)
      setDeleteModal(null)
      load()
    } catch { setError('Erro ao excluir.') }
  }

  if (loading) return <div className="loading">⏳ Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Médicos</h2>
          <div className="page-subtitle">{medicos.length} cadastrado(s)</div>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Novo Médico</button>
      </div>

      <div className="card">
        {medicos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🩺</div>
            <p>Nenhum médico cadastrado.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Nome</th><th>CRM</th><th>Especialidade</th><th>Telefone</th><th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {medicos.map(m => (
                  <tr key={m.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{m.id}</td>
                    <td><strong>{m.nome}</strong></td>
                    <td>{m.crm}</td>
                    <td><span className="badge badge-agendada">{m.especialidade}</span></td>
                    <td>{m.telefone || '—'}</td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(m)}>✏️ Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(m)}>🗑️ Excluir</button>
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
            <h3>{editId ? '✏️ Editar Médico' : '➕ Novo Médico'}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label>Nome *</label>
                <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
              </div>
              <div className="form-group">
                <label>CRM *</label>
                <input name="crm" value={form.crm} onChange={handleChange} placeholder="CRM/MS 000000" />
              </div>
            </div>
            <div className="form-group">
              <label>Especialidade *</label>
              <select name="especialidade" value={form.especialidade} onChange={handleChange}>
                <option value="">Selecione...</option>
                {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Telefone</label>
                <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(67) 99999-9999" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="email@clinica.com" />
              </div>
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
            <h3>🗑️ Excluir Médico</h3>
            <p className="confirm-text">Tem certeza que deseja excluir <strong>{deleteModal.nome}</strong>?</p>
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
