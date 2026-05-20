import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import styles from './AuthPage.module.css'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { setUser, speak } = useApp()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !senha) { setError('Preencha todos os campos.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    // Simulate login - in real app, call API
    const savedUser = localStorage.getItem('inclusav_registered')
    if (savedUser) {
      const u = JSON.parse(savedUser)
      if (u.email === email) {
        setUser(u)
        speak(`Bem-vindo, ${u.name}!`)
        navigate('/home')
        return
      }
    }
    // Demo login
    setUser({ name: 'Usuário', email, phone: '', age: '', disability: 'Nenhuma' })
    speak('Bem-vindo ao InclusaV!')
    navigate('/home')
    setLoading(false)
  }

  const handleAnonimo = () => {
    speak('Entrando como visitante.')
    navigate('/home')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <path d="M5 10 L50 90 L95 10" stroke="#4A1FD4" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <ellipse cx="50" cy="50" rx="11" ry="7.5" fill="#4A1FD4" />
            <path d="M33 50 Q41.5 39 50 50 Q58.5 61 67 50" stroke="#4A1FD4" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </svg>
          <h1 className={styles.appName}>InclusaV</h1>
          <h2 className={styles.pageTitle}>Login</h2>
        </div>

        <form onSubmit={handleLogin} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <div className={styles.inputWrap}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-required="true"
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="senha" className={styles.label}>Senha</label>
            <div className={styles.inputWrap}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="senha"
                type={showSenha ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                aria-required="true"
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowSenha(v => !v)}
                aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <button type="submit" className={styles.btnPrimary} disabled={loading} aria-busy={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <button type="button" className={styles.btnSecondary} onClick={handleAnonimo}>
            Anônimo
          </button>
        </form>

        <div className={styles.footer}>
          <span>Não tem conta?</span>
          <Link to="/cadastro" className={styles.link}>Cadastre-se</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
