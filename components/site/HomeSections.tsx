"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Compass,
  HardHat,
  Home,
  Landmark,
  MapPinned,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { BuildingScene } from "@/components/site/BuildingScene";
import { ContactForm, EnquiryForm, NewsletterForm } from "@/components/forms/Forms";
import { TransitionLink } from "@/components/site/Navigation";
import { ProjectShowcase } from "@/components/site/ProjectShowcase";
import { services, journeyBeats, testimonials } from "@/lib/content";

const storyImages = [
  "/images/site-surveyor.jpg",
  "/images/architects-blueprint.jpg",
  "/images/nairobi-construction-crew.jpg",
  "/images/residential-build.jpg",
];

const storyAlt = [
  "Site engineer reviewing ground levels with survey equipment",
  "Architect and engineer coordinating project plans",
  "Construction crew working together on a Nairobi building site",
  "A completed home build concept in a Kenyan residential setting",
];

export function Hero() {
  const phrase = "Built on Trust. Raised on Excellence.";
  let glyphIndex = 0;
  const words = phrase.split(" ");

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-architectural-lines" aria-hidden="true"><span /><span /><span /></div>
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="hero-eyebrow hero-enter eyebrow-delay-0"><span className="glitch-word" data-glitch="BUILD">BUILD</span><span className="eyebrow-rule" /> Nairobi · Kenya · Since 2004</p>
          <h1 id="hero-title" tabIndex={-1}>
            <span className="sr-only">{phrase}</span>
            <span className="hero-headline-visual" aria-hidden="true">
              {words.map((word, wordIndex) => (
                <span className={`hero-word${wordIndex === 0 ? " glitch-headline" : ""}`} data-glitch={wordIndex === 0 ? word : undefined} key={`${word}-${wordIndex}`}>
                  {Array.from(word).map((glyph) => {
                    const index = glyphIndex++;
                    return <span className="hero-glyph" aria-hidden="true" key={`${glyph}-${index}`} style={{ "--glyph-index": index } as CSSProperties}>{glyph}</span>;
                  })}
                  {wordIndex < words.length - 1 && <span className="hero-word-space" aria-hidden="true"> </span>}
                </span>
              ))}
            </span>
          </h1>
          <p className="hero-description hero-enter eyebrow-delay-copy">Nehemiah Build. Nairobi&apos;s leading construction and civil engineering firm since 2004.</p>
          <div className="hero-actions hero-enter eyebrow-delay-actions">
            <TransitionLink href="/projects" className="button button-primary">View Our Projects <ArrowRight aria-hidden="true" /></TransitionLink>
            <Link href="#contact" className="button button-ghost">Request a Quote <ArrowDownRight aria-hidden="true" /></Link>
          </div>
          <div className="hero-proof hero-enter eyebrow-delay-proof"><ShieldCheck aria-hidden="true" /><span>Clear milestones. Accountable delivery. Built for Kenya.</span></div>
        </div>
        <div className="hero-visual hero-enter eyebrow-delay-visual">
          <div className="hero-image-frame">
            <img src="/images/nairobi-construction-crew.jpg" alt="Construction workers in safety gear on a Nairobi building site" fetchPriority="high" />
            <div className="hero-image-shade" />
          </div>
          <div className="scene-orbit orbit-one" aria-hidden="true" />
          <div className="scene-orbit orbit-two" aria-hidden="true" />
          <BuildingScene />
          <div className="hero-visual-caption"><span className="caption-dot" /> A better build starts with a clear plan.</div>
          <div className="hero-stamp"><span>01</span><small>Plan<br />with purpose</small></div>
        </div>
      </div>
      <div className="hero-bottom container"><span>Residential · Commercial · Civil</span><a href="#about">Scroll to explore <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}

export function IntroStats() {
  const ref = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) { setEntered(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const values = [
    { value: 250, suffix: "+", label: "Projects completed", display: "250+" },
    { value: 20, suffix: "+", label: "Years of experience", display: "20+" },
    { value: 12, suffix: "B", label: "Total value built · KES", display: "KES 12B" },
    { value: 4, suffix: "", label: "Active counties", display: "04" },
  ];

  useEffect(() => {
    if (!entered) return;
    const targets = values.map((item) => item.value);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(targets);
      return;
    }
    const duration = 2000;
    let start = 0;
    let frame = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((target) => Math.round(target * eased)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [entered]);

  return (
    <section className="stats-section blueprint-panel" id="about" ref={ref} aria-label="Nehemiah Build at a glance">
      <div className="container stats-inner">
        <div className="stats-intro"><span className="eyebrow">Grounded in experience</span><h2>Solid work.<br /><em>Long-term trust.</em></h2></div>
        <div className="stats-grid">
          {values.map((item, index) => <div className="stat-item" key={item.label} style={{ "--stat-index": index } as CSSProperties}>
            <strong className={entered ? "stat-number is-counted" : "stat-number"} aria-label={item.display}>{entered ? index === 2 ? `KES ${counts[index]}B` : index === 3 ? String(counts[index]).padStart(2, "0") : `${counts[index]}${item.suffix}` : "0"}</strong>
            <span>{item.label}</span>
          </div>)}
        </div>
      </div>
      <p className="stats-note container">Company figures supplied in the project brief; please confirm they remain current before publication.</p>
    </section>
  );
}

export function BuildJourney() {
  const beatRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.beatIndex);
          if (!Number.isNaN(index)) setActiveBeat(index);
        }
      });
    }, { rootMargin: "-36% 0px -46% 0px", threshold: 0 });
    beatRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="journey-section section-space" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-heading section-heading-split">
          <div><span className="eyebrow">EFFECT · A considered build</span><h2 id="journey-title">From first conversation<br />to <em>front door.</em></h2></div>
          <p>Every project has its own story. A steady process keeps each decision, milestone, and handover connected.</p>
        </div>
        <div className="journey-layout">
          <div className="journey-beats">
            {journeyBeats.map((beat, index) => {
              const Icon = [MapPinned, Ruler, HardHat, Home][index];
              return <article className={`journey-beat${activeBeat === index ? " is-active" : ""}`} key={beat.number} ref={(node) => { beatRefs.current[index] = node; }} data-beat-index={index} aria-current={activeBeat === index ? "step" : undefined}>
                <div className="journey-beat-number">{beat.number}</div>
                <div className="journey-beat-content"><Icon aria-hidden="true" /><h3>{beat.title}</h3><p>{beat.copy}</p></div>
              </article>;
            })}
          </div>
          <div className="journey-visual-wrap">
            <div className="journey-visual" aria-live="polite">
              <img src={storyImages[activeBeat]} alt={storyAlt[activeBeat]} loading="lazy" />
              <div className="journey-visual-overlay"><span>THE NEHEMIAH BUILD JOURNEY</span><strong>STEP {String(activeBeat + 1).padStart(2, "0")}</strong></div>
              <div className="journey-visual-outline" aria-hidden="true" />
            </div>
            <p className="journey-caption">Scroll at your pace. The story follows the chapter in view.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="services-section section-space" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <span className="eyebrow">What we build</span>
          <h2 id="services-title">One partner. <em>Every milestone.</em></h2>
          <p>From the first site survey to a confident handover, our team brings the right people and disciplines around your project.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => <article className="service-card" key={service.number}>
            <Link href="/#contact" className="service-image" aria-label={`Request a quote for ${service.title}`}>
              <img src={service.image} alt="" loading="lazy" />
              <span className="service-number">{service.number}</span>
              <span className="service-arrow"><ArrowRight aria-hidden="true" /></span>
            </Link>
            <div className="service-content"><h3>{service.title}</h3><p>{service.description}</p><Link href="/#contact" className="text-link">Get a Quote <ArrowRight aria-hidden="true" /></Link></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}

export function HowWeWork() {
  const rootRef = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  const steps = useMemo(() => [
    { title: "Site Survey & Brief", copy: "We align your goals, the site realities, and the first decisions.", icon: MapPinned },
    { title: "Design & Approvals", copy: "We coordinate the people, drawings, approvals, and scope.", icon: Ruler },
    { title: "Construction & Supervision", copy: "We manage the sequence and keep quality and safety in view.", icon: HardHat },
    { title: "Handover & Warranty", copy: "We complete checks, share records, and plan a confident handover.", icon: BadgeCheck },
  ], []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-section section-space" ref={rootRef} aria-labelledby="process-title">
      <div className="container">
        <div className="section-heading section-heading-split"><div><span className="eyebrow">How we work</span><h2 id="process-title">A steady route<br />to <em>the finish line.</em></h2></div><p>Good work is built step by step, with clear responsibilities and conversations at every turn.</p></div>
        <ol className={`process-timeline${seen ? " is-seen" : ""}`}>
          {steps.map((step, index) => { const Icon = step.icon; return <li className="process-step" key={step.title} style={{ "--step-index": index } as CSSProperties}>
            <div className="process-marker"><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></div>
            <h3>{step.title}</h3><p>{step.copy}</p>
          </li>; })}
        </ol>
      </div>
    </section>
  );
}

export function SupplierSection() {
  const items = ["Cement & aggregates", "Steel & reinforcement", "Roofing systems", "Electrical & plumbing", "Finishes & joinery", "Plant & equipment"];
  return (
    <section className="supplier-section" aria-labelledby="supplier-title">
      <div className="container supplier-head"><div><span className="eyebrow">Materials &amp; suppliers</span><h2 id="supplier-title">Good work takes <em>good partners.</em></h2></div><Link href="/#contact" className="button button-dark">Become a Supplier <ArrowRight aria-hidden="true" /></Link></div>
      <div className="supplier-marquee" aria-label="Material categories we coordinate with">
        <div className="supplier-track">
          {[...items, ...items].map((item, index) => <span className="supplier-wordmark" key={`${item}-${index}`}><span className="supplier-mark" aria-hidden="true">✳</span>{item}</span>)}
        </div>
      </div>
      <p className="supplier-note container">Category names are illustrative; no supplier relationships are implied. Ask us about the right partner for your project.</p>
    </section>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % testimonials.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  const item = testimonials[active];
  return (
    <section className="testimonials-section section-space" aria-labelledby="testimonials-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false); }}>
      <div className="container testimonial-layout">
        <div className="testimonial-heading"><span className="eyebrow">People at the heart of every build</span><h2 id="testimonials-title">Trust is the<br /><em>real measure.</em></h2><div className="testimonial-controls"><button className="carousel-arrow" type="button" aria-label="Previous testimonial" onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}>←</button><button className="carousel-arrow" type="button" aria-label="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}>→</button></div></div>
        <div className="testimonial-card" aria-live="polite" aria-roledescription="carousel">
          <span className="quote-mark" aria-hidden="true">“</span><p className="testimonial-quote">{item.quote}</p><div className="testimonial-byline"><span className="testimonial-avatar">{item.name.charAt(0)}</span><span><strong>{item.name}</strong><small>{item.project}</small></span><span className="testimonial-sample">Illustrative sample</span></div>
          <div className="testimonial-dots" role="group" aria-label="Choose a testimonial">{testimonials.map((testimonial, index) => <button key={testimonial.name} type="button" aria-label={`Show sample testimonial ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)} />)}</div>
        </div>
      </div>
      <p className="testimonial-note container">Sample copy for layout demonstration. Replace with approved client quotations before publication.</p>
    </section>
  );
}

export function InsightsTeaser() {
  const articles = [
    { title: "Building in Kenya: from first brief to handover", category: "Planning", image: "/images/architects-blueprint.jpg", href: "/insights/building-in-kenya-from-brief-to-handover" },
    { title: "Choosing materials for East African conditions", category: "Materials", image: "/images/finishing-worker.jpg", href: "/insights/choosing-materials-for-east-african-climates" },
    { title: "Why a site survey belongs before groundbreaking", category: "Project delivery", image: "/images/site-surveyor.jpg", href: "/insights/site-surveys-before-groundbreaking" },
  ];
  return (
    <section className="insights-section section-space" aria-labelledby="insights-title">
      <div className="container">
        <div className="section-heading section-heading-split"><div><span className="eyebrow">Notes from the field</span><h2 id="insights-title">Ideas for a <em>better build.</em></h2></div><Link href="/insights" className="text-link">All insights <ArrowRight aria-hidden="true" /></Link></div>
        <div className="insights-grid">{articles.map((article, index) => <article className={`insight-card insight-card-${index + 1}`} key={article.href}><TransitionLink href={article.href} className="insight-image"><img src={article.image} alt="" loading="lazy" /></TransitionLink><div className="insight-copy"><span>{article.category}</span><h3><TransitionLink href={article.href}>{article.title}</TransitionLink></h3><TransitionLink href={article.href} className="text-link">Read article <ArrowRight aria-hidden="true" /></TransitionLink></div></article>)}</div>
      </div>
    </section>
  );
}

export function EnquirySection() {
  return (
    <section className="enquiry-section" id="contact" aria-labelledby="enquiry-title">
      <div className="enquiry-gradient" aria-hidden="true" />
      <div className="container enquiry-layout">
        <div className="enquiry-intro"><span className="eyebrow">Let&apos;s start with a conversation</span><h2 id="enquiry-title">Your next build<br />starts <em>right here.</em></h2><p>Share what you have in mind. We&apos;ll help you take the next clear step.</p><div className="enquiry-assurances"><span><ShieldCheck aria-hidden="true" /> Straightforward project guidance</span><span><Compass aria-hidden="true" /> Nairobi-based, nationwide reach</span><span><Wrench aria-hidden="true" /> One accountable project team</span></div></div>
        <div className="enquiry-form-card"><div className="form-card-heading"><span className="eyebrow">Project enquiry</span><Sparkles aria-hidden="true" /></div><EnquiryForm /><p className="form-legal">By sending this form, you agree that we may use your details to respond to your enquiry. <Link href="/legal/privacy-policy">Privacy policy</Link>.</p></div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="contact-section section-space" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-heading section-heading-split"><div><span className="eyebrow">Let&apos;s connect</span><h2 id="contact-title">A local team.<br /><em>A clear next step.</em></h2></div><p>Have a question about a project, a tender, or working with us? Send a note or reach the team on WhatsApp.</p></div>
        <div className="contact-grid">
          <div className="contact-details">
            <a className="contact-detail-card" href="https://maps.google.com/?q=Nairobi%2C+Kenya" target="_blank" rel="noreferrer"><span className="contact-icon"><MapPinned aria-hidden="true" /></span><span><small>Find us</small><strong>Nairobi, Kenya</strong><em>Serving projects across Kenya</em></span><ArrowRight aria-hidden="true" className="contact-card-arrow" /></a>
            <a className="contact-detail-card" href="tel:+254112272061"><span className="contact-icon"><Home aria-hidden="true" /></span><span><small>Call our team</small><strong>+254 112 272 061</strong><em>Direct project enquiries</em></span><ArrowRight aria-hidden="true" className="contact-card-arrow" /></a>
            <a className="contact-detail-card" href="https://wa.me/254112272061" target="_blank" rel="noreferrer"><span className="contact-icon"><Sparkles aria-hidden="true" /></span><span><small>WhatsApp</small><strong>Chat with Nehemiah Build</strong><em>Enquire about a project or tender</em></span><ArrowRight aria-hidden="true" className="contact-card-arrow" /></a>
            <div className="map-embed"><iframe title="Map showing Nairobi, Kenya" src="https://maps.google.com/maps?q=Nairobi%2C%20Kenya&t=&z=11&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
          <div className="contact-form-card"><h3>Send us a message</h3><p>We&apos;ll make sure your note reaches the right person.</p><ContactForm /></div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="newsletter-band" aria-labelledby="newsletter-title">
      <div className="container newsletter-layout"><div><span className="eyebrow">Stay informed</span><h2 id="newsletter-title">Monthly construction insights<br />and tender alerts.</h2></div><NewsletterForm /></div>
    </section>
  );
}

export function ProjectPortfolioSection() {
  return <ProjectShowcase />;
}
