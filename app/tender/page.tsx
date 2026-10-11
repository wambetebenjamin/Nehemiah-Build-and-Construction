import type { Metadata } from "next";
import { ArrowDownRight, FileCheck2, ShieldCheck } from "lucide-react";
import { TenderBoard } from "@/components/tender/TenderBoard";
import { getOpenTenderRecords } from "@/lib/storage";
import { tenderOpportunities, type TenderOpportunity } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tender Opportunities",
  description: "Review open tender opportunities and submit a secure tender response to Nehemiah Build & Construction.",
  openGraph: { title: "Tender Opportunities | Nehemiah Build", description: "Current tender opportunities and secure application submission.", images: ["/images/construction-team.jpg"] },
};

export default async function TenderPage() {
  let opportunities: TenderOpportunity[] = tenderOpportunities;
  try {
    const stored = await getOpenTenderRecords<TenderOpportunity>();
    if (stored) opportunities = stored;
  } catch (error) {
    console.error("Unable to load live tender records", error);
  }

  return (
    <>
      <section className="subpage-hero tender-page-hero">
        <div className="container subpage-hero-layout"><div><span className="eyebrow">Open tenders · Kenya</span><h1 tabIndex={-1}>Build strong<br /><em>partnerships.</em></h1><p>We welcome capable contractors and suppliers who share our commitment to quality, safety, and accountable delivery.</p><a className="button button-primary" href="#open-tenders-title">View open tenders <ArrowDownRight aria-hidden="true" /></a></div><div className="subpage-hero-photo"><img src="/images/construction-team.jpg" alt="African construction crew collaborating on a work site" fetchPriority="high" /><span><FileCheck2 aria-hidden="true" /> Secure tender desk</span></div></div>
      </section>
      <section className="container tender-content"><div className="tender-trust-row"><div><ShieldCheck aria-hidden="true" /><span><strong>Secure submissions</strong><small>Responses are stored privately.</small></span></div><div><FileCheck2 aria-hidden="true" /><span><strong>Clear requirements</strong><small>Review each document before applying.</small></span></div><p className="sample-disclosure">Listings shown are illustrative samples until live tender information and PDFs are approved.</p></div><TenderBoard opportunities={opportunities} /></section>
    </>
  );
}
