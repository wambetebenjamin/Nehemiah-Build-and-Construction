import { TransitionLink } from "@/components/site/Navigation";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="error-page not-found-page">
      <div className="error-blueprint" aria-hidden="true" />
      <div className="container error-content">
        <span className="error-code">404 <span>·</span> FIELD NOTE</span>
        <div className="error-crest"><Compass aria-hidden="true" /></div>
        <h1 tabIndex={-1}>This blueprint<br /><em>was not found.</em></h1>
        <p>The page you&apos;re looking for may have moved, or the project details may have changed.</p>
        <TransitionLink className="button button-primary" href="/projects"><ArrowLeft aria-hidden="true" /> Back to Our Projects</TransitionLink>
        <span className="error-grid-label">NEHEMIAH BUILD · NAIROBI, KENYA</span>
      </div>
    </section>
  );
}
