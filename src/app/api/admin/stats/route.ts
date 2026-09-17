import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  // Soft auth: returns public counts even if not logged in, but we still gate it.
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const [messagesTotal, messagesNew, partnershipTotal, partnershipNew, newsletterTotal, last7DaysMessages] =
      await Promise.all([
        db.contactMessage.count(),
        db.contactMessage.count({ where: { status: 'new' } }),
        db.partnershipRequest.count(),
        db.partnershipRequest.count({ where: { status: 'new' } }),
        db.newsletterSubscriber.count(),
        db.contactMessage.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        }),
      ])

    const recentMessages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    })

    const recentPartnerships = await db.partnershipRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        company: true,
        contactName: true,
        partnershipType: true,
        status: true,
        createdAt: true,
      },
    })

    const partnershipByType = await db.partnershipRequest.groupBy({
      by: ['partnershipType'],
      _count: { _all: true },
    })

    const messagesBySubject = await db.contactMessage.groupBy({
      by: ['subject'],
      _count: { _all: true },
    })

    return NextResponse.json({
      success: true,
      stats: {
        messagesTotal,
        messagesNew,
        messagesLast7Days: last7DaysMessages,
        partnershipTotal,
        partnershipNew,
        newsletterTotal,
      },
      recentMessages,
      recentPartnerships,
      partnershipByType: partnershipByType.map((p) => ({
        type: p.partnershipType,
        count: p._count._all,
      })),
      messagesBySubject: messagesBySubject.map((m) => ({
        subject: m.subject,
        count: m._count._all,
      })),
    })
  } catch (err) {
    console.error('[api/admin/stats] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
