import { Navbar } from '@/components/grace/navbar'
import { Footer } from '@/components/grace/footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-night grain-overlay">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
