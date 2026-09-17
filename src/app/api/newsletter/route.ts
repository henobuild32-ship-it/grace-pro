import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const newsletterSchema = z.object({
  email: z.string().email().max(180),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
    }
    const parsed = newsletterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Email invalide', details: parsed.error.flatten() },
        { status: 422 }
      )
    }
    const { email } = parsed.data
    const existing = await db.newsletterSubscriber.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { success: true, message: 'Vous êtes déjà inscrit. Merci !' },
        { status: 200 }
      )
    }
    await db.newsletterSubscriber.create({ data: { email } })
    return NextResponse.json(
      { success: true, message: 'Inscription confirmée. Merci !' },
      { status: 201 }
    )
  } catch (err) {
    console.error('[api/newsletter] error:', err)
    return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 })
  }
}
