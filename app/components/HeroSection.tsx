import Image from "next/image";
import WaitlistForm from "./WaitlistForm";

const avatars = [
  {
    src: "https://framerusercontent.com/images/PWzapM9fTP8NbBzliHldujOa4Xk.png",
    alt: "Community member",
  },
  {
    src: "https://framerusercontent.com/images/dqBdZNhE1bUoyvXd6C56EBFKew.png",
    alt: "Community member",
  },
  {
    src: "https://framerusercontent.com/images/TFYfMcEOnFnngIl0KWS0Fv2Zs.png",
    alt: "Community member",
  },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pb-16 pt-28 md:pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/15 blur-[180px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-8 md:px-10">
        {/* ── HERO CARD (teal dark, 3-col) ────────────────────────── */}
        <div className="w-full overflow-hidden rounded-3xl bg-[#0d2b25]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
            {/* Left — copy + form */}
            <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-signal/80">
                Early access &middot; Limited invites
              </p>

              <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-paper sm:text-4xl xl:text-5xl">
                It&rsquo;s not what you know,{" "}
                <span className="text-signal">it&rsquo;s HOO.</span>
              </h1>

              <p className="max-w-sm text-sm leading-relaxed text-paper/70 sm:text-base">
                The new way to show who you are, what you&rsquo;re building{" "}
                <strong className="font-semibold text-paper">
                  and where you&rsquo;re going.
                </strong>
              </p>

              {/* Waitlist form (client component) */}
              <WaitlistForm />

              {/* Social proof */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-3">
                  {avatars.map((a, i) => (
                    <Image
                      key={i}
                      src={a.src}
                      alt={a.alt}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full border-2 border-[#0d2b25] object-cover"
                    />
                  ))}
                </div>
                <p className="text-xs text-paper/60">
                  <span className="font-display font-semibold text-paper">
                    5,000+
                  </span>{" "}
                  people already inside
                </p>
              </div>
            </div>

            {/* Center — phone mockup */}
            <div className="relative flex items-end justify-center px-4 pb-0 pt-8 md:px-0 md:pt-0">
              <div className="relative h-[420px] w-[210px] md:h-[500px] md:w-[250px] lg:h-[560px] lg:w-[280px]">
                <Image
                  src="https://framerusercontent.com/images/LKTP5NN2RnEhtRBbzTBfWMams.png"
                  alt="HOO app preview"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  sizes="(max-width: 768px) 210px, (max-width: 1024px) 250px, 280px"
                />
              </div>
            </div>

            {/* Right — bold quote */}
            <div className="flex flex-col items-center justify-center gap-4 bg-[#0a2620] p-8 text-center md:p-12">
              <span className="font-display text-4xl font-bold text-signal/50 leading-none">&ldquo;</span>
              <p className="font-display text-2xl font-black uppercase leading-none tracking-tight text-signal sm:text-3xl xl:text-4xl">
                THE NEXT
                <br />
                GENERATION
                <br />
                C
                <span className="inline-block -mx-0.5">
                  <svg viewBox="0 0 36 22" className="inline h-[0.8em] w-auto fill-signal" aria-hidden="true">
                    <path d="M18 0C8.06 0 0 4.92 0 11s8.06 11 18 11 18-4.92 18-11S27.94 0 18 0Zm0 18c-5.52 0-10-3.13-10-7s4.48-7 10-7 10 3.13 10 7-4.48 7-10 7Z"/>
                  </svg>
                </span>
                NNECTS
                <br />
                HERE
              </p>
              <span className="font-display text-4xl font-bold text-signal/50 leading-none">&rdquo;</span>
            </div>
          </div>
        </div>

        {/* ── WAITLIST ANCHOR ─────────────────────────────────────── */}
        <div id="waitlist" className="mt-0" />
      </div>
    </section>
  );
}
