export function NavbarLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <img
        src="/logo.svg"
        alt="Roda IA"
        className="h-6 w-6 rounded-full object-contain inline-block"
        onError={(e) => { 
          e.currentTarget.style.display = 'none'; 
          document.getElementById('logo-fallback')?.classList.remove('hidden'); 
        }}
      />
      <span id="logo-fallback" className="hidden h-6 w-6 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold grid place-items-center text-xs">
        R
      </span>
      <span className="sr-only">Roda IA</span>
    </span>
  );
}
