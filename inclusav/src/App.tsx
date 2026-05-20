import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import HomePage from './pages/HomePage'
import BuscarOnibusPage from './pages/BuscarOnibusPage'
import FavoritosPage from './pages/FavoritosPage'
import AcessibilidadePage from './pages/AcessibilidadePage'
import AjudaPage from './pages/AjudaPage'
import PerfilPage from './pages/PerfilPage'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/buscar" element={<BuscarOnibusPage />} />
      <Route path="/favoritos" element={<FavoritosPage />} />
      <Route path="/acessibilidade" element={<AcessibilidadePage />} />
      <Route path="/ajuda" element={<AjudaPage />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
