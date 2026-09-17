import { PageHeader } from '@/components/grace/page-header'
import { SITE } from '@/components/grace/data'

export const metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Grace Production.',
}

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Légal"
        title="Mentions"
        highlight="légales"
        description="Informations légales relatives au site Grace Production."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Mentions légales' }]}
      />
      <section className="relative section-pad bg-night overflow-hidden">
        <div className="container mx-auto max-w-3xl px-4 md:px-8">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-cream/80">
              <div>
                <h2 className="font-display text-2xl font-bold text-gold mb-3">
                  1. Éditeur du site
                </h2>
                <p className="text-sm leading-relaxed">
                  Le site <strong className="text-cream">graceproduction.cd</strong> est édité par{' '}
                  <strong className="text-cream">{SITE.name}</strong>, structure de production et
                  d'événementiel basée à {SITE.location}.
                </p>
                <p className="text-sm leading-relaxed mt-2">
                  Contact :{' '}
                  <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
                    {SITE.email}
                  </a>
                  {' '}—{' '}
                  Téléphone :{' '}
                  <a
                    href={`https://wa.me/${SITE.phones[0].value.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    {SITE.phones[0].display}
                  </a>
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-gold mb-3">
                  2. Hébergement
                </h2>
                <p className="text-sm leading-relaxed">
                  Le site est hébergé par un prestataire d'hébergement web professionnel assurant la
                  disponibilité et la sécurité des données.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-gold mb-3">
                  3. Propriété intellectuelle
                </h2>
                <p className="text-sm leading-relaxed">
                  L'ensemble des contenus présents sur ce site (textes, logos, images, vidéos,
                  graphismes) est la propriété exclusive de {SITE.name}, sauf mention contraire.
                  Toute reproduction, représentation, modification ou adaptation, totale ou
                  partielle, sans autorisation écrite préalable est interdite.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-gold mb-3">
                  4. Données personnelles
                </h2>
                <p className="text-sm leading-relaxed">
                  Les données collectées via les formulaires (contact, partenariat, newsletter) sont
                  utilisées exclusivement pour répondre à vos demandes et vous informer des actualités
                  de {SITE.name}. Elles ne sont jamais cédées à des tiers. Pour toute demande de
                  modification ou de suppression, contactez-nous à{' '}
                  <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
                    {SITE.email}
                  </a>
                  . Voir aussi notre{' '}
                  <a href="/confidentialite" className="text-gold hover:underline">
                    Politique de confidentialité
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-gold mb-3">
                  5. Responsabilité
                </h2>
                <p className="text-sm leading-relaxed">
                  {SITE.name} s'effuse d'assurer l'exactitude et la mise à jour des informations
                  diffusées sur ce site. Toutefois, {SITE.name} ne saurait être tenu responsable des
                  erreurs, omissions ou indisponibilités du site.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-gold mb-3">
                  6. Contact
                </h2>
                <p className="text-sm leading-relaxed">
                  Pour toute question relative aux présentes mentions légales, vous pouvez nous
                  contacter via notre{' '}
                  <a href="/contact" className="text-gold hover:underline">
                    formulaire de contact
                  </a>
                  .
                </p>
              </div>

              <p className="text-xs text-cream/50 pt-6 border-t border-gold/15">
                © {SITE.year} {SITE.name}. Tous droits réservés. Dernière mise à jour : {SITE.year}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
