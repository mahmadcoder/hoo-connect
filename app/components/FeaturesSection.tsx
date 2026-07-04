"use client";

import { useEffect } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg className="h-5 w-5 stroke-signal stroke-2 fill-none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "One link. Everywhere.",
    body: "Replace scattered links, resumes, and portfolios. One premium Loop profile does it all.",
    className: "col-span-1 sm:col-span-2",
  },
  {
    icon: (
      <svg className="h-5 w-5 stroke-signal stroke-2 fill-none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Stay visible. Stay relevant.",
    body: "Keep your profile current without the pressure to constantly post.",
    className: "col-span-1",
  },
  {
    icon: (
      <svg className="h-5 w-5 stroke-signal stroke-2 fill-none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a6 6 0 00-3.44-5.24m4.94-3.95a4.89 4.89 0 11-2.96 4.39M3 20.25a7.5 7.5 0 1115 0M1.5 8.25A4.125 4.125 0 1118 8.25" />
      </svg>
    ),
    title: "Collaborate seamlessly.",
    body: "Discover founders, collaborators, and projects in one integrated workspace.",
    className: "col-span-1",
  },
  {
    icon: (
      <svg className="h-5 w-5 stroke-signal stroke-2 fill-none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: "Showcase live work.",
    body: "Your current build, front and center. Let opportunities find you automatically.",
    className: "col-span-1",
  },
  {
    icon: (
      <svg className="h-5 w-5 stroke-signal stroke-2 fill-none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v3.75m-18 0A2.25 2.25 0 005.25 12h13.5A2.25 2.25 0 0021 9.75V6" />
      </svg>
    ),
    title: "Warm intros only.",
    body: "Every connection comes with context. Zero cold outreach, guaranteed.",
    className: "col-span-1",
  },
];

export default function FeaturesSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasReducedMotion) {
      import("gsap").then(({ gsap }) => {
        gsap.set([".animate-feature-wrapper", ".animate-feature-phones", ".animate-feature-card"], { opacity: 1, y: 0 });
      });
      return;
    }

    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        
        // Reveal main card wrapper
        gsap.fromTo(
          ".animate-feature-wrapper",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".animate-feature-wrapper",
              start: "top 85%",
              toggleActions: "play none none none"
            },
          }
        );
        
        // Scrub-driven animation for the phone previews stack
        gsap.fromTo(
          ".animate-feature-phones",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: ".animate-feature-wrapper",
              start: "top 95%",
              end: "bottom 15%",
              scrub: 1,
            }
          }
        );
        
        // Stagger bento cards
        gsap.fromTo(
          ".animate-feature-card",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".animate-feature-card",
              start: "top 85%",
              toggleActions: "play none none none"
            },
          }
        );
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[#0A0A0F]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        {/* Dark Card Wrapper */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#12121A] shadow-[0_24px_60px_rgba(0,0,0,0.6)] animate-feature-wrapper opacity-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1.3fr]">
            
            {/* Left Column: Elegant Heading and Copy */}
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <span className="font-display text-4xl font-extrabold text-signal/20 leading-none">&ldquo;</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
                A new kind <br />
                <span className="text-signal">of space.</span>
              </h2>
              <span className="font-display text-4xl font-extrabold text-signal/20 leading-none">&rdquo;</span>
              <p className="text-sm leading-relaxed text-paper/60 sm:text-base">
                Everything that matters, gathered in one place. Built exclusively for creators, builders, and developers who shape culture.
              </p>
            </div>

            {/* Center Column: Code-Rendered Custom Phone Stack Previews (No Cloned Screenshot Images!) */}
            <div className="relative animate-feature-phones opacity-0 flex items-end justify-center px-6 py-12 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#0A0A0F]/60 min-h-[380px] overflow-hidden select-none">
              {/* Radial background glow */}
              <div className="pointer-events-none absolute bottom-10 left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-signal/5 blur-[60px]" />
              
              {/* Phone 1: Connection Feed (Left) */}
              <div className="absolute bottom-[-20px] left-4 z-0 h-[290px] w-[130px] rounded-t-[1.5rem] border-[4px] border-white/10 bg-[#080B11] p-2.5 flex flex-col gap-2 opacity-50 transform rotate-[-4deg] translate-y-4 hover:translate-y-0 hover:opacity-85 transition-all duration-500">
                <div className="h-2 w-12 bg-white/10 rounded-full mx-auto" />
                <div className="text-[7px] font-bold text-signal tracking-widest uppercase text-center mt-1">Feeds</div>
                {/* Mock feeds card */}
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-1.5 space-y-1">
                  <div className="h-1.5 w-6 bg-white/20 rounded" />
                  <div className="h-1 w-10 bg-white/10 rounded" />
                </div>
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-1.5 space-y-1">
                  <div className="h-1.5 w-8 bg-white/20 rounded" />
                  <div className="h-1 w-7 bg-white/10 rounded" />
                </div>
              </div>
              
              {/* Phone 2: Main Profile Preview (Center) */}
              <div className="relative z-10 h-[320px] w-[160px] rounded-t-[2rem] border-[6px] border-[#0F172A] bg-[#080B11] p-3 flex flex-col items-center justify-between shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:scale-[1.03] transition-transform duration-500">
                {/* Speaker slit */}
                <div className="h-1.5 w-14 bg-[#0F172A] rounded-b-md absolute top-0 left-1/2 -translate-x-1/2" />
                
                {/* Profile UI mockup inside phone */}
                <div className="w-full flex flex-col items-center gap-2 mt-4">
                  {/* Avatar circle */}
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-signal/20 to-violet-500/20 border border-signal/30 flex items-center justify-center text-signal font-display text-xs font-black uppercase shadow-md">
                    AS
                  </div>
                  <div className="space-y-0.5 text-center">
                    <div className="text-[8px] font-bold text-paper">@alexsmith</div>
                    <div className="text-[6px] text-signal font-semibold tracking-wider">loop.me/alex</div>
                  </div>
                </div>

                {/* Mock Links list */}
                <div className="w-full space-y-1.5 my-4">
                  <div className="rounded-lg border border-white/5 bg-white/[0.03] p-1.5 text-left">
                    <div className="text-[5px] text-signal font-bold uppercase tracking-wider">🚀 current build</div>
                    <div className="text-[6px] font-semibold text-paper truncate mt-0.5">Designing Loop networks</div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/[0.03] p-1.5 text-left">
                    <div className="text-[5px] text-paper/30 font-bold uppercase tracking-wider">🔗 links</div>
                    <div className="text-[6px] font-semibold text-paper truncate mt-0.5">alexsmith.dev</div>
                  </div>
                </div>

                {/* Powered by logo */}
                <div className="text-[5px] font-bold text-paper/30 tracking-wider flex items-center gap-0.5 justify-center pb-0.5">
                  <span>POWERED BY</span>
                  <span className="text-signal">LOOP.</span>
                </div>
              </div>
              
              {/* Phone 3: Network Stats (Right) */}
              <div className="absolute bottom-[-20px] right-4 z-0 h-[290px] w-[130px] rounded-t-[1.5rem] border-[4px] border-white/10 bg-[#080B11] p-2.5 flex flex-col gap-2 opacity-50 transform rotate-[4deg] translate-y-4 hover:translate-y-0 hover:opacity-85 transition-all duration-500">
                <div className="h-2 w-12 bg-white/10 rounded-full mx-auto" />
                <div className="text-[7px] font-bold text-signal tracking-widest uppercase text-center mt-1">Network</div>
                
                {/* CSS Connective node illustration */}
                <div className="relative h-16 w-full rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-center overflow-hidden">
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-signal left-4 top-4" />
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-violet-400 right-4 bottom-4" />
                  <div className="absolute h-2 w-2 rounded-full bg-paper left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <svg className="absolute inset-0 h-full w-full stroke-signal/30 stroke-1" viewBox="0 0 100 60">
                    <line x1="20" y1="20" x2="50" y2="30" />
                    <line x1="80" y1="40" x2="50" y2="30" />
                  </svg>
                </div>
                
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-1 text-center text-[6px] text-paper/40">
                  34 connections
                </div>
              </div>
            </div>

            {/* Right Column: Premium Bento Grid */}
            <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#0D0B14]/60">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-[#ffffff]/[0.02] p-5 transition-all duration-300 hover:border-signal/20 hover:bg-[#ffffff]/[0.04] animate-feature-card opacity-0 ${f.className}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal/5 border border-signal/15 text-signal transition-transform duration-300 group-hover:scale-110 group-hover:bg-signal/10">
                        {f.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display text-sm font-bold text-paper transition duration-300 group-hover:text-signal">
                          {f.title}
                        </h3>
                        <p className="text-[11px] leading-relaxed text-paper/50">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
