import React, { useState, useRef, useEffect } from 'react'
import { HelpCircle, Send, ChevronDown, ChevronUp } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import styles from './AjudaPage.module.css'

const faqs = [
  { q: 'Como buscar linhas diferentes?', a: 'Na tela principal, toque em "Buscar Ônibus". Você pode digitar o número da linha, origem ou destino. Também pode usar o assistente de voz tocando no botão do microfone.' },
  { q: 'Como salvar uma linha favorita?', a: 'Ao buscar uma linha, toque no ícone de estrela no canto do cartão da linha. Ela será salva na sua lista de favoritos.' },
  { q: 'Como ativar o assistente de voz?', a: 'Toque no botão roxo com o ícone de microfone na parte inferior da tela. Fale naturalmente e o app vai entender sua busca.' },
  { q: 'Como aumentar o tamanho do texto?', a: 'Vá em "Acessibilidade" no menu principal e ative a opção "Fonte Grande".' },
  { q: 'O app funciona offline?', a: 'Algumas funcionalidades básicas funcionam offline, mas para buscar linhas em tempo real é necessária conexão com a internet.' },
]

interface Message {
  role: 'assistant' | 'user'
  text: string
}

const AjudaPage: React.FC = () => {
  const { speak, user } = useApp()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: `Olá${user ? ` ${user.name}` : ''}! Me informe qual é a sua dúvida.` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)

    // Simulate smart response
    await new Promise(r => setTimeout(r, 900))
    const lower = text.toLowerCase()
    let reply = 'Desculpe, não entendi sua dúvida. Pode reformular?'

    if (lower.includes('favorit')) reply = faqs[1].a
    else if (lower.includes('buscar') || lower.includes('linha') || lower.includes('ônibus')) reply = faqs[0].a
    else if (lower.includes('voz') || lower.includes('microfone')) reply = faqs[2].a
    else if (lower.includes('fonte') || lower.includes('texto') || lower.includes('tamanho')) reply = faqs[3].a
    else if (lower.includes('offline') || lower.includes('internet')) reply = faqs[4].a
    else if (lower.includes('olá') || lower.includes('oi') || lower.includes('bom dia')) reply = `Olá! Como posso ajudar você hoje?`
    else if (lower.includes('obrigad')) reply = 'De nada! Estou sempre à disposição.'
    else reply = `Recebi sua mensagem: "${text}". Nossa equipe analisará sua dúvida. Enquanto isso, confira as perguntas frequentes acima!`

    setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    speak(reply)
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <BackButton />
        <h1 className={styles.title}>Ajuda</h1>
        <div style={{ width: 40 }} />
      </header>

      <main className={styles.main}>
        <section className={styles.faqSection} aria-labelledby="faq-title">
          <h2 id="faq-title" className={styles.sectionTitle}>Perguntas Frequentes</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => { setOpenFaq(openFaq === i ? null : i); speak(faq.q) }}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <HelpCircle size={16} className={styles.faqIcon} />
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openFaq === i && (
                  <div id={`faq-answer-${i}`} className={styles.faqAnswer} role="region">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.chatSection} aria-labelledby="chat-title">
          <h2 id="chat-title" className={styles.sectionTitle}>Fale com nosso atendimento</h2>
          <div className={styles.chat} aria-live="polite" aria-label="Chat de atendimento">
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.assistantBubble}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className={`${styles.bubble} ${styles.assistantBubble}`}>
                <span className={styles.typing}>
                  <span /><span /><span />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="Digitar..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              aria-label="Campo de mensagem para atendimento"
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Enviar mensagem"
            >
              <Send size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AjudaPage
