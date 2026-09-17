import { requireAdmin } from '@/lib/auth'
import { AdminSidebar } from '@/components/grace/admin-sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This will redirect to /connexion?error=unauthorized if no valid session.
  const session = await requireAdmin()

  return (
    <div className="min-h-screen bg-night flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden pb-safe">
          <div className="container mx-auto max-w-6xl">
            {/* Hidden session indicator for server-side */}
            <span className="sr-only">Session active : {session.email}</span>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
