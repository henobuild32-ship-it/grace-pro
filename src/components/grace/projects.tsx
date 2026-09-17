'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Target, Users, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PROJECTS } from './data'
import { cn } from '@/lib/utils'

export function Projects() {
  const scrollToPartners = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('partenaires')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="projets" className="relative section-pad bg-night overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

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
            Nos Projets Phares
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight">
            Des projets qui <span className="text-gradient-gold">transforment</span> et qui{' '}
            <span className="text-gradient-gold">rassemblent</span>
          </h2>
          <p className="text-cream/70 mt-4 text-sm md:text-lg">
            Deux projets à fort impact social, culturel et spirituel, portés par Grace Production à
            Kinshasa.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="mt-16 space-y-8 md:space-y-12">
          {PROJECTS.map((project, i) => {
            const isReverse = i % 2 === 1
            const themeAccent =
              project.theme === 'social' ? 'from-gold/30' : 'from-purple/30'
            return (
              <motion.article
                key={project.id}
                id={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-3xl border border-gold/15 bg-white/[0.02] hover:border-gold/30 transition-colors"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div
                    className={cn(
                      'relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden',
                      isReverse && 'lg:order-2'
                    )}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent lg:bg-gradient-to-r" />
                    <div
                      className={cn(
                        'absolute inset-0 bg-gradient-to-tr',
                        themeAccent,
                        'to-transparent mix-blend-overlay'
                      )}
                    />
                    {/* Tag */}
                    <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-night/70 backdrop-blur-md border border-gold/30 px-4 py-1.5">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          project.theme === 'social' ? 'bg-gold' : 'bg-purple'
                        )}
                      />
                      <span className="text-[11px] uppercase tracking-[0.2em] text-cream/80">
                        {project.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                    <h3 className="font-display text-2xl md:text-4xl font-bold text-cream leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-cream/70 mt-5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Objectives */}
                    <div className="mt-8">
                      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                        <Target className="h-4 w-4" />
                        Objectifs
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.objectives.map((o) => (
                          <div
                            key={o}
                            className="flex items-start gap-2 text-xs text-cream/70"
                          >
                            <span className="mt-1 h-1 w-1 rounded-full bg-gold shrink-0" />
                            <span>{o}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Audience */}
                    <div className="mt-6">
                      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                        <Users className="h-4 w-4" />
                        Public cible
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.audience.map((a) => (
                          <span
                            key={a}
                            className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[11px] text-cream/80"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-cream/50">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" /> Kinshasa, RDC
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> Édition 2025
                      </span>
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        onClick={scrollToPartners}
                        size="sm"
                        className="bg-gold-gradient text-night hover:opacity-90 font-semibold h-11 px-5"
                      >
                        {project.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        onClick={scrollToPartners}
                        size="sm"
                        variant="outline"
                        className="border-gold/40 text-cream hover:bg-gold/10 hover:text-gold hover:border-gold bg-transparent h-11 px-5"
                      >
                        {project.ctaSecondary}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
