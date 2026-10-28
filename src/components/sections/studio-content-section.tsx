import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { STUDIO_PAGE } from "@/constants/pages";

/** Figma "Studio" body: purpose, pillars, foundations, workspace and video. */
export function StudioContentSection() {
  return (
    <section
      data-header-theme="dark"
      className="bg-paper px-16 py-64 text-black lg:px-0 lg:pt-113 lg:pb-112"
    >
      <div className="flex flex-col gap-48 lg:flex-row lg:items-start lg:gap-101 lg:pl-93">
        <Reveal className="flex flex-col gap-40 lg:w-703 lg:gap-51">
          {STUDIO_PAGE.sections.map((section) => (
            <div key={section.heading} data-reveal>
              <h2 className="text-heading font-light">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </Reveal>
        <Reveal className="relative aspect-[938/874] w-full overflow-hidden lg:w-938">
          <ParallaxImage
            src={STUDIO_PAGE.workspace}
            alt=""
            sizes="(min-width: 1024px) 49vw, 100vw"
          />
        </Reveal>
      </div>

      <Reveal className="relative mt-64 flex aspect-[1749/840] w-full items-center justify-center overflow-hidden lg:mx-auto lg:mt-112 lg:w-1749">
        <ParallaxImage
          src={STUDIO_PAGE.videoCover}
          alt=""
          sizes="(min-width: 1024px) 91vw, 100vw"
        />
        <span className="relative flex h-48 items-center justify-center bg-glass px-20 text-nav leading-[1.03] text-white lg:h-58 lg:w-116 lg:px-25">
          {STUDIO_PAGE.play}
        </span>
      </Reveal>
    </section>
  );
}
