import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react"

// ── Playlist ─────────────────────────────────────────────────────────────────

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  embedUrl: string
  spotifyUrl: string
  color: string
}

const playlist: Track[] = [
  {
    id: "1",
    title: "Again",
    artist: "Shiloh Dynasty, timmies",
    album: "Again",
    duration: "2:14",
    embedUrl: "https://open.spotify.com/embed/track/3YMnUBnBxqBJtKTl2AFQMZ?utm_source=generator",
    spotifyUrl: "https://open.spotify.com/track/3YMnUBnBxqBJtKTl2AFQMZ",
    color: "#a78bfa",
  },
  {
    id: "2",
    title: "Love Runs Out",
    artist: "Martin Garrix, G-Eazy, Sasha Alex Sloan",
    album: "Love Runs Out",
    duration: "3:11",
    embedUrl: "https://open.spotify.com/embed/track/6tqnCGNBkPMjMQbCHFEBdF?utm_source=generator",
    spotifyUrl: "https://open.spotify.com/track/6tqnCGNBkPMjMQbCHFEBdF",
    color: "#f472b6",
  },
  {
    id: "3",
    title: "Moth To A Flame",
    artist: "Swedish House Mafia, The Weeknd",
    album: "Paradise Again",
    duration: "4:31",
    embedUrl: "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b?utm_source=generator",
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
    color: "#fb923c",
  },
  {
    id: "4",
    title: "bad vibes forever",
    artist: "XXXTENTACION, PnB Rock, Trippie Redd",
    album: "?",
    duration: "3:53",
    embedUrl: "https://open.spotify.com/embed/track/3ee8Jmje8o58CHK66QrVC2?utm_source=generator",
    spotifyUrl: "https://open.spotify.com/track/3ee8Jmje8o58CHK66QrVC2",
    color: "#ef4444",
  },
  {
    id: "5",
    title: "Lemonade",
    artist: "Internet Money, Gunna, Don Toliver, NAV",
    album: "B4 The Storm",
    duration: "2:52",
    embedUrl: "https://open.spotify.com/embed/track/43nMxMmqE9tFYBdJoHUXSP?utm_source=generator",
    spotifyUrl: "https://open.spotify.com/track/43nMxMmqE9tFYBdJoHUXSP",
    color: "#facc15",
  },
]

// ── Playlist item ─────────────────────────────────────────────────────────────

function PlaylistItem({
  track,
  index,
  isActive,
  onClick,
}: {
  track: Track
  index: number
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        padding: "0.75rem 1rem",
        borderRadius: 14,
        border: isActive
          ? `1px solid ${track.color}33`
          : "1px solid rgba(255,255,255,0.06)",
        background: isActive
          ? `${track.color}11`
          : "rgba(255,255,255,0.03)",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Index / playing indicator */}
      <div style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        background: isActive ? track.color : "rgba(255,255,255,0.06)",
        fontSize: "0.72rem",
        fontWeight: 700,
        color: isActive ? "#070b13" : "rgba(255,255,255,0.4)",
        transition: "background 0.2s ease",
      }}>
        {isActive
          ? <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Play size={12} fill="currentColor" />
            </motion.div>
          : index + 1
        }
      </div>

      {/* Track info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
          fontSize: "0.82rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: 0,
        }}>
          {track.title}
        </p>
        <p style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: "0.7rem",
          margin: 0,
          marginTop: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {track.artist}
        </p>
      </div>

      {/* Duration */}
      <span style={{
        color: "rgba(255,255,255,0.25)",
        fontSize: "0.68rem",
        letterSpacing: "0.06em",
        flexShrink: 0,
      }}>
        {track.duration}
      </span>
    </motion.button>
  )
}

// ── Control button ────────────────────────────────────────────────────────────

function ControlBtn({
  children,
  onClick,
  primary = false,
  color = "white",
}: {
  children: React.ReactNode
  onClick?: () => void
  primary?: boolean
  color?: string
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      style={{
        width: primary ? 52 : 40,
        height: primary ? 52 : 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: primary ? "none" : "1px solid rgba(255,255,255,0.1)",
        background: primary ? color : "rgba(255,255,255,0.05)",
        color: primary ? "#070b13" : "rgba(255,255,255,0.55)",
        flexShrink: 0,
      }}
    >
      {children}
    </motion.button>
  )
}

// ── Music Player Section ──────────────────────────────────────────────────────

export default function MusicPlayerSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [liked, setLiked] = useState<string[]>([])

  const track = playlist[activeIndex]

  const prev = () => setActiveIndex(i => (i - 1 + playlist.length) % playlist.length)
  const next = () => setActiveIndex(i => (i + 1) % playlist.length)
  const toggleLike = () =>
    setLiked(l => l.includes(track.id) ? l.filter(x => x !== track.id) : [...l, track.id])

  return (
    <section
      id="music"
      style={{
        width: "100%",
        minHeight: "100vh",
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
      {/* Ambient glow from track color */}
      <AnimatePresence mode="wait">
        <motion.div
          key={track.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background: track.color,
            opacity: 0.04,
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 1 }}
      >
        <span style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.68rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}>
          What I'm Listening To
        </span>
        <h2 style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          marginTop: "0.4rem",
          lineHeight: 1.1,
        }}>
          Music
        </h2>
      </motion.div>

      {/* Main glass card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 860,
          borderRadius: 24,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="music-grid"
      >
        {/* Left — player */}
        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", borderRight: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Now playing label */}
          <span style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            Now Playing
          </span>

          {/* Spotify embed */}
          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: `0 0 40px ${track.color}22`,
              }}
            >
              <iframe
                src={track.embedUrl}
                title={track.title}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ display: "block" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Track info */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
            <div style={{ minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={track.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {track.title}
                </motion.h3>
              </AnimatePresence>
              <p style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.75rem",
                margin: "0.25rem 0 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {track.artist}
              </p>
            </div>

            {/* Like button */}
            <motion.button
              onClick={toggleLike}
              whileTap={{ scale: 0.85 }}
              style={{
                width: 36, height: 36,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                color: liked.includes(track.id) ? "#f472b6" : "rgba(255,255,255,0.4)",
                transition: "color 0.2s ease",
              }}
            >
              <Heart
                size={15}
                fill={liked.includes(track.id) ? "#f472b6" : "none"}
              />
            </motion.button>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <ControlBtn><Shuffle size={15} /></ControlBtn>
            <ControlBtn onClick={prev}><SkipBack size={16} /></ControlBtn>
            <ControlBtn
              primary
              color={track.color}
              onClick={() => setIsPlaying(p => !p)}
            >
              {isPlaying
                ? <Pause size={20} fill="currentColor" />
                : <Play size={20} fill="currentColor" />
              }
            </ControlBtn>
            <ControlBtn onClick={next}><SkipForward size={16} /></ControlBtn>
            <ControlBtn><Repeat size={15} /></ControlBtn>
          </div>

          {/* Open in Spotify */}
          <a
            href={track.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              padding: "0.5rem",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.color = "#1DB954"
              el.style.borderColor = "#1DB95433"
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.color = "rgba(255,255,255,0.3)"
              el.style.borderColor = "rgba(255,255,255,0.07)"
            }}
          >
            {/* Spotify logo */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Open in Spotify
          </a>
        </div>

        {/* Right — playlist */}
        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            Playlist · {playlist.length} tracks
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {playlist.map((t, i) => (
              <PlaylistItem
                key={t.id}
                track={t}
                index={i}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Bottom volume hint */}
          <div style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}>
            <Volume2 size={14} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
            <div style={{
              flex: 1,
              height: 3,
              borderRadius: 9999,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}>
              <div style={{
                width: "70%",
                height: "100%",
                borderRadius: 9999,
                background: `linear-gradient(to right, ${track.color}, ${track.color}88)`,
                transition: "background 0.5s ease",
              }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Responsive style for mobile */}
      <style>{`
        @media (max-width: 640px) {
          .music-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}