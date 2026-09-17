'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Instagram, Facebook, Sparkles, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE, NAV_ITEMS, SOCIAL_LINKS } from './data'
import { useToast } from '@/hooks/use-toast'

export function Footer() {
  const { toast } = useToast()

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem('email') as HTMLInputElement
    const email = input?.value?.trim()
    if (!email) return
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Erreur')
      toast({
        title: 'Inscription confirmée !',
        description: 'Vous recevrez bientôt nos actualités. Merci !',
      })
      input.value = ''
    } catch {
      toast({
        title: 'Inscription impossible',
        description: "Une erreur est survenue. Réessayez plus tard.",
        variant: 'destructive',
      })
    }
  }

  const scrollTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-night border-t border-gold/15 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-2/3 bg-gold/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
        {/* Top area */}
        <div className="py-12 md:py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gold-gradient flex items-center justify-center gold-glow">
                <span className="font-display font-black text-night text-xl">G</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base font-bold tracking-wide text-cream">
                  GRACE <span className="text-gold">PRODUCTION</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-cream/50">
                  {SITE.tagline}
                </span>
              </div>
            </div>
            <p className="font-display italic text-gold text-lg">« {SITE.slogan} »</p>
            <p className="text-xs text-cream/60 leading-relaxed max-w-xs">
              Structure de production et d'événementiel basée à Kinshasa, dédiée à la conception et à
              la réalisation de projets artistiques, culturels et événementiels à fort impact.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-10 w-10 rounded-xl border border-gold/30 bg-gold/5 flex items-center justify-center text-cream hover:bg-gold-gradient hover:text-night hover:border-gold transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-10 w-10 rounded-xl border border-gold/30 bg-gold/5 flex items-center justify-center text-cream hover:bg-gold-gradient hover:text-night hover:border-gold transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-gold uppercase tracking-wider">
              Liens rapides
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Navigation pied de page">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-sm text-cream/65 hover:text-gold transition-colors w-fit"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-gold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-cream/65">
                <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <span>{SITE.location}</span>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2.5 text-sm text-cream/65 hover:text-gold transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-start gap-2.5 text-sm text-cream/65 hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>{SITE.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-gold uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-xs text-cream/60">
              Recevez nos actualités, lancements de projets et opportunités de partenariat.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="Votre email"
                required
                className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold h-10"
                aria-label="Email pour la newsletter"
              />
              <Button
                type="submit"
                size="sm"
                className="w-full bg-gold-gradient text-night hover:opacity-90 font-semibold h-10"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        {/* Middle band — tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-6 border-y border-gold/15 text-center"
        >
          <p className="font-display text-sm md:text-base text-cream/70 tracking-[0.2em] uppercase">
            Production <span className="text-gold">•</span> Événementiel <span className="text-gold">•</span> Arts{' '}
            <span className="text-gold">•</span> Communication <span className="text-gold">•</span> Partenariats
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/50 text-center md:text-left">
            © {SITE.year} {SITE.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-cream/40">
            <a href="#" className="hover:text-gold transition-colors">
              Mentions légales
            </a>
            <span className="text-gold/30">|</span>
            <a href="#" className="hover:text-gold transition-colors">
              Politique de confidentialité
            </a>
          </div>
          <a
            href="#accueil"
            onClick={scrollTop}
            className="inline-flex items-center gap-2 text-xs text-cream/60 hover:text-gold transition-colors group"
            aria-label="Revenir en haut"
          >
            Haut de page
            <span className="h-8 w-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold-gradient group-hover:text-night group-hover:border-gold transition-all">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
