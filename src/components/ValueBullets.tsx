import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { content } from "@/content";

export function ValueBullets() {
  return (
    <section className="py-14 md:py-20 px-4 bg-zinc-50 anchor-offset" id="beneficios">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
            Benefícios principais
          </h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mt-2">
            O que você ganha já no MVP — sem trocar de sistema.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.bulletsValor.map((bullet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 p-5 md:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              data-testid={`card-value-${index}`}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center">
                <CheckCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-sm md:text-base font-medium text-zinc-700 dark:text-zinc-200 leading-relaxed">
                {bullet}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
