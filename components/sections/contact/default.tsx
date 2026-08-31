"use client";

import { FormEvent, useState } from "react";

/** Borderless input sitting in a ruled table row. */
const FIELD =
  "w-full bg-transparent py-4 text-sm text-fg outline-none placeholder:text-fg-4 focus:placeholder:text-fg-4";

const ROW =
  "grid grid-cols-1 border-b border-hairline md:grid-cols-12 md:items-start md:gap-x-10";

const LABEL =
  "pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-4 md:col-span-3 md:pt-4";

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
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="rail border-hairline py-12 lg:col-span-4 lg:border-r lg:py-16">
          <p className="eyebrow mb-5">Get in touch</p>
          <h2 className="display-lg text-fg mb-6 max-w-sm">
            Your club&apos;s analysis starts here
          </h2>
          <p className="text-fg-3 max-w-sm text-sm leading-relaxed lg:text-base">
            Tell us about your club and we&apos;ll deliver a tailored report
            within 48 hours.
          </p>
        </div>

        <div className="rail border-hairline border-t py-12 lg:col-span-8 lg:border-t-0 lg:py-16">
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
            <form onSubmit={handleSubmit} className="max-w-3xl">
              <div className="border-hairline border-t">
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
                    Club Name <span className="text-fg-4">— optional</span>
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
                    Role / Title <span className="text-fg-4">— optional</span>
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
                    Message <span className="text-fg-4">— optional</span>
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
