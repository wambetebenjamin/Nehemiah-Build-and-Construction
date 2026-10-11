"use client";

import { useEffect } from "react";
import { RefreshCw, Phone } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Nehemiah Build route error", error); }, [error]);

  return (
    <section className="error-page server-error-page">
      <div className="error-blueprint" aria-hidden="true" />
      <div className="container error-content">
        <span className="error-code">500 <span>·</span> SITE REPORT</span>
        <div className="error-crest error-crest-alert"><span aria-hidden="true">!</span></div>
        <h1 tabIndex={-1}>Something collapsed<br /><em>on our end. We are fixing it.</em></h1>
        <p>Our team is looking into the issue. You can try again, or talk to us directly.</p>
        <button className="button button-primary" type="button" onClick={() => reset()}><RefreshCw aria-hidden="true" /> Try Again</button>
        <a className="error-whatsapp" href="https://wa.me/254112272061" target="_blank" rel="noreferrer"><Phone aria-hidden="true" /> WhatsApp us: +254 112 272 061</a>
      </div>
    </section>
  );
}
