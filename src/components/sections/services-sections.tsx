"use client";

import { useState } from "react";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { ServicesProjectsSection } from "@/components/sections/services-projects-section";
import {
  projectsLabel,
  SERVICE_OFFER,
  SERVICES_PAGE,
} from "@/constants/services";
import type { ServiceId } from "@/types/project";

/** Figma "Services": the hero picks the service whose projects slide below. */
export function ServicesSections() {
  const [active, setActive] = useState<ServiceId>(SERVICES_PAGE.defaultService);
  const service =
    SERVICE_OFFER.find((item) => item.id === active) ?? SERVICE_OFFER[0];

  return (
    <>
      <ServicesHeroSection active={active} onSelect={setActive} />
      <ServicesProjectsSection
        label={projectsLabel(service.title)}
        serviceId={service.id}
      />
    </>
  );
}
