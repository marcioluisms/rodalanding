import { StickyCtaBar } from "../StickyCtaBar";

export default function StickyCtaBarExample() {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sticky CTA Bar</h2>
        <p className="text-zinc-600 mb-2">
          • Aparece após 40% de scroll
        </p>
        <p className="text-zinc-600 mb-2">
          • Fixa no bottom com backdrop blur
        </p>
        <p className="text-zinc-600">
          • Botões WhatsApp e E-mail lado a lado
        </p>
      </div>
      <div className="h-[3000px] bg-gradient-to-b from-zinc-100 to-zinc-200 rounded-lg p-8">
        <p className="text-zinc-600">Scroll 40% da página para ver a barra sticky aparecer...</p>
      </div>
      <StickyCtaBar />
    </div>
  );
}
