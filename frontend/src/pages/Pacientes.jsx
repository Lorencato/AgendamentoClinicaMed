import { useEffect, useState } from 'react'
import { pacientesApi } from '../api'

const EMPTY = { nome: '', cpf: '', telefone: '', email: '', dataNascimento: '', endereco: '' }

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const load = () => pacientesApi.getAll().then(r => setPacientes(r.data)).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(EMPTY); setEditId(null); setError(''); setModal(true) }
  const openEdit = (p) => { setForm({ ...p, dataNascimento: p.dataNascimento || '' }); setEditId(p.id); setError(''); setModal(true) }
  const closeModal = () => { setModal(false); setError('') }

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.nome || !form.cpf) { setError('Nome e CPF são obrigatórios.'); return }
    setSaving(true)
    try {
      if (editId) await pacientesApi.update(editId, form)
      else await pacientesApi.create(form)
      closeModal()
      load()
    } catch (e) {
      setError(e.response?.data?.message || 'Erro ao salvar.')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try {
      await pacientesApi.delete(deleteModal.id)
      setDeleteModal(null)
      load()
    } catch { setError('Erro ao excluir.') }
  }

  if (loading) return <div className="loading">⏳ Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Pacientes</h2>
          <div className="page-subtitle">{pacientes.length} cadastrado(s)</div>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Novo Paciente</button>
      </div>

      <div className="card">
        {pacientes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <p>Nenhum paciente cadastrado.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Nome</th><th>CPF</th><th>Telefone</th><th>Email</th><th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map(p => (
                  <tr key={p.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{p.id}</td>
                    <td><strong>{p.nome}</strong></td>
                    <td>{p.cpf}</td>
                    <td>{p.telefone || '—'}</td>
                    <td>{p.email || '—'}</td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)}>✏️ Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(p)}>🗑️ Excluir</button>
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
            <h3>{editId ? '✏️ Editar Paciente' : '➕ Novo Paciente'}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label>Nome *</label>
                <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
              </div>
              <div className="form-group">
                <label>CPF *</label>
                <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Telefone</label>
                <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(67) 99999-9999" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="email@exemplo.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data de Nascimento</label>
                <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número..." />
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
            <h3>🗑️ Excluir Paciente</h3>
            <p className="confirm-text">Tem certeza que deseja excluir <strong>{deleteModal.nome}</strong>? Esta ação não pode ser desfeita.</p>
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
