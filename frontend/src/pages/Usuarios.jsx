import { useEffect, useState } from 'react'
import { authApi } from '../api'

const EMPTY = { nome: '', email: '', senha: '', perfil: 'recepcionista' }

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}')

  const load = () => authApi.getUsuarios().then(r => setUsuarios(r.data)).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(EMPTY); setError(''); setModal(true) }
  const closeModal = () => { setModal(false); setError('') }
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.nome || !form.email || !form.senha) { setError('Nome, e-mail e senha são obrigatórios.'); return }
    setSaving(true)
    try {
      await authApi.register(form)
      closeModal()
      load()
    } catch (e) {
      setError(e.response?.data?.message || 'Erro ao cadastrar.')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try {
      await authApi.deleteUsuario(deleteModal.id)
      setDeleteModal(null)
      load()
    } catch { }
  }

  const perfilLabel = (p) => p === 'admin' ? '👑 Admin' : '🧾 Recepcionista'

  if (loading) return <div className="loading">⏳ Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Usuários</h2>
          <div className="page-subtitle">{usuarios.length} usuário(s) cadastrado(s)</div>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Novo Usuário</button>
      </div>

      <div className="card">
        {usuarios.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>Nenhum usuário cadastrado.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>#</th><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Cadastrado em</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{u.id}</td>
                    <td>
                      <strong>{u.nome}</strong>
                      {u.id === usuarioLogado.id && (
                        <span style={{ marginLeft: 8, fontSize: '0.7rem', color: 'var(--primary)', background: '#eaf0f8', padding: '2px 8px', borderRadius: 10 }}>
                          você
                        </span>
                      )}
                    </td>
                    <td>{u.email}</td>
                    <td><span className={`badge ${u.perfil === 'admin' ? 'badge-realizada' : 'badge-agendada'}`}>{perfilLabel(u.perfil)}</span></td>
                    <td>{new Date(u.criadoEm).toLocaleDateString('pt-BR')}</td>
                    <td>
                      {u.id !== usuarioLogado.id ? (
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(u)}>🗑️ Excluir</button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>—</span>
                      )}
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
            <h3>➕ Novo Usuário</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label>Nome *</label>
                <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
              </div>
              <div className="form-group">
                <label>Perfil</label>
                <select name="perfil" value={form.perfil} onChange={handleChange}>
                  <option value="recepcionista">Recepcionista</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>E-mail *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@clinica.com" />
            </div>
            <div className="form-group">
              <label>Senha * (mínimo 6 caracteres)</label>
              <input type="password" name="senha" value={form.senha} onChange={handleChange} placeholder="••••••••" />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
                {saving ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h3>🗑️ Excluir Usuário</h3>
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