import Image from "next/image";

interface AudienceCard {
  label: string;
  body: string;
  img: string;
}

const cards: AudienceCard[] = [
  {
    label: "For Creators",
    body: "Turning visibility into opportunity. Not just content.",
    img: "dqBdZNhE1bUoyvXd6C56EBFKew",
  },
  {
    label: "For Founders",
    body: "Building something from nothing. Looking for people who get it.",
    img: "PWzapM9fTP8NbBzliHldujOa4Xk",
  },
  {
    label: "For Freelancers",
    body: "Done with static profiles. Ready for the right opportunities.",
    img: "TFYfMcEOnFnngIl0KWS0Fv2Zs",
  },
];

export default function AudienceSection() {
  return (
    <section className="bg-[#f0ede6] py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl font-black uppercase leading-tight tracking-tight text-[#0d2b25] sm:text-5xl md:text-6xl">
            REAL PEOPLE BUILDING
            <br />
            REAL THINGS.
          </h2>
          <p className="mt-5 text-base text-[#0d2b25]/60 sm:text-lg">
            A network defined by{" "}
            <strong className="font-semibold text-[#0d2b25]">relevance</strong>
            , not performance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.label}
              className="group relative overflow-hidden rounded-3xl"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={`https://framerusercontent.com/images/${c.img}.png`}
                  alt={c.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b25]/90 via-[#0d2b25]/20 to-transparent" />
              </div>
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl font-bold text-paper">
                  {c.label}
                </h3>
                <p className="mt-1.5 text-sm text-paper/70">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
