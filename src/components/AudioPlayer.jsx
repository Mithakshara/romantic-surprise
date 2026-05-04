import React, { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────
//  🎵 ADD YOUR SONGS HERE
//  1. Copy your .mp3 files into: src/assets/audio/
//  2. Import them below
//  3. Add them to the `playlist` array
// ─────────────────────────────────────────────

import song1 from '../assets/audio/song1.mp3'
import song2 from '../assets/audio/song2.mp3'
import song3 from '../assets/audio/song3.mp3'


const playlist = [
  { src: song1, title: 'A Thousand Years — Christina Perri' },
  { src: song2, title: 'Lover — Taylor Swift' },
  { src: song3, title: 'All of Me — John Legend' },
  
]

export default function AudioPlayer({ started }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!started) return
    const audio = audioRef.current
    audio.volume = volume
    audio.play().then(() => setPlaying(true)).catch(() => {})
  }, [started])

  // Auto-play next song when current ends
  useEffect(() => {
    const audio = audioRef.current
    const handleEnded = () => {
      const next = (currentIdx + 1) % playlist.length
      setCurrentIdx(next)
    }
    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [currentIdx])

  // When song index changes, load and play new song
  useEffect(() => {
    if (!started) return
    const audio = audioRef.current
    audio.src = playlist[currentIdx].src
    audio.load()
    audio.volume = volume
    audio.play().then(() => setPlaying(true)).catch(() => {})
  }, [currentIdx])

  const toggle = () => {
    const audio = audioRef.current
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  const prev = () => setCurrentIdx(i => (i - 1 + playlist.length) % playlist.length)
  const next = () => setCurrentIdx(i => (i + 1) % playlist.length)

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    audioRef.current.volume = v
  }

  const current = playlist[currentIdx]

  return (
    <>
      <audio ref={audioRef} src={current.src} preload="auto" />

      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 100,
        background: 'rgba(26,8,16,0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(232,160,180,0.25)',
        borderRadius: expanded ? '20px' : '50px',
        boxShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 20px rgba(194,24,91,0.2)',
        overflow: 'hidden',
        transition: 'border-radius 0.3s ease',
        minWidth: expanded ? '260px' : 'auto',
      }}>

        {/* Expanded playlist */}
        {expanded && (
          <div style={{ padding: '0.8rem 0.8rem 0.3rem' }}>
            <p style={{
              color: '#d4a853',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              paddingLeft: '0.3rem',
            }}>♪ Playlist</p>
            {playlist.map((song, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                style={{
                  display: 'block', width: '100%',
                  textAlign: 'left',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '8px',
                  color: i === currentIdx ? '#f8e8ee' : 'rgba(232,160,180,0.6)',
                  background: i === currentIdx ? 'rgba(194,24,91,0.25)' : 'transparent',
                  fontSize: '0.82rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  transition: 'all 0.2s',
                  marginBottom: '0.15rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                onMouseEnter={e => { if (i !== currentIdx) e.currentTarget.style.background = 'rgba(232,160,180,0.08)' }}
                onMouseLeave={e => { if (i !== currentIdx) e.currentTarget.style.background = 'transparent' }}
              >
                {i === currentIdx && playing ? '▶ ' : '  '}{song.title}
              </button>
            ))}
            <div style={{ height: '0.4rem' }} />
          </div>
        )}

        {/* Controls bar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.8rem 0.5rem 0.6rem',
        }}>
          {/* Prev */}
          <button onClick={prev} title="Previous" style={{
            color: '#e8a0b4', fontSize: '0.9rem', width: '28px', height: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,160,180,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >⏮</button>

          {/* Play/Pause */}
          <button onClick={toggle} title={playing ? 'Pause' : 'Play'} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #c2185b, #7b1e3a)',
            color: '#fff', fontSize: '0.95rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(194,24,91,0.5)',
            transition: 'transform 0.15s',
            flexShrink: 0,
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >{playing ? '⏸' : '▶'}</button>

          {/* Next */}
          <button onClick={next} title="Next" style={{
            color: '#e8a0b4', fontSize: '0.9rem', width: '28px', height: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,160,180,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >⏭</button>

          {/* Volume */}
          <input
            type="range" min="0" max="1" step="0.02"
            value={volume} onChange={handleVolume}
            style={{ width: '55px', accentColor: '#c2185b', cursor: 'pointer' }}
          />

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(e => !e)}
            title="Playlist"
            style={{
              color: expanded ? '#d4a853' : 'rgba(232,160,180,0.5)',
              fontSize: '0.85rem', width: '28px', height: '28px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,160,180,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >♪</button>
        </div>

        {/* Song title ticker */}
        <div style={{
          padding: '0 0.8rem 0.5rem',
          fontSize: '0.72rem',
          color: 'rgba(232,160,180,0.6)',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '220px',
        }}>
          {playing ? '♪ ' : ''}{current.title}
        </div>
      </div>
    </>
  )
}