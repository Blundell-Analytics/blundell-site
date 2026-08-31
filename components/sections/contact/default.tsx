"use client";

import { FormEvent, useState } from "react";

/** Borderless input sitting in a ruled table row. */
const FIELD =
  "w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:placeholder:text-neutral-500";

const ROW =
  "grid grid-cols-1 border-b border-white/10 md:grid-cols-12 md:items-start";

const LABEL =
  "pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500 md:col-span-3 md:pt-4";

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    clubEmail: "",
    clubName: "",
    role: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-ink relative z-10">
      <div className="rail rule-t rule-b py-6">
        <div className="flex items-center gap-2.5">
          <span className="bg-mark size-1.5" />
          <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase">
            02 — Get in Touch
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="rail border-white/10 py-12 lg:col-span-4 lg:border-r lg:py-20">
          <h2 className="display-lg mb-6 max-w-sm text-white">
            Your club&apos;s analysis starts here
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400 lg:text-base">
            Tell us about your club and we&apos;ll deliver a tailored report
            within 48 hours.
          </p>
        </div>

        <div className="rail border-t border-white/10 py-12 lg:col-span-8 lg:border-t-0 lg:py-20">
          {submitted ? (
            <div className="max-w-xl space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="bg-mark size-1.5" />
                <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-400 uppercase">
                  Received
                </span>
              </div>
              <p className="display-md text-white">
                Your request is in — we&apos;ll have your report underway within
                48 hours.
              </p>
              <p className="text-sm text-neutral-400">
                A confirmation has been sent to{" "}
                <span className="font-mono text-white">{form.clubEmail}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl">
              <div className="border-t border-white/10">
                <div className={ROW}>
                  <label htmlFor="firstName" className={LABEL}>
                    First Name <span className="text-mark">*</span>
                  </label>
                  <div className="md:col-span-9">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={handleChange}
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className={ROW}>
                  <label htmlFor="lastName" className={LABEL}>
                    Last Name <span className="text-mark">*</span>
                  </label>
                  <div className="md:col-span-9">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={handleChange}
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className={ROW}>
                  <label htmlFor="clubEmail" className={LABEL}>
                    Club Email Address <span className="text-mark">*</span>
                  </label>
                  <div className="md:col-span-9">
                    <input
                      id="clubEmail"
                      name="clubEmail"
                      type="email"
                      required
                      placeholder="jane@yourclub.com"
                      value={form.clubEmail}
                      onChange={handleChange}
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className={ROW}>
                  <label htmlFor="clubName" className={LABEL}>
                    Club Name{" "}
                    <span className="text-neutral-600">— optional</span>
                  </label>
                  <div className="md:col-span-9">
                    <input
                      id="clubName"
                      name="clubName"
                      type="text"
                      placeholder="FC Example"
                      value={form.clubName}
                      onChange={handleChange}
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className={ROW}>
                  <label htmlFor="role" className={LABEL}>
                    Role / Title{" "}
                    <span className="text-neutral-600">— optional</span>
                  </label>
                  <div className="md:col-span-9">
                    <input
                      id="role"
                      name="role"
                      type="text"
                      placeholder="Head of Recruitment"
                      value={form.role}
                      onChange={handleChange}
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className={ROW}>
                  <label htmlFor="message" className={LABEL}>
                    Message <span className="text-neutral-600">— optional</span>
                  </label>
                  <div className="md:col-span-9">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your club, what positions you're looking to fill, or any specific analysis you need…"
                      value={form.message}
                      onChange={handleChange}
                      className={`${FIELD} resize-none`}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-5 font-mono text-xs text-red-400">{error}</p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-mono btn-primary disabled:cursor-wait disabled:opacity-70"
                >
                  {loading ? "Sending…" : "Request a Report"}
                </button>
                <span className="font-mono text-[10px] tracking-[0.14em] text-neutral-600 uppercase">
                  No commitment. Responses within 48 hours.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
