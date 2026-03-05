import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// ─── Soccer ball cursor ──────────────────────────────────────────────────────

function useSoccerBallCursor() {
  useEffect(() => {
    const SIZE = 30
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')!
    const cx = SIZE / 2
    const cy = SIZE / 2
    const r = SIZE / 2 - 1.5

    // White ball
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = '#f0f0f0'
    ctx.fill()
    ctx.strokeStyle = '#bbb'
    ctx.lineWidth = 0.8
    ctx.stroke()

    // Black pentagon patches (Telstar pattern)
    ctx.fillStyle = '#111'
    function pentagon(x: number, y: number, pr: number, startDeg: number) {
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const a = ((i * 72) + startDeg - 90) * (Math.PI / 180)
        i === 0 ? ctx.moveTo(x + pr * Math.cos(a), y + pr * Math.sin(a))
                : ctx.lineTo(x + pr * Math.cos(a), y + pr * Math.sin(a))
      }
      ctx.closePath()
      ctx.fill()
    }

    pentagon(cx, cy, r * 0.3, 0)
    const d = r * 0.57
    for (let i = 0; i < 5; i++) {
      const a = (i * 72 - 90) * (Math.PI / 180)
      pentagon(cx + d * Math.cos(a), cy + d * Math.sin(a), r * 0.27, i * 72)
    }

    const url = canvas.toDataURL()
    document.body.style.cursor = `url(${url}) ${SIZE / 2} ${SIZE / 2}, auto`
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
        {loading ? 'Submitting…' : 'Request a Demo'}
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
          <div className="logo">BLUNDELL<span className="dot">.</span>ANALYTICS</div>
        </nav>

        <main className="main">
          <div className="copy">
            <p className="eyebrow">Transfer Intelligence</p>
            <h1 className="headline">
              Transfer decisions<br />are capital decisions.
            </h1>
            <p className="sub">
              Quantitative recruitment intelligence,<br />delivered before the window opens.
            </p>
            <p className="sub sub--cta">
              Request a demo — we'll run the analysis<br />for a position of your choice.
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
