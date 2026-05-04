import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoveLetter from './components/LoveLetter'
import AudioPlayer from './components/AudioPlayer'
import FloatingHearts from './components/FloatingHearts'

function AppInner() {
  const [musicStarted, setMusicStarted] = useState(false)
  const [showEntry, setShowEntry] = useState(true)
  const navigate = useNavigate()

  const handleEnter = () => {
    setMusicStarted(true)
    setShowEntry(false)
  }

  return (
    <>
      {/* Entry overlay — required to unlock audio autoplay */}
      {showEntry && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #3a0a20 0%, #0d0008 100%)',
          gap: '2rem',
        }}>
          <div style={{ fontSize: '5rem', animation: 'pulseHeart 1.6s ease-in-out infinite' }}>❤️</div>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            color: '#f8e8ee',
            textAlign: 'center',
            padding: '0 1rem',
            textShadow: '0 0 30px rgba(232,160,180,0.6)',
          }}>
            Something special awaits you…
          </p>
          <button
            onClick={handleEnter}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              color: '#fff8f0',
              padding: '0.9rem 2.6rem',
              background: 'linear-gradient(135deg, #c2185b, #7b1e3a)',
              borderRadius: '50px',
              boxShadow: '0 0 30px rgba(194,24,91,0.5), 0 4px 20px rgba(0,0,0,0.4)',
              letterSpacing: '0.05em',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 0 45px rgba(194,24,91,0.7), 0 4px 20px rgba(0,0,0,0.4)' }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 30px rgba(194,24,91,0.5), 0 4px 20px rgba(0,0,0,0.4)' }}
          >
            Open Your Surprise 💕
          </button>
          <style>{`
            @keyframes pulseHeart {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.15); }
            }
          `}</style>
        </div>
      )}

      {!showEntry && (
        <>
          <FloatingHearts />
          <AudioPlayer started={musicStarted} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/letter" element={<LoveLetter />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
