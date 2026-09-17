'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Sparkles, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { NAV_ITEMS, SITE, LOGO_PATH } from './data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Solid navbar on admin/login routes
  const isAdmin = pathname.startsWith('/admin') || pathname === '/connexion'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-safe',
        scrolled || isAdmin
          ? 'bg-night/90 backdrop-blur-xl border-b border-gold/15 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Grace Production — Accueil"
        >
          <div className="relative h-11 w-11 md:h-12 md:w-12 rounded-full overflow-hidden bg-gold/10 ring-1 ring-gold/40 gold-glow flex items-center justify-center">
            <img
              src={LOGO_PATH}
              alt="Logo Grace Production"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base md:text-lg font-bold tracking-wide text-cream">
              GRACE <span className="text-gold">PRODUCTION</span>
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-cream/50 hidden sm:block">
              {SITE.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'nav-underline px-4 py-2 text-sm font-medium text-cream/80 hover:text-gold transition-colors',
                isActive(item.href) && 'active text-gold'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Connexion + Mobile menu */}
        <div className="flex items-center gap-2">
          <Link
            href="/connexion"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-cream/70 hover:text-gold transition-colors px-3 py-2 rounded-lg hover:bg-gold/5"
          >
            <LogIn className="h-4 w-4" />
            Connexion
          </Link>
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex bg-gold-gradient text-night hover:opacity-90 font-semibold shadow-lg shadow-gold/20"
          >
            <Link href="/partenaires">
              <Sparkles className="mr-2 h-4 w-4" />
              Devenir partenaire
            </Link>
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
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-4 text-base font-medium rounded-xl transition-all',
                      isActive(item.href)
                        ? 'bg-gold/10 text-gold border-l-2 border-gold'
                        : 'text-cream/80 hover:bg-white/5 hover:text-gold'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/partenaires"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gold-gradient text-night font-semibold"
                >
                  <Sparkles className="h-4 w-4" />
                  Devenir partenaire
                </Link>
                <Link
                  href="/connexion"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-gold/30 text-cream hover:bg-gold/10 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Connexion Admin
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
