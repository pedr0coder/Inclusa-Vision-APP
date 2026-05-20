import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './SplashPage.module.css'

const SplashPage: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? '/home' : '/login')
    }, 2200)
    return () => clearTimeout(timer)
  }, [navigate, isLoggedIn])

  return (
    <div className={styles.container} role="main" aria-label="Carregando InclusaV">
      <div className={styles.content}>
        <div className={styles.logoWrap}>
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <path className={styles.vPath} d="M5 10 L50 90 L95 10" stroke="#4A1FD4" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <ellipse className={styles.eye} cx="50" cy="50" rx="11" ry="7.5" fill="#4A1FD4" />
            <path className={styles.wave1} d="M33 50 Q41.5 39 50 50 Q58.5 61 67 50" stroke="#4A1FD4" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path className={styles.wave2} d="M25 50 Q37.5 31 50 50 Q62.5 69 75 50" stroke="#4A1FD4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
          <h1 className={styles.title}>InclusaV</h1>
        </div>
        <p className={styles.tagline}>Mobilidade para todos</p>
        <div className={styles.dots} aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

export default SplashPage
