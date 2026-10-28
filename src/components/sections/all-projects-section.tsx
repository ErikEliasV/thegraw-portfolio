import Link from "next/link";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { ALL_PROJECTS_GRID, CASES_PAGE } from "@/constants/cases";
import { getProjectHref } from "@/constants/projects";

/** Figma "all projects": two columns of 884.5×983 covers on BLACK GRAW. */
export function AllProjectsSection() {
  return (
    <section
      data-header-theme="light"
      className="bg-black-graw px-16 pt-112 pb-96 lg:px-0 lg:pt-231 lg:pb-148"
    >
      <h1 className="sr-only">{CASES_PAGE.allTitle}</h1>
      <ul className="grid gap-16 lg:mx-auto lg:w-1798 lg:grid-cols-2 lg:gap-29">
        {ALL_PROJECTS_GRID.map((item, index) => {
          const card = (
            <>
              <ParallaxImage
                src={item.image}
                alt={item.name}
                sizes="(min-width: 1024px) 47vw, 100vw"
                priority={index < 2}
                amount={4}
                imageClassName="transition-transform duration-700 ease-power3 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
              <span className="sr-only">{item.name}</span>
            </>
          );
          return (
            <li key={item.name}>
              <Reveal>
                {item.slug ? (
                  <Link
                    href={getProjectHref({ slug: item.slug })}
                    className="group relative block aspect-[884.5/983] overflow-hidden bg-coal"
                  >
                    {card}
                  </Link>
                ) : (
                  <div className="group relative aspect-[884.5/983] overflow-hidden bg-coal">
                    {card}
                  </div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
