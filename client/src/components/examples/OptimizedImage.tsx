import { OptimizedImage } from "../OptimizedImage";

export default function OptimizedImageExample() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Optimized Image Component</h2>
        <p className="text-zinc-600 mb-4">
          Features:
        </p>
        <ul className="list-disc list-inside text-zinc-600 space-y-2 mb-6">
          <li>Lazy loading (loading="lazy")</li>
          <li>Max width 1400px (configurable)</li>
          <li>WebP conversion (when available)</li>
          <li>Aspect ratio control</li>
          <li>Loading placeholder with pulse animation</li>
          <li>Fade-in transition on load</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Example 1: Basic Usage</h3>
        <OptimizedImage
          src="/logo.png"
          alt="Roda IA Logo"
          className="max-w-md rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Example 2: With Aspect Ratio</h3>
        <OptimizedImage
          src="/og.png"
          alt="Roda IA Open Graph Image"
          aspectRatio="16/9"
          className="max-w-2xl rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Example 3: Custom Max Width</h3>
        <OptimizedImage
          src="/og.png"
          alt="Roda IA Banner"
          maxWidth={800}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
