import type { Project, ServiceId } from "@/types/project";
import { asset } from "@/utils/asset";

const ALL_SERVICES: readonly ServiceId[] = [
  "branding",
  "web-design",
  "packpaging",
];

/** Figma placeholder details, shared by every case until there is content. */
const PLACEHOLDER = {
  title: "Project Name",
  client: "Allce. Co",
  category: "brand identy",
  year: "2022",
  services: ALL_SERVICES,
  thumbnail: asset("/images/home/project-thumb-lorena.webp"),
} as const;

/** Cases collage main image, the cover of cases without one in the Figma. */
const COLLAGE_COVER = asset("/images/cases/collage-main.webp");

/** The ten Figma project pages, in the order of the canvas: slug, name, cover. */
const CASES: readonly (readonly [string, string, string | null])[] = [
  ["allce", "Allce", "allce"],
  ["grupo-penguin", "Grupo Penguin", "grupo-penguin"],
  ["e2-company", "e2 company", "e2-company"],
  ["lorena-lourenco", "Lorena Lourenço", "lorena-lourenco"],
  ["site-naturallis", "Site Naturallis", "site-naturallis"],
  ["conexao-duo", "Conexão Duo", null],
  ["rotulos-naturallis", "Rotulos Naturallis", null],
  ["packpaging-2", "Packpaging 2", null],
  ["elle-fanning", "Elle Fanning", "elle-fanning"],
  ["app-3", "App 3", null],
];

export const PROJECTS: readonly Project[] = CASES.map(
  ([slug, name, cover]) => ({
    ...PLACEHOLDER,
    slug,
    name,
    cover: cover ? asset(`/images/cases/covers/${cover}.webp`) : COLLAGE_COVER,
  }),
);

/**
 * Figma project showcase (home "Projeto Allce" and services "Projeto view
 * Services" slides): every variant shows this Grupo Penguin placeholder.
 */
export const PROJECT_SHOWCASE = {
  slug: "grupo-penguin",
  client: "grupo penguin",
  handle: "/grupopenguin",
  year: "2026",
  logo: asset("/images/logos/grupo-penguin.svg"),
  description: "A calm, editorial, website for a wellness brand",
  disciplines: ["branding", "web design", "development"],
  image: asset("/images/services/project-slide.webp"),
  device: asset("/images/home/case-phone.webp"),
} as const;

export const SHOWCASE_LABELS = {
  client: "Client",
  year: "year",
  explore: "Explore project",
} as const;

export function getProjectHref(project: Pick<Project, "slug">) {
  return `/cases/${project.slug}`;
}

export function findProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Project page carousel and studio card: the original placeholder project. */
export const FEATURED_PROJECT: Project = {
  ...PLACEHOLDER,
  slug: "allce",
  name: "Allce",
  cover: asset("/images/home/featured-project.webp"),
};

/** "Frame 96" carousel cards. */
export const CAROUSEL_CARD = {
  label: "brand",
  year: "2026",
  cta: "view project",
} as const;

export const CAROUSEL_PROJECTS: readonly Project[] = [
  FEATURED_PROJECT,
  FEATURED_PROJECT,
  FEATURED_PROJECT,
];
