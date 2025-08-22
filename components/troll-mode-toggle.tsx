"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function TrollModeToggle() {
  const [showTroll, setShowTroll] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    setClickCount((prev) => prev + 1)
    setShowTroll(true)

    // Hide the troll after 2 seconds
    setTimeout(() => {
      setShowTroll(false)
    }, 2000)
  }

  // Get progressively more annoyed messages
  const getTrollMessage = () => {
    if (clickCount <= 1) return "Dark mode coming soon™"
    if (clickCount <= 3) return "Still working on it..."
    if (clickCount <= 5) return "You really want dark mode, huh?"
    if (clickCount <= 7) return "Keep clicking, maybe it'll work"
    if (clickCount <= 9) return "Persistence is key!"
    return "Fine, you win. Just kidding, no dark mode for you!"
  }

  return (
    <div className="fixed top-6 right-6 z-40">
      <button
        onClick={handleClick}
        className="bg-[#111] text-white p-2 rounded-full hover:bg-[#222] transition-colors"
        aria-label="Toggle dark mode"
      >
        <Sun size={16} className="hidden dark:block" />
        <Moon size={16} className="block dark:hidden" />
      </button>

      <AnimatePresence>
        {showTroll && (
          <motion.div
            className="absolute right-0 top-12 bg-white border border-[#111] p-4 w-64 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-start gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3v6bl5WTmE07j5vMpKoPuoc3KqzFwG.png"
                alt="Troll face"
                className="w-12 h-12"
              />
              <div className="flex-1">
                <p className="font-mono text-sm font-bold text-[#111]">{getTrollMessage()}</p>
                <p className="font-mono text-xs text-[#666] mt-1">Click count: {clickCount}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
