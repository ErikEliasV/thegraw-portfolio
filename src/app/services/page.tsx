import type { Metadata } from "next";
import { ServicesSections } from "@/components/sections/services-sections";
import { SERVICES_PAGE } from "@/constants/services";

export const metadata: Metadata = {
  title: SERVICES_PAGE.title,
};

export default function ServicesPage() {
  return (
    <main id="conteudo">
      <ServicesSections />
    </main>
  );
}
