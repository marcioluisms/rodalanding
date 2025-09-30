import { useState, useRef } from "react";

interface BrandMarkProps {
  size?: number | string;
  withName?: boolean;
}

export function BrandMark({ size = 24, withName = false }: BrandMarkProps) {
  const [imageError, setImageError] = useState(false);
  const px = typeof size === "number" ? `${size}px` : size;
  
  return (
    <span className="inline-flex items-center gap-2">
      {!imageError && (
        <img
          src="/logo.svg"
          alt="Roda IA"
          width={px}
          height={px}
          className="inline-block shrink-0 rounded-full object-contain"
          onError={() => setImageError(true)}
        />
      )}
      {imageError && (
        <span 
          className="grid place-items-center rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold shrink-0 text-xs"
          style={{ width: px, height: px }}
        >
          R
        </span>
      )}
      {withName && <span className="font-semibold tracking-tight">Roda IA</span>}
    </span>
  );
}
