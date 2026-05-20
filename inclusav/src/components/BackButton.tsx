import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import styles from './BackButton.module.css'

interface BackButtonProps {
  to?: string
  label?: string
}

const BackButton: React.FC<BackButtonProps> = ({ to, label }) => {
  const navigate = useNavigate()

  return (
    <button
      className={styles.back}
      onClick={() => to ? navigate(to) : navigate(-1)}
      aria-label="Voltar"
    >
      <ChevronLeft size={22} />
      {label && <span>{label}</span>}
    </button>
  )
}

export default BackButton
