import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Loader2, CheckCircle, FileText } from "lucide-react"

// ── Download button ───────────────────────────────────────────────────────────

type DownloadStatus = "idle" | "downloading" | "done"

function DownloadButton({
  status,
  progress,
  onClick,
}: {
  status: DownloadStatus
  progress: number
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={status === "idle" ? { scale: 1.04, y: -2 } : {}}
      whileTap={status === "idle" ? { scale: 0.97 } : {}}
      style={{
        position: "relative",
        overflow: "hidden",
        width: 200,
        height: 52,
        borderRadius: 14,
        border: "none",
        cursor: status === "idle" ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        fontWeight: 600,
        fontSize: "0.88rem",
        letterSpacing: "-0.01em",
        background: status === "done"
          ? "rgba(34,197,94,0.15)"
          : "rgba(255,255,255,0.92)",
        color: status === "done" ? "#22c55e" : "#070b13",
        border: status === "done"
          ? "1px solid rgba(34,197,94,0.3)"
          : "1px solid transparent",
        transition: "background 0.3s ease, color 0.3s ease",
        userSelect: "none",
      }}
    >
      {/* Progress fill */}
      {status === "downloading" && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            background: "rgba(34,197,94,0.25)",
            zIndex: 0,
            borderRadius: 14,
          }}
        />
      )}

      {/* Content */}
      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.4rem" }}>
        {status === "idle" && <><Download size={16} /> Download CV</>}
        {status === "downloading" && <><Loader2 size={16} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} /> {progress}%</>}
        {status === "done" && <><CheckCircle size={16} /> Downloaded!</>}
      </span>
    </motion.button>
  )
}

// ── Spinning keyframe ─────────────────────────────────────────────────────────

const spinStyle = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .cv-spin { animation: spin 1s linear infinite; }
`

// ── CV Download Section ───────────────────────────────────────────────────────

export default function CVDownloadSection() {
  const [status, setStatus] = useState<DownloadStatus>("idle")
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    if (status !== "idle") return

    // Start fake progress animation
    setStatus("downloading")
    setProgress(0)

    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 4
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setProgress(100)
        setStatus("done")

        // Trigger actual download
        const link = document.createElement("a")
        link.href = "/BishwasShrestha_CV.pdf"
        link.download = "BishwasShrestha_CV.pdf"
        link.click()

        // Reset after 3s
        setTimeout(() => {
          setStatus("idle")
          setProgress(0)
        }, 3000)
      } else {
        setProgress(current)
      }
    }, 100)
  }

  return (
    <section
      id="resume"
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
      <style>{spinStyle}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "40vw",
        height: "40vw",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.025)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          padding: "3.5rem 3rem",
          borderRadius: 24,
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* File icon */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <FileText size={28} />
        </motion.div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <span style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            My Resume
          </span>
          <h2 style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.15,
          }}>
            Download My CV
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            margin: 0,
            fontWeight: 300,
          }}>
            Want the full story? Grab my resume and see what I've been building.
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: "100%",
          height: 1,
          background: "rgba(255,255,255,0.06)",
        }} />

        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: "2rem",
          width: "100%",
          justifyContent: "center",
        }}>
          {[
            { label: "Experience", value: "2+ yrs" },
            { label: "Projects", value: "8+" },
            { label: "Format", value: "PDF" },
          ].map(item => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}>
                {item.value}
              </div>
              <div style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 2,
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Download button */}
        <DownloadButton
          status={status}
          progress={progress}
          onClick={handleDownload}
        />

        {/* File info */}
        <span style={{
          color: "rgba(255,255,255,0.15)",
          fontSize: "0.65rem",
          letterSpacing: "0.08em",
        }}>
          BishwasShrestha_CV.pdf
        </span>
      </motion.div>
    </section>
  )
}