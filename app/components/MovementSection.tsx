"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function MovementSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasReducedMotion) {
      import("gsap").then(({ gsap }) => {
        gsap.set([".animate-movement-grid", ".animate-movement-sub"], { opacity: 1, y: 0 });
      });
      return;
    }

    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        
        // Stagger fade-in section card
        gsap.fromTo(
          ".animate-movement-grid",
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".animate-movement-grid",
              start: "top 85%",
              toggleActions: "play none none none"
            },
          }
        );

        // Stagger fade-in sub copy
        gsap.fromTo(
          ".animate-movement-sub",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".animate-movement-sub",
              start: "top 85%",
              toggleActions: "play none none none"
            },
          }
        );

        // Scroll-driven scrub parallax for column photo strips
        gsap.fromTo(
          ".animate-movement-col-left",
          { y: 20 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: ".animate-movement-grid",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
        gsap.fromTo(
          ".animate-movement-col-center",
          { y: -30 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: ".animate-movement-grid",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
        gsap.fromTo(
          ".animate-movement-col-right",
          { y: 20 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: ".animate-movement-grid",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );

      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#0A0A0F] py-16 pb-28 md:py-24 md:pb-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        {/* Big Card Wrapper */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#12121A] shadow-2xl border border-white/5 animate-movement-grid opacity-0">
          
          {/* Three-column photo strip */}
          <div className="grid grid-cols-3 divide-x divide-white/5 opacity-55">
            <div className="relative animate-movement-col-left h-[300px] sm:h-[400px] md:h-[480px] overflow-hidden group">
              <Image
                src="/loop_community_1.png"
                alt="Loop community member"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="33vw"
              />
            </div>
            <div className="relative animate-movement-col-center h-[300px] sm:h-[400px] md:h-[480px] overflow-hidden group">
              <Image
                src="/loop_community_2.png"
                alt="Loop community member"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="33vw"
              />
            </div>
            <div className="relative animate-movement-col-right h-[300px] sm:h-[400px] md:h-[480px] overflow-hidden group">
              <Image
                src="/loop_community_3.png"
                alt="Loop community member"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="33vw"
              />
            </div>
          </div>

          {/* Elegant Text Overlay (Frosted glass & typographic alignment) */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#080B11]/40 backdrop-blur-[2px] p-6">
            <div className="text-center space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-signal bg-signal/10 border border-signal/20 px-3 py-1 rounded-full">
                our manifesto
              </span>
              <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-xl sm:text-5xl md:text-6xl lg:text-7xl">
                Not just online.<br />
                <span className="italic font-normal font-serif text-signal">This is a movement.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Sub-copy below the card */}
        <div className="mx-auto mt-20 max-w-3xl text-center space-y-6 animate-movement-sub opacity-0">
          <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-paper sm:text-3xl md:text-4xl">
            Careers don&rsquo;t look like they used to. <br className="hidden sm:inline" />
            Neither should your professional profile.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-paper/60 sm:text-base max-w-xl mx-auto">
            Traditional professional networks haven&rsquo;t caught up to how modern creators, freelancers, and builders work. <strong className="font-semibold text-paper">Loop</strong> is built from the ground up for that shift.
          </p>
        </div>
        
      </div>
    </section>
  );
}
