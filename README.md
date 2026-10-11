# Nehemiah Build & Construction

A Next.js 16.4.0 site for project enquiries and tender/career applications, styled from the unpacked HTML Codex **Builderz** source in `builerz-master/`. The archive and the 106 extracted source files are preserved unchanged; see [SOURCE-INVENTORY.md](./SOURCE-INVENTORY.md) for the pre-code source audit and complete inventory. The original template requires HTML Codex attribution under its included license; the production footer retains that credit.

## Run locally

- Node **24.21.0** (`.nvmrc`; package engines pin `24.21.0`)
- `npm install`
- Copy `.env.example` to `.env.local` and configure the integrations below.
- Replace `NEXT_PUBLIC_SITE_URL` with the canonical public origin before deploying; the example value is for local development.
- `npm run dev` starts on `0.0.0.0:3000`.
- `npm run typecheck` and `npm run build` validate the app.

## Integrations

- Google reCAPTCHA v3 is checked server-side in **every** form API route. V3 scores below `0.5` return a fallback request; the browser then renders a visible v2 challenge and resubmits its token. Configure both public site keys and server-only secrets in `.env.local`.
- Enquiries/subscribers/application metadata use Vercel KV. If KV credentials are absent in non-production, an in-memory development store is used; production fails closed. Note: npm marks `@vercel/kv@3.0.0` deprecated; it is retained because the requested stack specifies Vercel KV, so confirm the supported Vercel Redis integration when provisioning a new production store.
- Tender responses and CVs are signature-checked PDFs (maximum 4 MB) uploaded to Vercel Blob as private files. The 4 MB limit keeps multipart submissions under typical Vercel Function request limits. Configure `BLOB_READ_WRITE_TOKEN`. Public tender documents should be uploaded separately and their Blob URLs added to the current tender records (`lib/content.ts`) or `TENDER_DOCUMENT_URL`.
- Email uses Nodemailer/SMTP. WhatsApp notifications use the Meta WhatsApp Cloud API and an approved message template. Configure the SMTP, HR, contact, WhatsApp token, number ID, graph API version, and template variables in `.env.local`.
- No secret values belong in browser code. `NEXT_PUBLIC_*` variables are only used for public site/reCAPTCHA site keys.

## Routes

- `/`, `/projects`, `/projects/[slug]`, `/tender`, `/careers`, `/insights`, `/insights/[slug]`
- `/legal/privacy-policy`, `/legal/terms`, `/legal/cookie-policy`
- API handlers: `/api/enquiry`, `/api/tender`, `/api/careers`, `/api/newsletter`, `/api/contact`, `/api/captcha`
- Project detail pages revalidate every 600 seconds; tender opportunities render dynamically; the sitemap includes current project and insight slugs.

## Content requiring business sign-off

Project entries, tender opportunities, tender document links, career openings, and testimonials are clearly marked as illustrative until Nehemiah Build supplies approved production records. Verify the registered business address, contact email, social links, legal text, approved testimonials, project metrics, tender PDFs, and WhatsApp template before public launch. The supplied brief's published WhatsApp number is used as given.
