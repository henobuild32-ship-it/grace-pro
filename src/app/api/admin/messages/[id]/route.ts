import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

const STATUS_VALUES = ['new', 'read', 'replied', 'archived'] as const

const updateSchema = z.object({
  status: z.enum(STATUS_VALUES).optional(),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Corps invalide' }, { status: 400 })
    }
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 422 })
    }

    const updated = await db.contactMessage.update({
      where: { id },
      data: parsed.data,
    })
    return NextResponse.json({ success: true, message: updated })
  } catch (err) {
    console.error('[api/admin/messages PATCH] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { id } = await params
    await db.contactMessage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/admin/messages DELETE] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
