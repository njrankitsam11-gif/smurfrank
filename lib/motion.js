// Shared Framer Motion variants. Every animation in the app is built from
// one of these instead of ad hoc inline variants, so trigger/feel/perf stay
// consistent site-wide:
//   trigger — when it fires (mount, scroll into view, hover/tap)
//   feel    — the physics (spring vs. eased tween, duration, stagger)
//   perf    — only `transform`/`opacity` are animated so everything stays
//             on the compositor thread; box-shadow/border changes are done
//             with CSS `:hover` transitions instead of JS-driven motion.

export const EASE_OUT = [0.16, 1, 0.3, 1];

// Trigger: whileInView (once). Feel: smooth eased rise, 0.5s. Perf: opacity + translateY only.
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

// Trigger: parent whileInView. Feel: children cascade in 80ms apart.
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerContainerFast = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

// Trigger: mount, staggered per-word/letter via custom index.
export const heroWord = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: 0.08 * i },
  }),
};

// Trigger: whileHover / whileTap on a card. Feel: snappy spring lift.
// Perf: scale + translateY (transform) only.
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.015,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  tap: { scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 25 } },
};

// Trigger: whileHover on a button. Feel: quick, snappy.
export const buttonTap = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } },
  tap: { scale: 0.97, transition: { type: 'spring', stiffness: 500, damping: 25 } },
};

// Trigger: whileHover on a tile with art. Feel: gentle 3D tilt, bouncy settle.
export const tileTilt = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    rotateX: 4,
    rotateY: -6,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 220, damping: 18 },
  },
};

// Default viewport config for scroll-triggered reveals: fire once, a little
// before the element is fully on screen. This must be a fresh object per
// call site (not one shared constant) — Framer Motion's whileInView tracks
// "has this element already entered" state keyed off the viewport options
// object identity, so multiple simultaneously-mounted components sharing
// one object reference silently stop firing after the first one resolves.
export function viewportOnce() {
  return { once: true, amount: 0.2 };
}
