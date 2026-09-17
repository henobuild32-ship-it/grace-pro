import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

const STATUS_VALUES = ['new', 'in_review', 'accepted', 'refused'] as const
const PARTNERSHIP_TYPES = [
  'Sponsor officiel',
  'Partenaire média',
  'Partenaire logistique',
  'Investisseur',
  'Mécène',
  'Autre',
]

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const url = new URL(req.url)
    const status = url.searchParams.get('status') || undefined
    const search = url.searchParams.get('q')
    const type = url.searchParams.get('type')
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '50', 10)

    const where: Record<string, unknown> = {}
    if (status && (STATUS_VALUES as readonly string[]).includes(status)) {
      where.status = status
    }
    if (type && PARTNERSHIP_TYPES.includes(type as (typeof PARTNERSHIP_TYPES)[number])) {
      where.partnershipType = type
    }
    if (search) {
      where.OR = [
        { company: { contains: search } },
        { contactName: { contains: search } },
        { email: { contains: search } },
        { message: { contains: search } },
      ]
    }

    const [total, requests] = await Promise.all([
      db.partnershipRequest.count({ where }),
      db.partnershipRequest.findMany({
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
      requests,
    })
  } catch (err) {
    console.error('[api/admin/partenariats GET] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
