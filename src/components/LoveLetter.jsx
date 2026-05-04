import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────
//  💌 PERSONALISE YOUR LETTER
//  Edit the `LETTER_LINES` array below with your
//  own words. Each string is one paragraph.
// ─────────────────────────────────────────────
const LETTER_LINES = [

  "My dearest Vishmi Dulanjali,",

  "I don't quite know how to put into words what you mean to me — but I'm going to try, because you deserve every single word and more.",

  "From the moment you came into my life, everything changed. Not in a dramatic, movie-kind-of-way — but quietly, warmly, like the sun coming out after a long grey morning. You made ordinary days feel extraordinary just by being in them.",

  "I love the way you laugh — really laugh — when something catches you off guard. I love how caring you are, how you notice the little things, how your heart holds so much warmth for the people around you. Vishmi, you are genuinely one of the most beautiful souls I have ever known.",

  "There are moments I look at you and I still can't believe I get to call you mine. That feeling hasn't faded — if anything, it grows every single day. Every conversation, every quiet moment, every time our eyes meet — I fall a little more.",

  "I'm not perfect, and neither is life — but with you beside me, everything feels possible. You are my calm when things get loud, my happiness when days feel heavy, and my home no matter where we are.",

  "Vishmi Dulanjali — I choose you. Today, tomorrow, and every day after that. Thank you for being you. Thank you for letting me love you.",

  "Yours, always and completely,",
  "Your love ❤️",
]

// ── Seal component ───────────────────────────
function WaxSeal({ onClick, opened }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 'clamp(80px, 15vw, 120px)',
        height: 'clamp(80px, 15vw, 120px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 35%, #e53935, #b71c1c 60%, #7f0000)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        cursor: opened ? 'default' : 'pointer',
        boxShadow: hovered && !opened
          ? '0 0 50px rgba(229,57,53,0.7), 0 8px 30px rgba(0,0,0,0.6)'
          : '0 0 30px rgba(229,57,53,0.4), 0 6px 20px rgba(0,0,0,0.5)',
        transform: hovered && !opened ? 'scale(1.08)' : 'scale(1)',
        transition: 'all 0.3s ease',
        border: '3px solid rgba(255,150,150,0.25)',
        userSelect: 'none',
        animation: opened ? 'none' : 'sealPulse 2s ease-in-out infinite',
        flexShrink: 0,
      }}
    >
      ❤
    </div>
  )
}

// ── Single letter line with staggered reveal ─
function LetterLine({ text, delay }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  const isSignoff = text === LETTER_LINES[LETTER_LINES.length - 2] || text === LETTER_LINES[LETTER_LINES.length - 1]
  const isGreeting = text === LETTER_LINES[0]
  return (
    <p style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.9s ease, transform 0.9s ease',
      fontFamily: isGreeting || isSignoff ? "'Dancing Script', cursive" : "'Cormorant Garamond', serif",
      fontSize: isGreeting || isSignoff
        ? 'clamp(1.4rem, 4vw, 2rem)'
        : 'clamp(1rem, 2.5vw, 1.3rem)',
      fontStyle: isGreeting || isSignoff ? 'normal' : 'italic',
      fontWeight: isGreeting ? 700 : 400,
      color: isGreeting ? '#f8e8ee' : isSignoff ? '#e8a0b4' : 'rgba(248,232,238,0.85)',
      lineHeight: 1.9,
      marginBottom: isGreeting || isSignoff ? '0.3rem' : '1.2rem',
      textAlign: isSignoff ? 'right' : 'left',
      letterSpacing: isGreeting ? '0.02em' : '0.01em',
    }}>
      {text}
    </p>
  )
}

export default function LoveLetter() {
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false)
  const [envelopeAnim, setEnvelopeAnim] = useState(false)

  const handleOpen = () => {
    setEnvelopeAnim(true)
    setTimeout(() => setOpened(true), 700)
  }

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: opened ? 'flex-start' : 'center',
      padding: '4rem 1.5rem 6rem',
    }}>

      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 60% 60% at 70% 20%, rgba(74,16,48,0.7) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 20% 80%, rgba(123,30,58,0.5) 0%, transparent 60%),
          linear-gradient(150deg, #0d0008 0%, #1a0810 50%, #0f0005 100%)
        `,
      }} />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: '1.5rem', left: '1.5rem', zIndex: 10,
          color: '#e8a0b4', fontSize: '0.9rem',
          background: 'rgba(26,8,16,0.7)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(232,160,180,0.2)',
          borderRadius: '50px',
          padding: '0.5rem 1.2rem',
          letterSpacing: '0.05em',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(194,24,91,0.3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,8,16,0.7)'}
      >
        ← Back
      </button>

      {/* ── Envelope / Seal state ── */}
      {!opened && (
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '2rem',
          textAlign: 'center',
          animation: envelopeAnim ? 'fadeOutUp 0.7s ease forwards' : 'none',
        }}>
          {/* Envelope SVG */}
          <div style={{
            width: 'clamp(200px, 45vw, 340px)',
            height: 'clamp(130px, 30vw, 220px)',
            position: 'relative',
            filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.7))',
          }}>
            <svg viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              {/* Envelope body */}
              <rect x="0" y="0" width="340" height="220" rx="14" fill="url(#envGrad)" />
              {/* Flap */}
              <path d="M0 0 L170 120 L340 0Z" fill="url(#flapGrad)" opacity="0.9" />
              {/* Bottom fold lines */}
              <path d="M0 220 L130 100" stroke="rgba(232,160,180,0.2)" strokeWidth="1" />
              <path d="M340 220 L210 100" stroke="rgba(232,160,180,0.2)" strokeWidth="1" />
              <defs>
                <linearGradient id="envGrad" x1="0" y1="0" x2="340" y2="220" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3a1020" />
                  <stop offset="100%" stopColor="#1e0510" />
                </linearGradient>
                <linearGradient id="flapGrad" x1="0" y1="0" x2="340" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4a1530" />
                  <stop offset="100%" stopColor="#2a0c18" />
                </linearGradient>
              </defs>
            </svg>
            {/* Wax seal centred on envelope */}
            <div style={{
              position: 'absolute',
              bottom: '-30px', left: '50%',
              transform: 'translateX(-50%)',
            }}>
              <WaxSeal onClick={handleOpen} opened={false} />
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              color: '#e8a0b4',
              marginBottom: '0.5rem',
            }}>A letter from my heart</p>
            <p style={{
              color: 'rgba(232,160,180,0.5)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              animation: 'bounce 2s ease-in-out infinite',
            }}>Click the seal to open ↑</p>
          </div>
        </div>
      )}

      {/* ── Letter content ── */}
      {opened && (
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '680px', width: '100%',
          background: `
            linear-gradient(135deg, rgba(58,16,32,0.6) 0%, rgba(26,8,16,0.8) 100%)
          `,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(232,160,180,0.15)',
          boxShadow: '0 0 80px rgba(194,24,91,0.2), 0 20px 60px rgba(0,0,0,0.7)',
          padding: 'clamp(2rem, 6vw, 4rem)',
          animation: 'fadeInUp 0.8s ease forwards',
          marginTop: '2rem',
        }}>
          {/* Paper texture overlay */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '24px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='transparent'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(232,160,180,0.04)'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }} />

          {/* Decorative top ornament */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#d4a853',
            fontSize: '1.2rem',
            letterSpacing: '0.4em',
            opacity: 0.6,
          }}>✦ ♥ ✦</div>

          {LETTER_LINES.map((line, i) => (
            <LetterLine key={i} text={line} delay={i * 300 + 200} />
          ))}

          {/* Bottom ornament */}
          <div style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            color: '#d4a853',
            fontSize: '1rem',
            letterSpacing: '0.4em',
            opacity: 0.5,
          }}>✦ ♥ ✦</div>
        </div>
      )}

      <style>{`
        @keyframes sealPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(229,57,53,0.4), 0 6px 20px rgba(0,0,0,0.5); }
          50%       { box-shadow: 0 0 50px rgba(229,57,53,0.65), 0 6px 20px rgba(0,0,0,0.5); }
        }
        @keyframes fadeOutUp {
          to { opacity: 0; transform: translateY(-40px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(4px); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
