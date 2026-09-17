import { PageHeader } from '@/components/grace/page-header'
import { Services } from '@/components/grace/services'

export default function DomainesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos Domaines d'Intervention"
        title="Cinq expertises pour"
        highlight="réaliser vos rêves"
        description="De la conception d'un événement à sa logistique, en passant par la production artistique, la communication et les partenariats — Grace Production couvre toute la chaîne de valeur."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Nos Domaines' }]}
      />
      <Services />
    </>
  )
}
