'use client'

import { motion } from 'framer-motion'
import { LOGO_PATH } from './data'
import { cn } from '@/lib/utils'

/**
 * Decorative logo watermark — used as a background brand element.
 * - Renders the official Grace Production logo as a soft background decoration.
 * - Pointer-events disabled so it never blocks UI.
 * - Animates in gently on first paint.
 * - Soft elliptical radial mask fades out the logo's white background so it
 *   blends smoothly into the section behind it (no hard square edge).
 */
export function LogoBackground({
  className,
  opacity = 0.18,
  size = 480,
  rotate = 0,
  position = 'center',
  glow = true,
}: {
  className?: string
  opacity?: number
  size?: number
  rotate?: number
  position?: 'center' | 'top-left' | 'bottom-right' | 'top-right' | 'bottom-left'
  glow?: boolean
}) {
  const positionClass = {
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-left': 'left-12 top-12',
    'bottom-right': 'right-12 bottom-12',
    'top-right': 'right-12 top-12',
    'bottom-left': 'left-12 bottom-12',
  }[position]

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
      className={cn(
        'pointer-events-none absolute select-none',
        positionClass,
        className
      )}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* Soft gold halo behind the logo for a luminous, premium feel */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(212,175,55,0.25) 0%, rgba(106,13,173,0.10) 40%, transparent 70%)',
          }}
        />
      )}
      <img
        src={LOGO_PATH}
        alt=""
        className="relative h-full w-full object-contain"
        style={{
          filter: 'drop-shadow(0 0 28px rgba(212,175,55,0.45))',
          // Soft elliptical vignette so the white background fades smoothly
          // into the section behind it (no hard square edge).
          maskImage:
            'radial-gradient(ellipse 70% 70% at center, black 55%, transparent 92%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at center, black 55%, transparent 92%)',
        }}
      />
    </motion.div>
  )
}
