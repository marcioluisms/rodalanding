import { FAQSchema } from "../FAQSchema";

export default function FAQSchemaExample() {
  return (
    <div className="p-8">
      <p className="mb-4 text-zinc-600">
        O componente FAQSchema injeta automaticamente o JSON-LD no &lt;head&gt; da página.
        <br />
        Abra o DevTools e inspecione o &lt;head&gt; para ver o script com type="application/ld+json".
      </p>
      <FAQSchema />
      <div className="mt-4 p-4 bg-zinc-100 rounded-lg">
        <code className="text-sm">
          JSON-LD FAQPage injetado com sucesso no &lt;head&gt;
        </code>
      </div>
    </div>
  );
}
