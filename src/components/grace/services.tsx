'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SERVICES } from './data'
import { cn } from '@/lib/utils'

export function Services() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="domaines"
      className="relative section-pad bg-gradient-to-b from-night via-night-soft to-night overflow-hidden"
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4">
            <span className="h-px w-8 bg-gold" />
            Nos Domaines d'Intervention
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight">
            Cinq expertises pour <span className="text-gradient-gold">réaliser vos rêves</span>
          </h2>
          <p className="text-cream/70 mt-4 text-sm md:text-lg">
            De la conception d'un événement à sa logistique, en passant par la production artistique,
            la communication et les partenariats — Grace Production couvre toute la chaîne de valeur.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            const featured = i === 0
            return (
              <motion.article
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border border-gold/15 bg-white/[0.02] hover:border-gold/40 transition-all duration-500',
                  featured && 'lg:col-span-1 lg:row-span-1'
                )}
              >
                {/* Image background */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 h-12 w-12 rounded-xl bg-gold-gradient flex items-center justify-center gold-glow">
                    <Icon className="h-6 w-6 text-night" />
                  </div>
                  {/* Emoji */}
                  <span className="absolute top-4 right-4 text-2xl opacity-90" aria-hidden>
                    {service.emoji}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-cream group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-cream/70 mt-3 leading-relaxed">
                    {service.short}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-5 space-y-2">
                    {service.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-xs text-cream/60"
                      >
                        <Check className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={scrollToContact}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-soft transition-colors group/btn"
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-gold/10 to-transparent pointer-events-none" />
              </motion.article>
            )
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-purple/30 via-night-soft to-night p-8 flex flex-col justify-center items-center text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
            <div className="relative">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-cream">
                Un projet en tête ?
              </h3>
              <p className="text-sm text-cream/70 mt-3 max-w-xs mx-auto">
                Parlons-en. Notre équipe vous répond sous 24h pour étudier votre projet.
              </p>
              <Button
                onClick={scrollToContact}
                className="mt-6 bg-gold-gradient text-night hover:opacity-90 font-semibold h-11 px-6"
              >
                Démarrer un projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
