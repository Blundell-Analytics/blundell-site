"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    clubEmail: "",
    clubName: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Report Request from " + form.clubName || "a Club");
    const body = encodeURIComponent(
      `Hi Blundell Analytics,\n\nI would like to request a customised report.\n\n` +
      `Name: ${form.firstName} ${form.lastName}\n` +
      `Club: ${form.clubName || "N/A"}\n` +
      `Email: ${form.clubEmail}\n` +
      (form.message ? `\nMessage:\n${form.message}` : "")
    );
    window.location.href = `mailto:info@blundellanalytics.ca?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "48px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    padding: "0 20px",
    fontSize: "14px",
    color: "white",
    outline: "none",
    fontFamily: "var(--font-jakarta)",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontFamily: "var(--font-jakarta)",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <section
      id="contact"
      style={{
        background: "black",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 24px",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Top separator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(0, 74, 173, 0.4) 30%, rgba(0, 74, 173, 0.4) 70%, transparent)",
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "36rem",
          marginBottom: "48px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#004aad",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-jakarta)",
            marginBottom: "12px",
          }}
        >
          Get in touch
        </p>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 600,
            color: "white",
            lineHeight: 1.15,
            fontFamily: "var(--font-jakarta)",
          }}
        >
          Request a customised report
        </h2>
        <p
          style={{
            marginTop: "12px",
            fontSize: "14px",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.7,
            fontFamily: "var(--font-jakarta)",
          }}
        >
          Fill in your details and we'll get back to you within 48 hours with a
          personalised analysis for your club.
        </p>
      </div>

      {/* Form card */}
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          padding: "40px",
        }}
      >
        {submitted ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              padding: "32px 0",
              textAlign: "center",
            }}
          >
            <CheckCircle2 size={40} color="#004aad" />
            <p
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "white",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              Thanks — we'll be in touch within 48 hours!
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              Check that your mail client sent the email to{" "}
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                info@blundellanalytics.ca
              </span>
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* First + Last name row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label htmlFor="firstName" style={labelStyle}>
                  First Name <span style={{ color: "#004aad" }}>*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,74,173,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <div>
                <label htmlFor="lastName" style={labelStyle}>
                  Last Name <span style={{ color: "#004aad" }}>*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,74,173,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </div>

            {/* Club email */}
            <div>
              <label htmlFor="clubEmail" style={labelStyle}>
                Club Email Address <span style={{ color: "#004aad" }}>*</span>
              </label>
              <input
                id="clubEmail"
                name="clubEmail"
                type="email"
                required
                placeholder="jane@yourclub.com"
                value={form.clubEmail}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(0,74,173,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Club name (optional) */}
            <div>
              <label htmlFor="clubName" style={labelStyle}>
                Club Name{" "}
                <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>
                  — optional
                </span>
              </label>
              <input
                id="clubName"
                name="clubName"
                type="text"
                placeholder="FC Example"
                value={form.clubName}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(0,74,173,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Message (optional) */}
            <div>
              <label htmlFor="message" style={labelStyle}>
                Message{" "}
                <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>
                  — optional
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your club, what positions you're looking to fill, or any specific analysis you need…"
                value={form.message}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  height: "auto",
                  padding: "14px 20px",
                  resize: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(0,74,173,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                alignSelf: "flex-end",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                height: "48px",
                padding: "0 28px",
                borderRadius: "12px",
                background: "white",
                color: "black",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "var(--font-jakarta)",
                cursor: "pointer",
                border: "none",
                transition: "background 0.2s, transform 0.1s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.88)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background = "white")
              }
            >
              Send Request
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>

      <p
        style={{
          marginTop: "24px",
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
          fontFamily: "var(--font-jakarta)",
        }}
      >
        No commitment. Responses within 48 hours.
      </p>
    </section>
  );
}
