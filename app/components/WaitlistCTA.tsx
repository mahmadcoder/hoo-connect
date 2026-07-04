"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function WaitlistCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // Listen for waitlist updates from the Hero username card
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setFullName(customEvent.detail.fullName || "");
        setEmail(customEvent.detail.email || "");
        setSubmitted(true);
      }
    };
    window.addEventListener("loopWaitlistJoined", handleSync);
    return () => window.removeEventListener("loopWaitlistJoined", handleSync);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fullName.trim() && email.trim()) {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        // 1. Generate a clean unique handle from email prefix
        const cleanEmail = email.trim().toLowerCase();
        let baseHandle = cleanEmail.split("@")[0].replace(/[^a-z0-9_-]/g, "");
        if (!baseHandle || baseHandle.length < 2) {
          baseHandle = "member";
        }
        
        let handleToSave = baseHandle;
        let isUnique = false;
        let attempts = 0;
        
        while (!isUnique && attempts < 5) {
          const { data, error } = await supabase
            .from("waitlist")
            .select("handle")
            .eq("handle", handleToSave)
            .maybeSingle();
            
          if (error) {
            console.error("Error checking unique handle:", error);
            break;
          }
          if (!data) {
            isUnique = true;
          } else {
            attempts++;
            handleToSave = `${baseHandle}_${Math.random().toString(36).substring(2, 6)}`;
          }
        }

        // 2. Insert user into Supabase
        const { error } = await supabase
          .from("waitlist")
          .insert([
            {
              handle: handleToSave,
              full_name: fullName.trim(),
              email: cleanEmail,
            },
          ]);

        if (error) {
          console.error("Database insert error:", error);
          if (error.code === "23505") { // Unique key constraint violation code
            setSubmitError("This email address is already on the waitlist.");
          } else {
            setSubmitError("There was an error saving your reservation. Please try again.");
          }
        } else {
          setSubmitted(true);
          // Dispatch custom event to sync with other components
          const event = new CustomEvent("loopWaitlistJoined", {
            detail: { handle: handleToSave, fullName, email: cleanEmail }
          });
          window.dispatchEvent(event);

          // Trigger server-side welcome and admin alert emails
          try {
            await fetch("/api/send-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: cleanEmail,
                fullName: fullName.trim(),
                handle: handleToSave,
              }),
            });
          } catch (emailErr) {
            console.error("Failed to send confirmation email:", emailErr);
          }
        }
      } catch (err) {
        console.error(err);
        setSubmitError("A connection error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <section id="waitlist-cta" className="py-20 md:py-32 bg-[#0A0A0F]">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Dark Container */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#12121A] shadow-2xl p-8 sm:p-12 md:p-16 text-center relative">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-signal/5 blur-[80px]" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-signal">
              get early access
            </span>
            
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-paper sm:text-5xl leading-none">
              Claim your loop. <br />
              <span className="italic font-normal font-serif text-signal">Join the waitlist.</span>
            </h2>
            
            <p className="text-sm leading-relaxed text-paper/60 sm:text-base max-w-md mx-auto">
              Limited spots available for creators, founders, and developers shaping the next generation of professional culture.
            </p>

            <div className="pt-4 max-w-md mx-auto">
              {submitted ? (
                <div className="rounded-2xl border border-signal/20 bg-signal/5 p-8 text-center animate-fade-in space-y-2">
                  <p className="font-display text-lg font-bold text-paper">
                    You&rsquo;re on the list! 🎉
                  </p>
                  <p className="text-sm text-paper/60">
                    We have reserved your spot. We&rsquo;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3.5"
                >
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/20 transition duration-300"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/20 transition duration-300"
                  />
                  
                  {submitError && (
                    <p className="text-xs text-rose-400 font-medium px-1 text-left">
                      {submitError}
                    </p>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 w-full cursor-pointer rounded-xl bg-signal py-4 text-xs font-bold uppercase tracking-wider text-ink transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] disabled:opacity-50"
                  >
                    {isSubmitting ? "Joining..." : "Join The Waitlist"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
