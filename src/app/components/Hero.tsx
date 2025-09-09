'use client'

import Image from 'next/image'
import styles from '../styles/Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.logo}>
        <Image
          src="/logo.svg"
          alt="Roda Automação"
          width={200}
          height={50}
          priority
        />
      </div>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>Sua empresa em movimento contínuo.</h1>
          <p className={styles.subtitle}>
            Automação com Inteligência Artificial para tornar processos mais ágeis,
            reduzir custos e liberar tempo.
          </p>
          <button 
            className={`btn btn-primary ${styles.cta}`}
            onClick={() => document.getElementById('contact')?.scrollIntoView()}
          >
            Quero colocar minha empresa em movimento
          </button>
        </div>
        <div className={styles.visual}>
          <div className={styles.animatedFlow}></div>
        </div>
      </div>
    </section>
  )
}