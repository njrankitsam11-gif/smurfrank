'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { EASE_OUT } from '../../lib/motion';

export default function Slideshow({
  images,
  accentColor = '#FFC531',
  intervalMs = 5500,
  priority = false,
  showControls = true,
  overlay = true,
  className,
  ariaLabel = 'Featured art',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Index of the slide crossfading out, or null once its transition has
  // finished. Tracked and cleared manually (rather than via
  // AnimatePresence's exit-completion callback) so at most two slides are
  // ever mounted, guaranteed by construction instead of relying on
  // animation-complete tracking.
  const [prevIndex, setPrevIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const prevCleanupTimer = useRef(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const handleChange = (e) => setReducedMotion(e.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    return () => {
      if (prevCleanupTimer.current) clearTimeout(prevCleanupTimer.current);
    };
  }, []);

  const goTo = useCallback(
    (index) => {
      const next = ((index % images.length) + images.length) % images.length;
      if (next === currentIndexRef.current) return;

      setPrevIndex(currentIndexRef.current);
      setCurrentIndex(next);
      currentIndexRef.current = next;

      if (prevCleanupTimer.current) clearTimeout(prevCleanupTimer.current);
      prevCleanupTimer.current = setTimeout(() => setPrevIndex(null), reducedMotion ? 0 : 850);
    },
    [images.length, reducedMotion]
  );

  useEffect(() => {
    if (reducedMotion || isPaused || images.length <= 1) return undefined;
    const id = setInterval(() => {
      goTo(currentIndexRef.current + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reducedMotion, isPaused, images.length, intervalMs, goTo]);

  if (!images || images.length === 0) return null;

  const active = images[currentIndex];
  const previous = prevIndex !== null ? images[prevIndex] : null;
  const activeAccent = active.accent || accentColor;
  const fadeDuration = reducedMotion ? 0 : 0.8;

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={handleBlur}
    >
      {previous && (
        <motion.div
          key={`prev-${prevIndex}`}
          aria-hidden="true"
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: fadeDuration, ease: EASE_OUT }}
        >
          <Image src={previous.src} alt="" fill sizes="100vw" className="object-cover object-center" />
        </motion.div>
      )}
      <motion.div
        key={`current-${currentIndex}`}
        className="absolute inset-0"
        initial={{ opacity: previous ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: fadeDuration, ease: EASE_OUT }}
      >
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="100vw"
          priority={priority && currentIndex === 0}
          className="object-cover object-center"
        />
      </motion.div>

      {overlay && <div aria-hidden="true" className="absolute inset-0 z-[1] bg-black/65" />}

      <div className="sr-only" aria-live="polite">
        {`Showing ${currentIndex + 1} of ${images.length}: ${active.alt}`}
      </div>

      {showControls && images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(currentIndex - 1)}
            aria-label="Previous slide"
            className="focus-ring absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lg text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(currentIndex + 1)}
            aria-label="Next slide"
            className="focus-ring absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lg text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            ›
          </button>

          <div className="absolute inset-x-0 bottom-4 z-10 hidden items-center justify-center gap-2 sm:flex">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === currentIndex}
                className={cn(
                  'focus-ring h-2 rounded-full transition-all',
                  i === currentIndex ? 'w-6' : 'w-2 bg-white/40 hover:bg-white/70'
                )}
                style={i === currentIndex ? { backgroundColor: activeAccent } : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
