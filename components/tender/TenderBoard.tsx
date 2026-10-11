"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowRight, CalendarDays, FileText, MapPin } from "lucide-react";
import { TenderApplicationForm } from "@/components/forms/Forms";
import type { TenderOpportunity } from "@/lib/content";

export function TenderBoard({ opportunities }: { opportunities: TenderOpportunity[] }) {
  const [selected, setSelected] = useState("");
  const selectTender = (reference: string) => {
    setSelected(reference);
    window.setTimeout(() => document.getElementById("tender-application")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }), 0);
  };

  return (
    <>
      <section className="tender-list-section" aria-labelledby="open-tenders-title">
        <div className="section-heading section-heading-split tender-heading"><div><span className="eyebrow">Current opportunities</span><h2 id="open-tenders-title">A good project<br /><em>starts with a good team.</em></h2></div><p>Review the requirements carefully and submit your response before the stated close date. Contact us if a tender document is not yet available.</p></div>
        <div className="tender-list">
          {opportunities.map((tender) => <article className="tender-card" key={tender.reference}>
            <div className="tender-card-reference"><span>REFERENCE</span><strong>{tender.reference}</strong><span className="tender-example">Illustrative listing</span></div>
            <div className="tender-card-main"><span className="tender-category">{tender.category}</span><h3>{tender.name}</h3><p><MapPin aria-hidden="true" /> Nairobi / Kenya <span>·</span><CalendarDays aria-hidden="true" /> Closes {tender.closingDate}</p><small>{tender.note}</small></div>
            <div className="tender-card-actions">
              {tender.documentUrl ? <a className="button button-outline-dark" href={tender.documentUrl} target="_blank" rel="noreferrer"><ArrowDownToLine aria-hidden="true" /> Download Tender Document</a> : <button className="button button-outline-dark" type="button" disabled title="Upload the approved PDF to Vercel Blob and add its URL to the tender record."><ArrowDownToLine aria-hidden="true" /> Download Tender Document</button>}
              <button className="button button-primary" type="button" onClick={() => selectTender(tender.reference)}>Submit Tender Application <ArrowRight aria-hidden="true" /></button>
            </div>
          </article>)}
        </div>
        {opportunities.length === 0 && <div className="empty-state tender-empty"><FileText aria-hidden="true" /><h3>No open tenders right now</h3><p>Check back soon, or contact us to register your interest.</p></div>}
      </section>
      <section className="application-section" id="tender-application" aria-labelledby="tender-application-title">
        <div className="application-intro"><span className="eyebrow">Tender application</span><h2 id="tender-application-title">Make your response<br /><em>count.</em></h2><p>Complete each field and attach your tender response as a PDF. Your submission is stored securely and reviewed by our team.</p><div className="application-notice"><FileText aria-hidden="true" /><span>PDF only · Maximum 4 MB · Private upload</span></div></div>
        <div className="application-form-card"><TenderApplicationForm key={selected} tenderReference={selected} /></div>
      </section>
    </>
  );
}
