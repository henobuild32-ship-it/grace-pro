'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, HERO_IMAGE } from './data'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-night">
      {/* Background image with overlays */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={HERO_IMAGE}
            alt="Festival Père des Orphelins — Grace Production"
            className="h-full w-full object-cover"
          />
        </motion.div>
        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/80 via-night/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,13,13,0.7)_100%)]" />
      </div>

      {/* Decorative gold particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: [0, 0.8, 0], y: -200 }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
            className="absolute h-1 w-1 rounded-full bg-gold"
            style={{
              left: `${5 + i * 7}%`,
              bottom: 0,
              boxShadow: '0 0 8px rgba(212,175,55,0.8)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-8 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 mb-6 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          <span className="text-xs md:text-sm font-medium tracking-wide text-cream/90 uppercase">
            Kinshasa • République Démocratique du Congo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display font-black tracking-tight text-cream text-hero-shadow leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block">GRACE</span>
          <span className="block text-gradient-gold">PRODUCTION</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-display italic text-xl md:text-3xl text-gold mt-4 text-hero-shadow"
        >
          « Réalisez vos rêves. »
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-sm md:text-lg text-cream/80 mt-6 max-w-3xl mx-auto tracking-wide"
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-gold-gradient text-night hover:opacity-90 font-semibold px-7 h-12 text-base shadow-xl shadow-gold/30">
            <Link href="/projets">
              Découvrir nos projets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-gold/40 text-cream hover:bg-gold/10 hover:text-gold hover:border-gold bg-transparent px-7 h-12 text-base">
            <Link href="/a-propos">
              <PlayCircle className="mr-2 h-4 w-4" />
              En savoir plus
            </Link>
          </Button>
        </motion.div>

        {/* Bottom marquee — keywords */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="hidden md:flex items-center justify-center gap-8 mt-16 text-cream/40 text-xs uppercase tracking-[0.3em]"
        >
          <span>Production</span>
          <span className="text-gold">•</span>
          <span>Événementiel</span>
          <span className="text-gold">•</span>
          <span>Arts</span>
          <span className="text-gold">•</span>
          <span>Communication</span>
          <span className="text-gold">•</span>
          <span>Partenariats</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] hidden sm:block">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-9 w-5 rounded-full border border-cream/40 flex items-start justify-center p-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  )
}
