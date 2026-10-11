import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing access to the Nehemiah Build website and project information.",
  openGraph: { title: "Terms of Use | Nehemiah Build", description: "Website terms for Nehemiah Build project information, tenders, and applications.", images: ["/images/nairobi-construction-crew.jpg"] },
};

export default function TermsPage() {
  return <LegalPage title="Terms of Use"><p className="legal-lede">These website terms explain the basis on which you may use the Nehemiah Build &amp; Construction website. A signed project or tender agreement takes precedence over general website information.</p>
    <section><h2>1. Contract Disclaimer</h2><p>Website descriptions, photographs, indicative project examples, and service summaries are general information only. They are not an offer, construction contract, technical specification, or guarantee of a price, scope, approval, or outcome. A project begins only after the parties agree a written scope and execute the appropriate contract.</p><p>Stock photographs and sample project records are illustrative; they do not document completed Nehemiah Build work.</p></section>
    <section><h2>2. Project Timelines</h2><p>Any dates or programme estimates are indicative until confirmed in a signed project agreement. Delivery may depend on approvals, site conditions, client decisions, procurement, weather, utilities, and the actions of third parties. Changes and delays will be managed under the applicable contract.</p></section>
    <section><h2>3. Payment Terms</h2><p>Payment milestones, deposits, variations, retention, taxes, and late-payment consequences are set out in the project-specific contract or tender documents. Do not rely on a website statement as a payment schedule. Payments should only be made to verified business accounts stated in an executed agreement or formal invoice.</p></section>
    <section><h2>4. Tender Applications</h2><p>Submitting a tender response does not create a contract or guarantee an award. Applicants are responsible for reviewing the applicable tender pack, deadlines, eligibility criteria, and document requirements. Tender responses should not contain information you are not authorised to share.</p></section>
    <section><h2>5. Website Content and Availability</h2><p>We take reasonable care with site content but do not promise it is complete, current, uninterrupted, or error-free. We may update or withdraw information. You may not misuse the site, attempt unauthorised access, or upload malicious or unlawful content.</p></section>
    <section><h2>6. Governing Law — Kenya</h2><p>These website terms are governed by the laws of Kenya. Any project-specific dispute resolution process is set out in the signed contract. Nothing in these terms limits rights that cannot lawfully be excluded.</p></section>
    <section><h2>7. Contact</h2><p>If you have a question about these terms, contact Nehemiah Build through the contact form or WhatsApp listed on this site. Confirm the registered legal entity, postal address, and any formal dispute-resolution details before publishing.</p></section>
  </LegalPage>;
}
