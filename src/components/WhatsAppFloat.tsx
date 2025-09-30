import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { content } from "@/content";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mobile: sempre visível
      // Desktop: visível após 600px de scroll
      const isMobile = window.innerWidth < 768;
      const scrolled = window.scrollY > 600;
      
      setIsVisible(isMobile || scrolled);
    };

    // Check initial state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <a
      href={content.contacts.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      className={cn(
        "fixed bottom-20 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-110 hover:shadow-xl",
        isVisible ? "opacity-100 motion-safe:translate-y-0" : "opacity-0 motion-safe:translate-y-10 pointer-events-none",
        !isVisible && "motion-reduce:opacity-0"
      )}
      data-testid="button-whatsapp-float"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
