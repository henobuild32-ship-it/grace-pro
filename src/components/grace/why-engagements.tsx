'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { WHY_POINTS, ENGAGEMENTS } from './data'

export function WhyGrace() {
  return (
    <section className="relative section-pad bg-gradient-to-b from-night to-night-soft overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Quote className="h-10 w-10 text-gold/60 mx-auto mb-6" />
          <p className="font-display text-2xl md:text-4xl font-medium text-cream leading-snug italic">
            « Parce qu'un grand projet mérite plus qu'une simple organisation. Il mérite une{' '}
            <span className="text-gradient-gold not-italic font-semibold">vision</span>, une{' '}
            <span className="text-gradient-gold not-italic font-semibold">stratégie</span>, une{' '}
            <span className="text-gradient-gold not-italic font-semibold">équipe</span>, un{' '}
            <span className="text-gradient-gold not-italic font-semibold">réseau</span> et une
            exécution professionnelle. »
          </p>
          <p className="mt-6 text-sm text-cream/60 uppercase tracking-[0.3em]">
            — Grace Production
          </p>
        </motion.div>

        {/* Why points */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_POINTS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-gold/15 bg-white/[0.02] p-6 hover:border-gold/40 transition-all hover:-translate-y-1"
              >
                <div className="absolute -top-3 -left-3 h-14 w-14 rounded-2xl bg-gold-gradient flex items-center justify-center gold-glow">
                  <Icon className="h-7 w-7 text-night" />
                </div>
                <div className="pt-6 pl-12">
                  <h3 className="font-display text-xl font-bold text-cream">{p.title}</h3>
                  <p className="text-sm text-cream/65 mt-2 leading-relaxed">{p.description}</p>
                </div>
                {/* Number */}
                <span className="absolute bottom-4 right-4 font-display text-5xl font-black text-gold/10">
                  0{i + 1}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Engagements() {
  return (
    <section className="relative section-pad bg-night-soft overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4">
            <span className="h-px w-8 bg-gold" />
            Notre Engagement
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight">
            Six valeurs qui guident <span className="text-gradient-gold">chacune de nos actions</span>
          </h2>
          <p className="text-cream/70 mt-4 text-sm md:text-lg">
            Notre engagement ne se limite pas à l'organisation d'un événement. Il s'inscrit dans une
            démarche de qualité, de confiance et d'impact durable.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ENGAGEMENTS.map((e, i) => {
            const Icon = e.icon
            return (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-br from-white/[0.04] to-transparent p-6 hover:border-gold/40 transition-all"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-purple/5 transition-all duration-500" />

                <div className="relative flex items-start gap-4">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold-gradient group-hover:gold-glow transition-all">
                    <Icon className="h-6 w-6 text-gold group-hover:text-night transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream">{e.title}</h3>
                    <p className="text-xs text-cream/65 mt-2 leading-relaxed">{e.description}</p>
                  </div>
                </div>

                {/* Number indicator */}
                <span className="absolute top-2 right-3 font-display text-4xl font-black text-gold/5">
                  0{i + 1}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
