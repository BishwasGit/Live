import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function useTime() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function HeroNav() {
  const time = useTime()

  const hours   = String(time.getHours()).padStart(2, "0")
  const minutes = String(time.getMinutes()).padStart(2, "0")
  const seconds = String(time.getSeconds()).padStart(2, "0")

  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const months   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const dayLabel = `${weekdays[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}`

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        paddingTop: "1rem",
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.6rem 1.5rem",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Date */}
        <span style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.7rem",
          fontWeight: 300,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          userSelect: "none",
        }}>
          {dayLabel}
        </span>

        {/* Divider */}
        <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)", display: "block" }} />

        {/* Clock */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px", fontFamily: "monospace" }}>
          <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.875rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {hours}
          </span>
          <motion.span
            style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", margin: "0 1px" }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            :
          </motion.span>
          <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.875rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {minutes}
          </span>
          <motion.span
            style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", margin: "0 1px" }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            :
          </motion.span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", fontWeight: 300, fontVariantNumeric: "tabular-nums" }}>
            {seconds}
          </span>
        </div>

        {/* Divider */}
        <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)", display: "block" }} />

        {/* Live dot */}
        <motion.span
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "block" }}
          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.header>
  )
}