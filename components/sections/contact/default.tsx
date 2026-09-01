"use client";

import { FormEvent, useState } from "react";

/** Borderless input sitting in a ruled table row. */
const FIELD =
  "w-full border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-4 focus:border-[var(--hairline-strong)]";

const LABEL =
  "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-fg-4";

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
      <div className="rail rule-t grid grid-cols-1 gap-10 py-11 lg:grid-cols-12 lg:gap-14 lg:py-14">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="display-lg text-fg max-w-md">
            Your club&apos;s analysis starts here
          </h2>
          <p className="text-fg-3 mt-4 max-w-md text-base leading-relaxed">
            Tell us about your club and we&apos;ll deliver a tailored report
            within 48 hours.
          </p>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="max-w-xl space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="bg-mark size-1.5" />
                <span className="text-fg-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                  Received
                </span>
              </div>
              <p className="display-md text-fg">
                Your request is in — we&apos;ll have your report underway within
                48 hours.
              </p>
              <p className="text-fg-3 text-sm">
                A confirmation has been sent to{" "}
                <span className="text-fg font-mono">{form.clubEmail}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={LABEL}>
                    First Name <span className="text-mark">*</span>
                  </label>
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

                <div>
                  <label htmlFor="lastName" className={LABEL}>
                    Last Name <span className="text-mark">*</span>
                  </label>
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

                <div className="sm:col-span-2">
                  <label htmlFor="clubEmail" className={LABEL}>
                    Club Email Address <span className="text-mark">*</span>
                  </label>
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

                <div>
                  <label htmlFor="clubName" className={LABEL}>
                    Club Name <span className="text-fg-4">— optional</span>
                  </label>
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

                <div>
                  <label htmlFor="role" className={LABEL}>
                    Role / Title <span className="text-fg-4">— optional</span>
                  </label>
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

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={LABEL}>
                    Message <span className="text-fg-4">— optional</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your club, what positions you're looking to fill, or any specific analysis you need…"
                    value={form.message}
                    onChange={handleChange}
                    className={`${FIELD} resize-none`}
                  />
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
                <span className="text-fg-4 font-mono text-[10px] tracking-[0.14em] uppercase">
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
