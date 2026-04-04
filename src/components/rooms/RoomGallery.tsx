import { useState, useEffect, useCallback } from "react";
import SmartImage from "@/components/shared/SmartImage";

interface Props {
  images: string[];
  roomName: string;
}

export default function RoomGallery({ images, roomName }: Props) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasImages = images.length > 0;

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setLightboxOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prev, next]);

  // Placeholder when no images
  if (!hasImages) {
    return (
      <SmartImage
        src="/images/no-image.svg"
        alt="No images available"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    );
  }

  return (
    <>
      {/* Main image */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setLightboxOpen(true)}
          className="w-full aspect-4/3 rounded-sm overflow-hidden relative block group focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
          aria-label={`View ${roomName} gallery`}
        >
          <SmartImage
            src={images[active]}
            alt={`${roomName} — image ${active + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Expand hint */}
          <span className="absolute bottom-3 right-3 bg-green-deep/80 text-cream font-body text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Expand
          </span>
          {/* Counter */}
          {images.length > 1 && (
            <span className="absolute top-3 right-3 bg-green-deep/70 text-cream font-body text-[10px] px-2.5 py-1 rounded-sm">
              {active + 1} / {images.length}
            </span>
          )}
        </button>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={[
                  "shrink-0 w-16 h-16 rounded-sm overflow-hidden transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre",
                  i === active
                    ? "ring-2 ring-ochre"
                    : "opacity-60 hover:opacity-100",
                ].join(" ")}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
              >
                <SmartImage
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-green-deep/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-cream/70 hover:text-cream transition-colors duration-150 focus:outline-none"
            aria-label="Close gallery"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-8 text-cream/70 hover:text-cream transition-colors duration-150 focus:outline-none"
              aria-label="Previous image"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] px-16 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage
              src={images[active]}
              alt={`${roomName} — image ${active + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-sm"
            />
            <p className="font-body text-[10px] text-stone/50 text-center mt-3 tracking-widest">
              {active + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-8 text-cream/70 hover:text-cream transition-colors duration-150 focus:outline-none"
              aria-label="Next image"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
