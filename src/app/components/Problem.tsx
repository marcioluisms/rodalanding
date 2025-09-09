import styles from '../styles/Problem.module.css'

export default function Problem() {
  const problems = [
    {
      id: 1,
      title: 'Processos manuais',
      description: 'Tarefas repetitivas que consomem tempo e energia valiosos da sua equipe.'
    },
    {
      id: 2,
      title: 'Sistemas isolados',
      description: 'Ferramentas e sistemas que não se comunicam, gerando retrabalho e inconsistências.'
    },
    {
      id: 3,
      title: 'Decisões sem dados',
      description: 'Falta de informações confiáveis e organizadas para tomar decisões estratégicas.'
    },
    {
      id: 4,
      title: 'Custos elevados',
      description: 'Desperdício de recursos que poderiam ser otimizados com mais eficiência.'
    }
  ]

  return (
    <section className={`section ${styles.problem}`}>
      <div className="container">
        <div className={styles.content}>
          {problems.map(problem => (
            <div key={problem.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <div className={styles.icon}></div>
              </div>
              <h3 className={styles.cardTitle}>{problem.title}</h3>
              <p className={styles.cardDescription}>{problem.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.transition}>
          <p className={styles.transitionText}>
            A Roda Automação nasceu para transformar esse cenário.
          </p>
        </div>
      </div>
    </section>
  )
}