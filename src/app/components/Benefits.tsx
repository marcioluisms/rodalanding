import styles from '../styles/Benefits.module.css'

export default function Benefits() {
  const benefits = [
    {
      id: 1,
      title: 'Produtividade sem esforço',
      description: 'Processos mais rápidos e inteligentes, liberando sua equipe para focar no que realmente importa.',
      metric: 'Até 70% menos tempo em tarefas manuais'
    },
    {
      id: 2,
      title: 'Economia real',
      description: 'Redução significativa de custos operacionais através da automação inteligente de processos.',
      metric: 'Economia de 30-50% em custos operacionais'
    },
    {
      id: 3,
      title: 'Acesso à inovação',
      description: 'Tecnologia avançada traduzida em soluções simples e acessíveis para qualquer empresa.',
      metric: 'Implementação em até 2 semanas'
    },
    {
      id: 4,
      title: 'Parceria contínua',
      description: 'Acompanhamento constante para garantir que sua automação evolua junto com seu negócio.',
      metric: 'Suporte 24/7 e atualizações contínuas'
    }
  ]

  return (
    <section className={`section ${styles.benefits}`}>
      <div className="container">
        <h2 className="section-title">Por que Roda Automação</h2>
        <div className={styles.grid}>
          {benefits.map(benefit => (
            <div key={benefit.id} className={styles.card}>
              <div className={styles.content}>
                <h3 className={styles.title}>{benefit.title}</h3>
                <p className={styles.description}>{benefit.description}</p>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>{benefit.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}