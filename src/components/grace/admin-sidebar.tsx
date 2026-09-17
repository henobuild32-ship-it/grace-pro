'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Mail,
  Handshake,
  Mailbox,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet'
import { LOGO_PATH, SITE } from '@/components/grace/data'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/partenariats', label: 'Demandes partenariat', icon: Handshake },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mailbox },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (item: (typeof NAV)[number]) => {
    if (item.exact) return pathname === item.href
    return pathname === item.href || pathname.startsWith(item.href + '/')
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      toast({ title: 'Déconnexion réussie', description: 'À bientôt.' })
      router.push('/connexion')
      router.refresh()
    } catch {
      toast({
        title: 'Erreur',
        description: 'Impossible de se déconnecter. Réessayez.',
        variant: 'destructive',
      })
    }
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-6 border-b border-gold/15">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-xl overflow-hidden ring-1 ring-gold/40 gold-glow">
            <img
              src={LOGO_PATH}
              alt="Logo Grace Production"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold tracking-wide text-cream">
              GRACE <span className="text-gold">PRODUCTION</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
              Administration
            </span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1" aria-label="Navigation admin">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-gold-gradient text-night shadow-lg shadow-gold/20'
                  : 'text-cream/75 hover:bg-white/5 hover:text-gold'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gold/15 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-cream/60 hover:text-gold hover:bg-white/5 transition-all"
        >
          <ExternalLink className="h-4 w-4" />
          Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-300/80 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
        <p className="text-[10px] text-cream/40 text-center pt-1">
          © {SITE.year} {SITE.name}
        </p>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-night-gradient border-r border-gold/15 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile top bar + Sheet */}
      <div className="lg:hidden sticky top-0 z-30 bg-night/95 backdrop-blur-xl border-b border-gold/15 px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg overflow-hidden ring-1 ring-gold/40">
            <img
              src={LOGO_PATH}
              alt="Logo Grace Production"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-display text-sm font-bold text-cream">
            GRACE <span className="text-gold">ADMIN</span>
          </span>
        </Link>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-cream hover:bg-gold/10 hover:text-gold"
              aria-label="Ouvrir le menu admin"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-night-gradient border-r border-gold/15 p-0">
            <SheetTitle className="sr-only">Menu administrateur</SheetTitle>
            <div className="flex items-center justify-between p-4 border-b border-gold/15 lg:hidden">
              <span className="font-display text-sm font-bold text-gold">Menu admin</span>
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
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
