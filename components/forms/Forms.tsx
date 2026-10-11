"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

const v3SiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const v2SiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

type CaptchaPayload = { captchaToken?: string; captchaAction: string; captchaV2Token?: string };
type ApiResult = { ok?: boolean; code?: string; message?: string; needsV2?: boolean; configured?: boolean; id?: string };

function loadRecaptcha(scriptUrl: string, dataKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) { resolve(); return; }
    const found = document.querySelector<HTMLScriptElement>(`script[data-${dataKey}="true"]`);
    if (found) {
      if (window.grecaptcha) resolve();
      else {
        found.addEventListener("load", () => resolve(), { once: true });
        found.addEventListener("error", () => reject(new Error("Security check unavailable.")), { once: true });
      }
      return;
    }
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    script.setAttribute(`data-${dataKey}`, "true");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Security check unavailable."));
    document.head.appendChild(script);
  });
}

function useCaptcha(action: string) {
  const [needsV2, setNeedsV2] = useState(false);
  const [v2Token, setV2Token] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  useEffect(() => {
    if (!needsV2 || !v2SiteKey || !widgetRef.current) return;
    let cancelled = false;
    loadRecaptcha("https://www.google.com/recaptcha/api.js?render=explicit", "recaptcha-explicit").then(() => {
      if (cancelled || !window.grecaptcha || !widgetRef.current) return;
      if (widgetId.current !== null) {
        window.grecaptcha.reset(widgetId.current);
        return;
      }
      widgetId.current = window.grecaptcha.render(widgetRef.current, {
        sitekey: v2SiteKey,
        theme: "light",
        callback: (token) => setV2Token(token),
        "expired-callback": () => setV2Token(""),
        "error-callback": () => setV2Token(""),
      });
    }).catch(() => setV2Token(""));
    return () => { cancelled = true; };
  }, [needsV2]);

  const tokenForSubmit = useCallback(async (): Promise<CaptchaPayload> => {
    if (v2Token) return { captchaAction: action, captchaV2Token: v2Token };
    if (!v3SiteKey) throw new Error("The security check is not configured yet. Please contact us directly.");
    await loadRecaptcha(`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(v3SiteKey)}`, "recaptcha-v3");
    if (!window.grecaptcha) throw new Error("The security check could not start. Please try again.");
    const token = await new Promise<string>((resolve) => window.grecaptcha!.ready(() => {
      window.grecaptcha!.execute(v3SiteKey, { action }).then(resolve);
    }));
    return { captchaToken: token, captchaAction: action };
  }, [action, v2Token]);

  const handleFallback = (result: ApiResult) => {
    if (result.code === "captcha_fallback_required" || result.needsV2) {
      setNeedsV2(true);
      setV2Token("");
      return true;
    }
    return false;
  };

  const fallbackControl = needsV2 ? (
    <div className="captcha-fallback">
      <p>Please complete the additional reCAPTCHA check.</p>
      {v2SiteKey ? <div ref={widgetRef} className="recaptcha-v2-widget" /> : <p className="form-warning">A reCAPTCHA v2 site key is not configured. Please contact us on WhatsApp.</p>}
    </div>
  ) : null;

  return { tokenForSubmit, handleFallback, fallbackControl, needsV2, v2Token };
}

async function readResult(response: Response): Promise<ApiResult> {
  try { return (await response.json()) as ApiResult; } catch { return {}; }
}

function Status({ message, error = false }: { message: string; error?: boolean }) {
  if (!message) return null;
  return <p className={`form-status${error ? " is-error" : " is-success"}`} role={error ? "alert" : "status"} aria-live={error ? "assertive" : "polite"}>{error ? null : <CheckCircle2 aria-hidden="true" />}{message}</p>;
}

function SubmitButton({ children, busy, disabled = false }: { children: ReactNode; busy: boolean; disabled?: boolean }) {
  return <button className="button button-primary form-submit" type="submit" disabled={busy || disabled}>{busy ? <><LoaderCircle className="spin" aria-hidden="true" /> Sending…</> : <>{children}<Send aria-hidden="true" /></>}</button>;
}

function markInvalidField(event: FormEvent<HTMLFormElement>) {
  const field = event.target;
  if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
    field.setAttribute("aria-invalid", "true");
  }
}

function clearValidField(event: FormEvent<HTMLFormElement>) {
  const field = event.target;
  if ((field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) && field.validity.valid) {
    field.removeAttribute("aria-invalid");
  }
}

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const captcha = useCaptcha("project_enquiry");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true); setMessage(""); setError(false);
    const form = event.currentTarget;
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const tokens = await captcha.tokenForSubmit();
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...payload, ...tokens }) });
      const result = await readResult(response);
      if (captcha.handleFallback(result)) {
        setMessage("Please complete the extra security check, then submit once more."); setError(true); return;
      }
      if (!response.ok) throw new Error(result.message || "We could not send your enquiry. Please try again.");
      setMessage("Thank you. Your project enquiry has been received. Our team will be in touch.");
      form.reset();
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "We could not send your enquiry. Please try again."); setError(true);
    } finally { setBusy(false); }
  };

  return (
    <form className={`site-form enquiry-form${compact ? " form-compact" : ""}`} onSubmit={submit} onInvalidCapture={markInvalidField} onInputCapture={clearValidField}>
      <div className="form-grid">
        <Field label="Your name"><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="e.g. Njeri Mwangi" /></Field>
        <Field label="Company (optional)"><input name="company" autoComplete="organization" maxLength={120} placeholder="Company or organisation" /></Field>
        <Field label="Email address"><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></Field>
        <Field label="Phone number"><input name="phone" type="tel" autoComplete="tel" required minLength={8} maxLength={24} placeholder="+254 …" /></Field>
        <Field label="Project type"><select name="projectType" required defaultValue=""><option value="" disabled>Select a project type</option><option>Residential construction</option><option>Commercial development</option><option>Civil engineering</option><option>Renovation</option><option>Interior finishing</option><option>Project management</option><option>Other</option></select></Field>
        <Field label="Estimated budget"><select name="budget" required defaultValue=""><option value="" disabled>Select a range</option><option>Under KES 5 million</option><option>KES 5–20 million</option><option>KES 20–50 million</option><option>KES 50–100 million</option><option>KES 100 million+</option><option>To be discussed</option></select></Field>
        <Field label="Project location"><input name="location" required maxLength={120} placeholder="County, town or estate" /></Field>
        <Field label="Tell us about the project" wide><textarea name="brief" required minLength={10} maxLength={5000} rows={4} placeholder="What are you looking to build, renovate or manage?" /></Field>
      </div>
      {captcha.fallbackControl}
      <div className="form-submit-row"><SubmitButton busy={busy}>Send project enquiry</SubmitButton><span>We reply within one working day.</span></div>
      <Status message={message} error={error} />
    </form>
  );
}

export function ContactForm() {
  const captcha = useCaptcha("contact_form");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setMessage(""); setError(false);
    const form = event.currentTarget;
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const tokens = await captcha.tokenForSubmit();
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...payload, ...tokens }) });
      const result = await readResult(response);
      if (captcha.handleFallback(result)) { setMessage("Please complete the extra security check, then submit once more."); setError(true); return; }
      if (!response.ok) throw new Error(result.message || "We could not send your message. Please try again.");
      setMessage("Thank you. Your message has been sent to our team."); form.reset();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "We could not send your message."); setError(true); }
    finally { setBusy(false); }
  };

  return (
    <form className="site-form contact-form" onSubmit={submit} onInvalidCapture={markInvalidField} onInputCapture={clearValidField}>
      <div className="form-grid">
        <Field label="Your name"><input name="name" required minLength={2} autoComplete="name" /></Field>
        <Field label="Email address"><input name="email" type="email" required autoComplete="email" /></Field>
        <Field label="Phone (optional)"><input name="phone" type="tel" autoComplete="tel" maxLength={24} /></Field>
        <Field label="Subject"><input name="subject" required minLength={2} maxLength={160} /></Field>
        <Field label="Message" wide><textarea name="message" required minLength={10} maxLength={5000} rows={4} /></Field>
      </div>
      {captcha.fallbackControl}
      <p className="form-legal">By sending this form, you agree that we may use your details to respond to your message. <Link href="/legal/privacy-policy">Privacy policy</Link>.</p>
      <SubmitButton busy={busy}>Send message</SubmitButton>
      <Status message={message} error={error} />
    </form>
  );
}

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const captcha = useCaptcha("newsletter_signup");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setMessage(""); setError(false);
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      const email = String(formData.get("email") || "");
      const consent = formData.get("consent") === "true";
      const tokens = await captcha.tokenForSubmit();
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, consent, ...tokens }) });
      const result = await readResult(response);
      if (captcha.handleFallback(result)) { setMessage("Please complete the extra security check, then sign up again."); setError(true); return; }
      if (!response.ok) throw new Error(result.message || "Signup could not be completed.");
      setMessage("You're subscribed. Watch your inbox for construction insights and tender alerts."); form.reset();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "Signup could not be completed."); setError(true); }
    finally { setBusy(false); }
  };

  return (
    <form className={`newsletter-form${compact ? " newsletter-compact" : ""}`} onSubmit={submit} onInvalidCapture={markInvalidField} onInputCapture={clearValidField}>
      <label className="sr-only" htmlFor={compact ? "newsletter-footer-email" : "newsletter-email"}>Email address</label>
      <div className="newsletter-control"><input id={compact ? "newsletter-footer-email" : "newsletter-email"} name="email" type="email" required autoComplete="email" placeholder="Your email address" /><button type="submit" className="button button-primary" aria-label={busy ? "Signing up" : "Sign up for the newsletter"} disabled={busy}>{busy ? "…" : "Join"}</button></div>
      <div className="newsletter-consent"><label><input name="consent" type="checkbox" value="true" required /><span>I agree to receive monthly construction insights and tender alerts.</span></label><Link href="/legal/privacy-policy">Privacy Policy</Link></div>
      {captcha.fallbackControl}<Status message={message} error={error} />
    </form>
  );
}

export function TenderApplicationForm({ tenderReference = "" }: { tenderReference?: string }) {
  return <ApplicationForm mode="tender" tenderReference={tenderReference} />;
}

export function CareerApplicationForm({ role = "" }: { role?: string }) {
  return <ApplicationForm mode="career" initialRole={role} />;
}

function ApplicationForm({ mode, tenderReference = "", initialRole = "" }: { mode: "tender" | "career"; tenderReference?: string; initialRole?: string }) {
  const action = mode === "tender" ? "tender_application" : "career_application";
  const endpoint = mode === "tender" ? "/api/tender" : "/api/careers";
  const fileLabel = mode === "tender" ? "Tender response PDF" : "CV / résumé PDF";
  const captcha = useCaptcha(action);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setMessage(""); setError(false);
    const form = event.currentTarget;
    try {
      const body = new FormData(form);
      const tokens = await captcha.tokenForSubmit();
      Object.entries(tokens).forEach(([key, value]) => { if (value) body.set(key, value); });
      const response = await fetch(endpoint, { method: "POST", body });
      const result = await readResult(response);
      if (captcha.handleFallback(result)) { setMessage("Please complete the extra security check, then submit once more."); setError(true); return; }
      if (!response.ok) throw new Error(result.message || "Your application could not be submitted.");
      setMessage(mode === "tender" ? "Your tender response has been received. Thank you for applying." : "Your application has been received. Thank you for your interest.");
      form.reset();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "Your application could not be submitted."); setError(true); }
    finally { setBusy(false); }
  };

  return (
    <form className="site-form application-form" onSubmit={submit} onInvalidCapture={markInvalidField} onInputCapture={clearValidField} encType="multipart/form-data">
      <div className="form-grid">
        {mode === "tender" ? <>
          <Field label="Company name"><input name="companyName" autoComplete="organization" required minLength={2} /></Field>
          <Field label="Registration number"><input name="registrationNumber" required minLength={2} /></Field>
          <Field label="Contact name"><input name="contactName" autoComplete="name" required minLength={2} /></Field>
          <Field label="Email address"><input name="email" type="email" autoComplete="email" required /></Field>
          <Field label="Phone number"><input name="phone" type="tel" autoComplete="tel" required minLength={8} /></Field>
          <Field label="Tender reference"><input name="tenderReference" required maxLength={100} defaultValue={tenderReference} placeholder="e.g. NB-2026-001" /></Field>
        </> : <>
          <Field label="Your name"><input name="name" autoComplete="name" required minLength={2} /></Field>
          <Field label="Email address"><input name="email" type="email" autoComplete="email" required /></Field>
          <Field label="Phone number"><input name="phone" type="tel" autoComplete="tel" required minLength={8} /></Field>
          <Field label="LinkedIn profile (optional)"><input name="linkedin" type="url" placeholder="https://linkedin.com/in/…" /></Field>
          <Field label="Role"><select name="role" required defaultValue={initialRole}><option value="" disabled>Select a role</option><option>Site Engineer</option><option>Quantity Surveyor</option><option>Project Manager</option><option>Site Foreman</option><option>Architect</option><option>Other</option></select></Field>
          <Field label="Cover letter" wide><textarea name="coverLetter" rows={4} maxLength={5000} placeholder="Tell us what you would bring to the team." /></Field>
        </>}
        <Field label={fileLabel} wide><input name={mode === "tender" ? "tenderResponse" : "cv"} type="file" accept="application/pdf,.pdf" required /><small>PDF only · Maximum 4 MB. Your file is stored privately.</small></Field>
      </div>
      {captcha.fallbackControl}
      <p className="form-legal">By submitting, you agree that we may process your details and attached PDF to review your {mode === "tender" ? "tender response" : "career application"}. <Link href="/legal/privacy-policy">Privacy policy</Link>.</p>
      <SubmitButton busy={busy}>{mode === "tender" ? "Submit tender application" : "Submit application"}</SubmitButton>
      <Status message={message} error={error} />
    </form>
  );
}

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={`form-field${wide ? " field-wide" : ""}`}><span>{label}</span>{children}</label>;
}
