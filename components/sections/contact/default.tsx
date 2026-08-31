"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";

const FIELD_CLASS =
  "w-full border border-white/12 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/40";

const LABEL_CLASS =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400";

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
    <section id="contact" className="bg-ink relative z-10 py-16 lg:py-24">
      <div className="shell px-0 lg:px-8">
        <div className="grid grid-cols-1 bg-[#111112] lg:grid-cols-8">
          {/* Brief */}
          <div className="flex items-center px-6 py-14 lg:col-span-3 lg:px-14 lg:py-20">
            <div className="max-w-md">
              <p className="eyebrow mb-6">Get in Touch</p>
              <h2 className="display-lg mb-6 text-white">
                Your club&apos;s analysis starts here.
              </h2>
              <p className="text-base leading-relaxed text-neutral-400">
                Tell us the position, the budget and the constraint you are
                actually solving for. We reply within 48 hours with scope,
                timeline and price — before any commitment.
              </p>

              <div className="mt-10 space-y-2.5 border-t border-white/20 pt-8">
                <div className="cell">
                  <div className="cell-label">Response time</div>
                  <div className="cell-value">Within 48 hours</div>
                </div>
                <div className="cell">
                  <div className="cell-label">Direct</div>
                  <div className="cell-value">info@blundellanalytics.ca</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border-t border-white/10 px-6 py-14 lg:col-span-5 lg:border-t-0 lg:border-l lg:px-14 lg:py-20">
            {submitted ? (
              <div className="flex h-full flex-col justify-center gap-4 py-10">
                <span className="border-mark text-mark flex size-10 items-center justify-center border">
                  <Check className="size-5" />
                </span>
                <p className="display-md text-white">Your request is in.</p>
                <p className="max-w-md text-sm leading-relaxed text-neutral-400">
                  We&apos;ll have your report underway within 48 hours. A
                  confirmation has been sent to{" "}
                  <span className="font-mono text-white">{form.clubEmail}</span>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={LABEL_CLASS}>
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
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={LABEL_CLASS}>
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
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="clubEmail" className={LABEL_CLASS}>
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
                    className={FIELD_CLASS}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="clubName" className={LABEL_CLASS}>
                      Club Name — Optional
                    </label>
                    <input
                      id="clubName"
                      name="clubName"
                      type="text"
                      placeholder="FC Example"
                      value={form.clubName}
                      onChange={handleChange}
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className={LABEL_CLASS}>
                      Role / Title — Optional
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      placeholder="Head of Recruitment"
                      value={form.role}
                      onChange={handleChange}
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={LABEL_CLASS}>
                    Message — Optional
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Positions you're looking to fill, budget envelope, or any specific analysis you need…"
                    value={form.message}
                    onChange={handleChange}
                    className={`${FIELD_CLASS} resize-none`}
                  />
                </div>

                {error && (
                  <p className="font-mono text-xs text-red-400">{error}</p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="font-mono text-[10px] tracking-[0.12em] text-neutral-500 uppercase">
                    No commitment
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-mono btn-primary disabled:cursor-wait disabled:opacity-70"
                  >
                    {loading ? "Sending…" : "Request a Report"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
