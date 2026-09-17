'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Mailbox,
  RefreshCw,
  AlertCircle,
  Trash2,
  Mail,
  Calendar,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type Subscriber = {
  id: string
  email: string
  createdAt: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function AdminNewsletterPage() {
  const { toast } = useToast()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/newsletter')
      if (!res.ok) throw new Error('Non autorisé')
      const data = await res.json()
      setSubscribers(data.subscribers || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubscribers()
  }, [fetchSubscribers])

  const deleteSubscriber = async (id: string, email: string) => {
    if (!confirm(`Supprimer l'abonné ${email} ?`)) return
    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Suppression échouée')
      toast({ title: 'Abonné supprimé', description: email })
      setSubscribers((prev) => prev.filter((s) => s.id !== id))
    } catch (e) {
      toast({
        title: 'Erreur',
        description: e instanceof Error ? e.message : 'Erreur serveur',
        variant: 'destructive',
      })
    }
  }

  const mailtoAll = () => {
    const emails = subscribers.map((s) => s.email).join(',')
    window.location.href = `mailto:?bcc=${emails}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-cream">Newsletter</h1>
          <p className="text-cream/60 text-sm mt-1">
            {subscribers.length} abonné{subscribers.length > 1 ? 's' : ''} inscrit{subscribers.length > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={mailtoAll}
            disabled={subscribers.length === 0}
            className="border-gold/30 text-cream hover:bg-gold/10 hover:text-gold h-11 sm:h-9"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email tous (BCC)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSubscribers}
            className="border-gold/30 text-cream hover:bg-gold/10 hover:text-gold h-11 sm:h-9"
          >
            <RefreshCw className={cn('h-4 w-4 mr-2', loading && 'animate-spin')} />
            Actualiser
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-xl border border-gold/15 bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      ) : subscribers.length === 0 ? (
        <Card className="border-gold/15 bg-white/[0.02]">
          <CardContent className="p-12 text-center">
            <Mailbox className="h-12 w-12 text-cream/30 mx-auto mb-4" />
            <p className="text-cream/60">Aucun abonné pour l'instant.</p>
            <p className="text-cream/40 text-xs mt-2">
              Les inscriptions via le formulaire newsletter du footer apparaîtront ici.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-gold/15 bg-white/[0.02]">
          <CardContent className="p-0">
            <ul className="divide-y divide-gold/10">
              {subscribers.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.4) }}
                  className="flex items-center justify-between gap-3 p-4 hover:bg-gold/5 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                      <Mailbox className="h-5 w-5 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <a
                        href={`mailto:${s.email}`}
                        className="text-sm text-cream hover:text-gold transition-colors truncate block"
                      >
                        {s.email}
                      </a>
                      <p className="text-[11px] text-cream/50 flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        Inscrit le {formatDate(s.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="text-[10px] bg-gold/10 text-gold border-gold/30">
                      Actif
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSubscriber(s.id, s.email)}
                      className="text-red-300/70 hover:text-red-300 hover:bg-red-500/10 h-11 w-11 sm:h-9 sm:w-9"
                      aria-label={`Supprimer ${s.email}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
