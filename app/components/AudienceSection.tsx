"use client";

import { useEffect } from "react";
import Image from "next/image";

interface AudienceCard {
  label: string;
  body: string;
  img: string;
}

const cards: AudienceCard[] = [
  {
    label: "For Founders",
    body: "Building something from nothing. Looking for collaborators and backers who truly understand the journey.",
    img: "/loop_avatar_founder.png",
  },
  {
    label: "For Creators",
    body: "Turning audience visibility into concrete business opportunities. Showcase your actual work, not just metrics.",
    img: "/loop_avatar_creator.png",
  },
  {
    label: "For Freelancers",
    body: "Done with static portfolios and resumes. Present your current building projects in real time.",
    img: "/loop_avatar_developer.png",
  },
];

export default function AudienceSection() {
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.fromTo(
          ".animate-audience-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".animate-audience-card",
              start: "top 85%",
            },
          }
        );
      });
    });
  }, []);

  return (
    <section className="bg-[#f0ede6] py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        {/* Editorial Heading Design */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-[#0d2b25] sm:text-5xl md:text-6xl leading-[1.05]">
            Real people <br className="sm:hidden" />
            building <span className="italic font-normal font-serif text-[#1e584d]">real things.</span>
          </h2>
          <p className="text-base text-[#0d2b25]/70 sm:text-lg">
            A verified professional network defined by <strong className="font-semibold text-[#0d2b25]">relevance</strong>, not social algorithms.
          </p>
        </div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.label}
              className="group animate-audience-card opacity-0 relative overflow-hidden rounded-[2rem] bg-[#0d2b25] shadow-lg transition duration-500 hover:shadow-xl"
            >
              {/* Photo Showcase */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                
                {/* Visual dark gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040C0A]/95 via-[#040C0A]/35 to-transparent transition-opacity duration-300" />
              </div>
              
              {/* Glassmorphic Overlay Text Card */}
              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl border border-white/10 bg-[#040C0A]/60 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-[-2px]">
                <h3 className="font-display text-lg font-bold text-paper flex items-center gap-2 group-hover:text-signal transition duration-300">
                  {c.label}
                  <span className="inline-block transform translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 text-signal font-normal">&rarr;</span>
                </h3>
                <p className="mt-1.5 text-xs text-paper/70 leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
