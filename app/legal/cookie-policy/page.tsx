import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie categories and browser storage used by the Nehemiah Build website.",
  openGraph: { title: "Cookie Policy | Nehemiah Build", description: "Cookie categories and privacy choices for the Nehemiah Build website.", images: ["/images/architects-blueprint.jpg"] },
};

export default function CookiePolicyPage() {
  return <LegalPage title="Cookie Policy"><p className="legal-lede">This policy explains how cookies and similar browser storage may be used on the Nehemiah Build website. We follow a consent-first approach for optional analytics and marketing storage.</p>
    <section><h2>What are cookies?</h2><p>Cookies are small data files stored by a browser. Similar technologies such as localStorage can remember a preference on your device. You can manage or delete stored data in your browser settings.</p></section>
    <section><h2>Cookie categories</h2><div className="cookie-table-wrap"><table className="cookie-table"><thead><tr><th>Category</th><th>Purpose</th><th>Consent</th><th>Example / duration</th></tr></thead><tbody>
      <tr><th>Necessary</th><td>Security, site operation, form protection, and remembering your choices.</td><td>Always on</td><td><code>nehemiah-cookie-consent-v1</code> · stored in localStorage until cleared or updated.</td></tr>
      <tr><th>Analytics</th><td>Understand aggregate use of site pages and improve content.</td><td>Optional · off until you opt in</td><td>No analytics vendor is installed in this starter build. If added, list the vendor and expiry here before launch.</td></tr>
      <tr><th>Marketing</th><td>Campaign measurement or relevant advertising communications.</td><td>Optional · off until you opt in</td><td>No marketing tracker is installed in this starter build. If added, list the vendor and expiry here before launch.</td></tr>
    </tbody></table></div></section>
    <section><h2>Managing your choices</h2><p>Choose <strong>Accept All</strong> to allow optional categories, or open <strong>Manage Preferences</strong> to select analytics and marketing separately. Necessary storage cannot be switched off through the consent panel. You may clear browser storage at any time; the banner will then be shown again.</p></section>
    <section><h2>Third-party embeds</h2><p>The site may load a Google Maps embed on the contact page and reCAPTCHA for form protection. Those services may process technical data under their own terms and privacy notices. Confirm any required consent controls and current third-party cookie behavior before production launch.</p></section>
    <section><h2>Kenya Data Protection Act, 2019</h2><p>Consent records and optional tracking should be handled in line with applicable data protection requirements, including transparency and the ability to withdraw consent. Contact us if you have questions about these choices.</p></section>
  </LegalPage>;
}
