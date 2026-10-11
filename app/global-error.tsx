"use client";

import "./globals.css";
import { RefreshCw } from "lucide-react";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-KE"><body>
      <main className="error-page server-error-page">
        <div className="error-blueprint" aria-hidden="true" />
        <div className="container error-content">
          <span className="error-code">500 · SITE REPORT</span>
          <div className="error-crest error-crest-alert"><span aria-hidden="true">!</span></div>
          <h1 tabIndex={-1}>Something collapsed<br /><em>on our end. We are fixing it.</em></h1>
          <p>Our team is looking into the issue. You can try again, or talk to us directly.</p>
          <button className="button button-primary" type="button" onClick={() => reset()}><RefreshCw aria-hidden="true" /> Try Again</button>
          <a className="error-whatsapp" href="https://wa.me/254112272061" target="_blank" rel="noreferrer">WhatsApp us: +254 112 272 061</a>
        </div>
      </main>
    </body></html>
  );
}
