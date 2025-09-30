import { ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  maxWidth?: number;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  maxWidth = 1400,
  aspectRatio,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Convert to WebP if supported (check file extension)
  const optimizedSrc = src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg')
    ? src.replace(/\.(png|jpg|jpeg)$/, '.webp')
    : src;

  // Check if WebP version exists, fallback to original
  const imageSrc = optimizedSrc;

  return (
    <div 
      className={cn("relative overflow-hidden bg-zinc-100", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ maxWidth: `${maxWidth}px` }}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-200 animate-pulse" aria-hidden="true" />
      )}
    </div>
  );
}
