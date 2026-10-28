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

export function getProjectHref(project: Pick<Project, "slug">) {
  return `/cases/${project.slug}`;
}

export function findProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Home featured slider and carousels: the original placeholder project. */
export const FEATURED_PROJECT: Project = {
  ...PLACEHOLDER,
  slug: "allce",
  name: "Allce",
  cover: asset("/images/home/featured-project.webp"),
};

/** Featured slider: three slides, as marked by the Figma dots. */
export const FEATURED_SLIDES: readonly Project[] = [
  FEATURED_PROJECT,
  FEATURED_PROJECT,
  FEATURED_PROJECT,
];

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
