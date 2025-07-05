import { Variants } from 'framer-motion';

export const barProgressColorVariants: Variants = {
  playing: {
    backgroundColor: '#8B5CF6',
    opacity: 1,
  },
  pause: {
    backgroundColor: '#717680',
    opacity: 1,
  },
  loading: {
    backgroundColor: '#717680',
    opacity: 0.5,
  },
};

export const barVariants: Variants = {
  loading: {
    height: 16,
    opacity: 0.5,
    transition: { ease: 'easeInOut', duration: 0.5 },
  },
  pause: {
    height: 6,
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.5 },
  },
  playing: (custom: number) => ({
    height: [6, 32, 6],
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom,
      opacity: {
        duration: 0.1,
      },
    },
  }),
};
export const diskVariants: Variants = {
  playing: {
    opacity: 1,
    rotate: 360,
    scale: 1,
    transition: {
      rotate: {
        repeat: Infinity,
        duration: 20,
        ease: 'linear',
      },
    },
  },
  pause: {
    opacity: 1,
    rotate: 0,
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 5,
    },
  },
  loading: {
    opacity: 0.5,
    rotate: 0,
    scale: 0.9,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 5,
    },
  },
};

export const buttonPlayPauseVariants: Variants = {
  playing: {
    backgroundColor: '#8B5CF6',
  },
  pause: {
    backgroundColor: '#7C3AED',
  },
  loading: {
    backgroundColor: '#717680',
  },
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};

export const containerVariants: Variants = {
  playing: {
    boxShadow: '5px 5px 10px #8B5CF6',
  },
  pause: {
    boxShadow: '5px 5px 10px #0F0F0F',
  },
  loading: {
    boxShadow: '5px 5px 10px #717680',
  },
};
