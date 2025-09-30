import { BackToTop } from "../BackToTop";

export default function BackToTopExample() {
  return (
    <div className="min-h-screen">
      <div className="h-[2000px] p-8">
        <p>Scroll down to see the back to top button appear...</p>
      </div>
      <BackToTop />
    </div>
  );
}
