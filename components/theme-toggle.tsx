"use client"

import { useState, useEffect } from "react"
import { Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed top-6 right-6 z-40">
      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-background border border-border text-foreground p-3 rounded-full hover:bg-muted transition-colors shadow-lg"
        aria-label="Toggle theme"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Moon size={18} />
      </motion.button>
    </div>
  )
}
