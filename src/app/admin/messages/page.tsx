'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Search,
  Trash2,
  RefreshCw,
  Inbox,
  AlertCircle,
  ChevronDown,
  X,
  Reply,
  Archive,
  Check,
  Phone,
  Calendar,
  User,
  Send,
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
import { SITE } from '@/components/grace/data'
import { cn } from '@/lib/utils'

type Message = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

const STATUSES = [
  { value: 'new', label: 'Nouveau' },
  { value: 'read', label: 'Lu' },
  { value: 'replied', label: 'Répondu' },
  { value: 'archived', label: 'Archivé' },
]

const STATUS_CLASSES: Record<string, string> = {
  new: 'bg-gold/15 text-gold border-gold/30',
  read: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  replied: 'bg-green-500/15 text-green-300 border-green-500/30',
  archived: 'bg-cream/10 text-cream/60 border-cream/20',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminMessagesPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')
  const [updating, setUpdating] = useState(false)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (search.trim()) params.set('q', search.trim())
      const res = await fetch(`/api/admin/messages?${params.toString()}`)
      if (!res.ok) throw new Error('Non autorisé')
      const data = await res.json()
      setMessages(data.messages || [])
      setTotal(data.total || 0)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => {
    const t = setTimeout(fetchMessages, 250)
    return () => clearTimeout(t)
  }, [fetchMessages])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Mise à jour échouée')
      toast({
        title: 'Statut mis à jour',
        description: `Message marqué comme "${STATUSES.find((s) => s.value === status)?.label}".`,
      })
      // Refresh
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      )
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status })
      }
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

  const deleteMessage = async (id: string) => {
    if (!confirm('Supprimer définitivement ce message ? Cette action est irréversible.')) return
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Suppression échouée')
      toast({ title: 'Message supprimé', description: 'Le message a été supprimé.' })
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selectedMessage?.id === id) setSelectedMessage(null)
      setTotal((t) => Math.max(0, t - 1))
    } catch (e) {
      toast({
        title: 'Erreur',
        description: e instanceof Error ? e.message : 'Erreur serveur',
        variant: 'destructive',
      })
    }
  }

  const markAsRead = async (message: Message) => {
    setSelectedMessage(message)
    setReplyText('')
    if (message.status === 'new') {
      await updateStatus(message.id, 'read')
    }
  }

  const sendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return
    // Open email client with prefilled reply
    const subject = `Re: ${selectedMessage.subject} — Grace Production`
    const body = `Bonjour ${selectedMessage.name},\n\n${replyText}\n\nCordialement,\nL'équipe Grace Production\n${SITE.email}`
    window.location.href = `mailto:${selectedMessage.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    await updateStatus(selectedMessage.id, 'replied')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-cream">Messages</h1>
          <p className="text-cream/60 text-sm mt-1">
            {total} message{total > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchMessages}
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
            placeholder="Rechercher par nom, email, sujet, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-night/60 border-gold/25 text-cream focus:border-gold w-full sm:w-56">
            <SelectValue placeholder="Filtrer par statut" />
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

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Messages list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl border border-gold/15 bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <Card className="border-gold/15 bg-white/[0.02]">
          <CardContent className="p-12 text-center">
            <Inbox className="h-12 w-12 text-cream/30 mx-auto mb-4" />
            <p className="text-cream/60">Aucun message trouvé.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((message, i) => (
            <motion.div
              key={message.id}
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
                          {message.name}
                        </h3>
                        <Badge variant="outline" className={`text-[10px] ${STATUS_CLASSES[message.status] || ''}`}>
                          {STATUSES.find((s) => s.value === message.status)?.label || message.status}
                        </Badge>
                        <span className="text-[11px] text-cream/50">{formatDate(message.createdAt)}</span>
                      </div>
                      <p className="text-xs text-cream/60 mt-1.5 truncate">
                        {message.email} · {message.phone}
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold">
                          <Mail className="h-3 w-3" />
                          {message.subject}
                        </span>
                      </div>
                      <p className="text-sm text-cream/70 mt-2 line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(message)}
                        className="border-gold/30 text-cream hover:bg-gold/10 hover:text-gold h-11 sm:h-9 text-xs"
                      >
                        <ChevronDown className="h-3.5 w-3.5 mr-1" />
                        Ouvrir
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteMessage(message.id)}
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

      {/* Message detail dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="bg-night border-gold/30 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle className="font-display text-2xl text-cream">
                  {selectedMessage?.subject}
                </DialogTitle>
                <DialogDescription className="text-cream/60 text-sm mt-1">
                  Reçu le {selectedMessage && formatDate(selectedMessage.createdAt)}
                </DialogDescription>
              </div>
              {selectedMessage && (
                <Badge variant="outline" className={`text-xs ${STATUS_CLASSES[selectedMessage.status] || ''}`}>
                  {STATUSES.find((s) => s.value === selectedMessage.status)?.label || selectedMessage.status}
                </Badge>
              )}
            </div>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              {/* Sender info */}
              <div className="grid sm:grid-cols-2 gap-3 rounded-xl border border-gold/15 bg-white/[0.02] p-4 text-sm">
                <div className="flex items-center gap-2 text-cream/80">
                  <User className="h-4 w-4 text-gold" />
                  <span>{selectedMessage.name}</span>
                </div>
                <div className="flex items-center gap-2 text-cream/80 truncate">
                  <Mail className="h-4 w-4 text-gold" />
                  <a href={`mailto:${selectedMessage.email}`} className="hover:text-gold truncate">
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-cream/80">
                  <Phone className="h-4 w-4 text-gold" />
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    {selectedMessage.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-cream/80">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span className="text-xs">{formatDate(selectedMessage.createdAt)}</span>
                </div>
              </div>

              {/* Message body */}
              <div className="rounded-xl border border-gold/15 bg-night/60 p-4">
                <p className="text-sm text-cream/80 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Reply */}
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

              {/* Actions */}
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
                  onClick={() => updateStatus(selectedMessage.id, 'replied')}
                  disabled={updating || selectedMessage.status === 'replied'}
                  className="border-green-500/40 text-green-300 hover:bg-green-500/10 h-11 sm:h-10"
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Marquer répondu
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selectedMessage.id, 'archived')}
                  disabled={updating || selectedMessage.status === 'archived'}
                  className="border-cream/30 text-cream/70 hover:bg-white/5 h-11 sm:h-10"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archiver
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selectedMessage.id, 'read')}
                  disabled={updating || selectedMessage.status === 'read'}
                  className="border-blue-500/40 text-blue-300 hover:bg-blue-500/10 h-11 sm:h-10"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Marquer lu
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
