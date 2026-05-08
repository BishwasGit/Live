import { motion } from "framer-motion"
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook, 
  FaEnvelope 
} from 'react-icons/fa'; 

// ── Socials ──────────────────────────────────────────────────────────────────

const socials = [
  {
    id: "github",
    icon: <FaGithub size={18} />,
    href: "https://github.com/bishwasgit",
    label: "GitHub",
  },
  {
    id: "linkedin",
    icon: <FaLinkedin size={18} />,
    href: "https://linkedin.com/in/justbishwas",
    label: "LinkedIn",
  },
  {
    id: "instagram",
    icon: <FaInstagram size={18} />,
    href: "https://instagram.com/_bishwasshrestha",
    label: "Instagram",
  },
  {
    id: "facebook",
    icon: <FaFacebook size={18} />,
    href: "https://facebook.com/_bishwasshrestha",
    label: "Facebook",
  },
  {
    id: "gmail",
    icon: <FaEnvelope size={18} />,
    href: "mailto:workmail.bishwas@gmail.com",
    label: "Email",
  },
]

// ── Lamp container ───────────────────────────────────────────────────────────

function LampContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#070b13",
        width: "100%",
      }}
    >
      {/* Lamp beams */}
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          flex: 1,
          transform: "scaleY(1.25)",
          alignItems: "center",
          justifyContent: "center",
          isolation: "isolate",
          zIndex: 0,
        }}
      >
        {/* Left conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: "auto",
            right: "50%",
            height: "14rem",
            overflow: "visible",
            backgroundImage:
              "conic-gradient(from 70deg at center top, #06b6d4, transparent, transparent)",
            color: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              left: 0,
              background: "#070b13",
              height: "10rem",
              bottom: 0,
              zIndex: 20,
              maskImage: "linear-gradient(to top, white, transparent)",
              WebkitMaskImage: "linear-gradient(to top, white, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "10rem",
              height: "100%",
              left: 0,
              background: "#070b13",
              bottom: 0,
              zIndex: 20,
              maskImage: "linear-gradient(to right, white, transparent)",
              WebkitMaskImage: "linear-gradient(to right, white, transparent)",
            }}
          />
        </motion.div>

        {/* Right conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: "auto",
            left: "50%",
            height: "14rem",
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, #06b6d4)",
            color: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "10rem",
              height: "100%",
              right: 0,
              background: "#070b13",
              bottom: 0,
              zIndex: 20,
              maskImage: "linear-gradient(to left, white, transparent)",
              WebkitMaskImage: "linear-gradient(to left, white, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              right: 0,
              background: "#070b13",
              height: "10rem",
              bottom: 0,
              zIndex: 20,
              maskImage: "linear-gradient(to top, white, transparent)",
              WebkitMaskImage: "linear-gradient(to top, white, transparent)",
            }}
          />
        </motion.div>

        {/* Blur layers */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            height: "12rem",
            width: "100%",
            transform: "translateY(3rem) scaleX(1.5)",
            background: "#070b13",
            filter: "blur(24px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            zIndex: 50,
            height: "12rem",
            width: "100%",
            background: "transparent",
            opacity: 0.1,
            backdropFilter: "blur(12px)",
          }}
        />

        {/* Central glow blob */}
        <div
          style={{
            position: "absolute",
            inset: "auto",
            zIndex: 50,
            height: "9rem",
            width: "28rem",
            transform: "translateY(-50%)",
            borderRadius: "9999px",
            background: "#06b6d4",
            opacity: 0.4,
            filter: "blur(48px)",
          }}
        />

        {/* Inner glow */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: "auto",
            zIndex: 30,
            height: "9rem",
            transform: "translateY(-6rem)",
            borderRadius: "9999px",
            background: "#22d3ee",
            filter: "blur(32px)",
          }}
        />

        {/* Horizontal line */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: "auto",
            zIndex: 50,
            height: "2px",
            transform: "translateY(-7rem)",
            background: "#22d3ee",
          }}
        />

        {/* Bottom cover */}
        <div
          style={{
            position: "absolute",
            inset: "auto",
            zIndex: 40,
            height: "11rem",
            width: "100%",
            transform: "translateY(-12.5rem)",
            background: "#070b13",
          }}
        />
      </div>

      {/* Content sits above lamp */}
      <div
        style={{
          position: "relative",
          zIndex: 50,
          display: "flex",
          transform: "translateY(-18rem)",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 1.25rem",
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ── About Section ────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section id="about" style={{ width: "100%", background: "#070b13" }}>
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              color: "white",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            About Me
          </span>

          {/* Name */}
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Bishwas Shrestha
          </h2>

          {/* Role */}
          <p
            style={{
              color: "#22d3ee",
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Frontend & Backend Web Developer
          </p>

          {/* Bio */}
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              lineHeight: 1.8,
              fontWeight: 300,
              margin: 0,
            }}
          >
            I'm currently working as both Frontend and Backend Web Developer,
            crafting digital experiences that make a difference.
          </p>

          {/* Tagline */}
          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.85rem",
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            "Build the web, Dreaming in Packets"
          </p>

          {/* Divider */}
          <div
            style={{
              width: "2.5rem",
              height: "1px",
              background: "rgba(255,255,255,0.12)",
            }}
          />

          {/* Socials */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {socials.map((s, i) => (
              <motion.a
                key={s.id}
                href={s.href}
                target={s.id !== "gmail" ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = "#22d3ee"
                  el.style.borderColor = "#22d3ee44"
                  el.style.background = "rgba(6,182,212,0.08)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = "rgba(255,255,255,0.55)"
                  el.style.borderColor = "rgba(255,255,255,0.1)"
                  el.style.background = "rgba(255,255,255,0.05)"
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </LampContainer>
    </section>
  )
}