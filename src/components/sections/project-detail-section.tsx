import { GalleryImage } from "@/components/ui/gallery-image";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { SplitReveal } from "@/components/ui/split-reveal";
import { LOREM_LONG, PROJECT_PAGE } from "@/constants/pages";
import type { Project } from "@/types/project";

type ProjectDetailSectionProps = {
  project: Project;
};

/** Gallery images: 1517.428 wide minus the 11.109px frame, 829.809 tall. */
const WIDE = "aspect-[1495.21/829.809]";
const FRAME = "lg:p-11";

/** Figma "Project Open" (1920 frame, BLACK GRAW): hero, intro, gallery, story. */
export function ProjectDetailSection({ project }: ProjectDetailSectionProps) {
  return (
    <>
      <section data-header-theme="light" className="bg-black-graw">
        <div className="relative h-[60svh] w-full bg-placeholder lg:h-692">
          <ParallaxImage
            src={PROJECT_PAGE.image}
            alt=""
            priority
            imageClassName="object-[50%_40.9%]"
          />
        </div>
      </section>

      <section
        data-header-theme="light"
        className="flex flex-col items-center gap-44 bg-black-graw pt-44 text-white"
      >
        <div className="flex w-full flex-col gap-32 px-16 lg:w-1496 lg:px-0">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
            <SplitReveal
              as="h1"
              split="chars"
              trigger="load"
              className="text-title"
            >
              {project.title}
            </SplitReveal>
            <p className="text-meta text-orange lg:w-99">{project.category}</p>
          </div>
          <Reveal>
            <p className="text-body lg:w-1037">{LOREM_LONG}</p>
          </Reveal>
        </div>

        <div className="flex w-full flex-col items-center gap-64 px-6 lg:w-1517.5 lg:gap-62 lg:px-0">
          <div className="flex w-full flex-col gap-10">
            <GalleryImage
              src={PROJECT_PAGE.image}
              aspectClassName={WIDE}
              className={FRAME}
            />
            <div className="flex flex-col gap-32 lg:w-1506 lg:flex-row lg:items-start lg:gap-33.25">
              <GalleryImage
                src={PROJECT_PAGE.image}
                aspectClassName="aspect-[867.577/829.809]"
                imageClassName="object-center"
                className={`${FRAME} lg:w-889.75`}
              />
              <Reveal className="flex flex-col gap-16 px-10 lg:w-582.75 lg:gap-15.5 lg:px-0">
                <h2 className="text-chapter">{PROJECT_PAGE.solution}</h2>
                <p className="text-copy">{LOREM_LONG}</p>
              </Reveal>
            </div>
            {[0, 1, 2].map((index) => (
              <GalleryImage
                key={index}
                src={PROJECT_PAGE.image}
                aspectClassName={WIDE}
                className={FRAME}
              />
            ))}
          </div>

          <Reveal className="flex flex-col gap-32 px-10 lg:w-1490 lg:flex-row lg:items-start lg:gap-33.25 lg:px-0">
            <div data-reveal className="flex flex-col gap-6.75 lg:w-885.25">
              <h2 className="text-chapter">{PROJECT_PAGE.process}</h2>
              <p className="text-copy">{LOREM_LONG}</p>
            </div>
            <div data-reveal className="flex flex-col gap-6.75 lg:w-571">
              <h2 className="text-chapter">{PROJECT_PAGE.results}</h2>
              <p className="text-copy">{PROJECT_PAGE.resultsBody}</p>
            </div>
          </Reveal>

          <div className="flex w-full flex-col gap-24 lg:gap-45.5">
            {[0, 1, 2].map((index) => (
              <GalleryImage
                key={index}
                src={PROJECT_PAGE.image}
                aspectClassName={WIDE}
                className={FRAME}
              />
            ))}
          </div>
        </div>

        <GalleryImage
          src={PROJECT_PAGE.image}
          aspectClassName="aspect-[1900/799]"
          imageClassName="object-center"
          className="w-full"
        />
      </section>
    </>
  );
}
