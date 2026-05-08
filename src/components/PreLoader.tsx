"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const words = [
  "Hello",        // English
  "नमस्ते",        // Nepali
  "Bonjour",      // French
  "Ciao",         // Italian
  "Olá",          // Portuguese
  "やあ",           // Japanese
  "Hallå",        // Swedish
  "Guten Tag",    // German
  "হ্যালো",         // Bengali
  "Hola",         // Spanish
  "Привет",       // Russian
  "مرحبا",        // Arabic
  "你好",           // Chinese
  "안녕하세요",       // Korean
  "Bonjou",       // Haitian Creole
  "Salve",        // Latin
  "Merhaba",      // Turkish
  "سلام",         // Persian/Farsi
  "Hei",          // Norwegian
  "Hallo",        // Dutch
  "Sawubona",     // Zulu
  "Jambo",        // Swahili
  "Γεια",         // Greek
  "שלום",         // Hebrew
  "Ahoj",         // Czech
  "Cześć",        // Polish
  "Szia",         // Hungarian
  "Xin chào",     // Vietnamese
  "สวัสดี",         // Thai
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",  // Punjabi
  "નમસ્તે",         // Gujarati
  "ನಮಸ್ಕಾರ",       // Kannada
  "ഹലോ",          // Malayalam
  "வணக்கம்",       // Tamil
]

const opacityVariant = {
  initial: { opacity: 0 },
  enter: {
    opacity: 0.75,
    transition: { duration: 0.7, delay: 0.1 },
  },
}

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
  },
}

interface PreloaderProps {
  onComplete?: () => void
}

export default function PreLoader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)

  // Grab window size only on client
  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  // Word cycling + exit trigger
  useEffect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true)
        const completeTimer = setTimeout(() => onComplete?.(), 1000)
        return () => clearTimeout(completeTimer)
      }, 1000)
      return () => clearTimeout(exitTimer)
    }

    const delay = index === 0 ? 1000 : 150
    const t = setTimeout(() => setIndex((i) => i + 1), delay)
    return () => clearTimeout(t)
  }, [index, onComplete])

  const { width, height } = dimension

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`
  const targetPath  = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 flex items-center justify-center bg-[#070b13] z-[99999]"
    >
      {width > 0 && (
        <>
          <motion.p
            variants={opacityVariant}
            initial="initial"
            animate="enter"
            className="absolute z-10 flex items-center gap-3 text-white text-4xl md:text-5xl lg:text-6xl font-medium"
          >
            <span className="block w-2.5 h-2.5 rounded-full bg-white shrink-0" />
            {words[index]}
          </motion.p>

          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path
              variants={curve}
              initial="initial"
              animate={isExiting ? "exit" : "initial"}
              fill="#070b13"
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}