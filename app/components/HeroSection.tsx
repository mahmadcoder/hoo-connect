"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const avatars = [
  {
    src: "/loop_avatar_founder.png",
    alt: "Founder member",
  },
  {
    src: "/loop_avatar_creator.png",
    alt: "Creator member",
  },
  {
    src: "/loop_avatar_developer.png",
    alt: "Developer member",
  },
];

export default function HeroSection() {
  const [handle, setHandle] = useState("");
  const [step, setStep] = useState(1); // 1: Username, 2: Details, 3: Success
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!handle) {
      setIsAvailable(false);
      return;
    }
    setIsChecking(true);
    const timer = setTimeout(() => {
      setIsChecking(false);
      setIsAvailable(true);
    }, 400); // Simulate network check
    return () => clearTimeout(timer);
  }, [handle]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim() && isAvailable && !isChecking) {
      setStep(2);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && email.trim()) {
      setStep(3);
      // Dispatch custom event to sync with other claim widgets on the page
      const event = new CustomEvent("loopWaitlistJoined", {
        detail: { handle, fullName, email }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pb-16 pt-32 md:pt-28 flex items-center bg-[#040C0A]"
    >
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-signal/10 blur-[130px] animate-pulse-glow" style={{ animationDelay: "0s" }} />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[160px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Hero Card Container */}
        <div className="w-full shrink-0 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#071512]/60 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
            
            {/* Left Column: Headline, Subtitle, and Waitlist Flow */}
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 md:p-14 lg:p-16">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-signal">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-signal"></span>
                  </span>
                  Early Access &bull; Reserve Your Handle
                </div>

                <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
                  It&rsquo;s not just who you know.<br />
                  <span className="bg-gradient-to-r from-signal via-[#75ff9f] to-[#40ffcf] bg-clip-text text-transparent">It&rsquo;s how you show it.</span>
                </h1>

                <p className="max-w-md text-sm sm:text-base leading-relaxed text-paper/70">
                  The next-generation space designed to showcase who you are, what you&rsquo;re building, and where you&rsquo;re going.
                </p>
              </div>

              {/* Dynamic reservation form steps */}
              <div className="w-full max-w-md py-2">
                {step === 1 && (
                  <form onSubmit={handleUsernameSubmit} className="space-y-4">
                    <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 focus-within:border-signal/50 focus-within:ring-1 focus-within:ring-signal/20 transition duration-300">
                      <span className="pl-4 font-display text-sm font-semibold text-paper/40 select-none">
                        loop.me/
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="yourname"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                        className="w-full bg-transparent py-3 pl-0.5 pr-4 text-sm font-semibold text-paper placeholder:text-paper/20 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isChecking || !handle}
                        className="shrink-0 cursor-pointer rounded-xl bg-signal px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(157,255,196,0.5)] disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Reserve
                      </button>
                    </div>

                    {/* Live handle status checker */}
                    {handle && (
                      <div className="flex items-center gap-2 px-2 text-xs">
                        {isChecking ? (
                          <div className="flex items-center gap-1.5 text-paper/50">
                            <svg className="animate-spin h-3.5 w-3.5 text-signal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Checking availability...
                          </div>
                        ) : isAvailable ? (
                          <span className="text-signal font-medium animate-fade-in flex items-center gap-1">
                            <span className="text-base leading-none">✦</span> loop.me/{handle} is available! Reserve now.
                          </span>
                        ) : null}
                      </div>
                    )}
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-3.5 animate-fade-in">
                    <div className="text-xs text-signal font-semibold uppercase tracking-wider">
                      Reserving: loop.me/{handle}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/20 transition duration-300"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/20 transition duration-300"
                    />
                    <div className="flex gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 cursor-pointer rounded-xl border border-white/10 py-3.5 text-xs font-bold uppercase tracking-wider text-paper/70 transition hover:bg-white/5"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 cursor-pointer rounded-xl bg-signal py-3.5 text-xs font-bold uppercase tracking-wider text-ink transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(157,255,196,0.5)]"
                      >
                        Lock in @{handle}
                      </button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <div className="rounded-2xl border border-signal/20 bg-signal/5 p-6 text-left animate-fade-in space-y-2">
                    <h3 className="font-display text-base font-bold text-paper flex items-center gap-2">
                      <span className="text-xl">🎉</span> You&rsquo;re on the list!
                    </h3>
                    <p className="text-sm text-paper/70">
                      We have reserved <strong className="text-signal">loop.me/{handle}</strong> for you. We will email instructions to <strong className="text-paper">{email}</strong> soon.
                    </p>
                  </div>
                )}
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                <div className="flex -space-x-2.5">
                  {avatars.map((a, i) => (
                    <div key={i} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[#071512]">
                      <Image
                        src={a.src}
                        alt={a.alt}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-paper/50">
                  <span className="font-display font-bold text-signal">5,000+</span> creators already in the loop
                </p>
              </div>
            </div>

            {/* Right Column: Phone Mockup Container (Pure CSS Smartphone Mockup) */}
            <div className="relative flex items-center justify-center p-8 bg-gradient-to-b from-transparent to-[#040C0A]/40 min-h-[460px] md:min-h-[520px]">
              {/* Radial glow behind phone */}
              <div className="pointer-events-none absolute bottom-1/2 translate-y-1/2 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-signal/10 blur-[60px]" />
              
              {/* Pure CSS smartphone frame */}
              <div className="relative w-[210px] h-[420px] sm:w-[230px] sm:h-[460px] lg:w-[260px] lg:h-[520px] rounded-[2.2rem] lg:rounded-[2.5rem] border-[6px] lg:border-[8px] border-[#0d2b25] bg-[#040C0A] shadow-[0_24px_80px_rgba(0,0,0,0.9)] p-5 flex flex-col items-center justify-between text-center overflow-hidden transition-all duration-500 hover:border-signal/30 group">
                
                {/* Phone Top Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3.5 w-24 sm:w-28 sm:h-4 bg-[#0d2b25] rounded-b-xl z-20" />
                
                {/* Glowing sphere inside phone */}
                <div className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-signal/15 blur-2xl" />

                {/* Mock Phone Status Bar */}
                <div className="w-full flex justify-between px-2 pt-0.5 text-[8px] text-paper/30 font-semibold select-none z-10">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span className="w-3.5 h-1.5 border border-paper/30 rounded-sm inline-block relative">
                      <span className="absolute top-0 left-0 bottom-0 right-0.5 bg-signal rounded-sm" />
                    </span>
                  </div>
                </div>

                {/* Mock Profile Header */}
                <div className="flex flex-col items-center gap-3 pt-4 w-full z-10">
                  {/* Avatar Frame */}
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-signal/30 bg-gradient-to-tr from-signal/20 to-emerald-500/20 p-1 flex items-center justify-center shadow-lg">
                    <div className="h-full w-full rounded-full bg-[#0d2b25] flex items-center justify-center text-signal font-display text-base sm:text-lg font-black uppercase">
                      {handle ? handle.slice(0, 2) : "LP"}
                    </div>
                  </div>

                  {/* Name and Handle */}
                  <div className="space-y-1 w-full px-2">
                    <h4 className="font-display text-xs sm:text-sm font-bold text-paper truncate">
                      {handle ? `@${handle}` : "@alex.loop"}
                    </h4>
                    <div className="inline-flex rounded-full bg-signal/10 border border-signal/20 px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold text-signal tracking-wide">
                      loop.me/{handle || "alex"}
                    </div>
                  </div>
                </div>

                {/* Mock Dynamic Link List */}
                <div className="w-full space-y-2 px-1 z-10 my-4 flex-1 flex flex-col justify-center">
                  
                  {/* Status update containing the quote */}
                  <div className="w-full rounded-xl border border-signal/20 bg-signal/5 p-2.5 text-center shadow-inner mb-1.5">
                    <div className="text-[8px] text-signal font-semibold uppercase tracking-wider mb-0.5">Status</div>
                    <div className="text-[10px] sm:text-[11px] italic font-serif text-paper leading-tight">
                      &ldquo;In the loop. Out of the noise.&rdquo;
                    </div>
                  </div>

                  <div className="w-full rounded-xl border border-white/5 bg-white/[0.02] p-2 text-left transition duration-300 hover:bg-white/[0.04]">
                    <div className="text-[7px] text-signal font-bold uppercase tracking-wider">🚀 current build</div>
                    <div className="text-[8px] sm:text-[9px] font-semibold text-paper truncate mt-0.5">Designing Loop waitlist page</div>
                  </div>
                  
                  <div className="w-full rounded-xl border border-white/5 bg-white/[0.02] p-2 text-left transition duration-300 hover:bg-white/[0.04]">
                    <div className="text-[7px] text-paper/40 font-bold uppercase tracking-wider">🔗 links</div>
                    <div className="text-[8px] sm:text-[9px] font-semibold text-paper truncate mt-0.5">portfolio.dev &bull; twitter</div>
                  </div>

                  <div className="w-full rounded-xl border border-white/5 bg-white/[0.02] p-2 text-left transition duration-300 hover:bg-white/[0.04]">
                    <div className="text-[7px] text-paper/40 font-bold uppercase tracking-wider">🤝 connection loop</div>
                    <div className="text-[8px] sm:text-[9px] font-semibold text-paper truncate mt-0.5">42 builders connected</div>
                  </div>
                </div>

                {/* Mock Logo Footer */}
                <div className="w-full pb-1 z-10 flex justify-center items-center gap-1 text-[8px] font-bold tracking-wider text-paper/30">
                  <span>POWERED BY</span>
                  <span className="text-signal">LOOP.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
