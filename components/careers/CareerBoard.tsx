"use client";

import { useState } from "react";
import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { CareerApplicationForm } from "@/components/forms/Forms";
import { careers } from "@/lib/content";

export function CareerBoard() {
  const [selectedRole, setSelectedRole] = useState("");
  const apply = (title: string) => {
    setSelectedRole(title);
    window.setTimeout(() => document.getElementById("career-application")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }), 0);
  };

  return (
    <>
      <section className="careers-list-section" aria-labelledby="open-roles-title">
        <div className="section-heading section-heading-split"><div><span className="eyebrow">Open roles</span><h2 id="open-roles-title">Bring your skill.<br /><em>Build what matters.</em></h2></div><p>We&apos;re interested in people who care about safe sites, strong teamwork, and the details that turn a plan into lasting work.</p></div>
        <div className="career-list">{careers.map((role) => <article className="career-card" key={role.title}>
          <span className="career-icon"><BriefcaseBusiness aria-hidden="true" /></span>
          <div className="career-copy"><span className="career-sample">Indicative role · confirm current vacancy</span><h3>{role.title}</h3><p>{role.department} <span>·</span> {role.type}</p></div>
          <span className="career-location"><MapPin aria-hidden="true" />{role.location}</span>
          <button type="button" className="career-apply" onClick={() => apply(role.title)} aria-label={`Apply for ${role.title}`}>Apply <ArrowRight aria-hidden="true" /></button>
        </article>)}</div>
        <p className="content-disclaimer">Roles are illustrative until current vacancies are confirmed by Nehemiah Build.</p>
      </section>
      <section className="application-section career-application-section" id="career-application" aria-labelledby="career-application-title">
        <div className="application-intro"><span className="eyebrow">Join the team</span><h2 id="career-application-title">Let&apos;s build<br /><em>together.</em></h2><p>Tell us about your experience and the role you&apos;re interested in. We&apos;ll be in touch if there is a suitable opportunity.</p><div className="application-notice"><BriefcaseBusiness aria-hidden="true" /><span>Attach your CV as a PDF · Maximum 4 MB</span></div></div>
        <div className="application-form-card"><CareerApplicationForm key={selectedRole} role={selectedRole} /></div>
      </section>
    </>
  );
}
