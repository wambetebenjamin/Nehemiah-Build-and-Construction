import Link from "next/link";
import { TransitionLink } from "@/components/site/Navigation";
import { ArrowLeft, FileCheck2, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export function LegalPage({ title, effectiveDate, children }: { title: string; effectiveDate?: string; children: ReactNode }) {
  return (
    <article className="legal-page">
      <header className="legal-hero"><div className="container"><TransitionLink href="/" className="detail-back"><ArrowLeft aria-hidden="true" /> Home</TransitionLink><span className="eyebrow">Nehemiah Build · Nairobi, Kenya</span><h1 tabIndex={-1}>{title}</h1><p>Clear information about how we work with you and your project.</p><small>Last reviewed: {effectiveDate || "11 October 2026"}</small></div></header>
      <div className="container legal-body"><aside className="legal-aside"><ShieldCheck aria-hidden="true" /><strong>Built on clarity</strong><p>This page is a working privacy/terms template. Confirm the business details and have local counsel review before publishing.</p><nav aria-label="Legal pages"><TransitionLink href="/legal/privacy-policy">Privacy Policy</TransitionLink><TransitionLink href="/legal/terms">Terms</TransitionLink><TransitionLink href="/legal/cookie-policy">Cookie Policy</TransitionLink></nav></aside><div className="legal-content"><div className="legal-callout"><FileCheck2 aria-hidden="true" /><p>This draft is tailored to the supplied project brief and Kenya Data Protection Act, 2019 context. It is not legal advice.</p></div>{children}<p className="legal-contact">Questions? Contact us through the <Link href="/#contact">contact form</Link> or WhatsApp on <a href="https://wa.me/254112272061">+254 112 272 061</a>.</p></div></div>
    </article>
  );
}
