'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

export function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumbs,
}: {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  breadcrumbs?: Crumb[]
}) {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-night-gradient overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-2/3 bg-gold/8 blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs text-cream/50 mb-6"
            aria-label="Fil d'Ariane"
          >
            {breadcrumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="hover:text-gold transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-cream/80">{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-cream/30" />
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4">
              <span className="h-px w-8 bg-gold" />
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cream leading-tight">
            {title} {highlight && <span className="text-gradient-gold">{highlight}</span>}
          </h1>
          {description && (
            <p className="text-cream/70 mt-5 text-sm md:text-lg leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
