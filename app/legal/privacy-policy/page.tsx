import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nehemiah Build handles enquiry, project, application, and site information under the Kenya Data Protection Act, 2019.",
  openGraph: { title: "Privacy Policy | Nehemiah Build", description: "How Nehemiah Build handles personal and project information.", images: ["/images/architects-blueprint.jpg"] },
};

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy"><p className="legal-lede">We take the information entrusted to us seriously. This policy explains what information Nehemiah Build &amp; Construction may collect, why we use it, and how you can exercise your rights.</p>
    <section><h2>1. Data Collected</h2><p>When you contact us, request a quote, submit a tender, apply for a role, or subscribe to updates, we may collect your name, contact details, organisation, project or application information, files you choose to send, and the contents of your message. Technical information such as basic device, security, and consent records may also be processed to operate and protect this site.</p><p>Please do not include sensitive personal information unless it is necessary for your request.</p></section>
    <section><h2>2. Project Data</h2><p>Project enquiries may include site location, property plans, budgets, photographs, measurements, and construction preferences. We use this information to assess and respond to your brief, coordinate services, prepare proposals, and manage a project if you engage us. Project information may be shared with relevant professional advisers, staff, or service providers where needed for those purposes and subject to appropriate safeguards.</p></section>
    <section><h2>3. CCTV and Site Imagery</h2><p>Where CCTV or site photography is used for safety, security, progress, quality, or project records, access should be limited to authorised people and information retained only for a legitimate purpose and an appropriate period. Notices may be displayed at monitored sites. Images that identify a person are handled as personal data under applicable Kenyan law.</p></section>
    <section><h2>4. Analytics</h2><p>Optional analytics cookies are used only when you consent. Necessary security and preference storage may operate to provide the site and remember your privacy choice. See our <a href="/legal/cookie-policy">Cookie Policy</a> for the categories and current browser-side storage key.</p></section>
    <section><h2>5. Your Rights</h2><p>Subject to applicable law, you may ask to access, correct, delete, restrict, or object to processing of personal data, request a copy where applicable, or withdraw consent for optional processing. You may also raise a concern with the Office of the Data Protection Commissioner in Kenya. We may need to verify your identity before responding and may retain records where required by law or contract.</p></section>
    <section><h2>6. Retention and Security</h2><p>We retain information for as long as reasonably necessary to respond to your request, deliver a contract, meet legal obligations, resolve disputes, and protect our legitimate business interests. Application documents and project files are accessible only to authorised people. No online system can be guaranteed completely secure.</p></section>
    <section><h2>7. Contact</h2><p>To ask a privacy question or exercise a right, use the contact form or WhatsApp details above. Confirm the registered entity name, postal address, privacy contact, retention schedule, processors, and cross-border transfer arrangements before production publication.</p></section>
  </LegalPage>;
}
