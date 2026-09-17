import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextResponse } from 'next/server'
import crypto from 'node:crypto'

/**
 * Lightweight JWT-based session for the Grace Production admin area.
 * - HS256 signed token stored in an httpOnly cookie.
 * - Single admin user defined by env vars ADMIN_EMAIL / ADMIN_PASSWORD (with sensible dev defaults).
 *
 * Note: In Next.js 16, `cookies()` from `next/headers` is read-only inside
 * Route Handlers (POST/GET handlers). To set a cookie, the route handler must
 * use `NextResponse.cookies.set(...)` or `response.cookies.set(...)`.
 * `setSessionCookie()` here returns the cookie options; the route handler
 * applies them to a NextResponse instance.
 */

const SESSION_COOKIE = 'gp_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 8 // 8 hours

// Defaults allow the admin to log in immediately in dev. Override in production via env.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@graceproduction.cd'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Grace@2025'
const JWT_SECRET =
  process.env.JWT_SECRET ||
  'gp-dev-secret-change-me-in-production-9d8a7c6b5e4f3a2d1c0b'

type SessionPayload = {
  sub: string
  email: string
  iat: number
  exp: number
}

function base64url(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function base64urlDecode(input: string): Buffer {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  return Buffer.from(padded + pad, 'base64')
}

function signToken(payload: SessionPayload): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerB64 = base64url(JSON.stringify(header))
  const payloadB64 = base64url(JSON.stringify(payload))
  const data = `${headerB64}.${payloadB64}`
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(data)
    .digest()
  const sigB64 = base64url(signature)
  return `${data}.${sigB64}`
}

function verifyToken(token: string): SessionPayload | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [headerB64, payloadB64, sigB64] = parts
  const data = `${headerB64}.${payloadB64}`
  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(data)
    .digest()
  const actualSig = base64urlDecode(sigB64)
  if (expectedSig.length !== actualSig.length) return null
  if (!crypto.timingSafeEqual(expectedSig, actualSig)) return null

  try {
    const payload = JSON.parse(base64urlDecode(payloadB64).toString('utf8')) as SessionPayload
    const now = Math.floor(Date.now() / 1000)
    if (payload.sub !== 'admin' || !payload.email || payload.exp <= now) return null
    return payload
  } catch {
    return null
  }
}

export function createSession(email: string): string {
  const now = Math.floor(Date.now() / 1000)
  return signToken({
    sub: 'admin',
    email,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  })
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE

export function buildSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  }
}

/**
 * Apply the session cookie to a NextResponse. Use this in Route Handlers.
 * Returns the same NextResponse for convenience.
 */
export function applySessionCookie(res: NextResponse, token: string): NextResponse {
  res.cookies.set(SESSION_COOKIE, token, buildSessionCookieOptions())
  return res
}

export function clearSessionCookie(res: NextResponse): NextResponse {
  res.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value
    if (!token) return null
    return verifyToken(token)
  } catch {
    return null
  }
}

/**
 * Server-side guard for admin routes.
 * Returns the session if valid, otherwise redirects to /connexion.
 */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession()
  if (!session) {
    redirect('/connexion?error=unauthorized')
  }
  return session
}

export function verifyCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  )
}

export const ADMIN_CREDENTIALS = {
  email: ADMIN_EMAIL,
}
