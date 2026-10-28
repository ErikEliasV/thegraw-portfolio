import { SplitReveal } from "@/components/ui/split-reveal";
import { UnderReveal } from "@/components/ui/under-reveal";
import { CASE_STUDIES_DITHER } from "@/constants/dither";
import { HOME_PAGE } from "@/constants/pages";
import { DitherImage } from "@/features/dither-image";

/**
 * Figma home "case studies" (1920×617): the title over a light grain. It
 * slides out from under the hero.
 */
export function CaseStudiesIntroSection() {
  const { title, body } = HOME_PAGE.caseStudies;

  return (
    <section
      data-header-theme="dark"
      className="relative overflow-hidden bg-white text-black lg:h-617"
    >
      <UnderReveal className="px-16 py-112 lg:absolute lg:inset-0 lg:p-0">
        <DitherImage {...CASE_STUDIES_DITHER} animation="scroll" />
        <div className="relative flex flex-col gap-32 lg:absolute lg:top-255.25 lg:left-962.75 lg:w-359.5 lg:gap-69.5">
          <SplitReveal as="h2" split="lines" className="text-cases">
            {title[0]}
            <br />
            {title[1]}
          </SplitReveal>
          <SplitReveal
            split="lines"
            delay={0.15}
            className="text-intro font-light"
          >
            {body}
          </SplitReveal>
        </div>
      </UnderReveal>
    </section>
  );
}
