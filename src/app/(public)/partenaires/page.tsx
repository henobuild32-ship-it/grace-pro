import { PageHeader } from '@/components/grace/page-header'
import { PartnersCTA, PartnershipForm } from '@/components/grace/partners'

export default function PartenairesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partenaires & Investisseurs"
        title="Associez votre image à des"
        highlight="projets à fort impact"
        description="Vous souhaitez associer votre image à un projet culturel, artistique, événementiel ou social ? Grace Production vous ouvre la porte à des opportunités de partenariat, de sponsoring et d'investissement adaptées à vos objectifs."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Partenaires' }]}
      />
      <PartnersCTA />
      <PartnershipForm />
    </>
  )
}
