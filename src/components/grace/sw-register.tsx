'use client'

import { useEffect } from 'react'

/**
 * Registers the PWA service worker on the client (production only).
 * Enables offline support + install prompt on Android Chrome.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return
    // Only register in production (or when explicitly enabled in dev)
    if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_SW_DEV) return

    const register = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.info('[PWA] Service worker registered:', reg.scope)
        })
        .catch((err) => {
          console.warn('[PWA] Service worker registration failed:', err)
        })
    }

    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register)
      return () => window.removeEventListener('load', register)
    }
  }, [])

  return null
}
