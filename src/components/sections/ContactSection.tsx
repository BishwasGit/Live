import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  MessageSquare,
  User,
  Send,
  CheckCircle,
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react"
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook, 
  FaEnvelope 
} from 'react-icons/fa'; 


// ── Types ─────────────────────────────────────────────────────────────────────

type FieldStatus = "idle" | "focused" | "filled" | "error"
type FormStatus = "idle" | "sending" | "sent" | "error"

interface FormData {
  name: string
  email: string
  message: string
}

// ── Socials ───────────────────────────────────────────────────────────────────

const socials = [
  { id: "github",    icon: <FaGithub size={16} />,    href: "https://github.com/bishwasgit",    label: "GitHub" },
  { id: "linkedin",  icon: <FaLinkedin size={16} />,  href: "https://linkedin.com/in/justbishwas", label: "LinkedIn" },
  { id: "instagram", icon: <FaInstagram size={16} />, href: "https://instagram.com/_bishwasshrestha",  label: "Instagram" },
  { id: "facebook",  icon: <FaFacebook size={16} />,  href: "https://facebook.com/_bishwasshrestha",   label: "Facebook" },
  { id: "email",     icon: <FaEnvelope size={16} />,      href: "mailto:workmail.bishwas@gmail.com", label: "Email" },
]

// ── Floating label input ──────────────────────────────────────────────────────

function FloatingField({
  label,
  icon,
  type = "text",
  value,
  onChange,
  multiline = false,
  error,
}: {
  label: string
  icon: React.ReactNode
  type?: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  error?: string
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  const baseStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "rgba(255,255,255,0.88)",
    fontSize: "0.9rem",
    fontWeight: 400,
    fontFamily: "inherit",
    resize: "none",
    padding: 0,
    lineHeight: 1.6,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <motion.div
        animate={{
          borderColor: error
            ? "rgba(239,68,68,0.5)"
            : focused
            ? "rgba(255,255,255,0.25)"
            : "rgba(255,255,255,0.08)",
          boxShadow: focused
            ? "0 0 0 3px rgba(255,255,255,0.04)"
            : "none",
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "relative",
          padding: multiline ? "1.6rem 1rem 0.8rem 3rem" : "1.4rem 1rem 0.5rem 3rem",
          borderRadius: 14,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: "border-color 0.2s ease",
        }}
      >
        {/* Icon */}
        <div style={{
          position: "absolute",
          left: "0.9rem",
          top: multiline ? "1.4rem" : "50%",
          transform: multiline ? "none" : "translateY(-50%)",
          color: focused ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
          transition: "color 0.2s ease",
          pointerEvents: "none",
        }}>
          {icon}
        </div>

        {/* Floating label */}
        <motion.label
          animate={{
            top: lifted ? (multiline ? "0.5rem" : "0.4rem") : "50%",
            y: lifted ? 0 : (multiline ? "-10%" : "-50%"),
            fontSize: lifted ? "0.62rem" : "0.85rem",
            color: lifted
              ? focused ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"
              : "rgba(255,255,255,0.3)",
            letterSpacing: lifted ? "0.12em" : "0",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{
            position: "absolute",
            left: "3rem",
            pointerEvents: "none",
            textTransform: "uppercase",
            fontWeight: 500,
            originX: 0,
          }}
        >
          {label}
        </motion.label>

        {/* Input / Textarea */}
        {multiline ? (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={4}
            style={{ ...baseStyle, paddingTop: "0.4rem" }}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...baseStyle, marginTop: "0.6rem" }}
          />
        )}
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{
              color: "rgba(239,68,68,0.8)",
              fontSize: "0.65rem",
              paddingLeft: "0.5rem",
              letterSpacing: "0.04em",
            }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Contact Section ───────────────────────────────────────────────────────────

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")

  const set = (key: keyof FormData) => (v: string) => {
    setForm(f => ({ ...f, [key]: v }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }))
  }

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim())           e.name    = "Name is required"
    if (!form.email.trim())          e.email   = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email"
    if (!form.message.trim())        e.message = "Message is required"
    else if (form.message.length < 10) e.message = "Message too short"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setFormStatus("sending")

    // Simulate API call — replace with your real endpoint
    await new Promise(r => setTimeout(r, 1800))

    setFormStatus("sent")
    setForm({ name: "", email: "", message: "" })

    setTimeout(() => setFormStatus("idle"), 4000)
  }

  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
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
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "50vw",
        height: "30vw",
        borderRadius: "50%",
        background: "rgba(139,92,246,0.06)",
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
        <span style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.68rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}>
          Let's Work Together
        </span>
        <h2 style={{
          color: "rgba(255,255,255,0.92)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          marginTop: "0.4rem",
          lineHeight: 1.1,
        }}>
          Get In Touch
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.28)",
          fontSize: "0.9rem",
          marginTop: "0.75rem",
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: 380,
          margin: "0.75rem auto 0",
        }}>
          Have a project in mind or just want to say hello? My inbox is always open.
        </p>
      </motion.div>

      {/* Two column layout */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 860,
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          borderRadius: 24,
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        }}
        className="contact-grid"
      >
        {/* Left — info panel */}
        <div style={{
          padding: "2.5rem 2rem",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          background: "rgba(255,255,255,0.02)",
        }}>
          <div>
            <h3 style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "0 0 0.5rem",
            }}>
              Bishwas Shrestha
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.78rem",
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 300,
            }}>
              Fullstack Web Developer based in Kathmandu, Nepal. Open to freelance, collaborations, and full-time opportunities.
            </p>
          </div>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[
              { icon: <Mail size={14} />, label: "Email", value: "workmail.bishwas@gmail.com", href: "mailto:workmail.bishwas@gmail.com" },
              { icon: <MessageSquare size={14} />, label: "Response", value: "Within 24 hours", href: null },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div style={{
                  width: 32, height: 32,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.4)",
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.75rem",
                      textDecoration: "none",
                      marginTop: 2,
                      display: "block",
                    }}>
                      {item.value}
                    </a>
                  ) : (
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: 2 }}>
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

          {/* Socials */}
          <div>
            <div style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.85rem",
            }}>
              Find me on
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {socials.map(s => (
                <motion.a
                  key={s.id}
                  href={s.href}
                  target={s.id !== "email" ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  style={{
                    width: 36, height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                    transition: "color 0.2s, background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = "rgba(255,255,255,0.85)"
                    el.style.background = "rgba(255,255,255,0.08)"
                    el.style.borderColor = "rgba(255,255,255,0.18)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = "rgba(255,255,255,0.4)"
                    el.style.background = "rgba(255,255,255,0.04)"
                    el.style.borderColor = "rgba(255,255,255,0.09)"
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Availability badge */}
          <div style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.6rem 0.9rem",
            borderRadius: 10,
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.15)",
          }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }}
            />
            <span style={{ color: "rgba(34,197,94,0.8)", fontSize: "0.7rem", fontWeight: 500 }}>
              Available for work
            </span>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>

          <AnimatePresence mode="wait">
            {formStatus === "sent" ? (
              // ── Success state ──
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  textAlign: "center",
                  padding: "3rem 1rem",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  style={{
                    width: 64, height: 64,
                    borderRadius: "50%",
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#22c55e",
                  }}
                >
                  <CheckCircle size={28} />
                </motion.div>
                <h3 style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>
                  Message Sent!
                </h3>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", margin: 0, lineHeight: 1.7 }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              // ── Form ──
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
              >
                <div>
                  <h3 style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    margin: "0 0 0.25rem",
                  }}>
                    Send a message
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem", margin: 0 }}>
                    Fill in the form and I'll get back to you shortly.
                  </p>
                </div>

                <FloatingField
                  label="Full Name"
                  icon={<User size={15} />}
                  value={form.name}
                  onChange={set("name")}
                  error={errors.name}
                />
                <FloatingField
                  label="Email Address"
                  icon={<Mail size={15} />}
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                />
                <FloatingField
                  label="Your Message"
                  icon={<MessageSquare size={15} />}
                  value={form.message}
                  onChange={set("message")}
                  multiline
                  error={errors.message}
                />

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={formStatus === "sending"}
                  whileHover={formStatus === "idle" ? { scale: 1.02, y: -1 } : {}}
                  whileTap={formStatus === "idle" ? { scale: 0.97 } : {}}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 1.5rem",
                    borderRadius: 12,
                    border: "none",
                    background: formStatus === "sending"
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(255,255,255,0.92)",
                    color: "#070b13",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: formStatus === "idle" ? "pointer" : "not-allowed",
                    letterSpacing: "-0.01em",
                    marginTop: "0.25rem",
                    transition: "background 0.2s ease",
                  }}
                >
                  {formStatus === "sending" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: 16, height: 16, border: "2px solid #070b13", borderTopColor: "transparent", borderRadius: "50%" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}