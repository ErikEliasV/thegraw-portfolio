import type { Metadata } from "next";
import { CASES_PAGE } from "@/constants/cases";
import { CasesShowcase } from "@/features/cases";

export const metadata: Metadata = {
  title: CASES_PAGE.title,
};

export default function CasesPage() {
  return (
    <main id="conteudo">
      <CasesShowcase />
    </main>
  );
}
