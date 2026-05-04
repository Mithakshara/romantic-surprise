import React, { useState, useEffect, useCallback } from 'react'

export default function Gallery({ photos }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [hovered, setHovered] = useState(null)

  // Auto-advance slideshow
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(i => (i + 1) % photos.length)
    }, 3500)
    return () => clearInterval(t)
  }, [photos.length])

  const openLightbox = (idx) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const prevLight = () => setLightbox(i => (i - 1 + photos.length) % photos.length)
  const nextLight = () => setLightbox(i => (i + 1) % photos.length)

  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return
      if (e.key === 'ArrowLeft') prevLight()
      if (e.key === 'ArrowRight') nextLight()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  return (
    <>
      {/* ── Featured slideshow ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto 3rem',
        borderRadius: '24px',
        overflow: 'hidden',
        aspectRatio: '4/3',
        boxShadow: '0 0 60px rgba(194,24,91,0.3), 0 20px 60px rgba(0,0,0,0.6)',
        border: '1px solid rgba(232,160,180,0.15)',
        cursor: 'pointer',
      }} onClick={() => openLightbox(activeIdx)}>
        {photos.map((p, i) => (
          <img
            key={i}
            src={p.src}
            alt={p.alt}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: i === activeIdx ? 1 : 0,
              transform: i === activeIdx ? 'scale(1.03)' : 'scale(1)',
              transition: 'opacity 1.2s ease, transform 4s ease',
            }}
          />
        ))}

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(26,8,16,0.5) 0%, transparent 50%)',
          zIndex: 2,
        }} />

        {/* Dot indicators */}
        <div style={{
          position: 'absolute', bottom: '1rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '0.4rem', zIndex: 3,
        }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setActiveIdx(i) }}
              style={{
                width: i === activeIdx ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === activeIdx ? '#e8a0b4' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.4s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Caption */}
        <p style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3, color: 'rgba(248,232,238,0.85)',
          fontStyle: 'italic', fontSize: '1rem',
          fontFamily: "'Cormorant Garamond', serif",
          whiteSpace: 'nowrap',
          textShadow: '0 1px 8px rgba(0,0,0,0.8)',
        }}>
          {photos[activeIdx]?.alt}
        </p>
      </div>

      {/* ── Mosaic thumbnails ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(130px, 22vw, 200px), 1fr))',
        gap: '1rem',
      }}>
        {photos.map((p, i) => (
          <div
            key={i}
            onClick={() => openLightbox(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              aspectRatio: '1',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: i === activeIdx
                ? '2px solid rgba(194,24,91,0.7)'
                : '2px solid rgba(232,160,180,0.1)',
              boxShadow: hovered === i
                ? '0 0 30px rgba(194,24,91,0.4), 0 8px 24px rgba(0,0,0,0.5)'
                : '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease',
              transform: hovered === i ? 'scale(1.04) translateY(-3px)' : 'scale(1)',
            }}
          >
            <img
              src={p.src} alt={p.alt}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: hovered === i ? 'scale(1.1)' : 'scale(1)',
                filter: i === activeIdx ? 'none' : 'brightness(0.75)',
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(10,0,8,0.93)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <button
            onClick={e => { e.stopPropagation(); prevLight() }}
            style={{
              position: 'absolute', left: '1rem',
              color: '#e8a0b4', fontSize: '2rem',
              background: 'rgba(26,8,16,0.7)',
              borderRadius: '50%', width: '48px', height: '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >‹</button>

          <img
            src={photos[lightbox]?.src}
            alt={photos[lightbox]?.alt}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '16px',
              boxShadow: '0 0 80px rgba(194,24,91,0.3), 0 20px 60px rgba(0,0,0,0.8)',
              border: '1px solid rgba(232,160,180,0.2)',
            }}
          />

          <button
            onClick={e => { e.stopPropagation(); nextLight() }}
            style={{
              position: 'absolute', right: '1rem',
              color: '#e8a0b4', fontSize: '2rem',
              background: 'rgba(26,8,16,0.7)',
              borderRadius: '50%', width: '48px', height: '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >›</button>

          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              color: '#e8a0b4', fontSize: '1.5rem',
              background: 'rgba(26,8,16,0.7)',
              borderRadius: '50%', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>
      )}
    </>
  )
}
