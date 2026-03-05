import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// ─── Soccer ball cursor (SVG outline) ────────────────────────────────────────

function useSoccerBallCursor() {
  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="white" d="M454.96,417.077c0.538-0.664,1.076-1.327,1.607-1.995c0.648-0.816,1.289-1.638,1.928-2.462c0.36-0.465,0.717-0.933,1.074-1.401C492.453,368.156,512,314.364,512,256C512,114.618,397.382,0,256,0S0,114.618,0,256c0,58.512,19.646,112.428,52.681,155.544c0.214,0.28,0.428,0.561,0.644,0.84c0.742,0.96,1.489,1.917,2.244,2.867c0.315,0.396,0.634,0.787,0.951,1.181c45.688,56.736,115.07,93.586,193.125,95.488c2.117,0.053,4.235,0.08,6.354,0.08s4.238-0.027,6.354-0.08C340.114,510.025,409.266,473.447,454.96,417.077z M268.597,468.953c-1.066,0.064-2.133,0.115-3.2,0.163c-0.779,0.034-1.558,0.063-2.339,0.089c-0.732,0.025-1.465,0.05-2.197,0.067c-1.616,0.036-3.235,0.062-4.86,0.062s-3.244-0.025-4.86-0.062c-0.733-0.017-1.465-0.043-2.197-0.067c-0.781-0.025-1.561-0.055-2.339-0.089c-1.067-0.048-2.134-0.099-3.2-0.163c-0.181-0.01-0.361-0.023-0.541-0.034c-6.992-0.437-13.97-1.219-20.925-2.343L176,405.333l48-63.999h64l48,63.999l-45.937,61.243c-6.955,1.124-13.932,1.905-20.925,2.343C268.958,468.93,268.778,468.943,268.597,468.953z M260.899,42.729c1.184,0.027,2.365,0.072,3.547,0.119c0.445,0.017,0.891,0.031,1.336,0.051c1.401,0.065,2.8,0.143,4.197,0.236c0.139,0.009,0.278,0.017,0.417,0.026c20.451,1.391,40.445,5.74,59.629,12.867l5.979,7.975L288.005,128h-64.006l-47.998-63.997l5.981-7.977c19.167-7.125,39.174-11.475,59.636-12.866c0.126-0.008,0.252-0.016,0.378-0.024c1.409-0.093,2.819-0.172,4.232-0.238c0.432-0.02,0.865-0.032,1.298-0.049c1.193-0.048,2.387-0.093,3.584-0.121c0.64-0.014,1.282-0.016,1.923-0.024c0.99-0.014,1.979-0.033,2.97-0.033c0.972,0,1.942,0.019,2.913,0.033C259.576,42.713,260.239,42.714,260.899,42.729z M224,298.667l-47.997-63.996l48-64h63.994l48,64L288,298.667H224z M437.337,213.335h-64.002l-47.998-63.998l47.997-63.996h10.42c34.098,25.567,59.876,60.762,73.787,101.051L437.337,213.335z M186.663,149.338l-47.997,63.996H74.661l-20.202-26.94c13.911-40.289,39.689-75.484,73.787-101.051h10.42L186.663,149.338z M74.66,256.009h64.013L186.667,320l-48,64H85.336c-19.748-26.337-33.155-57.122-39.051-90.158L74.66,256.009z M373.335,384.002l-48-64l47.995-63.994h64.01l28.377,37.836c-5.896,33.036-19.303,63.821-39.051,90.158H373.335z M138.667,426.667l10.529,14.037c-7.358-4.264-14.438-8.953-21.206-14.037H138.667z M373.331,426.669h10.676c-6.767,5.083-13.846,9.771-21.203,14.035L373.331,426.669z"/></svg>`
    const encoded = `data:image/svg+xml;base64,${btoa(svg)}`
    document.body.style.cursor = `url(${encoded}) 16 16, auto`
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
              Every transfer decision<br />has a cost. Make it<br />a calculated one.
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
