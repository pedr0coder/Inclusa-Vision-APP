import React, { useState, useEffect } from 'react'
import { MapPin, Clock, Bus, Star, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import MicButton from '../components/MicButton'
import styles from './BuscarOnibusPage.module.css'

interface Route {
  id: string
  line: string
  number: string
  origin: string
  destination: string
  times: string[]
  accessible: boolean
}

const mockRoutes: Route[] = [
  { id: '1', line: '1h 30min', number: '088', origin: 'Rod. Express Teotônio, Km 58, Leste - Jundiaí', destination: 'Terminal Centro', times: ['06:30', '07:30', '08:30', '12:00'], accessible: true },
  { id: '2', line: '1h', number: '042', origin: 'Rod. Marechal Teotônio, Km 58 - Jundiaí', destination: 'Terminal Norte', times: ['07:00', '08:00', '10:30', '13:00'], accessible: true },
  { id: '3', line: '45min', number: '110', origin: 'Centro - Praça da Matriz', destination: 'Bairro Novo Jardim', times: ['06:00', '07:15', '08:45', '14:30'], accessible: false },
  { id: '4', line: '2h', number: '201', origin: 'Terminal Sul - Jundiaí', destination: 'Shopping Leste', times: ['09:00', '11:00', '15:00', '18:00'], accessible: true },
]

const BuscarOnibusPage: React.FC = () => {
  const { favorites, addFavorite, removeFavorite, speak, transcript } = useApp()
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(mockRoutes)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    if (transcript) {
      setSearch(transcript)
      speak(`Buscando: ${transcript}`)
    }
  }, [transcript])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      q ? mockRoutes.filter(r =>
        r.origin.toLowerCase().includes(q) ||
        r.destination.toLowerCase().includes(q) ||
        r.number.includes(q)
      ) : mockRoutes
    )
  }, [search])

  const isFav = (id: string) => favorites.some(f => f.id === id)

  const toggleFav = (route: Route) => {
    if (isFav(route.id)) {
      removeFavorite(route.id)
      speak('Removido dos favoritos.')
    } else {
      addFavorite({ id: route.id, line: route.line, origin: route.origin, destination: route.destination, time: route.times[0] })
      speak('Adicionado aos favoritos!')
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <BackButton />
        <h1 className={styles.title}>Buscar Ônibus</h1>
        <button className={styles.mapBtn} onClick={() => setShowMap(v => !v)} aria-label="Ver mapa">
          <MapPin size={20} />
        </button>
      </header>

      {showMap && (
        <div className={styles.mapPlaceholder} role="img" aria-label="Mapa de linhas de ônibus">
          <div className={styles.mapInner}>
            <MapPin size={32} className={styles.mapIcon} />
            <p>Mapa interativo</p>
            <p className={styles.mapSub}>Em desenvolvimento</p>
          </div>
          {/* Simple visual map representation */}
          <svg className={styles.mapSvg} viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="340" height="180" rx="12" fill="#E8F0FE" />
            <path d="M20 90 Q100 40 180 90 Q260 140 320 80" stroke="#4A1FD4" strokeWidth="3" fill="none" strokeDasharray="8 4" />
            <path d="M20 120 Q120 80 200 120 Q270 150 320 110" stroke="#7C4DFF" strokeWidth="2" fill="none" strokeDasharray="6 3" />
            <circle cx="20" cy="90" r="6" fill="#4A1FD4" />
            <circle cx="180" cy="90" r="6" fill="#4A1FD4" />
            <circle cx="320" cy="80" r="6" fill="#4A1FD4" />
            <circle cx="20" cy="120" r="5" fill="#7C4DFF" />
            <circle cx="320" cy="110" r="5" fill="#7C4DFF" />
            <text x="28" y="85" fontSize="9" fill="#4A1FD4" fontWeight="600">Terminal</text>
            <text x="155" y="83" fontSize="9" fill="#4A1FD4" fontWeight="600">Centro</text>
            <text x="290" y="72" fontSize="9" fill="#4A1FD4" fontWeight="600">Norte</text>
          </svg>
        </div>
      )}

      <div className={styles.searchBar}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Buscar linha, origem ou destino..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Campo de busca de linhas de ônibus"
        />
      </div>

      <main className={styles.list} aria-label="Resultados da busca">
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <Bus size={48} strokeWidth={1.2} />
            <p>Nenhuma linha encontrada.</p>
          </div>
        )}
        {filtered.map(route => (
          <article key={route.id} className={styles.routeCard} aria-label={`Linha ${route.number} - ${route.origin} para ${route.destination}`}>
            <div className={styles.routeHeader}>
              <div className={styles.lineNum}>
                <Bus size={16} />
                <span>Linha {route.number}</span>
                {route.accessible && (
                  <span className={styles.accessBadge} aria-label="Acessível para cadeirantes">♿</span>
                )}
              </div>
              <button
                className={`${styles.favBtn} ${isFav(route.id) ? styles.favActive : ''}`}
                onClick={() => toggleFav(route)}
                aria-label={isFav(route.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Star size={18} fill={isFav(route.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className={styles.routeInfo}>
              <div className={styles.stop}>
                <span className={styles.dot} style={{ background: '#22C55E' }} />
                <span className={styles.stopText}>{route.origin}</span>
              </div>
              <div className={styles.line} />
              <div className={styles.stop}>
                <span className={styles.dot} style={{ background: '#EF4444' }} />
                <span className={styles.stopText}>{route.destination}</span>
              </div>
            </div>
            <div className={styles.routeMeta}>
              <span className={styles.duration}>
                <Clock size={14} /> {route.line}
              </span>
              <div className={styles.times}>
                {route.times.slice(0, 3).map(t => (
                  <span key={t} className={styles.timeChip}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </main>

      <MicButton />
    </div>
  )
}

export default BuscarOnibusPage
