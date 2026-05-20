import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, Phone, Calendar, ChevronDown, Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import styles from './AuthPage.module.css'

type Step = 'account' | 'profile'

const CadastroPage: React.FC = () => {
  const navigate = useNavigate()
  const { setUser, speak } = useApp()
  const [step, setStep] = useState<Step>('account')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [telefone, setTelefone] = useState('')
  const [deficiencia, setDeficiencia] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !senha || !confirmar) { setError('Preencha todos os campos.'); return }
    if (senha !== confirmar) { setError('As senhas não coincidem.'); return }
    if (senha.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return }
    setError('')
    setStep('profile')
  }

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || !deficiencia) { setError('Preencha os campos obrigatórios.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const newUser = { name: nome, email, phone: telefone, age: idade, disability: deficiencia }
    localStorage.setItem('inclusav_registered', JSON.stringify(newUser))
    setUser(newUser)
    speak(`Cadastro realizado com sucesso! Bem-vindo, ${nome}!`)
    navigate('/home')
  }

  const handleAnonimo = () => {
    speak('Entrando como visitante.')
    navigate('/home')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <path d="M5 10 L50 90 L95 10" stroke="#4A1FD4" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <ellipse cx="50" cy="50" rx="11" ry="7.5" fill="#4A1FD4" />
          </svg>
          <h1 className={styles.appName}>InclusaV</h1>
          <h2 className={styles.pageTitle}>Cadastro</h2>
        </div>

        {step === 'account' ? (
          <form onSubmit={handleStep1} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="reg-email" className={styles.label}>E-mail</label>
              <div className={styles.inputWrap}>
                <Mail size={18} className={styles.inputIcon} />
                <input id="reg-email" type="email" className={styles.input} placeholder="seu@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} aria-required="true" />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="reg-senha" className={styles.label}>Senha</label>
              <div className={styles.inputWrap}>
                <Lock size={18} className={styles.inputIcon} />
                <input id="reg-senha" type={showSenha ? 'text' : 'password'} className={styles.input}
                  placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} aria-required="true" />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowSenha(v => !v)}
                  aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}>
                  {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="reg-confirmar" className={styles.label}>Confirmar senha</label>
              <div className={styles.inputWrap}>
                <Lock size={18} className={styles.inputIcon} />
                <input id="reg-confirmar" type="password" className={styles.input}
                  placeholder="••••••••" value={confirmar} onChange={e => setConfirmar(e.target.value)} aria-required="true" />
              </div>
            </div>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" className={styles.btnPrimary}>Continuar</button>
            <button type="button" className={styles.btnSecondary} onClick={handleAnonimo}>Anônimo</button>
            <p className={styles.suaContaLink}>
              <Link to="/login" className={styles.link}>Já tenho conta</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleCadastrar} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="reg-nome" className={styles.label}>Nome *</label>
              <div className={styles.inputWrap}>
                <User size={18} className={styles.inputIcon} />
                <input id="reg-nome" type="text" className={styles.input} placeholder="Seu nome completo"
                  value={nome} onChange={e => setNome(e.target.value)} aria-required="true" />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="reg-idade" className={styles.label}>Idade</label>
              <div className={styles.inputWrap}>
                <Calendar size={18} className={styles.inputIcon} />
                <input id="reg-idade" type="number" className={styles.input} placeholder="Idade..."
                  value={idade} onChange={e => setIdade(e.target.value)} min="1" max="120" />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="reg-tel" className={styles.label}>Telefone</label>
              <div className={styles.inputWrap}>
                <Phone size={18} className={styles.inputIcon} />
                <input id="reg-tel" type="tel" className={styles.input} placeholder="(00) 00000-0000"
                  value={telefone} onChange={e => setTelefone(e.target.value)} />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="reg-def" className={styles.label}>Deficiência *</label>
              <div className={styles.inputWrap}>
                <ChevronDown size={18} className={styles.inputIcon} style={{ right: 12, left: 'auto', pointerEvents: 'none' }} />
                <select id="reg-def" className={`${styles.input} ${styles.select}`}
                  value={deficiencia} onChange={e => setDeficiencia(e.target.value)} aria-required="true">
                  <option value="">Selecione...</option>
                  <option value="Visual">Visual</option>
                  <option value="Auditiva">Auditiva</option>
                  <option value="Motora">Motora</option>
                  <option value="Nenhuma">Nenhuma</option>
                </select>
              </div>
            </div>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" className={styles.btnPrimary} disabled={loading} aria-busy={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            <button type="button" className={styles.btnText} onClick={() => setStep('account')}>Voltar</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default CadastroPage
