"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AmbientBlueprint() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", update);
    update();
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return <div className="blueprint-ambient" aria-hidden="true" data-paused={paused} />;
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [skipAvailable, setSkipAvailable] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener?.("change", onChange);
    const start = Date.now();
    const progressTimer = window.setInterval(() => setProgress(Math.min(100, Math.round(((Date.now() - start) / 1400) * 100))), 100);
    const dismissTimer = window.setTimeout(() => {
      setProgress(100);
      setVisible(false);
    }, 1450);
    const skipTimer = window.setTimeout(() => setSkipAvailable(true), 3000);
    return () => {
      query.removeEventListener?.("change", onChange);
      window.clearInterval(progressTimer);
      window.clearTimeout(dismissTimer);
      window.clearTimeout(skipTimer);
    };
  }, []);

  if (!visible) return <span className="sr-only" role="status" aria-live="polite">Site ready.</span>;

  return (
    <>
      <div className="loader-layer" aria-hidden="true">
        <div className="loader-card">
          <svg className="loader-building" viewBox="0 0 100 110" aria-hidden="true">
            <path className="loader-stroke loader-foundation" d="M14 96h72" />
            <path className="loader-stroke loader-floor floor-one" d="M22 85V70h56v15" />
            <path className="loader-stroke loader-floor floor-two" d="M27 70V55h46v15" />
            <path className="loader-stroke loader-floor floor-three" d="M32 55V40h36v15" />
            <path className="loader-stroke loader-floor floor-four" d="M37 40V25h26v15" />
            <path className="loader-stroke loader-roof" d="m31 25 19-16 19 16" />
            <path className="loader-stroke loader-detail" d="M34 79h8m14 0h9M38 64h8m10 0h6M42 49h7m7 0h4M46 34h3m6 0h3" />
          </svg>
          <div className="loader-brand">NEHEMIAH <span>BUILD &amp; CONSTRUCTION</span></div>
          {reducedMotion && <p className="loader-progress">Loading {progress}%</p>}
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">Loading Nehemiah Build. The site will be ready shortly.</span>
      {skipAvailable && <button className="loader-skip" type="button" onClick={() => setVisible(false)}>Skip loading</button>}
    </>
  );
}

export function RouteAnnouncements() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState("");
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (!visited) {
      setVisited(true);
      return;
    }
    const pageName = pathname === "/" ? "Home" : pathname.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") || "Page";
    setAnnouncement(`${pageName} page loaded.`);
    const focusHeading = () => {
      const heading = document.querySelector<HTMLElement>("main h1");
      heading?.focus({ preventScroll: true });
    };
    const timer = window.setTimeout(focusHeading, 60);
    return () => window.clearTimeout(timer);
  }, [pathname, visited]);

  return <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>;
}
