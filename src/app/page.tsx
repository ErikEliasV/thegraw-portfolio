import { Footer } from "@/components/layout/footer";
import { CaseStudiesIntroSection } from "@/components/sections/case-studies-intro-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LetsWorkSection } from "@/components/sections/lets-work-section";
import { ProjectShowcaseSection } from "@/components/sections/project-showcase-section";
import { ViewAllCasesSection } from "@/components/sections/view-all-cases-section";
import { HOME_PAGE } from "@/constants/pages";

export default function HomePage() {
  return (
    <>
      <main id="conteudo">
        <HeroSection />
        <CaseStudiesIntroSection />
        {Array.from({ length: HOME_PAGE.showcaseCount }, (_, index) => (
          <ProjectShowcaseSection key={index} />
        ))}
        <ViewAllCasesSection />
        <LetsWorkSection />
      </main>
      <Footer />
    </>
  );
}
