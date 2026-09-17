'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Mail,
  Handshake,
  Mailbox,
  TrendingUp,
  ArrowRight,
  Inbox,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Stats = {
  messagesTotal: number
  messagesNew: number
  messagesLast7Days: number
  partnershipTotal: number
  partnershipNew: number
  newsletterTotal: number
}

type RecentMessage = {
  id: string
  name: string
  email: string
  subject: string
  status: string
  createdAt: string
}

type RecentPartnership = {
  id: string
  company: string
  contactName: string
  partnershipType: string
  status: string
  createdAt: string
}

type StatsResponse = {
  success: boolean
  stats: Stats
  recentMessages: RecentMessage[]
  recentPartnerships: RecentPartnership[]
  partnershipByType: { type: string; count: number }[]
  messagesBySubject: { subject: string; count: number }[]
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  new: { label: 'Nouveau', className: 'bg-gold/15 text-gold border-gold/30' },
  read: { label: 'Lu', className: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
  replied: { label: 'Répondu', className: 'bg-green-500/15 text-green-300 border-green-500/30' },
  archived: { label: 'Archivé', className: 'bg-cream/10 text-cream/60 border-cream/20' },
  in_review: { label: 'En revue', className: 'bg-purple/20 text-purple-300 border-purple/40' },
  accepted: { label: 'Accepté', className: 'bg-green-500/15 text-green-300 border-green-500/30' },
  refused: { label: 'Refusé', className: 'bg-red-500/15 text-red-300 border-red-500/30' },
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => {
        if (!r.ok) throw new Error('Non autorisé')
        return r.json()
      })
      .then((d) => setData(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-cream">Tableau de bord</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl border border-gold/15 bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-cream">Tableau de bord</h1>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300 flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          {error || 'Erreur lors du chargement'}
        </div>
      </div>
    )
  }

  const cards = [
    {
      label: 'Messages reçus',
      value: data.stats.messagesTotal,
      sub: `${data.stats.messagesNew} nouveau(s)`,
      icon: Mail,
      href: '/admin/messages',
      color: 'from-gold/20',
    },
    {
      label: 'Demandes partenariat',
      value: data.stats.partnershipTotal,
      sub: `${data.stats.partnershipNew} nouveau(s)`,
      icon: Handshake,
      href: '/admin/partenariats',
      color: 'from-purple/20',
    },
    {
      label: 'Abonnés newsletter',
      value: data.stats.newsletterTotal,
      sub: 'Inscrits actifs',
      icon: Mailbox,
      href: '/admin/newsletter',
      color: 'from-gold/10',
    },
    {
      label: 'Messages (7 jours)',
      value: data.stats.messagesLast7Days,
      sub: 'Activité récente',
      icon: TrendingUp,
      href: '/admin/messages',
      color: 'from-purple/10',
    },
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-bold text-cream">Tableau de bord</h1>
        <p className="text-cream/60 text-sm mt-1">
          Vue d'ensemble de l'activité du site Grace Production.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={card.href}>
                <Card className="relative overflow-hidden border-gold/15 bg-white/[0.02] hover:border-gold/40 transition-all group h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} to-transparent opacity-50`} />
                  <CardContent className="relative p-5">
                    <div className="flex items-start justify-between">
                      <div className="h-11 w-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold-gradient group-hover:gold-glow transition-all">
                        <Icon className="h-5 w-5 text-gold group-hover:text-night transition-colors" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-cream/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-display text-4xl font-bold text-cream mt-4">
                      {card.value}
                    </p>
                    <p className="text-xs text-cream/60 uppercase tracking-wide mt-1">
                      {card.label}
                    </p>
                    <p className="text-[11px] text-gold/80 mt-2">{card.sub}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent messages */}
        <Card className="border-gold/15 bg-white/[0.02]">
          <CardHeader className="border-b border-gold/10 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-cream text-base">
              <Inbox className="h-4 w-4 text-gold" />
              Messages récents
            </CardTitle>
            <Link href="/admin/messages">
              <Button variant="ghost" size="sm" className="text-cream/60 hover:text-gold h-8 text-xs">
                Tout voir
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gold/10">
              {data.recentMessages.length === 0 && (
                <li className="p-6 text-sm text-cream/50 text-center">Aucun message pour l'instant.</li>
              )}
              {data.recentMessages.map((m) => (
                <li key={m.id} className="p-4 hover:bg-gold/5 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-cream truncate">{m.name}</p>
                      <p className="text-xs text-cream/60 truncate">{m.email}</p>
                      <p className="text-[11px] text-cream/50 mt-1">
                        <span className="text-gold/80">{m.subject}</span> · {formatDate(m.createdAt)}
                      </p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${STATUS_LABELS[m.status]?.className || ''}`}>
                      {STATUS_LABELS[m.status]?.label || m.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recent partnerships */}
        <Card className="border-gold/15 bg-white/[0.02]">
          <CardHeader className="border-b border-gold/10 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-cream text-base">
              <Handshake className="h-4 w-4 text-gold" />
              Demandes de partenariat récentes
            </CardTitle>
            <Link href="/admin/partenariats">
              <Button variant="ghost" size="sm" className="text-cream/60 hover:text-gold h-8 text-xs">
                Tout voir
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gold/10">
              {data.recentPartnerships.length === 0 && (
                <li className="p-6 text-sm text-cream/50 text-center">Aucune demande pour l'instant.</li>
              )}
              {data.recentPartnerships.map((p) => (
                <li key={p.id} className="p-4 hover:bg-gold/5 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-cream truncate">{p.company}</p>
                      <p className="text-xs text-cream/60 truncate">{p.contactName}</p>
                      <p className="text-[11px] text-cream/50 mt-1">
                        <span className="text-gold/80">{p.partnershipType}</span> · {formatDate(p.createdAt)}
                      </p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${STATUS_LABELS[p.status]?.className || ''}`}>
                      {STATUS_LABELS[p.status]?.label || p.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Distribution charts (simple bars) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-gold/15 bg-white/[0.02]">
          <CardHeader className="border-b border-gold/10">
            <CardTitle className="flex items-center gap-2 text-cream text-base">
              <Clock className="h-4 w-4 text-gold" />
              Messages par sujet
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3">
              {data.messagesBySubject.length === 0 && (
                <p className="text-sm text-cream/50 text-center py-4">Aucune donnée.</p>
              )}
              {data.messagesBySubject.map((s) => {
                const max = Math.max(...data.messagesBySubject.map((m) => m.count), 1)
                const pct = (s.count / max) * 100
                return (
                  <div key={s.subject}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-cream/80">{s.subject}</span>
                      <span className="text-gold font-semibold">{s.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gold-gradient rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold/15 bg-white/[0.02]">
          <CardHeader className="border-b border-gold/10">
            <CardTitle className="flex items-center gap-2 text-cream text-base">
              <Handshake className="h-4 w-4 text-gold" />
              Demandes par type de partenariat
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3">
              {data.partnershipByType.length === 0 && (
                <p className="text-sm text-cream/50 text-center py-4">Aucune donnée.</p>
              )}
              {data.partnershipByType.map((s) => {
                const max = Math.max(...data.partnershipByType.map((m) => m.count), 1)
                const pct = (s.count / max) * 100
                return (
                  <div key={s.type}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-cream/80">{s.type}</span>
                      <span className="text-gold font-semibold">{s.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple to-gold rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
