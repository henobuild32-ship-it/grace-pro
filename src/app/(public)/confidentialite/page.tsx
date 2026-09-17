import { PageHeader } from '@/components/grace/page-header'
import { SITE } from '@/components/grace/data'

export const metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et de protection des données personnelles de Grace Production.',
}

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Légal"
        title="Politique de"
        highlight="confidentialité"
        description="Comment Grace Production collecte, utilise et protège vos données personnelles."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Confidentialité' }]}
      />
      <section className="relative section-pad bg-night overflow-hidden">
        <div className="container mx-auto max-w-3xl px-4 md:px-8">
          <div className="space-y-8 text-cream/80">
            <div>
              <h2 className="font-display text-2xl font-bold text-gold mb-3">
                1. Données collectées
              </h2>
              <p className="text-sm leading-relaxed">
                {SITE.name} collecte les données suivantes via les formulaires du site :
              </p>
              <ul className="mt-3 space-y-2 text-sm text-cream/70">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>
                    <strong className="text-cream">Formulaire de contact :</strong> nom, email,
                    téléphone, sujet, message.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>
                    <strong className="text-cream">Demande de partenariat :</strong> nom de
                    l'entreprise, nom du responsable, email, téléphone, type de partenariat, message.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>
                    <strong className="text-cream">Newsletter :</strong> adresse email uniquement.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-gold mb-3">
                2. Finalité du traitement
              </h2>
              <p className="text-sm leading-relaxed">
                Les données collectées sont utilisées exclusivement pour :
              </p>
              <ul className="mt-3 space-y-2 text-sm text-cream/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>Répondre à vos demandes (contact, partenariat) ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>Vous envoyer nos actualités et lancements de projets (newsletter) ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>Améliorer nos services et notre offre événementielle.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-gold mb-3">
                3. Conservation des données
              </h2>
              <p className="text-sm leading-relaxed">
                Vos données sont conservées pour une durée maximale de 3 ans après votre dernier
                échange avec {SITE.name}, sauf demande de suppression de votre part.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-gold mb-3">
                4. Partage des données
              </h2>
              <p className="text-sm leading-relaxed">
                {SITE.name} s'engage à ne jamais vendre, louer ou céder vos données personnelles à
                des tiers. Les données sont stockées sur un serveur sécurisé et ne sont accessibles
                qu'à l'équipe interne habilitée.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-gold mb-3">
                5. Vos droits
              </h2>
              <p className="text-sm leading-relaxed">
                Conformément à la loi, vous disposez des droits suivants sur vos données :
              </p>
              <ul className="mt-3 space-y-2 text-sm text-cream/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>Droit d'accès à vos données ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>Droit de rectification ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>Droit à l'effacement (« droit à l'oubli ») ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                  <span>Droit d'opposition au traitement.</span>
                </li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                Pour exercer ces droits, contactez-nous à{' '}
                <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
                  {SITE.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-gold mb-3">
                6. Cookies
              </h2>
              <p className="text-sm leading-relaxed">
                Le site utilise un cookie de session strictement nécessaire au bon fonctionnement de
                l'espace administrateur (authentification). Aucun cookie publicitaire ou de tracking
                tiers n'est déposé.
              </p>
            </div>

            <p className="text-xs text-cream/50 pt-6 border-t border-gold/15">
              © {SITE.year} {SITE.name}. Tous droits réservés. Dernière mise à jour : {SITE.year}.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
