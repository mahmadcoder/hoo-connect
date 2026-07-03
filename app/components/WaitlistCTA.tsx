"use client";

import { useState } from "react";

export default function WaitlistCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="waitlist-cta" className="py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tight text-[#0d2b25] sm:text-6xl md:text-7xl">
          CLAIM YOUR HOO.
          <br />
          JOIN THE WAITLIST.
        </h2>
        <p className="mt-6 text-base italic text-[#0d2b25]/60 sm:text-lg">
          Early access for ambitious people shaping culture in real time.
        </p>

        {submitted ? (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#0d2b25]/20 bg-[#0d2b25]/5 px-8 py-6 text-center">
            <p className="font-display text-lg font-bold text-[#0d2b25]">
              You&rsquo;re on the list! 🎉
            </p>
            <p className="mt-1 text-sm text-[#0d2b25]/60">
              We&rsquo;ll be in touch — hoo knows when.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3"
          >
            <input
              type="text"
              required
              placeholder="Full name"
              className="w-full rounded-2xl border border-[#0d2b25]/20 bg-white px-6 py-4 text-sm text-[#0d2b25] placeholder:text-[#0d2b25]/40 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full rounded-2xl border border-[#0d2b25]/20 bg-white px-6 py-4 text-sm text-[#0d2b25] placeholder:text-[#0d2b25]/40 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
            />
            <button
              type="submit"
              className="mt-1 cursor-pointer rounded-2xl bg-signal py-4 text-sm font-semibold text-ink transition hover:bg-[#0d2b25] hover:text-paper"
            >
              Join The Waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
