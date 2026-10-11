import type { Metadata } from "next";
import { ArrowDownRight, HardHat, HeartHandshake, ShieldCheck } from "lucide-react";
import { CareerBoard } from "@/components/careers/CareerBoard";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore careers in construction, engineering, quantity surveying, architecture, and project management with Nehemiah Build.",
  openGraph: { title: "Careers | Nehemiah Build", description: "Bring your skills to a team building across Kenya.", images: ["/images/construction-team.jpg"] },
};

export default function CareersPage() {
  return (
    <>
      <section className="subpage-hero careers-page-hero">
        <div className="container subpage-hero-layout"><div><span className="eyebrow">Careers · Nairobi &amp; Kenya</span><h1 tabIndex={-1}>Build a career<br /><em>with purpose.</em></h1><p>Bring your craft, your curiosity, and your commitment to work that shapes the places people live and work.</p><a className="button button-primary" href="#open-roles-title">Explore open roles <ArrowDownRight aria-hidden="true" /></a></div><div className="subpage-hero-photo"><img src="/images/civil-engineer-survey.jpg" alt="African woman civil engineer measuring a site outdoors" fetchPriority="high" /><span><HeartHandshake aria-hidden="true" /> People build better together</span></div></div>
      </section>
      <section className="container careers-content"><div className="career-values"><div><HardHat aria-hidden="true" /><strong>Safety first</strong><span>Respect the people and places around every project.</span></div><div><ShieldCheck aria-hidden="true" /><strong>Own the outcome</strong><span>Bring care and accountability to the details.</span></div><div><HeartHandshake aria-hidden="true" /><strong>Work as one team</strong><span>Share knowledge and make room for good ideas.</span></div></div><CareerBoard /></section>
    </>
  );
}
