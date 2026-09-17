'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Lock, Mail, Eye, EyeOff, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { SITE, LOGO_PATH } from '@/components/grace/data'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})

type LoginValues = z.infer<typeof loginSchema>

export default function ConnexionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [prefilledEmail, setPrefilledEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  useEffect(() => {
    fetch('/api/auth/login', { method: 'GET' })
      .then((r) => r.json())
      .then((data) => {
        if (data.email) setPrefilledEmail(data.email)
      })
      .catch(() => {})
  }, [])

  const onSubmit = async (values: LoginValues) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Connexion échouée')
      }
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue dans votre espace administrateur.',
      })
      router.push(data.redirectTo || '/admin')
      router.refresh()
    } catch (err) {
      toast({
        title: 'Erreur de connexion',
        description: err instanceof Error ? err.message : 'Réessayez plus tard.',
        variant: 'destructive',
      })
    }
  }

  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex flex-col bg-night-gradient grain-overlay relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple/15 blur-[120px]" />
      </div>

      <header className="relative z-10 py-5 px-4 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au site
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-3xl p-8 md:p-10">
            {/* Logo */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-20 w-20 rounded-2xl overflow-hidden ring-2 ring-gold/40 gold-glow mb-4">
                <img
                  src={LOGO_PATH}
                  alt="Logo Grace Production"
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="font-display text-2xl font-bold text-cream">
                GRACE <span className="text-gradient-gold">PRODUCTION</span>
              </h1>
              <p className="text-xs text-cream/60 mt-2 uppercase tracking-[0.2em]">
                Espace Administrateur
              </p>
            </div>

            {error === 'unauthorized' && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Vous devez être connecté pour accéder à l'administration.</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cream">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@graceproduction.cd"
                    autoComplete="email"
                    {...register('email')}
                    defaultValue={prefilledEmail}
                    className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-cream">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register('password')}
                    className="bg-night/60 border-gold/25 text-cream placeholder:text-cream/40 focus:border-gold pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-gradient text-night hover:opacity-90 font-semibold h-12 text-base"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Se connecter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="text-[11px] text-cream/40 text-center mt-6">
              Accès réservé à l'administrateur de {SITE.name}.
              <br />
              Identifiants par défaut : <span className="text-gold/70">admin@graceproduction.cd</span> / <span className="text-gold/70">Grace@2025</span>
            </p>
          </div>

          <p className="text-center text-[11px] text-cream/40 mt-4">
            Protégé par cookie httpOnly signé HS256 • Session 8h
          </p>
        </motion.div>
      </main>
    </div>
  )
}
