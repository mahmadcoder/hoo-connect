"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ClaimSection() {
  const [handle, setHandle] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleScrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAvailable || isChecking) return;
    
    // Find the waitlist input in hero or waitlist CTA and focus it
    const heroInput = document.querySelector("#hero input") as HTMLInputElement;
    const ctaInput = document.querySelector("#waitlist-cta input") as HTMLInputElement;
    
    if (heroInput) {
      heroInput.value = handle;
      // Trigger native React state updates
      const event = new Event("input", { bubbles: true });
      heroInput.dispatchEvent(event);
      heroInput.focus();
      document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
    } else if (ctaInput) {
      ctaInput.value = handle;
      const event = new Event("input", { bubbles: true });
      ctaInput.dispatchEvent(event);
      ctaInput.focus();
      document.querySelector("#waitlist-cta")?.scrollIntoView({ behavior: "smooth" });
    } else {
      document.querySelector("#waitlist-cta")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!handle || handle.length < 2) {
      setIsAvailable(false);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    
    const timer = setTimeout(async () => {
      try {
        const reservedHandles = ["admin", "support", "loop", "api", "login", "register", "waitlist", "dashboard", "feedback", "help"];
        if (reservedHandles.includes(handle.toLowerCase())) {
          setIsAvailable(false);
          setIsChecking(false);
          return;
        }

        const { data, error } = await supabase
          .from("waitlist")
          .select("handle")
          .eq("handle", handle.toLowerCase())
          .maybeSingle();

        if (error) {
          console.error("Error checking availability:", error);
          setIsAvailable(false);
        } else {
          setIsAvailable(!data);
        }
      } catch (err) {
        console.error(err);
        setIsAvailable(false);
      } finally {
        setIsChecking(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [handle]);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.fromTo(
          ".animate-claim-left",
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".animate-claim-left",
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          ".animate-claim-right",
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".animate-claim-right",
              start: "top 80%",
            },
          }
        );
      });
    });
  }, []);

  return (
    <section className="bg-[#f0ede6] py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        {/* Main Card with Split Layout */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#071512] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            
            {/* Left: Interactive Phone Mockup Sandbox */}
            <div className="flex items-center animate-claim-left opacity-0 justify-center p-8 sm:p-12 md:p-16 bg-[#040C0A]/40 min-h-[500px] relative">
              <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-signal/5 via-transparent to-transparent opacity-50" />
              
              {/* Styled Mock Phone */}
              <div className="relative w-[240px] h-[460px] rounded-[2.5rem] border-[8px] border-[#0d2b25] bg-[#040C0A] shadow-2xl p-4 flex flex-col items-center justify-between text-center overflow-hidden transition-all duration-500 hover:border-signal/30 hover:shadow-[0_0_30px_rgba(157,255,196,0.15)]">
                
                {/* Phone Top Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 bg-[#0d2b25] rounded-b-xl z-20" />
                
                {/* Glowing sphere inside phone */}
                <div className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-signal/15 blur-2xl" />

                {/* Mock Phone Status Bar */}
                <div className="w-full flex justify-between px-3 pt-0.5 text-[8px] text-paper/30 font-semibold select-none z-10">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span className="w-3.5 h-1.5 border border-paper/30 rounded-sm inline-block relative">
                      <span className="absolute top-0 left-0 bottom-0 right-0.5 bg-signal rounded-sm" />
                    </span>
                  </div>
                </div>

                {/* Mock Profile Header */}
                <div className="flex flex-col items-center gap-3 pt-6 w-full z-10">
                  {/* Avatar Frame */}
                  <div className="h-16 w-16 rounded-full border border-signal/30 bg-gradient-to-tr from-signal/20 to-emerald-500/20 p-1 flex items-center justify-center shadow-lg">
                    <div className="h-full w-full rounded-full bg-[#0d2b25] flex items-center justify-center text-signal font-display text-lg font-black uppercase">
                      {handle ? handle.slice(0, 2) : "L"}
                    </div>
                  </div>

                  {/* Name and Handle */}
                  <div className="space-y-1 w-full px-2">
                    <h4 className="font-display text-sm font-bold text-paper truncate">
                      {handle ? `@${handle}` : "@username"}
                    </h4>
                    <div className="inline-flex rounded-full bg-signal/10 border border-signal/20 px-2.5 py-0.5 text-[9px] font-semibold text-signal tracking-wide">
                      loop.me/{handle || "name"}
                    </div>
                  </div>
                </div>

                {/* Mock Dynamic Link List */}
                <div className="w-full space-y-2 px-1 z-10">
                  <div className="w-full rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-left transition duration-300 hover:bg-white/[0.04]">
                    <div className="text-[9px] text-signal font-bold uppercase tracking-wider">🚀 current build</div>
                    <div className="text-[10px] font-semibold text-paper truncate mt-0.5">Shaping the next culture platform</div>
                  </div>
                  
                  <div className="w-full rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-left transition duration-300 hover:bg-white/[0.04]">
                    <div className="text-[9px] text-paper/40 font-bold uppercase tracking-wider">🔗 links</div>
                    <div className="text-[10px] font-semibold text-paper truncate mt-0.5">myportfolio.co &bull; github</div>
                  </div>

                  <div className="w-full rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-left transition duration-300 hover:bg-white/[0.04]">
                    <div className="text-[9px] text-paper/40 font-bold uppercase tracking-wider">🤝 network context</div>
                    <div className="text-[10px] font-semibold text-paper truncate mt-0.5">Active builder &bull; NYC based</div>
                  </div>
                </div>

                {/* Mock Logo Footer */}
                <div className="w-full pb-2 z-10 flex justify-center items-center gap-1 text-[8px] font-bold tracking-wider text-paper/30">
                  <span>POWERED BY</span>
                  <span className="text-signal">LOOP.</span>
                </div>
              </div>
            </div>

            {/* Right: Pitch & Input Form */}
            <div className="flex flex-col animate-claim-right opacity-0 items-center lg:items-start justify-center gap-8 p-10 sm:p-14 lg:p-16 text-center lg:text-left bg-[#050F0D]/60">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-signal/20 bg-signal/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-signal">
                  Check my loop.
                </span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight text-paper sm:text-5xl leading-tight">
                  Reserve your <br className="hidden sm:inline" />
                  <span className="text-signal bg-gradient-to-r from-signal to-emerald-400 bg-clip-text text-transparent">unique URL.</span>
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-paper/60 sm:text-base">
                  One clean profile. One centralized link. Everything you build and everyone you connect with, presented elegantly.
                </p>
              </div>

              {/* Username Typing Sandbox */}
              <div className="w-full max-w-md space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 focus-within:border-signal/50 focus-within:ring-1 focus-within:ring-signal/20 transition duration-300">
                    <span className="pl-4 font-display text-sm font-semibold text-paper/30 select-none">
                      loop.me/
                    </span>
                    <input
                      type="text"
                      placeholder="yourname"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                      className="w-full bg-transparent py-3.5 pl-0.5 pr-4 text-sm font-semibold text-paper placeholder:text-paper/20 focus:outline-none"
                    />
                  </div>

                  {handle && (
                    <div className="flex items-center gap-2 px-2 text-xs text-left">
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
                          <span className="text-base leading-none">✦</span> loop.me/{handle} is available!
                        </span>
                      ) : (
                        <span className="text-rose-400 font-medium animate-fade-in flex items-center gap-1">
                          <span className="text-base leading-none">✦</span> loop.me/{handle} is taken or restricted.
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={handleScrollToWaitlist}
                    disabled={!handle || isChecking || !isAvailable}
                    className="w-full cursor-pointer rounded-2xl bg-signal py-4 text-xs font-bold uppercase tracking-wider text-ink transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(157,255,196,0.5)] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Claim URL &amp; Register
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
