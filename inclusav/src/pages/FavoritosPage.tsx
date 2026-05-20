import React from 'react'
import { Star, Clock, MapPin, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import MicButton from '../components/MicButton'
import styles from './FavoritosPage.module.css'

const FavoritosPage: React.FC = () => {
  const { favorites, removeFavorite, speak } = useApp()

  const handleRemove = (id: string, origin: string) => {
    removeFavorite(id)
    speak(`${origin} removido dos favoritos.`)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <BackButton />
        <h1 className={styles.title}>Favoritos</h1>
        <div style={{ width: 40 }} />
      </header>

      <main className={styles.main}>
        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <Star size={56} strokeWidth={1.2} />
            <p className={styles.emptyTitle}>Nenhuma rota favorita</p>
            <p className={styles.emptyDesc}>Salve suas linhas preferidas ao buscar ônibus.</p>
          </div>
        ) : (
          <ul className={styles.list} aria-label="Lista de rotas favoritas">
            {favorites.map((fav, i) => (
              <li
                key={fav.id}
                className={styles.card}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className={styles.cardLeft}>
                  <div className={styles.iconWrap}>
                    <MapPin size={20} />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.origin}>{fav.origin}</p>
                    {fav.destination && (
                      <p className={styles.dest}>→ {fav.destination}</p>
                    )}
                    <div className={styles.meta}>
                      <Clock size={13} />
                      <span>{fav.time}</span>
                      <span className={styles.dot}>·</span>
                      <span>{fav.line}</span>
                    </div>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(fav.id, fav.origin)}
                  aria-label={`Remover ${fav.origin} dos favoritos`}
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      <MicButton />
    </div>
  )
}

export default FavoritosPage
