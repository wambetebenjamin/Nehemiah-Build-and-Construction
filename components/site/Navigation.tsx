"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ComponentProps } from "react";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Tender", href: "/tender" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

type TransitionLinkProps = ComponentProps<typeof Link>;

export function TransitionLink({ href, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        const destination = typeof href === "string" ? href : href.pathname || "";
        if (!destination.startsWith("/") || destination.startsWith("/#") || destination === pathname) return;
        event.preventDefault();
        const go = () => router.push(destination);
        const documentWithTransition = document as Document & {
          startViewTransition?: (callback: () => void) => { finished: Promise<void> };
        };
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduced && documentWithTransition.startViewTransition) {
          documentWithTransition.startViewTransition(go);
        } else {
          go();
        }
      }}
    />
  );
}

function Crest() {
  return (
    <svg className="brand-crest" viewBox="0 0 52 52" role="img" aria-label="Nehemiah Build crest">
      <path d="M26 3 45 10v15c0 11.5-7.7 19.8-19 24C14.7 44.8 7 36.5 7 25V10L26 3Z" fill="none" stroke="currentColor" strokeWidth="2.3" />
      <path d="M15 33V22l11-8 11 8v11M20 33V25h12v8M12 36h28" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 19h2v2h-2zM22 28h2v2h-2zM28 28h2v2h-2z" fill="currentColor" />
    </svg>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <TransitionLink href="/" className={`brand${compact ? " brand-compact" : ""}`} aria-label="Nehemiah Build and Construction, home">
      <Crest />
      <span className="brand-wordmark">
        <strong>NEHEMIAH</strong>
        <small>BUILD &amp; CONSTRUCTION</small>
      </span>
    </TransitionLink>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 90);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousFocus = document.activeElement;
    const drawer = drawerRef.current;
    const getFocusable = () => drawer?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])') || [];
    getFocusable()[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); return; }
      if (event.key !== "Tab") return;
      const items = getFocusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("menu-open");
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [menuOpen]);

  const navigation = (mobile = false) => (
    <nav className={mobile ? "nav-links nav-links-mobile" : "nav-links"} aria-label="Main navigation">
      {items.map((item) => {
        const isPageLink = !item.href.includes("#");
        const isCurrent = isPageLink && (pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)));
        return <TransitionLink key={item.label} href={item.href} aria-current={isCurrent ? "page" : undefined} onClick={() => setMenuOpen(false)}>
          {item.label}
        </TransitionLink>;
      })}
    </nav>
  );

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} data-scrolled={scrolled}>
      <div className="nav-shell">
        <div className="nav-inner">
          <Brand />
          {navigation()}
          <TransitionLink href="/#contact" className="button button-outline nav-quote">Get a Quote <span aria-hidden="true">↗</span></TransitionLink>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-pressed={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-drawer" ref={drawerRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="mobile-drawer-top"><Brand compact /><button className="menu-toggle menu-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu"><X aria-hidden="true" /></button></div>
          {navigation(true)}
          <TransitionLink href="/#contact" className="button button-primary drawer-quote" onClick={() => setMenuOpen(false)}>Get a Quote <span aria-hidden="true">↗</span></TransitionLink>
          <p className="drawer-location">Nairobi, Kenya <span>·</span> Building with purpose since 2004</p>
        </div>
      )}
    </header>
  );
}
