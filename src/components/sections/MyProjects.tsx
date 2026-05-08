"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, X } from "lucide-react"
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook, 
  FaEnvelope 
} from 'react-icons/fa'; 

// ── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: "Web App" | "Full Stack" | "API/Backend" | "Open Source" | "Mobile App"
  github: string
  live: string
}

// ── Project data — replace with your real projects ───────────────────────────

const projects: Project[] = [
  {
    id: "p1",
    title: "DevBoard",
    description: "A full-stack developer dashboard with real-time analytics, task tracking, and GitHub integration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    category: "Full Stack",
    github: "https://github.com/bishwasgit",
    live: "https://devboard.app",
  },
  {
    id: "p2",
    title: "ShopFlow",
    description: "Modern e-commerce platform with cart, payments, and admin panel built for scale.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    category: "Web App",
    github: "https://github.com/bishwasgit",
    live: "https://shopflow.app",
  },
  {
    id: "p3",
    title: "RestForge",
    description: "Open-source REST API generator with schema-first design, auth, and auto-docs.",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop&q=80",
    tags: ["Node.js", "Express", "OpenAPI", "TypeScript"],
    category: "API/Backend",
    github: "https://github.com/bishwasgit",
    live: "https://restforge.dev",
  },
  {
    id: "p4",
    title: "NoteSync",
    description: "Cross-platform mobile notes app with offline-first sync and end-to-end encryption.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&q=80",
    tags: ["React Native", "SQLite", "Node.js"],
    category: "Mobile App",
    github: "https://github.com/bishwasgit",
    live: "https://notesync.app",
  },
  {
    id: "p5",
    title: "UIKit OS",
    description: "Open-source component library with 50+ accessible, dark-mode-ready React components.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop&q=80",
    tags: ["React", "TailwindCSS", "TypeScript", "Storybook"],
    category: "Open Source",
    github: "https://github.com/bishwasgit",
    live: "https://uikitos.dev",
  },
  {
    id: "p6",
    title: "AuthLayer",
    description: "Drop-in authentication microservice with OAuth2, JWT, and role-based access control.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&q=80",
    tags: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    category: "API/Backend",
    github: "https://github.com/bishwasgit",
    live: "https://authlayer.dev",
  },
  {
    id: "p7",
    title: "PulseUI",
    description: "Real-time collaborative web app for design feedback and annotation.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=500&fit=crop&q=80",
    tags: ["React", "WebSocket", "Node.js", "Canvas API"],
    category: "Web App",
    github: "https://github.com/bishwasgit",
    live: "https://pulseui.app",
  },
  {
    id: "p8",
    title: "OpenMetrics",
    description: "Open-source server monitoring tool with custom dashboards and alert pipelines.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop&q=80",
    tags: ["Go", "Prometheus", "React", "Docker"],
    category: "Open Source",
    github: "https://github.com/bishwasgit",
    live: "https://openmetrics.dev",
  },
]

const categories = ["All", "Web App", "Full Stack", "API/Backend", "Open Source", "Mobile App"] as const

// ── Category pill ────────────────────────────────────────────────────────────

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: "0.35rem 1rem",
        borderRadius: "9999px",
        fontSize: "0.72rem",
        fontWeight: 500,
        letterSpacing: "0.06em",
        cursor: "pointer",
        border: active
          ? "1px solid rgba(255,255,255,0.3)"
          : "1px solid rgba(255,255,255,0.08)",
        background: active
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0.03)",
        color: active
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,0.35)",
        transition: "all 0.2s ease",
        textTransform: "uppercase",
      }}
    >
      {label}
    </motion.button>
  )
}

// ── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  total,
  hoveredIndex,
  onHover,
  onLeave,
  onClick,
}: {
  project: Project
  index: number
  total: number
  hoveredIndex: number | null
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}) {
  const middle = Math.floor(total / 2)
  const distFromMiddle = Math.abs(index - middle)
  const staggerOffset = 110 - distFromMiddle * 18

  const isHovered = hoveredIndex === index
  const isOther = hoveredIndex !== null && !isHovered
  const yOffset = isHovered ? -130 : isOther ? 0 : -staggerOffset

  return (
    <motion.div
      style={{ zIndex: total - index, flexShrink: 0, cursor: "pointer" }}
      initial={{ transform: "perspective(5000px) rotateY(-45deg) translateY(200px)", opacity: 0 }}
      animate={{
        transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
        opacity: 1,
      }}
      transition={{ duration: 0.2, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
    >
      <div
        style={{
          position: "relative",
          width: "22rem",
          aspectRatio: "16/10",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: isHovered
            ? "0 32px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.01) 0.8px 0px 0.8px, rgba(0,0,0,0.03) 2.4px 0px 2.4px, rgba(0,0,0,0.08) 6.4px 0px 6.4px, rgba(0,0,0,0.25) 20px 0px 20px",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }}
          loading="lazy"
        />
        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(7,11,19,0.95) 0%, rgba(7,11,19,0.4) 60%, transparent 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1rem",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "white", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em" }}>
            {project.title}
          </span>
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {project.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6rem",
                  padding: "2px 8px",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            fontSize: "0.58rem",
            padding: "3px 10px",
            borderRadius: 9999,
            background: "rgba(7,11,19,0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
          }}
        >
          {project.category}
        </div>
      </div>
    </motion.div>
  )
}

// ── Modal ────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          borderRadius: 20,
          overflow: "hidden",
          background: "rgba(12,15,23,0.98)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(12,15,23,1) 0%, transparent 60%)",
          }} />

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Title + category */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "1.3rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: 0,
            }}>
              {project.title}
            </h3>
            <span style={{
              fontSize: "0.6rem",
              padding: "3px 10px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {project.category}
            </span>
          </div>

          {/* Description */}
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            fontWeight: 300,
            margin: 0,
          }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: "0.65rem",
                  padding: "4px 10px",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.25rem" }}>
              <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1.1rem",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: "0.78rem",
                fontWeight: 500,
              }}
            >
              <FaGithub size={14} /> GitHub
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1.1rem",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.92)",
                border: "none",
                color: "#070b13",
                textDecoration: "none",
                fontSize: "0.78rem",
                fontWeight: 600,
              }}
            >
              <ExternalLink size={14} /> Live Site
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Projects Section ─────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section
      id="projects"
      style={{
        width: "100%",
        background: "#070b13",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6rem 0 10rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", padding: "0 1.5rem", marginBottom: "2rem" }}
      >
        <span style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.68rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}>
          Selected Work
        </span>
        <h2 style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          marginTop: "0.4rem",
          lineHeight: 1.1,
        }}>
          Projects
        </h2>
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 1.5rem",
          marginBottom: "4rem",
        }}
      >
        {categories.map(cat => (
          <CategoryPill
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </motion.div>

      {/* 3D Gallery */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          overflowY: "visible",
          paddingBottom: "3rem",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "-18rem",
              marginLeft: "-18rem",
              paddingTop: "10rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              minWidth: "max-content",
              margin: "0 auto",
            }}
          >
            {filtered.map((project, i) => (
              <div key={project.id} style={{ marginLeft: i === 0 ? 0 : "-18rem" }}>
                <ProjectCard
                  project={project}
                  index={i}
                  total={filtered.length}
                  hoveredIndex={hoveredIndex}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hint */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          color: "rgba(255,255,255,0.18)",
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          marginTop: "1.5rem",
        }}
      >
        hover to preview · click to open
      </motion.span>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}