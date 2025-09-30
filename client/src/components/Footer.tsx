import { content } from "@/content";
import { Mail, Phone } from "lucide-react";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <BrandMark size={28} withName />
            </div>
            <p className="text-sm text-muted-foreground">
              Consultoria de Automação & IA sob medida para o seu processo
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="mailto:contato%40roda.ia.br"
                rel="nofollow"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {content.contacts.email}
              </a>
              <a
                href={content.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-whatsapp"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {content.contacts.whatsappNumber}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              {[
                { href: "#como-funciona", label: "Como Funciona" },
                { href: "#faq", label: "FAQ" },
                { href: "#privacidade", label: "Privacidade" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {content.brand}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
