import { STUDIO_INFO } from "@/constants/studio";
import type { ServiceId } from "@/types/project";
import { asset } from "@/utils/asset";

/** Figma CTA copy, kept as written in the design. */
export const PROPOSAL_CTA = "Socilite sua proposta";
export const PROPOSAL_HREF = `mailto:${STUDIO_INFO.email}`;

export const LETS_WORK = {
  title: "Let's work together",
  copy: [
    "Work with us if average isn't your thing.",
    "Drop it, we'll build it!",
  ],
} as const;

/** Figma "Services": the three services, top to bottom as in the hero. */
export const SERVICE_OFFER: readonly { id: ServiceId; title: string }[] = [
  { id: "packpaging", title: "Packpaging" },
  { id: "web-design", title: "Web design" },
  { id: "branding", title: "Branding" },
];

export const SERVICES_PAGE = {
  title: "Services",
  heroImage: asset("/images/services/branding.webp"),
  defaultService: "branding",
  /** Three slides per service in the Figma. */
  slidesPerService: 3,
  back: "back",
} as const;

export function projectsLabel(title: string) {
  return `projects <${title.toLowerCase()}>`;
}
