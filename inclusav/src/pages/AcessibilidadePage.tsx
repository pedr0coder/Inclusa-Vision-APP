import React from 'react'
import { Volume2, Mic, Type, Sun, Moon } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import styles from './AcessibilidadePage.module.css'

interface ToggleRowProps {
  icon: React.ReactNode
  label: string
  description: string
  checked: boolean
  onChange: () => void
  id: string
}

const ToggleRow: React.FC<ToggleRowProps> = ({ icon, label, description, checked, onChange, id }) => (
  <div className={styles.row}>
    <div className={styles.rowLeft}>
      <span className={styles.rowIcon} aria-hidden="true">{icon}</span>
      <div>
        <label htmlFor={id} className={styles.rowLabel}>{label}</label>
        <p className={styles.rowDesc}>{description}</p>
      </div>
    </div>
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
      aria-label={`${label}: ${checked ? 'ativado' : 'desativado'}`}
    >
      <span className={styles.thumb} />
    </button>
  </div>
)

const AcessibilidadePage: React.FC = () => {
  const { audioFeedback, toggleAudioFeedback, voiceAssistant, toggleVoiceAssistant,
    largeFont, toggleLargeFont, theme, toggleTheme, speak } = useApp()

  const handleThemeToggle = () => {
    toggleTheme()
    speak(theme === 'light' ? 'Modo escuro ativado.' : 'Modo claro ativado.')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <BackButton />
        <h1 className={styles.title}>Acessibilidade</h1>
        <div style={{ width: 40 }} />
      </header>

      <main className={styles.main}>
        <section className={styles.section} aria-labelledby="audio-section">
          <h2 id="audio-section" className={styles.sectionTitle}>Áudio</h2>
          <div className={styles.group}>
            <ToggleRow
              id="audio-feedback"
              icon={<Volume2 size={22} />}
              label="Feedback de áudio"
              description="Narração das ações e telas"
              checked={audioFeedback}
              onChange={() => { toggleAudioFeedback(); speak(!audioFeedback ? 'Feedback de áudio ativado.' : 'Feedback de áudio desativado.') }}
            />
            <ToggleRow
              id="voice-assistant"
              icon={<Mic size={22} />}
              label="Assistente de voz"
              description="Controle o app por voz"
              checked={voiceAssistant}
              onChange={() => { toggleVoiceAssistant(); speak(!voiceAssistant ? 'Assistente de voz ativado.' : 'Assistente de voz desativado.') }}
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="visual-section">
          <h2 id="visual-section" className={styles.sectionTitle}>Visual</h2>
          <div className={styles.group}>
            <ToggleRow
              id="large-font"
              icon={<Type size={22} />}
              label="Fonte grande"
              description="Aumenta o tamanho do texto"
              checked={largeFont}
              onChange={() => { toggleLargeFont(); speak(!largeFont ? 'Fonte grande ativada.' : 'Fonte normal ativada.') }}
            />
            <ToggleRow
              id="dark-mode"
              icon={theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
              label="Modo escuro"
              description="Reduz o brilho da tela"
              checked={theme === 'dark'}
              onChange={handleThemeToggle}
            />
          </div>
        </section>

        <div className={styles.note} role="note">
          <p>As configurações são salvas automaticamente e se mantêm entre sessões.</p>
        </div>
      </main>
    </div>
  )
}

export default AcessibilidadePage
