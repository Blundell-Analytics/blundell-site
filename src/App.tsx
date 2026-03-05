import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// ─── Soccer ball cursor (SVG outline) ────────────────────────────────────────

function useSoccerBallCursor() {
  useEffect(() => {
    const R = '#C8102E'
    const W = 'white'
    const s = (c: string, w = 1.5) => `fill:none;stroke:${c};stroke-linecap:round;stroke-linejoin:round;stroke-width:${w}`
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><polyline points="9.67 3.31 12 5 14.33 3.31" style="${s(R)}"/><polyline points="3.02 11.53 5.34 9.84 4.46 7.1" style="${s(R)}"/><polyline points="18 18 16.08 17.96 15.35 20.34" style="${s(R)}"/><polyline points="6 18 7.92 17.96 8.65 20.34" style="${s(R)}"/><polyline points="19.55 7.1 18.66 9.84 20.98 11.53" style="${s(R)}"/><path d="M12,8V5M8.41,10.65,5.34,9.84M9.84,15,7.89,18m6.27-3,1.95,3m-.61-7.33,3.16-.83M12,8,8.5,10.67,9.84,15h4.32l1.34-4.33Z" style="${s(R)}"/><circle cx="12" cy="12" r="9" style="${s(W, 1.5)}"/></svg>`
    const encoded = `data:image/svg+xml;base64,${btoa(svg)}`
    document.body.style.cursor = `url(${encoded}) 12 12, auto`
    return () => { document.body.style.cursor = '' }
  }, [])
}

// ─── Background canvas (particle network) ───────────────────────────────────

function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = 55
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
    }))

    let raf: number
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Connecting lines
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.strokeStyle = `rgba(200,16,46,${(1 - dist / 130) * 0.14})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Dots — move particles (no rendering)
      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      raf = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="bg-canvas" />
}

// ─── Form ────────────────────────────────────────────────────────────────────

interface FormData { name: string; club: string; role: string; email: string; note: string }

function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', club: '', role: '', email: '', note: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
  }

  if (submitted) return (
    <div className="success">
      <div className="success-mark">✓</div>
      <h3>Request received.</h3>
      <p>We'll be in touch within one business day.</p>
    </div>
  )

  return (
    <form onSubmit={submit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={change} />
        </div>
        <div className="field">
          <label htmlFor="club">Club / Organisation</label>
          <input id="club" name="club" type="text" required placeholder="Club or organisation" value={form.club} onChange={change} />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="role">Role</label>
          <input id="role" name="role" type="text" required placeholder="e.g. Head of Recruitment" value={form.role} onChange={change} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@club.com" value={form.email} onChange={change} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="note">Note <span className="optional">(optional)</span></label>
        <textarea id="note" name="note" rows={2} placeholder="Position, league, or any context..." value={form.note} onChange={change} />
      </div>
      <button type="submit" className="submit" disabled={loading}>
        {loading ? 'Submitting…' : 'Request a Report →'}
      </button>
      <p className="form-trust">Confidential · No commitment · Response within 24h</p>
      <p className="form-email-cta">
        or <a href="mailto:info@blundellanalytics.ca">email us directly</a>
      </p>
    </form>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  useSoccerBallCursor()

  return (
    <>
      <BackgroundCanvas />

      {/* CSS 3D pitch — full-page background */}
      <div className="pitch-3d" aria-hidden="true">
        <div className="pitch-inner">
          <div className="pitch-halfway" />
          <div className="pitch-box pitch-box--top" />
          <div className="pitch-box pitch-box--bottom" />
        </div>
      </div>

      <div className="page">
        <nav className="nav">
          <div className="logo">BLUNDELL ANALYTICS</div>
        </nav>

        <main className="main">
          <div className="copy">
            <p className="eyebrow animate-fade-up" style={{ animationDelay: '0.05s' }}>Transfer Market Intelligence</p>
            <h1 className="headline animate-fade-up" style={{ animationDelay: '0.15s' }}>
              Every transfer decision<br />has a cost. Make it<br />a calculated one.
            </h1>
            <p className="sub animate-fade-up" style={{ animationDelay: '0.28s' }}>
              We help your club make smarter and more tactical{' '}
              <span className="kw">transfer decisions</span>, backed by robust{' '}
              <span className="kw">mathematical and statistical models</span> and extensive data.
            </p>
            <p className="sub animate-fade-up" style={{ animationDelay: '0.38s' }}>
              Reach out for a <strong>customised report</strong> for your club — including{' '}
              potential <span className="kw">transfer</span> shortlists,{' '}
              <strong>risk assessments</strong>, <strong>tactical analysis</strong>,{' '}
              <strong>financial information</strong> and more.
            </p>
          </div>

          <div className="form-card animate-fade-left" style={{ animationDelay: '0.2s' }}>
            <div className="form-card-header">
              <h2 className="form-title">Request a Report</h2>
            </div>
            <ContactForm />
          </div>
        </main>
      </div>

      <Analytics />
      <SpeedInsights />
    </>
  )
}
