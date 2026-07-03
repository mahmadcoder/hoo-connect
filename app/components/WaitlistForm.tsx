"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        id="waitlist-success"
        className="flex w-full max-w-md flex-col items-start gap-1 rounded-2xl border border-signal/30 bg-signal/10 px-6 py-4 text-left"
      >
        <p className="font-display text-base font-medium text-paper">
          You&rsquo;re on the list. 🎉
        </p>
        <p className="text-sm text-paper/60">
          We&rsquo;ll be in touch &mdash; hoo knows when.
        </p>
      </div>
    );
  }

  return (
    <form
      id="waitlist-form"
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <input
        type="email"
        required
        placeholder="you@email.com"
        className="w-full rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm text-paper placeholder:text-paper/40 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/25"
      />
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-signal py-3 text-sm font-semibold text-ink transition hover:bg-paper sm:w-auto sm:px-8"
      >
        Join the Waitlist
      </button>
    </form>
  );
}
