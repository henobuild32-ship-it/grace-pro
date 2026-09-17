import type { LucideIcon } from "lucide-react";
import {
  Mic2,
  Palette,
  Megaphone,
  Handshake,
  Truck,
  Eye,
  Network,
  Award,
  Sparkles,
  ShieldCheck,
  HandHeart,
  TrendingUp,
  Clock,
  Users,
  Heart,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";

export const SITE = {
  name: "Grace Production",
  slogan: "Réalisez vos rêves.",
  tagline: "Production • Événementiel • Arts • Communication • Partenariats",
  location: "Kinshasa, République Démocratique du Congo",
  email: "contact@graceproduction.cd",
  phones: [
    { label: "+243 831 199 435", value: "+243831199435", display: "+243 831 199 435" },
    { label: "+243 991 674 122", value: "+243991674122", display: "+243 991 674 122" },
  ],
  whatsappNumbers: [
    { display: "+243 831 199 435", waLink: "https://wa.me/243831199435" },
    { display: "+243 991 674 122", waLink: "https://wa.me/243991674122" },
  ],
  hours: "Lundi – Samedi, 8h – 18h",
  instagram: "https://www.instagram.com/graceproduction01/",
  facebook: "https://www.facebook.com/profile.php?id=61556017321267",
  year: 2025,
}

// Helper to build a WhatsApp link with a pre-filled message
export function whatsappLink(number: string, message?: string) {
  const clean = number.replace(/[^0-9]/g, "")
  const base = `https://wa.me/${clean}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
};

export type ServiceItem = {
  id: string;
  icon: LucideIcon;
  emoji: string;
  title: string;
  short: string;
  description: string;
  image: string;
  cta: string;
  bullets: string[];
};

export const SERVICES: ServiceItem[] = [
  {
    id: "production-evenementielle",
    icon: Mic2,
    emoji: "🎤",
    title: "Production événementielle",
    short:
      "Conception et organisation de concerts, festivals, campagnes, spectacles, conférences et grands événements.",
    description:
      "Nous concevons et organisons des concerts, festivals, campagnes, spectacles, conférences et grands événements à fort impact, de A à Z, avec une équipe expérimentée et un réseau solide.",
    image: "/images/service-event.png",
    cta: "Demander un devis",
    bullets: [
      "Conception & scénographie",
      "Gestion d'artistes & programmation",
      "Production technique complète",
      "Billettique & accueil public",
    ],
  },
  {
    id: "production-artistique",
    icon: Palette,
    emoji: "🎨",
    title: "Production artistique",
    short:
      "Accompagnement d'artistes, conception de projets musicaux et scéniques, coordination artistique et développement de carrières.",
    description:
      "Nous accompagnons les artistes de la conception à la scène : projets musicaux, scéniques, coordination artistique et développement de carrières durables.",
    image: "/images/service-artistique.png",
    cta: "Collaborer avec nous",
    bullets: [
      "Développement d'artistes",
      "Production musicale & scénique",
      "Direction artistique",
      "Stratégie de carrière",
    ],
  },
  {
    id: "communication-visibilite",
    icon: Megaphone,
    emoji: "📢",
    title: "Communication & visibilité",
    short:
      "Création de stratégies de communication, supports promotionnels, visibilité des marques et activation de partenariats.",
    description:
      "Nous élaborons des stratégies de communication sur mesure, créons des supports promotionnels impactants et activons des partenariats pour booster votre visibilité.",
    image: "/images/service-com.png",
    cta: "Booster ma visibilité",
    bullets: [
      "Stratégie de communication",
      "Création de supports & contenus",
      "Gestion des réseaux sociaux",
      "Activation de partenariats médias",
    ],
  },
  {
    id: "partenariats-sponsoring",
    icon: Handshake,
    emoji: "🤝",
    title: "Partenariats & sponsoring",
    short:
      "Mise en relation entre projets, marques, entreprises et institutions autour de collaborations créatrices de valeur.",
    description:
      "Nous mettons en relation projets, marques, entreprises et institutions autour de collaborations créatrices de valeur mutuelle et d'impact durable.",
    image: "/images/service-partners.png",
    cta: "Devenir partenaire",
    bullets: [
      "Sourcing & négociation de partenariats",
      "Construction d'offres de sponsoring",
      "Activation & valorisation marques",
      "Reporting & mesure d'impact",
    ],
  },
  {
    id: "logistique-evenementielle",
    icon: Truck,
    emoji: "🚚",
    title: "Logistique événementielle",
    short:
      "Coordination des besoins techniques, sonorisation, scène, espaces, accueil, sécurité, transport et autres dispositifs nécessaires à la réussite d'un événement.",
    description:
      "Nous coordonnons l'ensemble des besoins techniques et opérationnels : sonorisation, scène, espaces, accueil, sécurité, transport — pour garantir la réussite de chaque événement.",
    image: "/images/service-logistique.png",
    cta: "Demander une coordination",
    bullets: [
      "Son, lumière, scène & structures",
      "Espaces, accueil & sécurité",
      "Transport & hébergement",
      "Coordination technique globale",
    ],
  },
];

export type ProjectEventInfo = {
  date: string;
  venue: string;
  ticketStandard: string;
  ticketVip: string;
  ticketUrl: string;
  partners: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gallery?: string[];
  eventInfo?: ProjectEventInfo;
  objectives: string[];
  audience: string[];
  cta: string;
  ctaSecondary: string;
  theme: "social" | "spiritual";
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "festival-pere-des-orphelins",
    title: "Festival Père des Orphelins",
    subtitle: "Art • Solidarité • Humanitaire",
    description:
      "Un projet à dimension artistique, sociale et humanitaire visant à mobiliser les communautés autour de la cause des enfants orphelins. À travers la musique, la sensibilisation et la mobilisation collective, le festival ambitionne de créer un espace où divertissement, solidarité et responsabilité sociale se rencontrent.",
    image: "/images/festival-1.jpeg",
    gallery: [
      "/images/festival-1.jpeg",
      "/images/festival-2.jpeg",
      "/images/festival-3.jpeg",
      "/images/festival-4.jpeg",
      "/images/festival-5.jpeg",
    ],
    eventInfo: {
      date: "1er Novembre 2026, 12h00",
      venue: "Terrain Shaumba, Kinshasa",
      ticketStandard: "5 000 FC",
      ticketVip: "10 $ (USD)",
      ticketUrl: "https://sombaticket.com",
      partners: [
        "Grace Production",
        "Inabiso Communication",
        "USAFI",
        "Somba Ticket",
        "AAN — Amour Autour de Nous",
      ],
    },
    objectives: [
      "Sensibiliser le grand public à la cause des orphelins",
      "Mobiliser artistes, ONG, institutions et sponsors",
      "Collecter des fonds pour des actions durables",
      "Offrir un moment de joie aux enfants orphelins",
    ],
    audience: [
      "Grand public",
      "Artistes engagés",
      "ONG & institutions",
      "Sponsors & mécènes",
    ],
    cta: "Soutenir le festival",
    ctaSecondary: "Devenir sponsor",
    theme: "social",
  },
  {
    id: "surnaturel-na-bala-bala",
    title: "Surnaturel Na Bala Bala",
    subtitle: "Foi • Espérance • Transformation",
    description:
      "Une grande campagne d'évangélisation et de rassemblement spirituel portée autour de la foi, de l'espérance et de la transformation des vies. Ce projet rassemble différents acteurs du monde chrétien autour d'un même objectif : transmettre un message d'espérance et créer un impact durable au sein de la communauté.",
    image: "/images/surnaturel-bala-bala.jpeg",
    gallery: [
      "/images/surnaturel-bala-bala.jpeg",
    ],
    eventInfo: {
      date: "25 Octobre 2026 — 14h30 & 19h30",
      venue: "Terrain Buffle, Kingabwa (près de Rond point TP), Kinshasa",
      ticketStandard: "Entrée libre",
      ticketVip: "—",
      ticketUrl: "",
      partners: [
        "Église des Rois et Terre des Sacrificateurs",
        "Prédicateur Isaac Abba",
        "Grace Production",
      ],
    },
    objectives: [
      "Rassembler la communauté chrétienne autour de la foi",
      "Évangéliser et transmettre un message d'espérance",
      "Thème 2026 : « L'Ombre des choses à venir »",
      "Mobiliser les artistes gospel et partenaires spirituels",
    ],
    audience: [
      "Communauté chrétienne",
      "Églises & ministères",
      "Artistes gospel",
      "Partenaires spirituels",
    ],
    cta: "Rejoindre le mouvement",
    ctaSecondary: "Devenir partenaire",
    theme: "spiritual",
  },
];

export type EngagementItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const ENGAGEMENTS: EngagementItem[] = [
  {
    icon: HandHeart,
    title: "Confiance",
    description:
      "Des relations transparentes et durables avec nos partenaires, artistes et communautés.",
  },
  {
    icon: Award,
    title: "Professionnalisme",
    description:
      "Une équipe structurée, expérimentée et engagée à livrer l'excellence à chaque étape.",
  },
  {
    icon: ShieldCheck,
    title: "Transparence",
    description:
      "Des processus clairs, un reporting régulier et une gestion intègre de chaque projet.",
  },
  {
    icon: Sparkles,
    title: "Créativité",
    description:
      "Des concepts originaux et des expériences mémorables pensées pour marquer les esprits.",
  },
  {
    icon: Clock,
    title: "Respect des engagements",
    description:
      "Des délais tenus, des budgets maîtrisés et une parole donnée toujours honorée.",
  },
  {
    icon: TrendingUp,
    title: "Résultats durables",
    description:
      "Un impact mesurable, pour des projets qui vivent bien au-delà de l'événement.",
  },
];

export type WhyPoint = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const WHY_POINTS: WhyPoint[] = [
  {
    icon: Eye,
    title: "Vision",
    description:
      "Une approche stratégique qui transforme une idée en projet structuré et porteur de sens.",
  },
  {
    icon: Network,
    title: "Réseau",
    description:
      "Un écosystème d'artistes, d'institutions, de médias et de sponsors prêt à être activé.",
  },
  {
    icon: Award,
    title: "Professionnalisme",
    description:
      "Des standards de qualité élevés, de la conception à l'exécution sur le terrain.",
  },
  {
    icon: Heart,
    title: "Impact",
    description:
      "Des projets qui génèrent de la valeur sociale, culturelle et spirituelle mesurable.",
  },
];

export type PartnerType = {
  title: string;
  description: string;
  benefits: string[];
};

export const PARTNER_FORMULAS: PartnerType[] = [
  {
    title: "Sponsor officiel",
    description:
      "Visibilité maximale sur l'ensemble de nos événements et projets phares.",
    benefits: ["Logo & présence marque", "Activation sur site", "Visibilité médias"],
  },
  {
    title: "Partenaire média",
    description:
      "Relais et amplification de nos campagnes à travers vos canaux médias.",
    benefits: ["Couverture éditoriale", "Échange de visibilité", "Contenus exclusifs"],
  },
  {
    title: "Partenaire logistique",
    description:
      "Mise à disposition de moyens techniques, humains ou matériels.",
    benefits: ["Association de marque", "Visibilité technique", "Co-branding"],
  },
  {
    title: "Investisseur",
    description:
      "Soutien financier structuré pour un retour sur impact et sur image.",
    benefits: ["Reporting dédié", "Co-construction projets", "Networking premium"],
  },
  {
    title: "Mécène",
    description:
      "Soutien désintéressé au service de l'impact social et culturel.",
    benefits: ["Reconnaissance publique", "Bilan d'impact annuel", "Signature mécénat"],
  },
];

export const PARTNERSHIP_TYPES = [
  "Sponsor officiel",
  "Partenaire média",
  "Partenaire logistique",
  "Investisseur",
  "Mécène",
  "Autre",
] as const;

export const CONTACT_SUBJECTS = [
  "Partenariat",
  "Production",
  "Artiste",
  "Autre",
] as const;

export const SOCIAL_LINKS = {
  instagram: SITE.instagram,
  facebook: SITE.facebook,
};

export const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/domaines", label: "Nos Domaines" },
  { href: "/projets", label: "Nos Projets" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export const CONTACT_INFO = [
  { icon: MapPin, label: "Adresse", value: SITE.location },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  ...SITE.phones.map((p) => ({
    icon: Phone,
    label: "Téléphone",
    value: p.display,
    href: `tel:${p.value}`,
  })),
  { icon: Clock, label: "Horaires", value: SITE.hours },
];

// Hero background — uses a vibrant festival crowd image
export const HERO_IMAGE = "/images/festival-5.jpeg";
// About / team image
export const ABOUT_IMAGE = "/images/festival-2.jpeg";
// Logo (official Grace Production logo)
export const LOGO_PATH = "/images/logo.jpeg";
