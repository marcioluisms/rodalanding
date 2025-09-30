import { motion } from "framer-motion";
import { content } from "@/content";
import { Clock } from "lucide-react";

export function SLAsSection() {
  return (
    <section className="py-14 md:py-20 px-4 anchor-offset" id="slas">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">SLAs & Garantias</h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mt-2">Nosso compromisso com prazos e qualidade</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.slas.map((sla, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-5 md:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center"
              data-testid={`card-sla-${index}`}
            >
              <div className="w-12 h-12 bg-primary/10 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-5 h-5 text-primary dark:text-white" aria-hidden="true" />
              </div>
              <p className="text-sm md:text-base text-foreground leading-relaxed">{sla}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
