import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(6).max(40),
  subject: z.string().min(1).max(80),
  message: z.string().min(10).max(5000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
    }
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 422 }
      )
    }
    const { name, email, phone, subject, message } = parsed.data

    const record = await db.contactMessage.create({
      data: { name, email, phone, subject, message },
    })

    return NextResponse.json(
      {
        success: true,
        id: record.id,
        message: 'Message reçu. Notre équipe vous répond sous 24h.',
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[api/contact] error:', err)
    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi du message" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ success: true, count: messages.length, messages })
  } catch (err) {
    console.error('[api/contact] GET error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
