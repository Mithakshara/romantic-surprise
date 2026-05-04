import React, { useEffect, useState, useCallback } from 'react'

const HEART_CHARS = ['❤️', '🩷', '💕', '💗', '💖', '♥', '💓']

function Heart({ id, x, size, duration, delay, char, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), (duration + delay) * 1000 + 500)
    return () => clearTimeout(t)
  }, [id, duration, delay, onDone])

  return (
    <span
      style={{
        position: 'fixed',
        bottom: '-60px',
        left: `${x}%`,
        fontSize: `${size}px`,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 1,
        animation: `floatUp ${duration}s ease-in ${delay}s forwards`,
        opacity: 0,
        filter: 'drop-shadow(0 0 6px rgba(194,24,91,0.5))',
      }}
    >
      {char}
    </span>
  )
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])
  const [counter, setCounter] = useState(0)

  const removeHeart = useCallback((id) => {
    setHearts(prev => prev.filter(h => h.id !== id))
  }, [])

  useEffect(() => {
    const spawn = () => {
      setCounter(c => {
        const id = c + 1
        const heart = {
          id,
          x: Math.random() * 95,
          size: 12 + Math.random() * 22,
          duration: 6 + Math.random() * 8,
          delay: Math.random() * 0.5,
          char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
        }
        setHearts(prev => [...prev.slice(-30), heart])
        return id
      })
    }
    spawn()
    const interval = setInterval(spawn, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(-105vh) rotate(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 30}deg) scale(1.2); opacity: 0; }
        }
      `}</style>
      {hearts.map(h => (
        <Heart key={h.id} {...h} onDone={removeHeart} />
      ))}
    </>
  )
}
