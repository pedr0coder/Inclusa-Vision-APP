import React from 'react'
import { Mic, MicOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import styles from './MicButton.module.css'

const MicButton: React.FC = () => {
  const { isListening, startListening, stopListening, speak } = useApp()

  const handleClick = () => {
    if (isListening) {
      stopListening()
    } else {
      speak('Assistente de voz ativado. Fale sua busca.')
      startListening()
    }
  }

  return (
    <button
      className={`${styles.mic} ${isListening ? styles.listening : ''}`}
      onClick={handleClick}
      aria-label={isListening ? 'Parar reconhecimento de voz' : 'Iniciar assistente de voz'}
      title={isListening ? 'Parar' : 'Falar'}
    >
      {isListening ? <MicOff size={28} /> : <Mic size={28} />}
      {isListening && <span className={styles.pulse} aria-hidden="true" />}
    </button>
  )
}

export default MicButton
