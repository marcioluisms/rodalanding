import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Roda Automação</h3>
            <p>Energia contínua, produtividade automática.</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Roda Automação. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}