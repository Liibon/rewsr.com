"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glitch effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-scanline"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-[#E8A0BF] opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
              height: `${Math.random() * 2}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-md text-center px-6">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="font-mono text-3xl md:text-4xl font-bold mb-6 text-[#E8A0BF]">End of Thread</h1>

          <p className="font-mono text-lg mb-8">You've reached the last thread. There's nothing here.</p>

          <Link
            href="/"
            className="inline-flex items-center font-mono text-base px-6 py-3 bg-[#E8A0BF] text-[#111] hover:bg-white transition-colors duration-300 group"
          >
            <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Return to main page
          </Link>
        </motion.div>

        {/* Removed ThemeToggle component */}
        <motion.div
          className="absolute bottom-6 right-6 w-4 h-4 bg-[#E8A0BF]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </div>
  )
}
