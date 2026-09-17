import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSession, verifyCredentials, applySessionCookie, ADMIN_CREDENTIALS } from '@/lib/auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
    }
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Email ou mot de passe invalide' },
        { status: 422 }
      )
    }
    const { email, password } = parsed.data
    if (!verifyCredentials(email, password)) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }
    const token = createSession(email)
    const res = NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      redirectTo: '/admin',
    })
    return applySessionCookie(res, token)
  } catch (err) {
    console.error('[api/auth/login] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// Expose the admin email so the login page can prefill the field (password stays secret).
export async function GET() {
  return NextResponse.json({ email: ADMIN_CREDENTIALS.email })
}
