import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Gallery from './Gallery'

// ─────────────────────────────────────────────
//  🖼️ HOW TO ADD YOUR COUPLE PHOTOS
//  1. Copy your images into:  src/assets/images/
//     Recommended names: photo1.jpg, photo2.jpg, photo3.jpg … (up to 8)
//  2. Import them below and add to the `photos` array.
//  3. Replace the placeholder URLs with your imports.
// ─────────────────────────────────────────────

// Example imports (uncomment & rename when you add your photos):
import photo1 from '../assets/images/photo1.jpeg'
import photo2 from '../assets/images/photo2.jpeg'
import photo3 from '../assets/images/photo3.jpeg'
import photo4 from '../assets/images/photo4.jpeg'
import photo5 from '../assets/images/photo5.jpeg'
import photo6 from '../assets/images/photo6.jpeg'
import photo7 from '../assets/images/photo7.jpeg'
import photo8 from '../assets/images/photo8.jpeg'
import photo9 from '../assets/images/photo9.jpeg'

// Placeholder photos using a public API (replace with your own imports above)
const photos = [
  { src: photo1, alt: 'Our moment 💕' },
  { src: photo2, alt: 'Together 🌹' },
  { src: photo3, alt: 'Always smiling ❤️' },
  { src: photo4, alt: 'My favourite 💖' },
  { src: photo5, alt: 'Us 🥰' },
  { src: photo6, alt: 'Beautiful day ☀️' },
  { src: photo7, alt: 'Forever ♥' },
  { src: photo8, alt: 'Happy times 💗' },
  { src: photo9, alt: 'My world 🌸' },
]

// ── Animated typed text ──────────────────────
function TypedText({ text, delay = 0, duration = 60 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const start = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(start)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, duration)
    return () => clearInterval(interval)
  }, [started, text, duration])

  return <span>{displayed}<span style={{ opacity: started && displayed.length < text.length ? 1 : 0, animation: 'blink 1s step-end infinite' }}>|</span></span>
}

// ── Fade-in wrapper ──────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 1s ease, transform 1s ease',
      ...style
    }}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Gradient mesh background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 10%, rgba(123,30,58,0.55) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(74,16,48,0.6) 0%, transparent 60%),
          radial-gradient(ellipse 70% 60% at 50% 90%, rgba(194,24,91,0.25) 0%, transparent 60%),
          linear-gradient(160deg, #1a0810 0%, #0d0008 40%, #1a0410 100%)
        `,
      }} />

      {/* Decorative orbs */}
      <div style={{
        position: 'fixed', top: '-10vh', right: '-10vw',
        width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)',
        borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(194,24,91,0.12) 0%, transparent 70%)',
        animation: 'orbFloat 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-10vh', left: '-10vw',
        width: 'clamp(200px, 40vw, 500px)', height: 'clamp(200px, 40vw, 500px)',
        borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)',
        animation: 'orbFloat 11s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 1.5rem 4rem',
        gap: '1.8rem',
      }}>

        {/* Glowing heart icon — matches reference image */}
        <FadeIn delay={200}>
          <div style={{
            width: 'clamp(100px, 18vw, 160px)', height: 'clamp(100px, 18vw, 160px)',
            background: 'linear-gradient(145deg, #2a0c18, #1a0810)',
            borderRadius: '28%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px rgba(194,24,91,0.4), 0 0 120px rgba(194,24,91,0.15), inset 0 1px 1px rgba(255,255,255,0.08)',
            margin: '0 auto 0.5rem',
            animation: 'pulseGlow 2.5s ease-in-out infinite',
          }}>
            <div style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              filter: 'drop-shadow(0 0 15px rgba(194,24,91,0.8))',
            }}>❤️</div>
          </div>
        </FadeIn>

        {/* Main headline */}
        <FadeIn delay={700}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 7vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            background: 'linear-gradient(135deg, #f8e8ee 0%, #e8a0b4 40%, #d4a853 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            maxWidth: '800px',
          }}>
            <TypedText text="Every heartbeat is for you" delay={800} duration={55} />
          </h1>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={2400}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            width: 'min(400px, 80vw)',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.5))' }} />
            <span style={{ color: '#d4a853', fontSize: '1rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,168,83,0.5), transparent)' }} />
          </div>
        </FadeIn>

        {/* Sub-text */}
        <FadeIn delay={2700} style={{ maxWidth: '560px' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            color: '#e8a0b4',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}>
            From the moment I met you, I knew —<br />
            you were the missing piece of my soul.
          </p>
        </FadeIn>

        {/* CTA button */}
        <FadeIn delay={3600}>
          <button
            onClick={() => navigate('/letter')}
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              color: '#fff8f0',
              padding: '1rem 2.8rem',
              background: 'linear-gradient(135deg, #c2185b 0%, #7b1e3a 100%)',
              borderRadius: '60px',
              boxShadow: '0 0 40px rgba(194,24,91,0.5), 0 8px 32px rgba(0,0,0,0.5)',
              letterSpacing: '0.03em',
              transition: 'transform 0.25s, box-shadow 0.25s',
              marginTop: '0.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.06) translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 60px rgba(194,24,91,0.7), 0 12px 40px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(194,24,91,0.5), 0 8px 32px rgba(0,0,0,0.5)'
            }}
          >
            Open My Heart ❤️
          </button>
        </FadeIn>

        {/* Scroll hint */}
        <FadeIn delay={4200}>
          <p style={{
            color: 'rgba(232,160,180,0.5)',
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: '1rem',
            animation: 'bounce 2s ease-in-out infinite',
          }}>
            Scroll to see our memories ↓
          </p>
        </FadeIn>
      </section>

      {/* ── GALLERY ── */}
      <section style={{
        position: 'relative', zIndex: 2,
        padding: '2rem 1.5rem 6rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <FadeIn delay={100}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            textAlign: 'center',
            color: '#e8a0b4',
            marginBottom: '3rem',
            letterSpacing: '0.02em',
          }}>
            Our Beautiful Moments
          </h2>
        </FadeIn>
        <Gallery photos={photos} />
      </section>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 60px rgba(194,24,91,0.4), 0 0 120px rgba(194,24,91,0.15), inset 0 1px 1px rgba(255,255,255,0.08); }
          50%       { box-shadow: 0 0 80px rgba(194,24,91,0.6), 0 0 160px rgba(194,24,91,0.25), inset 0 1px 1px rgba(255,255,255,0.08); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(3%, 4%) scale(1.06); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(6px); opacity: 0.8; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
