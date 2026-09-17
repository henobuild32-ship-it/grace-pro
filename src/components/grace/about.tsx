'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, ABOUT_IMAGE } from './data'
import { LogoBackground } from './logo-background'

const STATS = [
  { value: '5', label: "Domaines d'intervention" },
  { value: '2', label: 'Projets phares' },
  { value: '100%', label: 'Engagement & passion' },
  { value: '∞', label: 'Idées à réaliser' },
]

export function About() {
  return (
    <section
      id="a-propos"
      className="relative section-pad bg-night overflow-hidden"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 -left-32 h-96 w-96 rounded-full bg-purple/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-gold/15 blur-[120px] pointer-events-none" />

      {/* Decorative logo watermark in background */}
      <LogoBackground
        opacity={0.18}
        size={560}
        rotate={12}
        position="top-right"
      />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden gold-glow">
              <img
                src={ABOUT_IMAGE}
                alt="Festival Père des Orphelins — affiche officielle"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 -bottom-4 -right-4 border border-gold/20 rounded-3xl -z-10" />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-2 md:right-6 glass-card rounded-2xl p-5 max-w-[220px] gold-glow"
            >
              <p className="font-display text-3xl font-bold text-gold leading-none">10+</p>
              <p className="text-xs text-cream/70 mt-2">
                d&apos;expérience cumulée en production &amp; événementiel
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4">
                <span className="h-px w-8 bg-gold" />
                Qui sommes-nous ?
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight">
                Une structure dédiée à la <span className="text-gradient-gold">production</span> et
                à l'<span className="text-gradient-gold">événementiel</span> à fort impact.
              </h2>
              <p className="text-cream/70 text-base md:text-lg mt-6 leading-relaxed">
                Grace Production est une structure de production et d'événementiel basée à Kinshasa,
                dédiée à la conception, à la production et à la réalisation de projets artistiques,
                culturels, événementiels et médiatiques à fort impact.
              </p>
              <p className="text-cream/60 text-sm md:text-base mt-4 leading-relaxed">
                Nous accompagnons chaque projet de sa conception à sa réalisation, avec une approche
                fondée sur la qualité, la créativité, la rigueur et l'innovation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Button asChild className="bg-gold-gradient text-night hover:opacity-90 font-semibold h-12 px-6">
                <Link href="/a-propos">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Vision & Mission quick cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 grid sm:grid-cols-2 gap-4"
            >
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-display text-lg font-bold text-gold mb-2">Notre Vision</h3>
                <p className="text-xs text-cream/70 leading-relaxed">
                  Devenir une référence majeure dans l'industrie événementielle et culturelle en RDC
                  et contribuer au rayonnement des talents congolais au-delà des frontières.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-display text-lg font-bold text-gold mb-2">Notre Mission</h3>
                <p className="text-xs text-cream/70 leading-relaxed">
                  Accompagner chaque projet de sa conception à sa réalisation, avec qualité,
                  créativité, rigueur et innovation, pour des événements structurés et une
                  visibilité optimale.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl border border-gold/15 bg-white/[0.02] hover:bg-gold/5 transition-colors"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-cream/60 mt-2 uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
