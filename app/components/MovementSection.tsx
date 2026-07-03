import Image from "next/image";

export default function MovementSection() {
  return (
    <section className="bg-[#f0ede6] py-12 pb-24 md:py-20 md:pb-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Big teal card with overlaid text */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0d2b25]">
          {/* Three-column photo strip */}
          <div className="grid grid-cols-3">
            <div className="relative h-[280px] sm:h-[360px] md:h-[440px]">
              <Image
                src="https://framerusercontent.com/images/dqBdZNhE1bUoyvXd6C56EBFKew.png"
                alt="HOO community"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
            <div className="relative h-[280px] sm:h-[360px] md:h-[440px]">
              <Image
                src="https://framerusercontent.com/images/PWzapM9fTP8NbBzliHldujOa4Xk.png"
                alt="HOO community"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
            <div className="relative h-[280px] sm:h-[360px] md:h-[440px]">
              <Image
                src="https://framerusercontent.com/images/TFYfMcEOnFnngIl0KWS0Fv2Zs.png"
                alt="HOO community"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          </div>

          {/* Overlay — big manifesto text */}
          <div className="absolute inset-0 flex items-center justify-center bg-signal/30 backdrop-blur-[1px]">
            <h2 className="px-6 text-center font-display text-4xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              NOT JUST ONLINE.
              <br />
              THIS IS A MOVEMENT.
            </h2>
          </div>
        </div>

        {/* Sub-copy below the card */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-[#0d2b25] sm:text-3xl md:text-4xl">
            Careers don&rsquo;t look like they used to. Neither should your
            profile.
          </h3>
          <p className="mt-5 text-base text-[#0d2b25]/60 sm:text-lg">
            The other platforms haven&rsquo;t caught up.{" "}
            <strong className="font-semibold text-[#0d2b25]">Hoo</strong> is
            built for that shift.
          </p>
        </div>
      </div>
    </section>
  );
}
