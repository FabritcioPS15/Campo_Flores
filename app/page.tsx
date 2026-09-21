'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronDown, Heart, Home, Moon, Sun, Volume2, VolumeX, Wind, X, ZoomIn, ZoomOut } from 'lucide-react'
import { BsStars } from 'react-icons/bs'
import { IoFlowerOutline } from 'react-icons/io5'
import Image from 'next/image'

type Depth = 'far' | 'mid' | 'near'
type Flower = { x: number; y: number; size: number; depth: Depth; tilt: number; phrase?: string; special?: boolean }
type MessageState = { text: string; x: number; y: number }

// Campo ordenado: 25 flores (una por mensaje) + la especial, espaciadas para que ninguna quedé tapada.
const flowers: Flower[] = [
  // far — primera fila, trasera
  { x: 4, y: 70, size: 52, depth: 'far', tilt: -6, phrase: 'Si pudiera elegir una flor entre todas, seguiría eligiéndote a ti.' },
  { x: 17, y: 73, size: 56, depth: 'far', tilt: 5, phrase: 'Eres una de esas casualidades bonitas que uno agradece toda la vida.' },
  { x: 30, y: 69, size: 54, depth: 'far', tilt: -8, phrase: 'No sé qué hice para encontrarte, pero sí sé que quiero cuidarte.' },
  { x: 43, y: 72, size: 58, depth: 'far', tilt: 4, phrase: 'Contigo hasta los días normales se sienten especiales.' },
  { x: 56, y: 70, size: 52, depth: 'far', tilt: -5, phrase: 'Tu sonrisa tiene una manera muy bonita de arreglar mis días.' },
  { x: 69, y: 73, size: 56, depth: 'far', tilt: 7, phrase: 'Si las flores necesitan sol para crecer, yo necesito un poquito de ti para sonreír.' },
  { x: 82, y: 69, size: 54, depth: 'far', tilt: -6, phrase: 'Qué bonito coincidir contigo en esta vida.' },
  { x: 95, y: 72, size: 50, depth: 'far', tilt: 6, phrase: 'No eres solamente mi enamorada, eres también mi lugar favorito.' },
  // mid — fila central
  { x: 9, y: 84, size: 58, depth: 'mid', tilt: 4, phrase: 'Me gustas hoy, me gustabas ayer y probablemente me gustarás mucho más mañana.' },
  { x: 22, y: 83, size: 56, depth: 'mid', tilt: -7, phrase: 'Hay millones de personas en el mundo y qué suerte la mía de encontrarte a ti.' },
  { x: 35, y: 86, size: 60, depth: 'mid', tilt: 6, phrase: 'Prometo seguir coleccionando momentos contigo.' },
  { x: 48, y: 83, size: 62, depth: 'mid', tilt: -4, phrase: 'Ojalá pudiera guardar cada abrazo tuyo en un frasquito para los días que te extrañe.' },
  { x: 61, y: 86, size: 56, depth: 'mid', tilt: 8, phrase: 'Tú haces que mi mundo tenga un poquito más de color.' },
  { x: 74, y: 83, size: 60, depth: 'mid', tilt: -6, phrase: 'No necesito un campo lleno de flores cuando tengo tu sonrisa.' },
  { x: 86, y: 86, size: 54, depth: 'mid', tilt: 5, phrase: 'Diana, tu nombre quedó bonito en mi vida.' },
  { x: 5, y: 87, size: 54, depth: 'mid', tilt: 5, phrase: 'Si llegaste hasta esta flor, recuerda que alguien piensa muchísimo en ti.' },
  { x: 93, y: 84, size: 52, depth: 'mid', tilt: -7, phrase: 'Esta flor es bonita, pero tú le ganas.' },
  // near — fáciles de tocar
  { x: 13, y: 91, size: 46, depth: 'near', tilt: 9, phrase: 'Pequeño recordatorio: eres muy, muy especial para mí.' },
  { x: 26, y: 93, size: 44, depth: 'near', tilt: -6, phrase: 'Quiero seguir viviendo momentos que algún día recordemos con una sonrisa.' },
  { x: 39, y: 90, size: 48, depth: 'near', tilt: 5, phrase: 'Gracias por ser tú. No cambiaría eso por nada.' },
  { x: 58, y: 92, size: 46, depth: 'near', tilt: -8, phrase: 'Mi parte favorita de este campo todavía no aparece… porque eres tú.' },
  { x: 68, y: 90, size: 48, depth: 'near', tilt: 7, phrase: 'Y si pensabas que ya habías encontrado todas las flores… todavía queda una sorpresa.' },
  { x: 81, y: 92, size: 44, depth: 'near', tilt: -5, phrase: 'Entre tantas flores, siempre hay una que destaca… y para mí eres tú.' },
  { x: 95, y: 91, size: 46, depth: 'near', tilt: 4, phrase: 'A veces no encuentro las palabras para decirte cuánto te quiero, así que te dejo una flor.' },
  { x: 4, y: 93, size: 42, depth: 'near', tilt: 6, phrase: 'Espero que cada vez que veas una flor amarilla te acuerdes un poquito de mí.' },
  // la flor especial, oculta entre las del centro
  { x: 48, y: 96, size: 60, depth: 'near', tilt: -12, special: true, phrase: 'Te quiero muchísimo, Diana.' },
]

const pollen = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 41) % 100}%`,
  top: `${18 + ((i * 31) % 64)}%`,
  '--delay': `${(i % 9) * 0.8}s`,
  '--duration': `${8 + (i % 5) * 2}s`,
  '--size': `${3 + (i % 3)}px`,
}))

const petals = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  '--petal-delay': `${(i % 6) * 1.4}s`,
  '--petal-dur': `${9 + (i % 4) * 2.4}s`,
  '--sway': `${(i % 3) - 1}vw`,
  '--spin': `${140 + (i % 5) * 90}deg`,
}))

// Luciérnagas que se encienden en modo noche
const fireflies = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 53 + 17) % 100}%`,
  top: `${28 + ((i * 37) % 62)}%`,
  '--delay': `${(i % 7) * 0.9}s`,
  '--duration': `${7 + (i % 5) * 2.4}s`,
  '--drift': `${(i % 5) - 2}vw`,
}))

const ZOOM_MIN = 1
const ZOOM_MAX = 3
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)
const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y)
const midpoint = (a: { x: number; y: number }, b: { x: number; y: number }) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })

const COLLECTIBLE = flowers.filter((flower) => !flower.special).length

export default function Page() {
  const [phase, setPhase] = useState<'intro' | 'leaving' | 'entered'>('intro')
  const [message, setMessage] = useState<MessageState | null>(null)
  const [specialOpen, setSpecialOpen] = useState(false)
  const [muted, setMuted] = useState(true)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const audioRef = useRef<{ ctx: AudioContext; master: GainNode } | null>(null)

  // --- Paseo por el campo: cámara (desplazar + zoom), recolección, noche y mariposa ---
  const [collected, setCollected] = useState<ReadonlySet<number>>(new Set())
  const [night, setNight] = useState(false)
  const [cam, setCam] = useState({ x: 0, y: 0, k: 1 })
  const [dragging, setDragging] = useState(false)
  const [lit, setLit] = useState<ReadonlySet<number>>(new Set())
  const [bfVisible, setBfVisible] = useState(false)

  const camRef = useRef(cam)
  const viewRef = useRef({ w: 0, h: 0 })
  const sectionRef = useRef<HTMLElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const bfRef = useRef<HTMLDivElement | null>(null)
  const suppressClickRef = useRef(false)
  const gestureRef = useRef({
    ids: new Map<number, { x: number; y: number }>(),
    mode: 'none' as 'none' | 'pan' | 'pinch',
    startCam: { x: 0, y: 0, k: 1 },
    startPoint: { x: 0, y: 0 },
    startMid: { x: 0, y: 0 },
    startDist: 0,
    moved: false,
  })

  const entered = phase !== 'intro'
  const leaving = phase === 'leaving'

  const applyCam = useCallback((next: { x: number; y: number; k: number }) => {
    const v = viewRef.current
    const k = clamp(next.k, ZOOM_MIN, ZOOM_MAX)
    const mx = (v.w * (k - 1)) / 2 + v.w * 0.04
    const my = (v.h * (k - 1)) / 2 + v.h * 0.02
    const c = { x: clamp(next.x, -mx, mx), y: clamp(next.y, -my, my), k }
    camRef.current = c
    setCam(c)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    const update = () => {
      if (el && el.clientWidth) viewRef.current = { w: el.clientWidth, h: el.clientHeight }
      if (!el || !el.clientWidth) viewRef.current = { w: window.innerWidth, h: window.innerHeight }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [entered, night])

  const zoomAt = (factor: number, px: number, py: number) => {
    const v = viewRef.current
    const cur = camRef.current
    const k = clamp(cur.k * factor, ZOOM_MIN, ZOOM_MAX)
    const worldX = (px - v.w / 2 - cur.x) / cur.k + v.w / 2
    const worldY = (py - v.h / 2 - cur.y) / cur.k + v.h / 2
    applyCam({ x: px - v.w / 2 - (worldX - v.w / 2) * k, y: py - v.h / 2 - (worldY - v.h / 2) * k, k })
  }
  const zoomBy = (step: number) => {
    const v = viewRef.current
    zoomAt(1 + step, v.w / 2, v.h / 2)
  }
  const resetView = () => applyCam({ x: 0, y: 0, k: 1 })

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const cur = camRef.current
      if (cur.k <= 1.01 && !e.ctrlKey) return
      e.preventDefault()
      zoomAt(Math.exp(-e.deltaY * 0.002), e.clientX, e.clientY)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // zoomAt/applyCam solo usan refs estables: basta el efecto inicial.
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    suppressClickRef.current = false
    e.currentTarget.setPointerCapture?.(e.pointerId)
    const g = gestureRef.current
    g.ids.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (g.ids.size === 2) {
      const pts = [...g.ids.values()]
      g.mode = 'pinch'
      g.startCam = { ...camRef.current }
      g.startDist = distance(pts[0], pts[1])
      g.startMid = midpoint(pts[0], pts[1])
    } else if (g.ids.size === 1) {
      g.mode = 'pan'
      g.startCam = { ...camRef.current }
      g.startPoint = { x: e.clientX, y: e.clientY }
    }
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gestureRef.current
    const pos = { x: e.clientX, y: e.clientY }
    if (!g.ids.has(e.pointerId)) return
    g.ids.set(e.pointerId, pos)
    if (g.mode === 'pinch' && g.ids.size >= 2) {
      const pts = [...g.ids.values()]
      const d = distance(pts[0], pts[1])
      const md = midpoint(pts[0], pts[1])
      const k = clamp(g.startCam.k * (d / g.startDist), ZOOM_MIN, ZOOM_MAX)
      const v = viewRef.current
      const worldX = (g.startMid.x - v.w / 2 - g.startCam.x) / g.startCam.k + v.w / 2
      const worldY = (g.startMid.y - v.h / 2 - g.startCam.y) / g.startCam.k + v.h / 2
      applyCam({
        x: md.x - v.w / 2 - (worldX - v.w / 2) * k,
        y: md.y - v.h / 2 - (worldY - v.h / 2) * k,
        k,
      })
      g.moved = true
    } else if (g.mode === 'pan' && g.ids.size === 1) {
      const dx = e.clientX - g.startPoint.x
      const dy = e.clientY - g.startPoint.y
      if (Math.abs(dx) + Math.abs(dy) > 6) {
        g.moved = true
        suppressClickRef.current = true
      }
      applyCam({ x: g.startCam.x + dx, y: g.startCam.y + dy, k: g.startCam.k })
    }
  }

  const endPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gestureRef.current
    g.ids.delete(e.pointerId)
    if (g.mode === 'pinch' && g.ids.size === 1) {
      const pts = [...g.ids.values()]
      g.mode = 'pan'
      g.startCam = { ...camRef.current }
      g.startPoint = pts[0]
    }
    if (g.ids.size === 0) {
      g.mode = 'none'
      setDragging(false)
    }
  }

  const collectedCount = flowers.reduce((acc, flower, i) => acc + (collected.has(i) && !flower.special ? 1 : 0), 0)
  const allFound = collectedCount >= COLLECTIBLE
  const specialFound = [...collected].some((i) => flowers[i]?.special)

  // Mariposa que sigue al dedo y enciende las flores cercanas.
  useEffect(() => {
    let raf = 0
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const cur = { ...target }
    let lastDir = 1
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      setBfVisible(true)
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => setBfVisible(false), 1400)
    }
    const tick = () => {
      const dx = target.x - cur.x
      const dy = target.y - cur.y
      cur.x += dx * 0.09
      cur.y += dy * 0.09
      const bf = bfRef.current
      if (bf) {
        const dir = Math.abs(dx) > 2 ? (dx >= 0 ? 1 : -1) : lastDir
        lastDir = dir
        bf.style.transform = `translate(${cur.x}px, ${cur.y}px) rotate(${clamp(dy * 0.4, -14, 14)}deg) scaleX(${dir})`
      }
      const v = viewRef.current
      const c = camRef.current
      const near = new Set<number>()
      flowers.forEach((f, i) => {
        const sx = ((f.x / 100) * v.w - v.w / 2) * c.k + v.w / 2 + c.x
        const sy = ((f.y / 100) * v.h - v.h / 2) * c.k + v.h / 2 + c.y
        if (Math.hypot(sx - cur.x, sy - cur.y) < 66) near.add(i)
      })
      setLit((prev) => {
        if (prev.size === near.size && [...prev].every((id) => near.has(id))) return prev
        return near
      })
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [])

  // Parallax con el ratón (escritorio) y suave en pantallas táctiles.
  useEffect(() => {
    const coarse = window.matchMedia ? window.matchMedia('(pointer: coarse)').matches : false
    const set = (x: number, y: number) => {
      if (gestureRef.current.ids.size > 0) return
      setOffset({
        x: (x / window.innerWidth - 0.5) * (coarse ? 8 : 16),
        y: (y / window.innerHeight - 0.5) * (coarse ? 5 : 9),
      })
    }
    const mouse = (event: MouseEvent) => set(event.clientX, event.clientY)
    window.addEventListener('mousemove', mouse)
    return () => window.removeEventListener('mousemove', mouse)
  }, [])

  // Inclinación del móvil (necesita permiso en iOS, se pide al entrar).
  const onOrient = useCallback((event: DeviceOrientationEvent) => {
    const gamma = event.gamma ?? 0
    const beta = event.beta ?? 45
    if (gestureRef.current.ids.size > 0) return
    setOffset({ x: (gamma / 45) * 11, y: ((beta - 45) / 45) * 7 })
  }, [])

  useEffect(
    () => () => {
      window.removeEventListener('deviceorientation', onOrient)
      audioRef.current?.ctx.close().catch(() => undefined)
    },
    [onOrient],
  )

  const enterField = () => {
    setPhase('leaving')
    if (typeof DeviceOrientationEvent !== 'undefined') {
      if ('requestPermission' in DeviceOrientationEvent) {
        ; (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
          .requestPermission()
          .then((res) => {
            if (res === 'granted') window.addEventListener('deviceorientation', onOrient)
          })
          .catch(() => undefined)
      } else {
        window.addEventListener('deviceorientation', onOrient)
      }
    }
  }

  const handleHeroEnd = (event: React.AnimationEvent<HTMLElement>) => {
    if (event.animationName === 'heroExit') setPhase('entered')
  }

  const touchFlower = (flower: Flower, index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    setCollected((prev) => (prev.has(index) ? prev : new Set(prev).add(index)))
    if (flower.special) {
      setMessage(null)
      setSpecialOpen(true)
      return
    }
    setMessage({ text: flower.phrase || 'Una flor más de este campo es tuya, Diana.', x: flower.x, y: flower.y })
  }

  // La burbuja con el mensaje se desvanece sola.
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(null), 4600)
    return () => clearTimeout(timer)
  }, [message])

  // Ambiente sonoro: viento suave sintetizado con Web Audio (sin archivos externos).
  const buildAmbient = (): { ctx: AudioContext; master: GainNode } | null => {
    try {
      const Ctor =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return null
      const ctx = new Ctor()
      const master = ctx.createGain()
      master.gain.value = 0
      const comp = ctx.createDynamicsCompressor()
      comp.threshold.value = -18
      master.connect(comp)
      comp.connect(ctx.destination)

      const len = ctx.sampleRate * 2
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const data = buf.getChannelData(0)
      let last = 0
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1
        last = (last + 0.02 * white) / 1.02
        data[i] = last * 3.5
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buf
      noise.loop = true
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 340
      lp.Q.value = 0.7
      const lfo = ctx.createOscillator()
      lfo.frequency.value = 0.07
      const lfoAmt = ctx.createGain()
      lfoAmt.gain.value = 180
      lfo.connect(lfoAmt)
      lfoAmt.connect(lp.frequency)
      noise.connect(lp)
      lp.connect(master)
      noise.start()
      lfo.start()

      window.addEventListener('pointerdown', () => void ctx.resume(), { once: true })
      return { ctx, master }
    } catch {
      return null
    }
  }

  const toggleSound = () => {
    if (muted) {
      setMuted(false)
      if (!audioRef.current) audioRef.current = buildAmbient()
      const { ctx, master } = audioRef.current ?? {}
      if (ctx && master) {
        void ctx.resume()
        master.gain.cancelScheduledValues(ctx.currentTime)
        master.gain.setTargetAtTime(0.55, ctx.currentTime, 0.6)
      }
    } else {
      setMuted(true)
      const audio = audioRef.current
      if (audio) {
        audio.master.gain.cancelScheduledValues(audio.ctx.currentTime)
        audio.master.gain.setTargetAtTime(0, audio.ctx.currentTime, 0.12)
      }
    }
  }

  return (
    <main className={`romance-page ${entered ? 'has-entered' : ''}`}>
      <div className="grain" aria-hidden="true" />

      <section
        className={`hero ${leaving ? 'hero-leaving' : ''} ${phase === 'entered' ? 'hero-exited' : ''}`}
        aria-label="Una tarde en nuestro campo"
        onAnimationEnd={handleHeroEnd}
      >
        <div className="scene-vignette" />
        <div className="sun" />
        <div className="horizon haze" />
        <div className="distant-hills" />
        <div className="hero-field field-texture" />
        <div className="grass-layer grass-back" />
        <div className="grass-layer grass-front" />
        <div className="pollen" aria-hidden="true">
          {pollen.map((petal, i) => (
            <i key={i} style={petal as CSSProperties} />
          ))}
        </div>
        <button className="hero-content intro-screen" onClick={enterField} aria-label="Entrar a la web">
          <Image
            src="/flores.png"
            alt="Ramo de girasoles"
            width={520}
            height={693}
            className="intro-bouquet"
            priority
            aria-hidden="true"
          />
          <p className="intro-kicker">una pequeña sorpresa para ti, Diana</p>
          <h1>
            Para ti, Diana <span className="title-flower"><IoFlowerOutline /></span>
          </h1>
          <p className="tap-hint">
            haz tap en la pantalla
            <br />
            para entrar a la web
          </p>
          <span className="tap-ring" aria-hidden="true" />
        </button>
        <div className="corner-note">21 · 09 · ∞</div>
      </section>

      <section
        id="field"
        ref={sectionRef}
        className={`field-section ${entered ? 'field-visible' : ''} ${night ? 'night-mode' : ''}`}
        aria-label="Explora nuestro campo"
      >
        <div className="field-hills" aria-hidden="true" />
        <div className="section-sky" />
        <div className="clouds" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="light-rays" aria-hidden="true" />
        <div className="birds" aria-hidden="true">
          <svg className="bird bird-a" viewBox="0 0 40 14" focusable="false">
            <path d="M3 10 C8 4 14 4 18 8 C22 4 28 4 34 8" />
          </svg>
          <svg className="bird bird-b" viewBox="0 0 40 14" focusable="false">
            <path d="M3 10 C8 4 14 4 18 8 C22 4 28 4 34 8" />
          </svg>
        </div>
        <div className="field-depth mist" />
        <div className="wind-streams" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className={`night-overlay ${night ? 'on' : ''}`} aria-hidden="true" />
        {night && (
          <div className="fireflies" aria-hidden="true">
            {fireflies.map((f, i) => (
              <i key={i} style={f as CSSProperties} />
            ))}
          </div>
        )}

        <div className="field-copy">
          <p className="eyebrow warm">
            <BsStars size={14} /> un lugar para nosotros
          </p>
          <h2>
            Quédate un ratito
            <br />
            <em>entre las flores.</em>
          </h2>
          <p className="section-text">
            Toca una flor para guardar su mensaje. Arrastra para pasear por el campo y haz zoom para acercarte a las que
            quieras.
          </p>
          <div className="love-note" aria-live="polite">
            <Heart size={16} fill="currentColor" />
            <span>{message?.text || 'Toca una flor, te quedará un mensaje'}</span>
          </div>
        </div>

        <div
          className={`field-viewport ${dragging ? 'dragging' : ''}`}
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onDoubleClick={(e) => zoomAt(1.45, e.clientX, e.clientY)}
        >
          <div
            className={`explorable-field ${allFound ? 'revealed' : ''}`}
            style={{ transform: `translate3d(${cam.x + offset.x * 0.6}px, ${cam.y + offset.y * 0.4}px, 0) scale(${cam.k})` }}
            aria-label="Campo de girasoles"
          >
            {flowers.map((flower, i) => (
              <button
                key={i}
                className={`sunflower ${flower.depth} ${flower.special ? 'special-flower' : ''} ${collected.has(i) ? 'collected' : ''
                  } ${lit.has(i) ? 'lit' : ''} ${allFound && flower.special && !specialFound ? 'reveal-hint' : ''}`}
                style={
                  {
                    left: `${flower.x}%`,
                    top: `${flower.y}%`,
                    '--flower-size': `${flower.size}px`,
                    '--tilt': `${flower.tilt}deg`,
                    '--delay': `${(i % 7) * 0.18}s`,
                  } as CSSProperties
                }
                onClick={() => touchFlower(flower, i)}
                aria-label={flower.special ? 'Una flor especial escondida' : 'Una flor con un mensaje'}
              >
                <span className="stem" />
                <span className="leaves" />
                <span className="petal-ring" />
                <span className="flower-center" />
                {collected.has(i) && (
                  <span className="picked-badge" aria-hidden="true">
                    <Heart size={12} fill="currentColor" />
                  </span>
                )}
              </button>
            ))}
            {message && (
              <div
                className="message-bubble"
                style={{ left: `${message.x}%`, top: `${message.y}%` }}
                onClick={() => setMessage(null)}
                role="status"
                aria-live="polite"
              >
                <Heart size={13} fill="currentColor" />
                <span>{message.text}</span>
              </div>
            )}
          </div>
        </div>

        <span className="butterfly butterfly-a" aria-hidden="true">
          <i className="wing wing-l" />
          <i className="body" />
          <i className="wing wing-r" />
        </span>
        <span className="butterfly butterfly-b" aria-hidden="true">
          <i className="wing wing-l" />
          <i className="body" />
          <i className="wing wing-r" />
        </span>
        <div className={`follow-holder ${bfVisible ? 'visible' : ''}`} aria-hidden="true">
          <div className="butterfly follow-butterfly" ref={bfRef}>
            <i className="wing wing-l" />
            <i className="body" />
            <i className="wing wing-r" />
          </div>
        </div>

        <div className="petals" aria-hidden="true">
          {petals.map((petal, i) => (
            <i key={i} style={petal as CSSProperties} />
          ))}
        </div>

        <div className="field-footer">
          <Wind size={16} /> deja que el viento haga lo suyo <span>•</span> y vuelve cuando quieras
        </div>
        <button className="field-scroll-down" onClick={() => document.getElementById('ending')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Bajar a la carta final">
          <ChevronDown size={16} />
        </button>
      </section>

      <section id="ending" className="ending-section" aria-label="Un mensaje para el final">
        <div className="ending-glow" aria-hidden="true" />
        <BsStars size={15} className="end-spark" />
        <p className="ending-eyebrow">una carta para ti, Diana</p>
        <h2 className="ending-title">
          Y al final,
          <br />
          <em>siempre tú.</em>
        </h2>
        <p className="ending-text">
          Este campo no tiene prisa ni final, como nosotros. Vuelve cuando quieras, Diana: las flores y yo te esperamos
          aquí, siempre.
        </p>
        <div className="heart-divider" aria-hidden="true">
          <Heart size={16} fill="currentColor" />
        </div>
        <p className="ending-credit">hecho con amor, para ti</p>
      </section>

      <div className="garden-counter" role="status" aria-live="polite">
        <IoFlowerOutline size={14} />
        <span className="counter-num">{collectedCount}</span>
        <span className="counter-total">de {COLLECTIBLE}</span>
      </div>

      {allFound && (
        <div className="all-found-note" role="status">
          <Heart size={13} fill="currentColor" />
          <span>Encontraste todas las flores, Diana. Queda una última sorpresa por descubrir.</span>
        </div>
      )}

      <div className="zoom-controls" aria-label="Controles del campo">
        <button onClick={() => zoomBy(-0.35)} aria-label="Alejar">
          <ZoomOut size={15} />
        </button>
        <button onClick={resetView} aria-label="Ver todo el campo">
          <Home size={15} />
        </button>
        <button onClick={() => zoomBy(0.35)} aria-label="Acercar">
          <ZoomIn size={15} />
        </button>
      </div>

      <button
        className="theme-button"
        onClick={() => setNight((n) => !n)}
        aria-label={night ? 'Activar modo día' : 'Activar modo noche'}
      >
        {night ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      <button
        className="sound-button"
        onClick={toggleSound}
        aria-label={muted ? 'Activar sonido' : 'Silenciar sonido'}
      >
        {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
      </button>

      {specialOpen && (
        <div className="special-overlay" role="dialog" aria-modal="true" aria-label="Una sorpresa para ti">
          <button className="close-special" onClick={() => setSpecialOpen(false)} aria-label="Cerrar">
            <X size={20} />
          </button>
          <div className="special-glow" aria-hidden="true" />
          <div className="special-petals" aria-hidden="true">
            {petals.slice(0, 8).map((petal, i) => (
              <i key={i} style={petal as CSSProperties} />
            ))}
          </div>
          <div className="special-flower-art">
            <span className="petal-ring" />
            <span className="flower-center" />
          </div>
          <p className="special-kicker">encontraste mi rincón secreto</p>
          <h3>
            Un rincón solo para ti, Diana <span className="h3-heart"><Heart fill="currentColor" /></span>
          </h3>
          <p className="special-message">
            Diana, entre todas estas flores quería dejarte algo más que un simple «feliz día». Quería recordarte que
            eres una persona muy especial para mí. Gracias por cada momento, cada sonrisa, cada abrazo y por formar
            parte de mi vida. Ojalá podamos seguir llenando nuestro propio campo de recuerdos bonitos. Te quiero
            muchísimo.
          </p>
          <p className="special-flower">
            <IoFlowerOutline />
          </p>
          <button onClick={() => setSpecialOpen(false)}>volver al campo</button>
        </div>
      )}
    </main>
  )
}