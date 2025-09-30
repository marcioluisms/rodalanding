import { motion } from "framer-motion";
import { content } from "@/content";
import { CheckCircle } from "lucide-react";

export function HowWeWork() {
  return (
    <section 
      className="py-14 md:py-20 px-4 bg-white dark:bg-zinc-950 anchor-offset" 
      id="como-trabalhamos"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
            Como Trabalhamos
          </h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mt-2">
            {content.comoTrabalhamos.visaoGeral}
          </p>
        </motion.div>

        <ol 
          className="relative space-y-6 md:space-y-6"
          aria-label="Passos do nosso processo"
        >
          {/* Linha conectora vertical */}
          <div 
            className="hidden md:block absolute left-5 top-8 bottom-8 w-px bg-zinc-200 dark:bg-zinc-800" 
            aria-hidden="true"
          />

          {content.comoTrabalhamos.passos.map((passo, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="relative"
              data-testid={`step-${index}`}
            >
              <div className="flex items-start gap-4 md:gap-6">
                {/* Badge numerado */}
                <div className="relative z-10 flex-shrink-0 size-9 md:size-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-semibold text-base md:text-lg shadow-sm">
                  {index + 1}
                </div>

                {/* Card do passo */}
                <div className="flex-1 p-5 md:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-4">
                    {passo.h3}
                  </h3>
                  
                  <ul className="space-y-3">
                    {passo.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex} 
                        className="flex items-start gap-3"
                        data-testid={`step-${index}-item-${itemIndex}`}
                      >
                        <CheckCircle 
                          className="w-5 h-5 text-zinc-900 dark:text-white flex-shrink-0 mt-0.5" 
                          aria-hidden="true" 
                        />
                        <span className="text-sm md:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Nota de rodapé */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Tempo típico até o MVP: 14 dias úteis.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
