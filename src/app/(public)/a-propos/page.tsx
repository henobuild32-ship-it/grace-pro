import { PageHeader } from '@/components/grace/page-header'
import { Engagements } from '@/components/grace/why-engagements'
import { About } from '@/components/grace/about'

export default function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Une structure dédiée à"
        highlight="l'excellence événementielle"
        description="Découvrez l'histoire, la vision, la mission et les valeurs qui guident Grace Production au quotidien."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'À propos' }]}
      />
      <About />
      <Engagements />
    </>
  )
}
