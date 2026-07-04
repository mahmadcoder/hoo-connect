"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP header load animation
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        ".animate-header",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    });
  }, []);

  const handleScrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("waitlist-cta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed z-50 animate-header opacity-0 transition-all duration-500 ${
        scrolled
          ? "top-4 left-4 right-4 border border-white/10 bg-[#0A0A0F]/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-md rounded-2xl"
          : "top-0 left-0 right-0 bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
        scrolled ? "py-3 md:px-8" : "py-6 md:px-10"
      }`}>
        <Link
          href="#"
          className="group flex items-center gap-2.5 transition duration-300 hover:opacity-90"
        >
          <svg viewBox="0 0 24 12" className="h-4.5 w-auto stroke-signal stroke-[2.5] fill-none transition duration-300 group-hover:scale-110" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 1c2.4 0 4.2 1.8 6 5 1.8 3.2 3.6 5 6 5s5-1.8 5-5-1.8-5-5-5c-2.4 0-4.2 1.8-6 5-1.8 3.2-3.6 5-6 5S1 9.2 1 6s1.8-5 5-5z" />
          </svg>
          <span className="font-display text-xl font-extrabold tracking-tight text-paper">
            loop<span className="text-signal">.</span>
          </span>
        </Link>
        <Link
          href="#waitlist-cta"
          onClick={handleScrollToWaitlist}
          className={`rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
            scrolled
              ? "border-signal/30 bg-signal/5 px-5 py-2.5 text-signal hover:bg-signal hover:text-ink hover:shadow-[0_0_15px_rgba(201,168,76,0.4)]"
              : "border-white/20 bg-white/5 px-6 py-3 text-paper hover:border-signal hover:bg-signal hover:text-ink hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          }`}
        >
          Join The Waitlist
        </Link>
      </div>
    </header>
  );
}

