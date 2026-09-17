'use client'

import * as React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { NAV_ITEMS, SITE } from './data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('accueil')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-night/85 backdrop-blur-xl border-b border-gold/15 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#accueil"
          onClick={(e) => handleNavClick(e, 'accueil')}
          className="flex items-center gap-3 group"
          aria-label="Grace Production — Accueil"
        >
          <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-full bg-gold-gradient flex items-center justify-center gold-glow">
            <span className="font-display font-black text-night text-xl md:text-2xl">G</span>
            <div className="absolute inset-0 rounded-full ring-1 ring-gold/40" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base md:text-lg font-bold tracking-wide text-cream">
              GRACE <span className="text-gold">PRODUCTION</span>
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-cream/50">
              {SITE.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={cn(
                'nav-underline px-4 py-2 text-sm font-medium text-cream/80 hover:text-gold transition-colors',
                activeSection === item.id && 'active text-gold'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile menu */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex bg-gold-gradient text-night hover:opacity-90 font-semibold shadow-lg shadow-gold/20"
            onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, 'partenaires')}
          >
            <a href="#partenaires">
              <Sparkles className="mr-2 h-4 w-4" />
              Devenir partenaire
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-cream hover:bg-gold/10 hover:text-gold"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] bg-night-gradient border-l border-gold/20 p-0"
            >
              <SheetTitle className="sr-only">Menu Grace Production</SheetTitle>
              <div className="flex items-center justify-between p-6 border-b border-gold/15">
                <span className="font-display text-xl font-bold text-gold">Menu</span>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-cream hover:bg-gold/10 hover:text-gold"
                    aria-label="Fermer le menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col p-4" aria-label="Navigation mobile">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-4 text-base font-medium rounded-xl transition-all',
                      activeSection === item.id
                        ? 'bg-gold/10 text-gold border-l-2 border-gold'
                        : 'text-cream/80 hover:bg-white/5 hover:text-gold'
                    )}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#partenaires"
                  onClick={(e) => handleNavClick(e, 'partenaires')}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gold-gradient text-night font-semibold"
                >
                  <Sparkles className="h-4 w-4" />
                  Devenir partenaire
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-gold/30 text-cream hover:bg-gold/10 transition-colors"
                >
                  Nous contacter
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
