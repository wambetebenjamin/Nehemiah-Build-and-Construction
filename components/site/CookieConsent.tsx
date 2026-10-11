"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "nehemiah-cookie-consent-v1";
type Consent = { necessary: true; analytics: boolean; marketing: boolean; savedAt: string };

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
      else {
        const consent = JSON.parse(saved) as Consent;
        setAnalytics(Boolean(consent.analytics));
        setMarketing(Boolean(consent.marketing));
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!manage) return;
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    const getFocusable = () => dialog?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])') || [];
    getFocusable()[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setManage(false); return; }
      if (event.key !== "Tab") return;
      const items = getFocusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [manage]);

  const save = (all = false, includeSelection = true) => {
    const consent: Consent = {
      necessary: true,
      analytics: all || (includeSelection && analytics),
      marketing: all || (includeSelection && marketing),
      savedAt: new Date().toISOString(),
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch { /* Preferences remain active for this page view if storage is blocked. */ }
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
    setManage(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <aside className="cookie-banner" aria-label="Cookie consent" role="region">
        <div className="cookie-copy">
          <span className="cookie-mark" aria-hidden="true">N</span>
          <p>Nehemiah Build uses cookies to improve your experience and remember your project preferences. <Link href="/legal/cookie-policy">See our Cookie Policy.</Link></p>
        </div>
        <div className="cookie-actions">
          <button type="button" className="button button-text" onClick={() => setManage(true)}>Manage Preferences</button>
          <button type="button" className="button button-primary" onClick={() => save(true)}>Accept All</button>
        </div>
      </aside>
      {manage && (
        <div className="consent-scrim" onMouseDown={(event) => event.target === event.currentTarget && setManage(false)}>
          <section className="consent-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="consent-heading" aria-describedby="consent-description">
            <button className="dialog-close" type="button" onClick={() => setManage(false)} aria-label="Close preferences">×</button>
            <span className="eyebrow">Your privacy choices</span>
            <h2 id="consent-heading">Cookie preferences</h2>
            <p id="consent-description">Choose which optional cookies you allow. Necessary cookies support security and core site functions and are always on. Your choice is stored on this device.</p>
            <div className="consent-options">
              <ConsentOption title="Necessary" description="Security, form protection, and remembering this choice." pressed disabled />
              <ConsentOption title="Analytics" description="Helps us understand which pages are useful." pressed={analytics} onClick={() => setAnalytics((value) => !value)} />
              <ConsentOption title="Marketing" description="Supports relevant campaign measurement and communications." pressed={marketing} onClick={() => setMarketing((value) => !value)} />
            </div>
            <div className="dialog-actions">
              <button type="button" className="button button-text" onClick={() => save(false, false)}>Reject optional cookies</button>
              <button type="button" className="button button-primary" onClick={() => save(false, true)}>Save Preferences</button>
            </div>
            <small>We handle personal data in line with the Kenya Data Protection Act, 2019. <Link href="/legal/privacy-policy">Read our Privacy Policy.</Link></small>
          </section>
        </div>
      )}
    </>
  );
}

function ConsentOption({ title, description, pressed, disabled, onClick }: { title: string; description: string; pressed: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <div className="consent-option">
      <div><strong>{title}{disabled ? " · always on" : ""}</strong><p>{description}</p></div>
      <button type="button" className={`switch${pressed ? " is-on" : ""}`} aria-label={`${title} cookies ${pressed ? "on" : "off"}`} aria-pressed={pressed} aria-disabled={disabled || undefined} disabled={disabled} onClick={onClick}><span /></button>
    </div>
  );
}
