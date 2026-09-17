import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

const STATUS_VALUES = ['new', 'read', 'replied', 'archived'] as const

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const url = new URL(req.url)
    const status = url.searchParams.get('status') || undefined
    const search = url.searchParams.get('q')
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '50', 10)

    const where: Record<string, unknown> = {}
    if (status && (STATUS_VALUES as readonly string[]).includes(status)) {
      where.status = status
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { subject: { contains: search } },
        { message: { contains: search } },
      ]
    }

    const [total, messages] = await Promise.all([
      db.contactMessage.count({ where }),
      db.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ])

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      messages,
    })
  } catch (err) {
    console.error('[api/admin/messages GET] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
