import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// ─── Soccer ball cursor (SVG outline) ────────────────────────────────────────

function useSoccerBallCursor() {
  useEffect(() => {
    // Clean white SVG soccer ball — outline style
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#333" stroke-width="4"/>
      <polygon points="50,18 61,26 57,39 43,39 39,26" fill="#222" stroke="white" stroke-width="2"/>
      <polygon points="80,35 88,47 80,57 68,53 68,40" fill="#222" stroke="white" stroke-width="2"/>
      <polygon points="73,72 61,78 50,70 53,57 68,53" fill="#222" stroke="white" stroke-width="2"/>
      <polygon points="27,72 32,57 47,57 50,70 39,78" fill="#222" stroke="white" stroke-width="2"/>
      <polygon points="20,35 32,40 32,53 20,57 12,47" fill="#222" stroke="white" stroke-width="2"/>
    </svg>`
    const encoded = `data:image/svg+xml;base64,${btoa(svg)}`
    document.body.style.cursor = `url(${encoded}) 14 14, auto`
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
            ctx.strokeStyle = `rgba(200,16,46,${(1 - dist / 130) * 0.07})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Dots
      pts.forEach(p => {
        ctx.fillStyle = `rgba(232,234,240,${0.04 + p.z * 0.11})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 0.5 + p.z * 1.6, 0, Math.PI * 2)
        ctx.fill()
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
        {loading ? 'Submitting…' : 'Request a Report'}
      </button>
    </form>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  useSoccerBallCursor()

  return (
    <>
      <BackgroundCanvas />

      {/* CSS 3D pitch */}
      <div className="pitch-3d" aria-hidden="true">
        <div className="pitch-inner">
          <div className="pitch-halfway" />
          <div className="pitch-circle" />
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
            <p className="eyebrow">Transfer Market Intelligence</p>
            <h1 className="headline">
              Smarter transfers.<br />Backed by data.
            </h1>
            <p className="sub">
              We help your club make <strong>smarter and more tactical transfer decisions</strong>,
              backed by <strong>robust mathematical and statistical models</strong> and extensive data.
            </p>
            <p className="sub sub--cta">
              Reach out for a <strong>customised report</strong> for your club — including{' '}
              <strong>potential transfer shortlists</strong>, <strong>risk assessment</strong>,{' '}
              <strong>tactical assessments</strong>, <strong>financial information</strong> and more.
            </p>
            <a href="mailto:info@blundellanalytics.ca" className="email-link">
              info@blundellanalytics.ca
            </a>
          </div>

          <div className="form-card">
            <ContactForm />
          </div>
        </main>
      </div>

      <Analytics />
      <SpeedInsights />
    </>
  )
}
