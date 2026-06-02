import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api'

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.senha) { setError('Preencha e-mail e senha.'); return }
    setLoading(true)
    setError('')
    try {
      const { data } = await authApi.login(form)
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'E-mail ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>🏥</div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', color: 'var(--primary)', marginBottom: 4 }}>
            ClinicaApp
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sistema de Agendamento de Consultas</p>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 6, fontSize: '1.2rem' }}>Entrar no sistema</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 24 }}>
            Use suas credenciais de acesso
          </p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, padding: '12px' }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Sem acesso? Solicite ao administrador do sistema.
        </p>
      </div>
    </div>
  )
}