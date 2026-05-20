import React, { useState } from 'react'
import { UserCircle, Mail, Phone, Calendar, LogOut, Edit2, Check, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom'
import styles from './PerfilPage.module.css'

const PerfilPage: React.FC = () => {
  const { user, setUser, speak } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(user || { name: 'Usuário', email: '', phone: '', age: '', disability: '' })

  const handleSave = () => {
    setUser(form)
    speak('Perfil atualizado com sucesso!')
    setEditing(false)
  }

  const handleLogout = () => {
    speak('Saindo da conta.')
    setUser(null)
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <BackButton />
        <h1 className={styles.title}>Perfil</h1>
        <div style={{ width: 40 }} />
      </header>

      <main className={styles.main}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar} aria-label="Foto do usuário">
            <UserCircle size={72} strokeWidth={1.2} />
          </div>
          <h2 className={styles.userName}>{user?.name || 'Usuário'}</h2>
          <p className={styles.userSub}>{user?.disability ? `Deficiência: ${user.disability}` : 'Visitante'}</p>
        </div>

        <div className={styles.card}>
          {!editing ? (
            <>
              <div className={styles.infoRow}>
                <Mail size={18} className={styles.infoIcon} />
                <div>
                  <p className={styles.infoLabel}>E-mail</p>
                  <p className={styles.infoValue}>{user?.email || '—'}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <Phone size={18} className={styles.infoIcon} />
                <div>
                  <p className={styles.infoLabel}>Telefone</p>
                  <p className={styles.infoValue}>{user?.phone || '—'}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <Calendar size={18} className={styles.infoIcon} />
                <div>
                  <p className={styles.infoLabel}>Idade</p>
                  <p className={styles.infoValue}>{user?.age || '—'}</p>
                </div>
              </div>
              <button
                className={styles.editBtn}
                onClick={() => { setEditing(true); speak('Modo de edição ativado.') }}
                aria-label="Editar perfil"
              >
                <Edit2 size={18} /> Editar
              </button>
            </>
          ) : (
            <div className={styles.editForm}>
              {[
                { label: 'Nome', key: 'name', type: 'text' },
                { label: 'E-mail', key: 'email', type: 'email' },
                { label: 'Telefone', key: 'phone', type: 'tel' },
                { label: 'Idade', key: 'age', type: 'number' },
              ].map(({ label, key, type }) => (
                <div key={key} className={styles.field}>
                  <label className={styles.fieldLabel}>{label}</label>
                  <input
                    type={type}
                    className={styles.fieldInput}
                    value={(form as any)[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    aria-label={label}
                  />
                </div>
              ))}
              <div className={styles.editActions}>
                <button className={styles.saveBtn} onClick={handleSave} aria-label="Salvar alterações">
                  <Check size={18} /> Salvar
                </button>
                <button className={styles.cancelBtn} onClick={() => setEditing(false)} aria-label="Cancelar edição">
                  <X size={18} /> Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout} aria-label="Sair da conta">
          <LogOut size={18} /> Sair da conta
        </button>
      </main>
    </div>
  )
}

export default PerfilPage
