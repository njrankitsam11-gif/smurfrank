'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { buttonTap } from '../../lib/motion';

const VARIANTS = {
  primary: 'bg-gold-400 text-ink-950 shadow-gold hover:bg-gold-300',
  outline: 'bg-transparent text-ink-50 border border-ink-500 hover:border-gold-400 hover:text-gold-300',
  ghost: 'bg-transparent text-ink-200 hover:text-ink-50 hover:bg-ink-700',
  dark: 'bg-ink-700 text-ink-50 border border-ink-500 hover:border-ink-300',
};

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const create = motion.create || motion;
const MotionButtonTag = create('button');
const MotionLinkTag = create(Link);

export default function Button({ children, variant = 'primary', size = 'md', href, className, ...props }) {
  const classes = cn(
    'focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-bold uppercase tracking-wide transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const Tag = href ? MotionLinkTag : MotionButtonTag;

  return (
    <Tag
      href={href}
      className={classes}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonTap}
      {...props}
    >
      {children}
    </Tag>
  );
}
