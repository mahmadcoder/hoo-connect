"use client";

import { useState, useEffect } from "react";

export default function WaitlistCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Listen for waitlist updates from the Hero username card
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setFullName(customEvent.detail.fullName || "");
        setEmail(customEvent.detail.email || "");
        setSubmitted(true);
      }
    };
    window.addEventListener("loopWaitlistJoined", handleSync);
    return () => window.removeEventListener("loopWaitlistJoined", handleSync);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fullName.trim() && email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section id="waitlist-cta" className="py-20 md:py-32 bg-[#f0ede6]">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Dark Emerald Container */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#071512] shadow-2xl p-8 sm:p-12 md:p-16 text-center relative">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-signal/5 blur-[80px]" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-signal">
              get early access
            </span>
            
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-paper sm:text-5xl leading-none">
              Claim your loop. <br />
              <span className="italic font-normal font-serif text-signal">Join the waitlist.</span>
            </h2>
            
            <p className="text-sm leading-relaxed text-paper/60 sm:text-base max-w-md mx-auto">
              Limited spots available for creators, founders, and developers shaping the next generation of professional culture.
            </p>

            <div className="pt-4 max-w-md mx-auto">
              {submitted ? (
                <div className="rounded-2xl border border-signal/20 bg-signal/5 p-8 text-center animate-fade-in space-y-2">
                  <p className="font-display text-lg font-bold text-paper">
                    You&rsquo;re on the list! 🎉
                  </p>
                  <p className="text-sm text-paper/60">
                    We have reserved your spot. We&rsquo;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3.5"
                >
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/20 transition duration-300"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/20 transition duration-300"
                  />
                  
                  <button
                    type="submit"
                    className="mt-1 w-full cursor-pointer rounded-xl bg-signal py-4 text-xs font-bold uppercase tracking-wider text-ink transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(157,255,196,0.5)]"
                  >
                    Join The Waitlist
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
