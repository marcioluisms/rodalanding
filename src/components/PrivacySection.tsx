import { motion } from "framer-motion";
import { content } from "@/content";
import { Shield } from "lucide-react";

export function PrivacySection() {
  return (
    <section className="py-16 md:py-24 px-4" id="privacidade">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Privacidade & Conformidade</h2>
          <p className="text-lg text-muted-foreground">Segurança e compliance em primeiro lugar</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.privacidade.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex items-start gap-4 p-6 bg-card border border-card-border rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              data-testid={`card-privacy-${index}`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <p className="text-card-foreground leading-relaxed pt-2">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
