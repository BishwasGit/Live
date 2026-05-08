import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  FolderKanban,
  Cpu,
  Music2,
  Mail,
  FileDown,
  User,
} from "lucide-react"

interface DockItem {
  id: string
  icon: React.ReactNode
  label: string
  sectionId: string
}

const dockItems: DockItem[] = [
  { id: "home",       icon: <Home size={18} />,         label: "Home",       sectionId: "home" },
  { id: "about",      icon: <User size={18} />,         label: "About",      sectionId: "about" },
  { id: "projects",   icon: <FolderKanban size={18} />, label: "Projects",   sectionId: "projects" },
  { id: "techstack",  icon: <Cpu size={18} />,          label: "Tech Stack", sectionId: "techstack" },
  { id: "music",      icon: <Music2 size={18} />,       label: "Music",      sectionId: "music" },
  { id: "contact",    icon: <Mail size={18} />,         label: "Contact",    sectionId: "contact" },
  { id: "resume",     icon: <FileDown size={18} />,     label: "Resume",     sectionId: "resume" },
]

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export default function BottomNavDock() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string>("home")

  function handleClick(item: DockItem) {
    setActiveId(item.id)
    scrollToSection(item.sectionId)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.625rem 1rem",
          borderRadius: "9999px",
          background: "rgba(10, 10, 15, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05)",
        }}
      >
        {dockItems.map((item) => {
          const isHovered = hoveredId === item.id
          const isActive  = activeId  === item.id

          return (
            <div
              key={item.id}
              style={{ position: "relative" }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.92 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 10px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(15,15,20,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "0.5rem",
                      padding: "0.25rem 0.625rem",
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon Button */}
              <motion.button
                onClick={() => handleClick(item)}
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  background: isActive
                    ? "rgba(255,255,255,0.12)"
                    : isHovered
                    ? "rgba(255,255,255,0.07)"
                    : "transparent",
                  color: isActive
                    ? "rgba(255,255,255,0.95)"
                    : isHovered
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(255,255,255,0.4)",
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
              >
                {item.icon}

                {/* Active dot */}
                {isActive && (
                  <motion.span
                    layoutId="active-dot"
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.7)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </motion.button>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}