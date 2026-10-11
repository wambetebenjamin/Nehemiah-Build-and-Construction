import { TransitionLink } from "@/components/site/Navigation";
import {
  BuildJourney,
  ContactSection,
  EnquirySection,
  Hero,
  HowWeWork,
  InsightsTeaser,
  IntroStats,
  NewsletterSection,
  ProjectPortfolioSection,
  ServicesSection,
  SupplierSection,
  TestimonialsSection,
} from "@/components/site/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStats />
      <BuildJourney />
      <ServicesSection />
      <ProjectPortfolioSection />
      <HowWeWork />
      <TenderCallout />
      <SupplierSection />
      <CareersCallout />
      <TestimonialsSection />
      <EnquirySection />
      <InsightsTeaser />
      <NewsletterSection />
      <ContactSection />
    </>
  );
}

function TenderCallout() {
  return (
    <section className="tender-callout section-space" aria-labelledby="tender-callout-title">
      <div className="container tender-callout-inner">
        <div><span className="eyebrow">For suppliers &amp; contractors</span><h2 id="tender-callout-title">Ready to tender<br /><em>with confidence?</em></h2><p>Review current opportunities, download a tender pack, and submit your response through our tender desk.</p></div>
        <TransitionLink className="button button-primary" href="/tender">View tender opportunities <span aria-hidden="true">↗</span></TransitionLink>
      </div>
    </section>
  );
}

function CareersCallout() {
  return (
    <section className="careers-callout" aria-labelledby="careers-callout-title">
      <div className="careers-callout-image"><img src="/images/construction-team.jpg" alt="Construction team collaborating on an outdoor project" loading="lazy" /></div>
      <div className="container careers-callout-content"><span className="eyebrow">Build a career that matters</span><h2 id="careers-callout-title">Good work is<br /><em>built together.</em></h2><p>Join a practical, collaborative team working on projects across Kenya.</p><TransitionLink className="button button-primary" href="/careers">Explore careers <span aria-hidden="true">↗</span></TransitionLink></div>
    </section>
  );
}
