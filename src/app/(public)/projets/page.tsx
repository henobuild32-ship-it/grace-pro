import { PageHeader } from '@/components/grace/page-header'
import { Projects } from '@/components/grace/projects'

export default function ProjetsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos Projets"
        title="Des projets qui"
        highlight="transforment et rassemblent"
        description="Deux projets à fort impact social, culturel et spirituel, portés par Grace Production à Kinshasa."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Nos Projets' }]}
      />
      <Projects />
    </>
  )
}
