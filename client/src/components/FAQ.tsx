import { motion } from "framer-motion";
import { content } from "@/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="py-14 md:py-20 px-4 anchor-offset" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
            Perguntas Frequentes
          </h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mt-2">Tire suas dúvidas sobre nosso serviço</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            aria-label="Perguntas frequentes sobre nossos serviços"
          >
            {content.faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl px-5 md:px-6 shadow-sm hover:shadow-md transition-shadow"
                data-testid={`accordion-item-${index}`}
              >
                <AccordionTrigger 
                  className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline py-4"
                  aria-label={`Pergunta ${index + 1}: ${item.q}`}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
