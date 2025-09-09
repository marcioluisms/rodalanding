import styles from '../styles/Solutions.module.css'

export default function Solutions() {
  const solutions = [
    {
      id: 1,
      title: 'Automação de fluxos',
      description: 'Integramos sistemas e automatizamos tarefas repetitivas, criando um fluxo contínuo de trabalho.',
      icon: '🔄'
    },
    {
      id: 2,
      title: 'RPA',
      description: 'Robôs que executam processos manuais automaticamente, eliminando erros e aumentando a produtividade.',
      icon: '🤖'
    },
    {
      id: 3,
      title: 'IA Generativa',
      description: 'Chatbots, assistentes virtuais e suporte inteligente para otimizar o atendimento e processos.',
      icon: '🧠'
    },
    {
      id: 4,
      title: 'BI e análise de dados',
      description: 'Dashboards claros e insights precisos para decisões estratégicas baseadas em dados.',
      icon: '📊'
    },
    {
      id: 5,
      title: 'Projetos personalizados',
      description: 'Soluções sob medida que se adaptam perfeitamente às necessidades do seu negócio.',
      icon: '🎯'
    }
  ]

  return (
    <section className={`section ${styles.solutions}`}>
      <div className="container">
        <h2 className="section-title">Como fazemos</h2>
        <p className="section-subtitle">
          Transformamos tecnologia em movimento contínuo através de soluções inteligentes e eficientes.
        </p>
        <div className={styles.grid}>
          {solutions.map(solution => (
            <div key={solution.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{solution.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{solution.title}</h3>
              <p className={styles.cardDescription}>{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}