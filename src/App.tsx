import { useState } from 'react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

interface FormData {
  name: string
  club: string
  role: string
  email: string
  note: string
}

export default function App() {
  const [form, setForm] = useState<FormData>({ name: '', club: '', role: '', email: '', note: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
  }

  return (
    <>
      <div className="page">
        <nav className="nav">
          <div className="logo">BLUNDELL<span className="dot">.</span>ANALYTICS</div>
        </nav>

        <main className="main">
          <div className="copy">
            <p className="eyebrow">Transfer Intelligence</p>
            <h1 className="headline">
              Transfer decisions are capital allocation decisions.
            </h1>
            <p className="sub">
              Quantitative analysis for clubs that recruit with rigour.
              Request a demo and we'll show you what the platform produces for your position.
            </p>
            <a href="mailto:hello@blundellanalytics.com" className="email-link">
              hello@blundellanalytics.com
            </a>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="success">
                <div className="success-mark">✓</div>
                <h3>Request received.</h3>
                <p>We'll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="club">Club / Organisation</label>
                    <input id="club" name="club" type="text" required placeholder="Club or organisation" value={form.club} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="role">Role</label>
                    <input id="role" name="role" type="text" required placeholder="e.g. Head of Recruitment" value={form.role} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required placeholder="you@club.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="note">Note <span className="optional">(optional)</span></label>
                  <textarea id="note" name="note" rows={2} placeholder="Position, league, or any context..." value={form.note} onChange={handleChange} />
                </div>
                <button type="submit" className="submit" disabled={loading}>
                  {loading ? 'Submitting…' : 'Request a Demo'}
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
