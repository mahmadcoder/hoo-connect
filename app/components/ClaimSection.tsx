import Image from "next/image";
import Link from "next/link";

export default function ClaimSection() {
  return (
    <section className="bg-[#f0ede6] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Teal split card */}
        <div className="overflow-hidden rounded-3xl bg-[#0d2b25]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — photo using the avatar image (real site has a group photo here) */}
            <div className="relative min-h-[300px] md:min-h-[460px]">
              <Image
                src="https://framerusercontent.com/images/PWzapM9fTP8NbBzliHldujOa4Xk.png"
                alt="HOO community"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right — CHECK MY HOO */}
            <div className="flex flex-col items-center justify-center gap-6 p-10 text-center md:p-16">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-signal/70">
                  check my
                </p>
                <h2 className="mt-2 font-display text-5xl font-black uppercase leading-none tracking-tight text-signal sm:text-6xl md:text-5xl xl:text-6xl">
                  HOO
                </h2>
              </div>

              <p className="max-w-xs text-sm text-paper/60 sm:text-base">
                One profile. One link. Everything you are. Claim your unique
                URL.
              </p>

              {/* URL pill */}
              <div className="w-full max-w-xs rounded-full border border-white/10 bg-white/5 px-6 py-3 text-center font-display text-base font-semibold text-paper">
                hoo.me/yourname
              </div>

              <Link
                href="#waitlist"
                className="rounded-full bg-signal px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-paper"
              >
                Join The Waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
