import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { content } from "@/content";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-[calc(var(--nav-h)+2.5rem)] md:pt-[calc(var(--nav-h)+5rem)] pb-12 md:pb-16 px-4" id="hero">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-semibold tracking-tight text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.1] md:leading-[1.08] text-zinc-900 dark:text-white mb-6">
            {content.hero.title}
          </h1>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            {content.hero.subtitle}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={content.contacts.whatsappLink} target="_blank" rel="noopener noreferrer" data-testid="button-cta-hero">
              <Button className="text-sm md:text-base px-5 py-3 hover-elevate active-elevate-2 gap-2 w-full sm:w-auto">
                {content.hero.cta}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </a>
            <a href="mailto:contato%40roda.ia.br" rel="nofollow" data-testid="button-email-hero">
              <Button variant="outline" className="text-sm md:text-base px-5 py-3 hover-elevate active-elevate-2 w-full sm:w-auto">
                Enviar E-mail
              </Button>
            </a>
          </motion.div>
        </motion.div>
        <div className="mt-8 md:mt-12 h-px bg-zinc-200/60 dark:bg-zinc-700/60"></div>
      </div>
    </section>
  );
}
