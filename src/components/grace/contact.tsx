'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Check, Instagram, Facebook, MapPin, Mail, Clock, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { SITE, CONTACT_SUBJECTS, SOCIAL_LINKS } from './data'
import { LogoBackground } from './logo-background'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(6, 'Téléphone invalide'),
  subject: z.string().min(1, 'Sélectionnez un sujet'),
  message: z.string().min(10, 'Message trop court (10 caractères min.)'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function Contact() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const subject = watch('subject')

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Erreur lors de l'envoi")
      }
      toast({
        title: 'Message envoyé !',
        description: 'Merci de nous avoir contactés. Nous vous répondons sous 24h.',
      })
      reset()
    } catch (err) {
      toast({
        title: 'Erreur',
        description:
          err instanceof Error ? err.message : 'Une erreur est survenue. Réessayez plus tard.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative section-pad bg-night-gradient overflow-hidden scroll-mt-24">
      {/* Ambient gradient blobs for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gold/12 blur-[120px]" />
      </div>

      {/* Decorative logo watermark in background */}
      <LogoBackground
        opacity={0.14}
        size={680}
        rotate={0}
        position="center"
        glow={true}
      />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4">
            <span className="h-px w-8 bg-gold" />
            Contact
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight">
            Parlons de <span className="text-gradient-gold">votre projet</span>
          </h2>
          <p className="text-cream/70 mt-4 text-sm md:text-lg">
            Une question, une idée, un événement à produire ? Notre équipe vous répond sous 24h.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-3xl p-7 space-y-5">
              <h3 className="font-display text-xl font-bold text-gold">Coordonnées</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="shrink-0 h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-cream/50">Adresse</p>
                    <p className="text-sm text-cream">{SITE.location}</p>
                  </div>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-start gap-3 hover:text-gold transition-colors break-all"
                  >
                    <div className="shrink-0 h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-cream/50">Email</p>
                      <p className="text-sm text-cream break-all">{SITE.email}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-wider text-cream/50">Téléphone / WhatsApp</p>
                      <div className="flex flex-col gap-1 mt-1">
                        {SITE.whatsappNumbers.map((wa) => (
                          <a
                            key={wa.waLink}
                            href={wa.waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-cream hover:text-gold transition-colors group"
                          >
                            <MessageCircle className="h-3.5 w-3.5 text-gold" />
                            <span>{wa.display}</span>
                            <span className="text-[10px] text-gold/60 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              (ouvrir WhatsApp)
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="shrink-0 h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-cream/50">Horaires</p>
                    <p className="text-sm text-cream">{SITE.hours}</p>
                  </div>
                </li>
              </ul>

              {/* Social links */}
              <div className="pt-4 border-t border-gold/15">
                <p className="text-[11px] uppercase tracking-wider text-cream/50 mb-3">
                  Suivez-nous
                </p>
                <div className="flex gap-3">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Grace Production"
                    className="h-11 w-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-cream hover:bg-gold-gradient hover:text-night hover:border-gold transition-all"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Grace Production"
                    className="h-11 w-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-cream hover:bg-gold-gradient hover:text-night hover:border-gold transition-all"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-3xl overflow-hidden border border-gold/20 h-64">
              <iframe
                title="Localisation de Grace Production à Kinshasa"
                src="https://www.google.com/maps?q=Kinshasa,+Democratic+Republic+of+the+Congo&output=embed"
                className="h-full w-full"
                style={{ border: 0, filter: 'grayscale(0.3) invert(0.85) hue-rotate(180deg) contrast(0.9)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 glass-card rounded-3xl p-6 md:p-10 space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-cream">
                  Nom complet *
                </Label>
                <Input
                  id="name"
                  placeholder="Prénom & Nom"
                  {...register('name')}
                  className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold"
                />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cream">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@email.com"
                  {...register('email')}
                  className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold"
                />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-cream">
                  Téléphone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+243 ..."
                  {...register('phone')}
                  className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold"
                />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-cream">
                  Sujet *
                </Label>
                <Select
                  value={subject}
                  onValueChange={(v) => setValue('subject', v, { shouldValidate: true })}
                >
                  <SelectTrigger
                    id="subject"
                    className="bg-night/60 border-gold/25 text-cream focus:border-gold w-full"
                  >
                    <SelectValue placeholder="Choisissez un sujet..." />
                  </SelectTrigger>
                  <SelectContent className="bg-night border-gold/30">
                    {CONTACT_SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s} className="text-cream focus:bg-gold/15">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && <p className="text-xs text-red-400">{errors.subject.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-cream">
                Message *
              </Label>
              <Textarea
                id="message"
                rows={6}
                placeholder="Décrivez votre projet, votre demande ou votre question..."
                {...register('message')}
                className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold resize-none"
              />
              {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-gold-gradient text-night hover:opacity-90 font-semibold h-12 px-6 w-full sm:w-auto"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-night border-t-transparent" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                  </>
                )}
              </Button>
            </div>

            <p className="text-[11px] text-cream/40 text-center flex items-center justify-center gap-1.5">
              <Check className="h-3 w-3 text-gold" />
              Réponse garantie sous 24h ouvrées — {SITE.hours}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
