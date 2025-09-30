import { motion } from "framer-motion";
import { content } from "@/content";

export function HowItWorks() {
  return (
    <section className="py-14 md:py-20 px-4 anchor-offset" id="como-funciona">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">Como Funciona</h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mt-2">
            Processo simples e transparente em três etapas
          </p>
        </motion.div>

        <div className="relative">
          {/* Linha conectora - visível apenas em telas médias+ */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-zinc-200" style={{ left: '16.666%', right: '16.666%' }} aria-hidden="true" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative z-10">
            {content.comoFunciona.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center"
                data-testid={`card-step-${index}`}
              >
                {/* Número em círculo */}
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-md relative z-20">
                  {index + 1}
                </div>
                
                {/* Card */}
                <div className="w-full p-5 md:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
