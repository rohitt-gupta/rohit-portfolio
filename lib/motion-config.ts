/**
 * The hover-card entrance. Tuned for a pointer that is already moving on: the card
 * has to be readable before the hand does, so opacity is a short tween of its own
 * rather than a rider on the spring, which spends its first 100ms barely moving.
 * The spring is left to carry the scale and the tilt, where the overshoot reads as
 * life rather than lag.
 */
export const SPRING_CONFIG = {
  type: "spring" as const,
  visualDuration: 0.22,
  bounce: 0.18,
  opacity: { type: "tween" as const, duration: 0.11, ease: "easeOut" as const },
};

/**
 * Short travel on purpose. The card used to start at 0.6 scale and 40 degrees of
 * tilt, and covering that much distance is most of what made it feel slow; from
 * here it only has to close a hand's width.
 */
export const POP_IN_VARIANT = {
  initial: { opacity: 0, y: 8, scale: 0.92, rotateY: 12 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
  },
  exit: { opacity: 0, y: 6, scale: 0.95 },
};

export const GENERAL_VARIANT = {
  initial: { opacity: 0, scale: 0.6, rotateY: 40, rotateX: 40 },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
  },
  exit: { opacity: 0, y: 20, scale: 0.6 },
};
