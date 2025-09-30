import { motion } from "framer-motion";
import { content } from "@/content";
import { Wrench } from "lucide-react";

export function ToolsSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-secondary/30" id="ferramentas">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ferramentas & Tecnologias</h2>
          <p className="text-lg text-zinc-600">Stack tecnológico que utilizamos</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.ferramentas.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="flex items-center gap-3 p-4 bg-white border border-zinc-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              data-testid={`card-tool-${index}`}
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <p className="text-foreground font-medium">{tool}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
