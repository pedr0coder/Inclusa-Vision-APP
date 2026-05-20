import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bus, Star, Accessibility, HelpCircle, UserCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import MicButton from '../components/MicButton'
import styles from './HomePage.module.css'
import logoImg from '../assets/logo-inclusav.png'

const menuItems = [
  {
    icon: <Bus size={44} strokeWidth={1.5} />,
    label: 'Buscar Ônibus',
    route: '/buscar',
    alert: true,
    aria: 'Buscar linhas de ônibus',
    description: 'Encontre sua linha',
  },
  {
    icon: <Star size={44} strokeWidth={1.5} />,
    label: 'Favoritos',
    route: '/favoritos',
    aria: 'Ver rotas favoritas',
    description: 'Suas rotas salvas',
  },
  {
    icon: <Accessibility size={44} strokeWidth={1.5} />,
    label: 'Acessibilidade',
    route: '/acessibilidade',
    aria: 'Configurações de acessibilidade',
    description: 'Personalize o app',
  },
  {
    icon: <HelpCircle size={44} strokeWidth={1.5} />,
    label: 'Ajuda',
    route: '/ajuda',
    aria: 'Central de ajuda',
    description: 'Dúvidas frequentes',
  },
]

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { user, speak } = useApp()

  useEffect(() => {
    speak('Bem-vindo ao InclusaV. Página inicial. Use os botões para navegar.')
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImg} alt="InclusaV logo" className={styles.logoImg} />
          <span className={styles.logoText}>InclusaV</span>
        </div>
        <button
          className={styles.profileBtn}
          onClick={() => navigate('/perfil')}
          aria-label="Ir para perfil do usuário"
        >
          <UserCircle size={28} />
          <span className={styles.profileLabel}>Perfil</span>
        </button>
      </header>

      {user && (
        <p className={styles.greeting} aria-live="polite">
          Olá, <strong>{user.name}</strong>!
        </p>
      )}

      <main className={styles.main}>
        <div className={styles.grid} role="navigation" aria-label="Menu principal">
          {menuItems.map((item, i) => (
            <button
              key={item.route}
              className={styles.card}
              onClick={() => { speak(item.label); navigate(item.route) }}
              aria-label={item.aria}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {item.alert && (
                <span className={styles.alertDot} aria-label="Alertas disponíveis" />
              )}
              <span className={styles.cardIcon} aria-hidden="true">{item.icon}</span>
              <span className={styles.cardLabel}>{item.label}</span>
              <span className={styles.cardDesc}>{item.description}</span>
            </button>
          ))}
        </div>
      </main>

      <div className={styles.micArea} aria-label="Controle de voz">
        <MicButton />
      </div>

      {/* Background watermark */}
      <div className={styles.watermark} aria-hidden="true">
        <svg width="280" height="280" viewBox="0 0 100 100" fill="none">
          <path d="M5 10 L50 90 L95 10" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </div>
  )
}

export default HomePage
