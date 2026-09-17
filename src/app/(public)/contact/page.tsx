import { PageHeader } from '@/components/grace/page-header'
import { Contact } from '@/components/grace/contact'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de"
        highlight="votre projet"
        description="Une question, une idée, un événement à produire ? Notre équipe vous répond sous 24h."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Contact' }]}
      />
      <Contact />
    </>
  )
}
