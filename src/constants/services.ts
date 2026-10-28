import { STUDIO_INFO } from "@/constants/studio";
import type { Service, ServiceId } from "@/types/project";
import { asset } from "@/utils/asset";

const DESCRIPTION =
  "Criamos o conceito visual da marca e todos oe elemtnos visuais que fazem ela ter personalizadade própria, do logotipo a cores fortes, imagens e grafismos";

const DELIVERABLES = [
  ["Estratégia de marca", "Identidade visual", "Identidade verbal"],
  ["Brand Guidelines", "Aplicações da marca", "Gestão e evolução da marca"],
] as const;

export const SERVICES: readonly Service[] = [
  {
    number: "01",
    title: "Branding",
    description: DESCRIPTION,
    deliverables: DELIVERABLES,
  },
  {
    number: "02",
    title: "Products",
    description: DESCRIPTION,
    deliverables: DELIVERABLES,
  },
  {
    number: "03",
    title: "Motion e 3D",
    description: DESCRIPTION,
    deliverables: DELIVERABLES,
  },
];

/** Figma CTA copy, kept as written in the design. */
export const PROPOSAL_CTA = "Socilite sua proposta";
export const PROPOSAL_HREF = `mailto:${STUDIO_INFO.email}`;

export const LETS_WORK = {
  title: "Let's work toguether",
  copy: [
    "Work witch us if average isn't your thing.",
    "Drop it, we'll build it!",
  ],
} as const;

/** Figma "Services": the three services, top to bottom as in the hero. */
export const SERVICE_OFFER: readonly { id: ServiceId; title: string }[] = [
  { id: "packpaging", title: "Packpaging" },
  { id: "web-design", title: "Web design" },
  { id: "branding", title: "Branding" },
];

/** A Figma "Projeto view Services" slide (all nine variants are this placeholder). */
export const SERVICE_SLIDE = {
  slug: "grupo-penguin",
  client: "grupo penguin",
  year: "2026",
  logo: asset("/images/logos/grupo-penguin.svg"),
  description: "A calm, editorial, website for a wellness brand",
  disciplines: ["branding", "web design", "development"],
  image: asset("/images/services/project-slide.webp"),
} as const;

export const SERVICES_PAGE = {
  title: "Services",
  heroImage: asset("/images/services/branding.webp"),
  defaultService: "branding",
  /** Three slides per service in the Figma. */
  slidesPerService: 3,
  clientLabel: "Client",
  yearLabel: "year",
  back: "back",
} as const;

export function projectsLabel(title: string) {
  return `projects <${title.toLowerCase()}>`;
}
