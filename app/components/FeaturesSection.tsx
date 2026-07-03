import Image from "next/image";

interface Feature {
  icon: string;
  title: string;
  body: string;
}

const screens = [
  "1zrZK1ZfcjbKr1q7I1hvcZ9UEE",
  "8l71idFZCP0YeYejaeXmNweXT0",
  "9n72C8OQ4oec8LFnPl6l8hhYk",
];

const features: Feature[] = [
  {
    icon: "🔗",
    title: "One link. Everywhere.",
    body: "Replace your scattered links, CVs and portfolios. One Hoo profile does it all.",
  },
  {
    icon: "✅",
    title: "Stay visible. Stay relevant.",
    body: "Keep your profile current without the pressure to constantly post.",
  },
  {
    icon: "✦",
    title: "Find the right people.",
    body: "Discover founders, collaborators, jobs and opportunities all in one place.",
  },
  {
    icon: "📦",
    title: "Show what you're building.",
    body: "Your current work, front and centre. Let the right people find you.",
  },
  {
    icon: "🅗",
    title: "Start warm.",
    body: "Every intro comes with context. No cold messages, ever.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Teal card */}
        <div className="overflow-hidden rounded-3xl bg-[#0d2b25]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr_1fr]">
            {/* Left — heading */}
            <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
              <span className="font-display text-4xl font-bold text-signal/50 leading-none">&ldquo;</span>
              <h2 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-signal sm:text-3xl xl:text-4xl">
                A NEW KIND
                <br />
                OF PLATFORM.
              </h2>
              <span className="font-display text-4xl font-bold text-signal/50 leading-none">&rdquo;</span>
              <p className="text-sm text-paper/60 sm:text-base">
                Everything that matters in one place.{" "}
                <strong className="font-semibold text-paper">
                  Built for people who are building something.
                </strong>
              </p>
            </div>

            {/* Center — stacked phones */}
            <div className="relative flex items-end justify-center px-4 py-8 md:px-0 md:py-0">
              {/* Back phone (slightly offset) */}
              <div className="absolute bottom-0 left-4 z-0 h-[380px] w-[180px] opacity-50 md:h-[460px] md:w-[215px] lg:left-6 lg:h-[520px] lg:w-[240px]">
                <Image
                  src={`https://framerusercontent.com/images/${screens[0]}.png`}
                  alt="HOO app screen"
                  fill
                  className="object-contain object-bottom"
                  sizes="240px"
                />
              </div>
              {/* Front phone */}
              <div className="relative z-10 h-[400px] w-[200px] md:h-[480px] md:w-[235px] lg:h-[540px] lg:w-[265px]">
                <Image
                  src={`https://framerusercontent.com/images/${screens[1]}.png`}
                  alt="HOO app profile"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  sizes="265px"
                />
              </div>
              {/* Back-right phone */}
              <div className="absolute bottom-0 right-4 z-0 h-[380px] w-[180px] opacity-50 md:h-[460px] md:w-[215px] lg:right-6 lg:h-[520px] lg:w-[240px]">
                <Image
                  src={`https://framerusercontent.com/images/${screens[2]}.png`}
                  alt="HOO app screen"
                  fill
                  className="object-contain object-bottom"
                  sizes="240px"
                />
              </div>
            </div>

            {/* Right — feature list */}
            <div className="flex flex-col justify-center gap-7 bg-[#0a2620] p-8 md:p-12">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal/10 text-base">
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-paper sm:text-base">
                      {f.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-paper/50 sm:text-sm">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
