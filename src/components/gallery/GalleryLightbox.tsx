import { useState, useEffect, useCallback } from 'react';
import type { GalleryImage } from '@/lib/types';

interface Props {
  images: GalleryImage[];
}

export default function GalleryLightbox({ images }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex(i => i === null ? null : (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex(i => i === null ? null : (i + 1) % images.length), [images.length]);

  // Listen for gallery:open custom event dispatched by the static grid
  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<{ index: number }>).detail;
      setIndex(detail.index);
    }
    window.addEventListener('gallery:open', onOpen);
    return () => window.removeEventListener('gallery:open', onOpen);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, prev, next, close]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = index !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [index]);

  if (index === null) return null;

  const image = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={close}
    >
      {/* Close */}
      <button
        onClick={close}
        className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors duration-150 focus:outline-none"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 font-body text-[10px] uppercase tracking-[0.18em] text-white/40">
        {index + 1} / {images.length}
      </span>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors duration-150 focus:outline-none"
          aria-label="Previous image"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Image + caption */}
      <div
        className="flex flex-col items-center gap-4 max-w-[90vw] max-h-[90vh] px-12 md:px-20"
        onClick={e => e.stopPropagation()}
      >
        {image.url ? (
          <img
            src={image.url}
            alt={image.caption ?? ''}
            className="max-w-full max-h-[80vh] object-contain rounded-sm"
          />
        ) : (
          <div
            className="w-[min(680px,80vw)] aspect-4/3 rounded-sm flex items-center justify-center"
            style={{ background: '#1A1A14' }}
          >
            <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/25">
              Photo coming soon
            </span>
          </div>
        )}
        {image.caption && (
          <p className="font-display italic text-[15px] text-white/60 text-center max-w-md leading-snug">
            {image.caption}
          </p>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors duration-150 focus:outline-none"
          aria-label="Next image"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
