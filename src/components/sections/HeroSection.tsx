import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

// ── Gooey morphing text ──────────────────────────────────────────────────────

interface GooeyTextProps {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
}

function GooeyText({ texts, morphTime = 1.2, cooldownTime = 1.8 }: GooeyTextProps) {
  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime
    let raf: number

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return
      text2Ref.current.style.filter  = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
      const inv = 1 - fraction
      text1Ref.current.style.filter  = `blur(${Math.min(8 / inv - 8, 100)}px)`
      text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`
    }

    const doCooldown = () => {
      morph = 0
      if (!text1Ref.current || !text2Ref.current) return
      text2Ref.current.style.filter  = ""
      text2Ref.current.style.opacity = "100%"
      text1Ref.current.style.filter  = ""
      text1Ref.current.style.opacity = "0%"
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime
      if (fraction > 1) { cooldown = cooldownTime; fraction = 1 }
      setMorph(fraction)
    }

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrement = cooldown > 0
      const dt = (newTime.getTime() - time.getTime()) / 1000
      time = newTime
      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrement) {
          textIndex = (textIndex + 1) % texts.length
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length]
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    animate()
    return () => cancelAnimationFrame(raf)
  }, [texts, morphTime, cooldownTime])

  return (
    <div style={{ position: "relative", height: "1.2em", width: "100%" }}>
      {/* SVG gooey filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="gooey-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: "url(#gooey-threshold)", position: "relative", height: "100%" }}>
        <span
          ref={text1Ref}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
            fontFamily: "'DM Serif Display', Georgia, serif",
          }}
        />
        <span
          ref={text2Ref}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
            fontFamily: "'DM Serif Display', Georgia, serif",
          }}
        />
      </div>
    </div>
  )
}

// ── Grain texture canvas ─────────────────────────────────────────────────────

function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGrain = () => {
      const { width, height } = canvas
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255
        data[i]     = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 18 // very subtle — crank up to 35 for more grain
      }

      ctx.putImageData(imageData, 0, 0)
      raf = requestAnimationFrame(drawGrain)
    }

    resize()
    window.addEventListener("resize", resize)
    drawGrain()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.045,
        mixBlendMode: "overlay",
        zIndex: 1,
      }}
    />
  )
}

// ── Hero Section ─────────────────────────────────────────────────────────────

const roles = [
  "Bishwas Shrestha",
  "Web Developer",
  "Web Designer",
  "Fullstack Engineer",
  "Creative Coder",
  "Open Source Contributor",
  "Freelancer",
  "Vibe Coder",
]

export default function HeroSection() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#070b13",
        overflow: "hidden",
      }}
    >
      {/* Grain */}
      <GrainOverlay />

      {/* Soft radial glow behind text */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          padding: "0 1.5rem",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 400,
            marginBottom : '5%'
          }}
        >
         BISHWAS SHRESTHA — 2025
        </motion.span>

        {/* Morphing text */}
        <div style={{ width: "100%", height: "clamp(3rem, 8vw, 6rem)" }}>
          <GooeyText texts={roles} morphTime={1.2} cooldownTime={1.8} />
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
            textAlign: "center",
            maxWidth: "420px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Building thoughtful digital experiences from Kathmandu — one pixel at a time.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1,
              height: "2.5rem",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
              borderRadius: "9999px",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}