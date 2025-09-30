import { useState, useEffect } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { content } from "@/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StickyCtaBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 h-14 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 shadow-lg motion-safe:transition-all motion-safe:duration-300",
        isVisible ? "motion-safe:translate-y-0" : "motion-safe:translate-y-full motion-reduce:hidden"
      )}
      data-testid="sticky-cta-bar"
      aria-hidden={!isVisible}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
          <p className="text-sm font-semibold text-foreground text-center sm:text-left">
            Pronto para automatizar sua operação?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a 
              href={content.contacts.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
              data-testid="button-sticky-whatsapp"
            >
              <Button 
                size="sm" 
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </a>
            <a 
              href="mailto:contato%40roda.ia.br"
              rel="nofollow"
              className="flex-1 sm:flex-none"
              data-testid="button-sticky-email"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full sm:w-auto gap-2 text-sm"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                E-mail
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
