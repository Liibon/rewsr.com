"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Logo } from "@/components/logo"

// Custom unique icons created from scratch
const LabIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#E8A0BF]">
    <path
      d="M16 4L8 12v12a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V12L16 4z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 16h8M12 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="10" r="1" fill="currentColor" />
    <circle cx="18" cy="10" r="1" fill="currentColor" />
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

// Custom Anansi web icon
const AnansiIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#E8A0BF]">
    <circle cx="24" cy="24" r="3" fill="currentColor" />
    <path d="M24 8v8M24 32v8M8 24h8M32 24h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M35.3 12.7l-5.7 5.7M18.4 29.6l-5.7 5.7M12.7 12.7l5.7 5.7M29.6 29.6l5.7 5.7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="24" cy="40" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="8" cy="24" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="40" cy="24" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

// Custom Prism evidence icon
const PrismIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-blue-400">
    <path
      d="M24 6L36 18v18L24 42L12 30V12L24 6z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M24 6v36M12 18h24M12 30h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="24" r="1.5" fill="currentColor" />
    <circle cx="30" cy="24" r="1.5" fill="currentColor" />
    <path d="M24 12l6 6-6 6-6-6 6-6z" stroke="currentColor" strokeWidth="1" fill="none" />
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

      {/* Project Grid */}
      <section className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Anansi Project */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/labs/anansi">
                <motion.div
                  className="group relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-2 border-slate-700/50 hover:border-[#E8A0BF]/50 backdrop-blur-sm transition-all duration-500 cursor-pointer h-80"
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
                    <motion.div className="mb-6" whileHover={{ rotate: 5, scale: 1.1 }} transition={{ duration: 0.3 }}>
                      <AnansiIcon />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-3xl font-light text-white mb-3 group-hover:text-[#E8A0BF] transition-colors duration-300 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      Anansi
                    </motion.h3>

                    <motion.p
                      className="text-slate-400 text-center font-mono text-sm tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 0.8, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      Distributed Computing Platform
                    </motion.p>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
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

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/labs/prism">
                <motion.div
                  className="group relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-2 border-slate-700/50 hover:border-blue-400/50 backdrop-blur-sm transition-all duration-500 cursor-pointer h-80"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 60px rgba(59, 130, 246, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-conic from-blue-400/20 via-transparent to-blue-400/20"></div>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-px h-full bg-blue-400/20"
                        style={{
                          left: "50%",
                          transformOrigin: "bottom",
                          transform: `rotate(${i * 60}deg)`,
                        }}
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                    <motion.div className="mb-6" whileHover={{ rotate: -5, scale: 1.1 }} transition={{ duration: 0.3 }}>
                      <PrismIcon />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-3xl font-light text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      Prism
                    </motion.h3>

                    <motion.p
                      className="text-slate-400 text-center font-mono text-sm tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 0.8, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Evidence Generation System
                    </motion.p>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 17l10-10M17 7H7v10"
                          stroke="#60a5fa"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-400 opacity-0 group-hover:opacity-20"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          </div>
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
