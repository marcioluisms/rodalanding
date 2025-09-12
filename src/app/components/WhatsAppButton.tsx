'use client'

import { MessageCircle } from 'lucide-react'
import styles from '../styles/WhatsAppButton.module.css'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511999999999?text=Olá!+Gostaria+de+saber+mais."
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} color="#FFFFFF" />
    </a>
  )
}