import { WhatsAppFloat } from "../WhatsAppFloat";

export default function WhatsAppFloatExample() {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">WhatsApp Float Button</h2>
        <p className="text-zinc-600 mb-2">
          • Mobile ({"<"}768px): Sempre visível
        </p>
        <p className="text-zinc-600 mb-2">
          • Desktop (≥768px): Aparece após 600px de scroll
        </p>
        <p className="text-zinc-600">
          • 56px de diâmetro, verde WhatsApp (#25D366)
        </p>
      </div>
      <div className="h-[2000px] bg-gradient-to-b from-zinc-100 to-zinc-200 rounded-lg p-8">
        <p className="text-zinc-600">Scroll para testar o comportamento do botão...</p>
      </div>
      <WhatsAppFloat />
    </div>
  );
}
