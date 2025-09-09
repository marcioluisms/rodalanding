'use client'

import { useState } from 'react'
import styles from '../styles/Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui será implementada a integração com o CRM/email
    console.log('Form submitted:', formData)
    // Limpar formulário após envio
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    })
    alert('Obrigado pelo contato! Em breve retornaremos.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <h2 className="section-title">Está pronto para dar o próximo giro?</h2>
        <p className="section-subtitle">
          Converse com a Roda Automação e descubra como colocar seu negócio em movimento contínuo.
        </p>
        
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Seu e-mail"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Sua empresa"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Como podemos ajudar?"
                className={styles.textarea}
                rows={4}
              />
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitButton}`}>
              Fale com a gente
            </button>
          </form>

          <div className={styles.contactInfo}>
            <h3>Outras formas de contato</h3>
            <p>Email: contato@roda.ai.br</p>
            <p>WhatsApp: (24) 99202-1693</p>
            <div className={styles.socialLinks}>
              {/* Adicionar ícones de redes sociais aqui */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}