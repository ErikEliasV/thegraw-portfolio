import Image from "next/image";
import { PROJECT_SHOWCASE, SHOWCASE_LABELS } from "@/constants/projects";
import { cn } from "@/utils/cn";

type ShowcaseProps = {
  className?: string;
};

/** Figma showcase meta: "Client grupo penguin" and "year 2026", uppercase. */
export function ProjectMeta({ className }: ShowcaseProps) {
  return (
    <dl
      className={cn(
        "flex justify-between text-fine whitespace-nowrap uppercase",
        className,
      )}
    >
      <div className="flex gap-17.5">
        <dt>{SHOWCASE_LABELS.client}</dt>
        <dd className="font-medium">{PROJECT_SHOWCASE.client}</dd>
      </div>
      <div className="flex gap-11.5">
        <dt>{SHOWCASE_LABELS.year}</dt>
        <dd className="font-medium">{PROJECT_SHOWCASE.year}</dd>
      </div>
    </dl>
  );
}

/** Figma showcase brand: the client logo over a two-line description. */
export function ProjectBrand({ className }: ShowcaseProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <Image
        src={PROJECT_SHOWCASE.logo}
        alt={PROJECT_SHOWCASE.client}
        width={99}
        height={33}
        className="h-auto w-80 lg:w-98.5"
      />
      <p className="max-w-226 text-lead">{PROJECT_SHOWCASE.description}</p>
    </div>
  );
}

/** Figma showcase disciplines, one per line on desktop. */
export function ProjectDisciplines({ className }: ShowcaseProps) {
  return (
    <ul className={cn("flex flex-wrap gap-x-12 text-lead lg:block", className)}>
      {PROJECT_SHOWCASE.disciplines.map((discipline) => (
        <li key={discipline}>{discipline}</li>
      ))}
    </ul>
  );
}
