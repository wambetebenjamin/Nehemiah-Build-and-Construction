import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Sparkles } from "lucide-react";
import { Brand, TransitionLink } from "@/components/site/Navigation";
import { NewsletterForm } from "@/components/forms/Forms";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-blueprint" aria-hidden="true" />
      <div className="container footer-main">
        <div className="footer-brand-column">
          <Brand />
          <p className="footer-promise">Built on trust. Raised on excellence.<br />Nairobi, Kenya · Serving projects across the country.</p>
          <a className="footer-contact-link" href="https://wa.me/254112272061" target="_blank" rel="noreferrer"><Phone aria-hidden="true" /> +254 112 272 061</a>
          <p className="footer-social-note"><Sparkles aria-hidden="true" /> Social channels coming soon</p>
        </div>
        <div className="footer-links-column">
          <h2>What we do</h2>
          <Link href="/#services">Residential construction</Link>
          <Link href="/#services">Commercial development</Link>
          <Link href="/#services">Civil engineering</Link>
          <Link href="/#services">Renovation &amp; finishing</Link>
          <Link href="/#services">Project management</Link>
        </div>
        <div className="footer-links-column">
          <h2>Explore</h2>
          <TransitionLink href="/projects">Our projects</TransitionLink>
          <TransitionLink href="/tender">Tender opportunities</TransitionLink>
          <TransitionLink href="/careers">Careers</TransitionLink>
          <TransitionLink href="/insights">Insights</TransitionLink>
          <Link href="/#contact">Request a quote</Link>
        </div>
        <div className="footer-newsletter-column">
          <h2>Stay in the know</h2>
          <p>Monthly construction insights and tender alerts.</p>
          <NewsletterForm compact />
          <p className="footer-privacy"><MapPin aria-hidden="true" /> Nairobi, Kenya</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Nehemiah Build &amp; Construction. All rights reserved.</p>
        <nav aria-label="Legal links" className="footer-legal">
          <TransitionLink href="/legal/privacy-policy">Privacy Policy</TransitionLink>
          <TransitionLink href="/legal/terms">Terms</TransitionLink>
          <TransitionLink href="/legal/cookie-policy">Cookie Policy</TransitionLink>
        </nav>
        <p className="template-credit">Design foundation by <a href="https://htmlcodex.com" target="_blank" rel="noreferrer">HTML Codex</a></p>
        <a className="back-to-top-link" href="#top" aria-label="Back to top"><ArrowUpRight aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
