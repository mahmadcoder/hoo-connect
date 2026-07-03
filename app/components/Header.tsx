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

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        scrolled
          ? "top-4 left-4 right-4 border border-white/10 bg-ink/70 shadow-lg backdrop-blur-xl rounded-2xl"
          : "top-0 left-0 right-0 bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
        scrolled ? "py-3 md:px-8" : "py-5 md:px-10"
      }`}>
        <Link
          href="#"
          className="font-display text-xl font-bold tracking-tight text-paper"
        >
          hoo.
        </Link>
        <Link
          href="#waitlist"
          className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
            scrolled
              ? "border-white/30 bg-white/10 text-paper backdrop-blur-md hover:border-signal hover:bg-signal hover:text-ink"
              : "border-white/20 bg-white/5 text-paper backdrop-blur-md hover:border-signal hover:bg-signal hover:text-ink"
          }`}
        >
          Join The Waitlist
        </Link>
      </div>
    </header>
  );
}
