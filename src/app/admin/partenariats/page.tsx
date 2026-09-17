'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Handshake,
  Search,
  Trash2,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  Send,
  Check,
  XCircle,
  Eye,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type Partnership = {
  id: string
  company: string
  contactName: string
  email: string
  phone: string
  partnershipType: string
  message: string
  status: string
  createdAt: string
}

const STATUSES = [
  { value: 'new', label: 'Nouveau' },
  { value: 'in_review', label: 'En revue' },
  { value: 'accepted', label: 'Accepté' },
  { value: 'refused', label: 'Refusé' },
]

const STATUS_CLASSES: Record<string, string> = {
  new: 'bg-gold/15 text-gold border-gold/30',
  in_review: 'bg-purple/20 text-purple-300 border-purple/40',
  accepted: 'bg-green-500/15 text-green-300 border-green-500/30',
  refused: 'bg-red-500/15 text-red-300 border-red-500/30',
}

const PARTNERSHIP_TYPES = [
  'Sponsor officiel',
  'Partenaire média',
  'Partenaire logistique',
  'Investisseur',
  'Mécène',
  'Autre',
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminPartenariatsPage() {
  const { toast } = useToast()
  const [requests, setRequests] = useState<Partnership[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Partnership | null>(null)
  const [replyText, setReplyText] = useState('')
  const [updating, setUpdating] = useState(false)

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (typeFilter !== 'all') params.set('type', typeFilter)
      if (search.trim()) params.set('q', search.trim())
      const res = await fetch(`/api/admin/partenariats?${params.toString()}`)
      if (!res.ok) throw new Error('Non autorisé')
      const data = await res.json()
      setRequests(data.requests || [])
      setTotal(data.total || 0)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search, typeFilter])

  useEffect(() => {
    const t = setTimeout(fetchRequests, 250)
    return () => clearTimeout(t)
  }, [fetchRequests])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/partenariats/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Mise à jour échouée')
      toast({
        title: 'Statut mis à jour',
        description: `Demande marquée comme "${STATUSES.find((s) => s.value === status)?.label}".`,
      })
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
      if (selected?.id === id) setSelected({ ...selected, status })
    } catch (e) {
      toast({
        title: 'Erreur',
        description: e instanceof Error ? e.message : 'Erreur serveur',
        variant: 'destructive',
      })
    } finally {
      setUpdating(false)
    }
  }

  const deleteRequest = async (id: string) => {
    if (!confirm('Supprimer définitivement cette demande ?')) return
    try {
      const res = await fetch(`/api/admin/partenariats/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Suppression échouée')
      toast({ title: 'Demande supprimée' })
      setRequests((prev) => prev.filter((r) => r.id !== id))
      if (selected?.id === id) setSelected(null)
      setTotal((t) => Math.max(0, t - 1))
    } catch (e) {
      toast({
        title: 'Erreur',
        description: e instanceof Error ? e.message : 'Erreur serveur',
        variant: 'destructive',
      })
    }
  }

  const openRequest = async (request: Partnership) => {
    setSelected(request)
    setReplyText('')
    if (request.status === 'new') await updateStatus(request.id, 'in_review')
  }

  const sendReply = async () => {
    if (!selected || !replyText.trim()) return
    const subject = `Re: Demande de partenariat — ${selected.company}`
    const body = `Bonjour ${selected.contactName},\n\n${replyText}\n\nCordialement,\nL'équipe Grace Production`
    window.location.href = `mailto:${selected.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    await updateStatus(selected.id, 'accepted')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-cream">Demandes de partenariat</h1>
          <p className="text-cream/60 text-sm mt-1">
            {total} demande{total > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchRequests}
          className="border-gold/30 text-cream hover:bg-gold/10 hover:text-gold h-11 sm:h-9"
        >
          <RefreshCw className={cn('h-4 w-4 mr-2', loading && 'animate-spin')} />
          Actualiser
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" />
          <Input
            placeholder="Rechercher par entreprise, contact, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="bg-night/60 border-gold/25 text-cream focus:border-gold w-full sm:w-56">
            <SelectValue placeholder="Type de partenariat" />
          </SelectTrigger>
          <SelectContent className="bg-night border-gold/30">
            <SelectItem value="all" className="text-cream focus:bg-gold/15">Tous les types</SelectItem>
            {PARTNERSHIP_TYPES.map((t) => (
              <SelectItem key={t} value={t} className="text-cream focus:bg-gold/15">
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-night/60 border-gold/25 text-cream focus:border-gold w-full sm:w-48">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent className="bg-night border-gold/30">
            <SelectItem value="all" className="text-cream focus:bg-gold/15">Tous les statuts</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value} className="text-cream focus:bg-gold/15">
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl border border-gold/15 bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <Card className="border-gold/15 bg-white/[0.02]">
          <CardContent className="p-12 text-center">
            <Handshake className="h-12 w-12 text-cream/30 mx-auto mb-4" />
            <p className="text-cream/60">Aucune demande de partenariat trouvée.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {requests.map((request, i) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
            >
              <Card className="border-gold/15 bg-white/[0.02] hover:border-gold/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display text-base font-semibold text-cream">
                          {request.company}
                        </h3>
                        <Badge variant="outline" className={`text-[10px] ${STATUS_CLASSES[request.status] || ''}`}>
                          {STATUSES.find((s) => s.value === request.status)?.label || request.status}
                        </Badge>
                        <span className="text-[11px] text-cream/50">{formatDate(request.createdAt)}</span>
                      </div>
                      <p className="text-xs text-cream/60 mt-1.5">
                        Contact : {request.contactName} · {request.email} · {request.phone}
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold">
                          <Handshake className="h-3 w-3" />
                          {request.partnershipType}
                        </span>
                      </div>
                      <p className="text-sm text-cream/70 mt-2 line-clamp-2">
                        {request.message}
                      </p>
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openRequest(request)}
                        className="border-gold/30 text-cream hover:bg-gold/10 hover:text-gold h-11 sm:h-9 text-xs"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Détails
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteRequest(request.id)}
                        className="text-red-300/70 hover:text-red-300 hover:bg-red-500/10 h-11 sm:h-9 text-xs"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="bg-night border-gold/30 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle className="font-display text-2xl text-cream">
                  {selected?.company}
                </DialogTitle>
                <DialogDescription className="text-cream/60 text-sm mt-1">
                  Demande reçue le {selected && formatDate(selected.createdAt)}
                </DialogDescription>
              </div>
              {selected && (
                <Badge variant="outline" className={`text-xs ${STATUS_CLASSES[selected.status] || ''}`}>
                  {STATUSES.find((s) => s.value === selected.status)?.label || selected.status}
                </Badge>
              )}
            </div>
          </DialogHeader>

          {selected && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 rounded-xl border border-gold/15 bg-white/[0.02] p-4 text-sm">
                <div className="flex items-center gap-2 text-cream/80">
                  <Building2 className="h-4 w-4 text-gold" />
                  <span>{selected.company}</span>
                </div>
                <div className="flex items-center gap-2 text-cream/80">
                  <User className="h-4 w-4 text-gold" />
                  <span>{selected.contactName}</span>
                </div>
                <div className="flex items-center gap-2 text-cream/80 truncate">
                  <Mail className="h-4 w-4 text-gold" />
                  <a href={`mailto:${selected.email}`} className="hover:text-gold truncate">
                    {selected.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-cream/80">
                  <Phone className="h-4 w-4 text-gold" />
                  <a
                    href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    {selected.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-cream/80">
                  <Handshake className="h-4 w-4 text-gold" />
                  <span>{selected.partnershipType}</span>
                </div>
                <div className="flex items-center gap-2 text-cream/80">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span className="text-xs">{formatDate(selected.createdAt)}</span>
                </div>
              </div>

              <div className="rounded-xl border border-gold/15 bg-night/60 p-4">
                <p className="text-sm text-cream/80 whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-cream/60 uppercase tracking-wider">
                  Répondre par email
                </label>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder="Tapez votre réponse..."
                  className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  onClick={sendReply}
                  disabled={!replyText.trim() || updating}
                  className="bg-gold-gradient text-night hover:opacity-90 font-semibold h-11 sm:h-10"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer la réponse
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selected.id, 'accepted')}
                  disabled={updating || selected.status === 'accepted'}
                  className="border-green-500/40 text-green-300 hover:bg-green-500/10 h-11 sm:h-10"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Accepter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selected.id, 'refused')}
                  disabled={updating || selected.status === 'refused'}
                  className="border-red-500/40 text-red-300 hover:bg-red-500/10 h-11 sm:h-10"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Refuser
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
