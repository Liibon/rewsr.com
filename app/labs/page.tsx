"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Logo } from "@/components/logo"

// Custom hand-drawn style icons
const LabIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#E8A0BF]">
    <path
      d="M10 4h12v8l-4 12H14l-4-12V4z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 8h12M10 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="18" r="1" fill="currentColor" />
    <circle cx="18" cy="20" r="1" fill="currentColor" />
  </svg>
)

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M12 4l-6 6 6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 3l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
      <header className="border-b border-slate-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center group">
              <div className="mr-3 transform group-hover:-translate-x-1 transition-transform">
                <BackIcon />
              </div>
              <Logo size="sm" linkWrapper={false} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-8 py-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-4 mb-8">
            <LabIcon />
            <div>
              <h1 className="text-6xl md:text-7xl font-light text-white leading-tight">
                REWSR Labs
                <span className="text-[#E8A0BF]">.</span>
              </h1>
              <p className="text-slate-400 font-mono text-sm tracking-wide mt-2">Applied Research Division</p>
            </div>
          </div>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
            Research the gaps between security standards and implementation, then build foundational technologies.
          </p>
        </motion.div>
      </section>

      {/* Minimal Anansi Button */}
      <section className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/labs/anansi">
              <motion.div
                className="group relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-2 border-slate-700/50 hover:border-[#E8A0BF]/50 backdrop-blur-sm transition-all duration-500 cursor-pointer"
                style={{ width: "400px", height: "300px" }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 60px rgba(232, 160, 191, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-conic from-[#E8A0BF]/20 via-transparent to-[#E8A0BF]/20"></div>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px h-full bg-[#E8A0BF]/20"
                      style={{
                        left: "50%",
                        transformOrigin: "bottom",
                        transform: `rotate(${i * 45}deg)`,
                      }}
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                  {/* Anansi Icon */}
                  <motion.div className="mb-8" whileHover={{ rotate: 5, scale: 1.1 }} transition={{ duration: 0.3 }}>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anansi_normal-Z4Gl2OGcgL3pCpoIRd5teLBKbKzxvt.png"
                      alt="Anansi"
                      className="w-20 h-20"
                      style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(140deg) brightness(1.2)" }}
                    />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-4xl font-light text-white mb-4 group-hover:text-[#E8A0BF] transition-colors duration-300 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    Anansi
                  </motion.h3>

                  {/* Subtitle */}
                  <motion.p
                    className="text-slate-400 text-center font-mono text-sm tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Cross-sovereign secure computing
                  </motion.p>

                  {/* Hover Arrow */}
                  <motion.div
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17l10-10M17 7H7v10"
                        stroke="#E8A0BF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#E8A0BF] opacity-0 group-hover:opacity-20"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-800 relative z-10 mt-32">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="text-center text-sm text-slate-500">
            © 2025 REWSR — Critical Infrastructure Research & Deployment
          </div>
        </div>
      </footer>
    </div>
  )
}
