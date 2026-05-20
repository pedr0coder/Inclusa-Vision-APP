import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface User {
  name: string
  email: string
  phone: string
  age: string
  disability: string
}

export interface FavoriteRoute {
  id: string
  line: string
  origin: string
  destination: string
  time: string
}

interface AppContextType {
  user: User | null
  setUser: (u: User | null) => void
  isLoggedIn: boolean
  favorites: FavoriteRoute[]
  addFavorite: (r: FavoriteRoute) => void
  removeFavorite: (id: string) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  largeFont: boolean
  toggleLargeFont: () => void
  voiceAssistant: boolean
  toggleVoiceAssistant: () => void
  audioFeedback: boolean
  toggleAudioFeedback: () => void
  speak: (text: string) => void
  isListening: boolean
  startListening: () => void
  stopListening: () => void
  transcript: string
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    try {
      const s = localStorage.getItem('inclusav_user')
      return s ? JSON.parse(s) : null
    } catch { return null }
  })

  const [favorites, setFavorites] = useState<FavoriteRoute[]>(() => {
    try {
      const s = localStorage.getItem('inclusav_favorites')
      return s ? JSON.parse(s) : [
        { id: '1', line: '1h 30min', origin: 'Rod. Express Teotônio, Km 58, Leste - Jundiaí...', destination: 'Terminal Centro', time: '07:30' },
        { id: '2', line: '1h', origin: 'Rod. Marechal Teotônio, Km 58, Leste - Jundiaí...', destination: 'Terminal Norte', time: '08:00' },
      ]
    } catch { return [] }
  })

  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    (localStorage.getItem('inclusav_theme') as 'light' | 'dark') || 'light'
  )
  const [largeFont, setLargeFont] = useState(() => localStorage.getItem('inclusav_largefont') === 'true')
  const [voiceAssistant, setVoiceAssistant] = useState(() => localStorage.getItem('inclusav_voice') !== 'false')
  const [audioFeedback, setAudioFeedback] = useState(() => localStorage.getItem('inclusav_audio') !== 'false')
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('inclusav_theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-large-font', String(largeFont))
    localStorage.setItem('inclusav_largefont', String(largeFont))
  }, [largeFont])

  const setUser = (u: User | null) => {
    setUserState(u)
    if (u) localStorage.setItem('inclusav_user', JSON.stringify(u))
    else localStorage.removeItem('inclusav_user')
  }

  const addFavorite = (r: FavoriteRoute) => {
    setFavorites(prev => {
      const next = [...prev, r]
      localStorage.setItem('inclusav_favorites', JSON.stringify(next))
      return next
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.filter(f => f.id !== id)
      localStorage.setItem('inclusav_favorites', JSON.stringify(next))
      return next
    })
  }

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const toggleLargeFont = () => {
    setLargeFont(v => { localStorage.setItem('inclusav_largefont', String(!v)); return !v })
  }
  const toggleVoiceAssistant = () => {
    setVoiceAssistant(v => { localStorage.setItem('inclusav_voice', String(!v)); return !v })
  }
  const toggleAudioFeedback = () => {
    setAudioFeedback(v => { localStorage.setItem('inclusav_audio', String(!v)); return !v })
  }

  const speak = useCallback((text: string) => {
    if (!audioFeedback) return
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'pt-BR'
      utter.rate = 0.9
      window.speechSynthesis.speak(utter)
    }
  }, [audioFeedback])

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognitionAPI) {
      speak('Reconhecimento de voz não disponível neste dispositivo.')
      return
    }
    const recognition = new SpeechRecognitionAPI()
    recognition.lang = 'pt-BR'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    setIsListening(true)
    setTranscript('')
    recognition.start()
    recognition.onresult = (e: any) => {
      const t = e.results[0][0].transcript
      setTranscript(t)
      setIsListening(false)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
  }, [speak])

  const stopListening = () => setIsListening(false)

  return (
    <AppContext.Provider value={{
      user, setUser, isLoggedIn: !!user,
      favorites, addFavorite, removeFavorite,
      theme, toggleTheme,
      largeFont, toggleLargeFont,
      voiceAssistant, toggleVoiceAssistant,
      audioFeedback, toggleAudioFeedback,
      speak, isListening, startListening, stopListening, transcript
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
