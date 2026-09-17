import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const partnershipSchema = z.object({
  company: z.string().min(2).max(180),
  contactName: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(6).max(40),
  partnershipType: z.string().min(1).max(80),
  message: z.string().min(10).max(5000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
    }
    const parsed = partnershipSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 422 }
      )
    }
    const { company, contactName, email, phone, partnershipType, message } = parsed.data

    const record = await db.partnershipRequest.create({
      data: { company, contactName, email, phone, partnershipType, message },
    })

    return NextResponse.json(
      {
        success: true,
        id: record.id,
        message: 'Demande reçue. Notre équipe vous recontacte sous 24h.',
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[api/partnership] error:', err)
    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi de la demande" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const requests = await db.partnershipRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ success: true, count: requests.length, requests })
  } catch (err) {
    console.error('[api/partnership] GET error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
