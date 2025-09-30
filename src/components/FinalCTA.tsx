import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { content } from "@/content";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-14 md:py-20 px-4 bg-secondary/30 anchor-offset" id="contato">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight max-w-prose mx-auto">
            {content.chamadaFinal.title}
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-prose mx-auto mb-6">
            Entre em contato e agende sua conversa inicial.
          </p>
          <a href={content.contacts.whatsappLink} target="_blank" rel="noopener noreferrer" data-testid="button-cta-final">
            <Button className="text-sm md:text-base px-5 py-3 hover-elevate active-elevate-2 gap-2">
              {content.chamadaFinal.cta}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
