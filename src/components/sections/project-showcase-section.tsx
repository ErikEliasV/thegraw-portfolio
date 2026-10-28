import { ParallaxImage } from "@/components/ui/parallax-image";
import {
  ProjectBrand,
  ProjectDisciplines,
  ProjectMeta,
} from "@/components/ui/project-meta";
import { Reveal } from "@/components/ui/reveal";
import { ShowcaseCard } from "@/components/ui/showcase-card";
import { UnderReveal } from "@/components/ui/under-reveal";
import { PROJECT_SHOWCASE } from "@/constants/projects";

/**
 * Figma "Projeto Allce" (1920×1080): a full-screen project, its device shot
 * on the left and the details on the right. Each one slides out from under
 * the section above.
 */
export function ProjectShowcaseSection() {
  return (
    <section
      data-header-theme="light"
      aria-label={PROJECT_SHOWCASE.client}
      className="relative overflow-hidden bg-black-graw text-white lg:h-1080"
    >
      <UnderReveal className="min-h-svh lg:absolute lg:inset-0 lg:min-h-0">
        <ParallaxImage src={PROJECT_SHOWCASE.image} alt="" amount={4} />
        <div className="relative flex flex-col gap-48 px-16 pt-112 pb-64 lg:absolute lg:top-63 lg:left-177 lg:w-1566 lg:flex-row lg:items-end lg:justify-between lg:p-0">
          <ShowcaseCard />
          <Reveal className="flex flex-col gap-32 lg:w-672.75 lg:gap-738.5">
            <div data-reveal>
              <ProjectMeta className="lg:w-514.25" />
            </div>
            <div
              data-reveal
              className="flex flex-col gap-24 lg:flex-row lg:items-end lg:justify-between"
            >
              <ProjectBrand className="gap-24 lg:w-226.25 lg:gap-71.5" />
              <ProjectDisciplines className="lg:w-226.25" />
            </div>
          </Reveal>
        </div>
      </UnderReveal>
    </section>
  );
}
