'use client'

import { motion } from 'framer-motion'
import { LOGO_PATH } from './data'
import { cn } from '@/lib/utils'

/**
 * Decorative logo watermark — used as a background brand element.
 * - Renders the official Grace Production logo as a visible background decoration.
 * - Pointer-events disabled so it never blocks UI.
 * - Animates in gently on first paint.
 * - Soft radial mask fades out the square corners of the logo's white background.
 */
export function LogoBackground({
  className,
  opacity = 0.5,
  size = 480,
  rotate = -8,
  position = 'center',
  blend = 'normal',
}: {
  className?: string
  opacity?: number
  size?: number
  rotate?: number
  position?: 'center' | 'top-left' | 'bottom-right' | 'top-right' | 'bottom-left'
  blend?: 'screen' | 'overlay' | 'normal' | 'soft-light' | 'lighten' | 'multiply'
}) {
  const positionClass = {
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-left': 'left-12 top-12',
    'bottom-right': 'right-12 bottom-12',
    'top-right': 'right-12 top-12',
    'bottom-left': 'left-12 bottom-12',
  }[position]

  const blendClass: Record<typeof blend, string> = {
    screen: 'mix-blend-screen',
    overlay: 'mix-blend-overlay',
    normal: '',
    'soft-light': 'mix-blend-soft-light',
    lighten: 'mix-blend-lighten',
    multiply: 'mix-blend-multiply',
  }

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 }}
      className={cn(
        'pointer-events-none absolute select-none',
        positionClass,
        blendClass[blend],
        className
      )}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <img
        src={LOGO_PATH}
        alt=""
        className="h-full w-full object-contain"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.55))',
          // Soft elliptical vignette so the white background of the logo fades
          // smoothly into the section behind it (no hard square edge).
          maskImage:
            'radial-gradient(ellipse 65% 65% at center, black 60%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 65% 65% at center, black 60%, transparent 90%)',
        }}
      />
    </motion.div>
  )
}
