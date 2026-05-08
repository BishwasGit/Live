import { useState } from "react"
import { motion } from "framer-motion"
import { Coffee, RotateCcw } from "lucide-react"

// ── Payment data ──────────────────────────────────────────────────────────────

interface Payment {
  id: string
  name: string
  tagline: string
  message: string
  qr: string
  color: string
  accent: string
  logo: React.ReactNode
}

const payments: Payment[] = [
  {
    id: "khalti",
    name: "Khalti",
    tagline: "Scan & send via Khalti",
    message: "Your coffee fuels my late-night commits ☕ — deeply appreciated!",
    qr: "/khalti-qr.jpg",
    color: "#5C2D91",
    accent: "#7C3AED",
    logo: (
      <svg viewBox="0 0 120 40" width="90" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="40" rx="8" fill="#5C2D91"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize="14" fontWeight="700" fontFamily="sans-serif">
          Khalti
        </text>
      </svg>
    ),
  },
  {
    id: "esewa",
    name: "eSewa",
    tagline: "Scan & send via eSewa",
    message: "Every rupee means one more feature shipped 🚀 — you're a legend!",
    qr: "/esewa-qr.jpg",
    color: "#3D7A00",
    accent: "#4CAF50",
    logo: (
      <svg viewBox="0 0 120 40" width="90" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="40" rx="8" fill="#3D7A00"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize="14" fontWeight="700" fontFamily="sans-serif">
          eSewa
        </text>
      </svg>
    ),
  },
 {
  id: "nepal_global_bank",
  name: "Nepal Global Bank",
  tagline: "Secure Banking QR Payment",
  message: "Scan to Pay Securely",
  qr: "/global-qr.jpg",
  color: "#004B8D",        // deep banking blue
  accent: "#E30613",       // subtle red accent (common in Nepali banks)
  logo: (
    <svg viewBox="0 0 160 50" width="100" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="50" rx="6" fill="#FFFFFF"/>
      
      {/* Bank Icon */}
      <rect x="8" y="10" width="30" height="30" rx="4" fill="#004B8D"/>
      <text x="23" y="30" textAnchor="middle"
        fill="white" fontSize="14" fontWeight="700" fontFamily="sans-serif">
        NGB
      </text>

      {/* Bank Name */}
      <text x="50" y="22"
        fill="#004B8D" fontSize="12" fontWeight="700" fontFamily="sans-serif">
        Nepal Global Bank
      </text>

      {/* Tagline */}
      <text x="50" y="36"
        fill="#666" fontSize="9" fontFamily="sans-serif">
        Trusted. Secure. Reliable.
      </text>
    </svg>
  ),
}
]

// ── Flip card ─────────────────────────────────────────────────────────────────

function FlipCard({ payment }: { payment: Payment }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      style={{
        perspective: 1200,
        width: 260,
        height: 320,
        cursor: "pointer",
        flexShrink: 0,
      }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Front ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          borderRadius: 20,
          background: `linear-gradient(135deg, ${payment.color}cc, ${payment.accent}99)`,
          border: `1px solid ${payment.accent}44`,
          boxShadow: `0 20px 60px ${payment.color}44`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "2rem",
        }}>
          {/* Logo placeholder — replace SVG text with real logo if you have it */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}>
            {payment.logo}
          </div>

          <div style={{ textAlign: "center" }}>
            <h3 style={{
              color: "white",
              fontSize: "1.3rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: 0,
            }}>
              {payment.name}
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.75rem",
              margin: "0.4rem 0 0",
              letterSpacing: "0.04em",
            }}>
              {payment.tagline}
            </p>
          </div>

          {/* Flip hint */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.35rem 0.9rem",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <RotateCcw size={11} style={{ color: "rgba(255,255,255,0.6)" }} />
            <span style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Tap to see QR
            </span>
          </motion.div>
        </div>

        {/* ── Back ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          borderRadius: 20,
          background: "rgba(12,15,23,0.97)",
          border: `1px solid ${payment.accent}33`,
          boxShadow: `0 20px 60px ${payment.color}33`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.1rem",
          padding: "1.5rem",
        }}>
          {/* QR code */}
          <div style={{
            width: 148,
            height: 148,
            borderRadius: 14,
            background: "white",
            padding: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 30px ${payment.accent}44`,
          }}>
            <img
              src={payment.qr}
              alt={`${payment.name} QR`}
              style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}
              onError={e => {
                // Fallback if QR not added yet
                const el = e.currentTarget as HTMLImageElement
                el.style.display = "none"
                const parent = el.parentElement
                if (parent) {
                  parent.innerHTML = `<div style="color:#999;font-size:0.65rem;text-align:center;padding:0.5rem">Add QR to<br/>/public/${payment.id}-qr.jpg</div>`
                }
              }}
            />
          </div>

          {/* Message */}
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.72rem",
            textAlign: "center",
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 300,
            fontStyle: "italic",
          }}>
            "{payment.message}"
          </p>

          {/* Flip back hint */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}>
            <RotateCcw size={11} style={{ color: "rgba(255,255,255,0.2)" }} />
            <span style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Tap to flip back
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function BuyMeCoffeeSection() {
  return (
    <section
      id="coffee"
      style={{
        minHeight: "70vh",
        width: "100%",
        background: "#070b13",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient warm glow */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "50vw",
        height: "30vw",
        borderRadius: "50%",
        background: "rgba(251,191,36,0.04)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative", zIndex: 1 }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          style={{ display: "inline-block", marginBottom: "0.75rem" }}
        >
          <Coffee size={32} style={{ color: "rgba(251,191,36,0.7)" }} />
        </motion.div>

        <span style={{
          display: "block",
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.68rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: "0.4rem",
        }}>
          Support My Work
        </span>

        <h2 style={{
          color: "rgba(255,255,255,0.92)",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: "0 0 0.75rem",
          lineHeight: 1.1,
        }}>
          Buy Me a Coffee ☕
        </h2>

        <p style={{
          color: "rgba(255,255,255,0.28)",
          fontSize: "0.88rem",
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: 380,
          margin: "0 auto",
        }}>
          If my work made your day a little easier, consider sending some love.
          Every coffee keeps the commits flowing 🙏
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {payments.map((payment, i) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
          >
            <FlipCard payment={payment} />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{
          color: "rgba(255,255,255,0.12)",
          fontSize: "0.68rem",
          marginTop: "2.5rem",
          letterSpacing: "0.08em",
          position: "relative",
          zIndex: 1,
        }}
      >
        No account needed — just scan & pay ✨
      </motion.p>
    </section>
  )
}