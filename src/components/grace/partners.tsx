'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Check, Send, Sparkles, TrendingUp, Handshake } from 'lucide-react'
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
import { PARTNER_FORMULAS, PARTNERSHIP_TYPES } from './data'

const partnershipSchema = z.object({
  company: z.string().min(2, "Le nom de l'entreprise est requis"),
  contactName: z.string().min(2, 'Le nom du responsable est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(6, 'Téléphone invalide'),
  partnershipType: z.string().min(1, 'Sélectionnez un type'),
  message: z.string().min(10, 'Message trop court (10 caractères min.)'),
})

type PartnershipFormValues = z.infer<typeof partnershipSchema>

const BENEFITS = [
  {
    icon: TrendingUp,
    title: 'Visibilité large',
    description:
      'Associez votre image à des projets à fort impact social, culturel et spirituel touchant des milliers de personnes.',
  },
  {
    icon: Handshake,
    title: 'Partenariats sur mesure',
    description:
      "Des formules adaptées à vos objectifs : sponsoring, média, logistique, investissement ou mécénat.",
  },
  {
    icon: Sparkles,
    title: 'Expertise & réseau',
    description:
      "Profitez de l'expérience et du réseau de Grace Production pour maximiser votre impact.",
  },
]

export function PartnersCTA() {
  return (
    <section className="relative section-pad bg-night overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/partners-cta.png"
          alt="Partenaires & Investisseurs — Grace Production"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/85 to-night" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4">
            <span className="h-px w-8 bg-gold" />
            Partenaires & Investisseurs
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">
            Associez votre image à des{' '}
            <span className="text-gradient-gold">projets à fort impact</span>
          </h2>
          <p className="text-cream/80 mt-6 text-base md:text-lg leading-relaxed">
            Vous souhaitez associer votre image à un projet culturel, artistique, événementiel ou
            social ? Grace Production vous ouvre la porte à des opportunités de partenariat, de
            sponsoring et d'investissement adaptées à vos objectifs.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-gold/20 bg-white/[0.04] p-7 backdrop-blur-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-gold-gradient flex items-center justify-center gold-glow mb-4">
                  <Icon className="h-6 w-6 text-night" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream">{b.title}</h3>
                <p className="text-sm text-cream/70 mt-2 leading-relaxed">{b.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Formulas */}
        <div id="partenaires" className="mt-16 scroll-mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-cream text-center"
          >
            Nos formules de partenariat
          </motion.h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PARTNER_FORMULAS.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative rounded-2xl border border-gold/15 bg-white/[0.02] p-5 hover:border-gold/40 transition-all"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold/70">
                  Formule {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display text-base font-bold text-cream mt-2">{f.title}</h4>
                <p className="text-xs text-cream/65 mt-2 leading-relaxed">{f.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-[11px] text-cream/60">
                      <Check className="h-3 w-3 text-gold mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function PartnershipForm() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      company: '',
      contactName: '',
      email: '',
      phone: '',
      partnershipType: '',
      message: '',
    },
  })

  const partnershipType = watch('partnershipType')

  const onSubmit = async (values: PartnershipFormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/partnership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Erreur lors de l'envoi")
      }
      toast({
        title: 'Demande envoyée !',
        description:
          'Merci. Notre équipe vous recontacte sous 24h pour étudier votre projet de partenariat.',
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
    <section className="relative section-pad bg-gradient-to-b from-night-soft to-night overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4">
            <span className="h-px w-8 bg-gold" />
            Devenir partenaire
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">
            Demande de partenariat
          </h2>
          <p className="text-cream/70 mt-3 text-sm md:text-base">
            Remplissez ce formulaire, nous vous recontactons sous 24h.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 glass-card rounded-3xl p-6 md:p-10 space-y-5"
          noValidate
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-cream">
                Nom de l'entreprise / institution *
              </Label>
              <Input
                id="company"
                placeholder="Ex. Fondation Hope"
                {...register('company')}
                className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold"
              />
              {errors.company && (
                <p className="text-xs text-red-400">{errors.company.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName" className="text-cream">
                Nom du responsable *
              </Label>
              <Input
                id="contactName"
                placeholder="Prénom & Nom"
                {...register('contactName')}
                className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold"
              />
              {errors.contactName && (
                <p className="text-xs text-red-400">{errors.contactName.message}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cream">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@entreprise.com"
                {...register('email')}
                className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold"
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnershipType" className="text-cream">
              Type de partenariat souhaité *
            </Label>
            <Select
              value={partnershipType}
              onValueChange={(v) => setValue('partnershipType', v, { shouldValidate: true })}
            >
              <SelectTrigger
                id="partnershipType"
                className="bg-night/60 border-gold/25 text-cream focus:border-gold w-full"
              >
                <SelectValue placeholder="Sélectionnez une formule..." />
              </SelectTrigger>
              <SelectContent className="bg-night border-gold/30">
                {PARTNERSHIP_TYPES.map((t) => (
                  <SelectItem key={t} value={t} className="text-cream focus:bg-gold/15">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.partnershipType && (
              <p className="text-xs text-red-400">{errors.partnershipType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-cream">
              Votre message *
            </Label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Décrivez votre projet, vos objectifs, les modalités envisagées..."
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
                  Envoyer la demande
                </>
              )}
            </Button>
          </div>

          <p className="text-[11px] text-cream/40 text-center flex items-center justify-center gap-1.5">
            <Check className="h-3 w-3 text-gold" />
            Vos informations restent strictement confidentielles.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
