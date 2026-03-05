import { useState } from 'react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// ─── Data ──────────────────────────────────────────────────────────────────

const OBJECTIVES = [
  {
    id: 'business',
    number: '01',
    name: 'Business Value',
    description:
      'Fee, wages, resale potential, and ROI modelled together. The deal has to work financially before anything else.',
    unique: false,
  },
  {
    id: 'tactical',
    number: '02',
    name: 'Tactical Fit',
    description:
      "Scored against the team's actual playing patterns — not generic positional archetypes or subjective style labels.",
    unique: false,
  },
  {
    id: 'injury',
    number: '03',
    name: 'Injury Risk',
    description:
      'Availability probability modelled across three future seasons. Price in the downtime before you sign, not after.',
    unique: false,
  },
  {
    id: 'managerial',
    number: '04',
    name: 'Managerial Fit',
    description:
      "How much of this player's value is tied to the current manager staying? Average managerial tenure is under two years. No other system scores this.",
    unique: true,
  },
  {
    id: 'feasibility',
    number: '05',
    name: 'Deal Feasibility',
    description:
      "Likelihood the transfer actually completes — so analysts focus only on deals that can happen, not deals that won't.",
    unique: false,
  },
]

const STATS = [
  { value: '266', label: 'Input fields per player' },
  { value: '7', label: 'Independent data sources' },
  { value: '6', label: 'Leagues covered' },
  { value: '3', label: 'Seasons of data per player' },
  { value: '123', label: 'Output fields in analyst report' },
  { value: '5', label: 'Objectives, optimised simultaneously' },
]

const STEPS = [
  {
    number: '01',
    title: 'Automated ingestion',
    description:
      'We collect 266 fields per player from 7 independent sources — WhoScored, Transfermarkt, Understat, SofaScore, Capology, Spotrac, and VAR data. 93.2% of the schema is populated automatically, every window.',
  },
  {
    number: '02',
    title: 'Multi-objective scoring',
    description:
      'A quantitative model scores every candidate across five dimensions simultaneously. The shortlist is Pareto-ranked — candidates who are not dominated on any single dimension — not a weighted average that buries trade-offs.',
  },
  {
    number: '03',
    title: 'Structured deliverable',
    description:
      'You receive a ranked shortlist, a 123-field per-player analyst report, and an interactive dashboard. Delivered before the window opens — not assembled reactively once it does.',
  },
]

const DELIVERABLES = [
  'Ranked shortlist by composite fit score (0–100)',
  '123-field per-player breakdown across all five dimensions',
  'Three-season performance projections with age curves',
  'Injury probability and market value trajectories',
  'Squad replacement analysis: who fills the role if a player departs',
  'Manager-fit sensitivity: how much value is tied to the current system',
  'Interactive dashboard for exploring the Pareto frontier',
]

const REPORT_BARS = [
  { label: 'Business', width: 78 },
  { label: 'Tactical', width: 92 },
  { label: 'Injury', width: 65 },
  { label: 'Managerial', width: 81 },
  { label: 'Feasibility', width: 73 },
]

// ─── Scroll helper ──────────────────────────────────────────────────────────

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        BLUNDELL<span className="nav-logo-accent">.</span>ANALYTICS
      </div>
      <button className="btn-primary btn-sm" onClick={scrollToContact}>
        Request a Demo
      </button>
    </nav>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-label">MOCFM Transfer Intelligence Platform</div>
        <h1 className="hero-headline">
          Every transfer decision<br />has five dimensions.
        </h1>
        <p className="hero-sub">
          Traditional scouting optimises one dimension at a time.<br />
          The MOCFM platform scores all five simultaneously — and shows the trade-offs explicitly.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToContact}>
            Request a Demo
          </button>
          <a href="#how-it-works" className="btn-ghost">
            See how it works ↓
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Objectives ─────────────────────────────────────────────────────────────

function Objectives() {
  return (
    <section className="section objectives">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-label">THE FIVE OBJECTIVES</div>
          <h2>Five objectives. One composite score. No cherry-picking.</h2>
          <p className="section-sub">
            Every candidate is scored across all five dimensions simultaneously. The composite fit
            score reflects all of them — none can be optimised in isolation.
          </p>
        </div>
        <div className="objectives-grid">
          {OBJECTIVES.map((obj) => (
            <div
              key={obj.id}
              className={`objective-card${obj.unique ? ' objective-card--unique' : ''}`}
            >
              <div className="objective-number">{obj.number}</div>
              <div className="objective-name">
                {obj.name}
                {obj.unique && <span className="unique-badge">UNIQUE</span>}
              </div>
              <p className="objective-description">{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Stats ──────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section className="section stats">
      <div className="section-inner">
        <div className="section-label center">SCALE &amp; COVERAGE</div>
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-label">HOW IT WORKS</div>
          <h2>From position request to ranked shortlist.</h2>
        </div>
        <div className="steps">
          {STEPS.map((step) => (
            <div key={step.number} className="step">
              <div className="step-number">{step.number}</div>
              <div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Deliverable ─────────────────────────────────────────────────────────────

function Deliverable() {
  return (
    <section className="section deliverable">
      <div className="section-inner deliverable-inner">
        <div className="deliverable-text">
          <div className="section-label">THE DELIVERABLE</div>
          <h2>One composite score.<br />Complete supporting analysis.</h2>
          <p className="section-sub">
            The shortlist is ready before the window opens. Every candidate is backed by a full
            analyst report — not a dashboard summary.
          </p>
          <ul className="deliverable-list">
            {DELIVERABLES.map((item, i) => (
              <li key={i} className="deliverable-item">
                <span className="deliverable-bullet" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="deliverable-visual">
          <div className="report-mockup">
            <div className="report-header">
              <div className="report-title-mock" />
              <div className="report-score-block">
                <span className="report-score-label">FIT SCORE</span>
                <span className="report-score-value">87</span>
              </div>
            </div>
            <div className="report-bars">
              {REPORT_BARS.map((bar) => (
                <div key={bar.label} className="report-bar-row">
                  <span className="report-bar-label">{bar.label}</span>
                  <div className="report-bar-track">
                    <div className="report-bar-fill" style={{ width: `${bar.width}%` }} />
                  </div>
                  <span className="report-bar-value">{bar.width}</span>
                </div>
              ))}
            </div>
            <div className="report-mock-rows">
              <div className="mock-row" />
              <div className="mock-row" />
              <div className="mock-row" />
              <div className="mock-row" />
            </div>
            <div className="report-blur-overlay">
              <span className="report-footer-note">Illustrative only — no real player data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────

interface FormData {
  name: string
  club: string
  role: string
  email: string
  note: string
}

function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '',
    club: '',
    role: '',
    email: '',
    note: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <section id="contact" className="section contact">
      <div className="section-inner contact-inner">
        <div className="contact-text">
          <div className="section-label">REQUEST A DEMO</div>
          <h2>See the platform<br />in action.</h2>
          <p className="section-sub">
            We'll walk through a live shortlist for a position of your choice — using your league,
            your formation, your criteria.
          </p>
          <p className="contact-direct">
            Prefer to reach out directly?<br />
            <a href="mailto:hello@blundellanalytics.com" className="contact-email">
              hello@blundellanalytics.com
            </a>
          </p>
        </div>

        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <h3>Request received.</h3>
              <p>We'll be in touch within one business day.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="club">Club / Organisation</label>
                  <input
                    id="club"
                    name="club"
                    type="text"
                    required
                    value={form.club}
                    onChange={handleChange}
                    placeholder="Club or organisation"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="role">Role</label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    required
                    value={form.role}
                    onChange={handleChange}
                    placeholder="e.g. Head of Recruitment"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@club.com"
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="note">
                  Note <span className="optional">(optional)</span>
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Position you're looking to fill, league, or any context..."
                />
              </div>
              <button type="submit" className="btn-primary btn-full" disabled={loading}>
                {loading ? 'Submitting…' : 'Request a Demo'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          BLUNDELL<span className="nav-logo-accent">.</span>ANALYTICS
        </div>
        <div className="footer-meta">
          <span>Quantitative transfer intelligence.</span>
          <a href="mailto:hello@blundellanalytics.com">hello@blundellanalytics.com</a>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Objectives />
        <Stats />
        <HowItWorks />
        <Deliverable />
        <Contact />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
