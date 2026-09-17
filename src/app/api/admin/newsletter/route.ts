import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const subscribers = await db.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
    })
    return NextResponse.json({
      success: true,
      total: subscribers.length,
      subscribers,
    })
  } catch (err) {
    console.error('[api/admin/newsletter GET] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => null)
    const id = body?.id as string | undefined
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }
    await db.newsletterSubscriber.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/admin/newsletter DELETE] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
