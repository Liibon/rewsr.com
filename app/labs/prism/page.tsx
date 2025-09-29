"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { useRef } from "react"

// Custom Prism icon with airgapped feel
const PrismIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-blue-400">
    <path
      d="M16 4L24 12v12L16 28L8 20V8L16 4z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M16 4v24M8 12h16M8 20h16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
    <circle cx="20" cy="16" r="1" fill="currentColor" />
    <path d="M16 8l4 4-4 4-4-4 4-4z" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <rect x="6" y="6" width="2" height="2" fill="currentColor" opacity="0.6" />
    <rect x="24" y="6" width="2" height="2" fill="currentColor" opacity="0.6" />
    <rect x="6" y="24" width="2" height="2" fill="currentColor" opacity="0.6" />
    <rect x="24" y="24" width="2" height="2" fill="currentColor" opacity="0.6" />
  </svg>
)

export default function PrismPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const spectrumY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const interferenceY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const quantumY = useTransform(scrollYProgress, [0, 1], [0, -70])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0 opacity-60" style={{ y: spectrumY }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="spectrum1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="20%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#d946ef" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="spectrum2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="quantumField" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#1d4ed8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
              </radialGradient>
              <filter id="quantumGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Electromagnetic wave interference patterns */}
            <motion.path
              d="M0,200 Q200,150 400,200 Q600,250 800,200 Q1000,150 1200,200"
              stroke="url(#spectrum1)"
              strokeWidth="6"
              fill="none"
              filter="url(#quantumGlow)"
              animate={{
                d: [
                  "M0,200 Q200,150 400,200 Q600,250 800,200 Q1000,150 1200,200",
                  "M0,200 Q200,250 400,200 Q600,150 800,200 Q1000,250 1200,200",
                  "M0,200 Q200,150 400,200 Q600,250 800,200 Q1000,150 1200,200",
                ],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,400 Q300,350 600,400 Q900,450 1200,400"
              stroke="url(#spectrum2)"
              strokeWidth="5"
              fill="none"
              filter="url(#quantumGlow)"
              animate={{
                d: [
                  "M0,400 Q300,350 600,400 Q900,450 1200,400",
                  "M0,400 Q300,450 600,400 Q900,350 1200,400",
                  "M0,400 Q300,350 600,400 Q900,450 1200,400",
                ],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
            />

            {/* Quantum field distortions */}
            <motion.ellipse
              cx="300"
              cy="300"
              rx="80"
              ry="40"
              fill="url(#quantumField)"
              filter="url(#quantumGlow)"
              animate={{
                rx: [60, 100, 60],
                ry: [30, 50, 30],
                rotate: [0, 45, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.ellipse
              cx="800"
              cy="500"
              rx="60"
              ry="30"
              fill="url(#quantumField)"
              filter="url(#quantumGlow)"
              animate={{
                rx: [50, 80, 50],
                ry: [25, 40, 25],
                rotate: [0, -30, 0],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            />

            {/* Holographic interference grid */}
            <motion.g opacity="0.4">
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={i * 150}
                  y1="0"
                  x2={i * 150}
                  y2="800"
                  stroke="#60a5fa"
                  strokeWidth="0.5"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="0"
                  y1={i * 130}
                  x2="1200"
                  y2={i * 130}
                  stroke="#60a5fa"
                  strokeWidth="0.5"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                />
              ))}
            </motion.g>
          </svg>
        </motion.div>

        <motion.div className="absolute inset-0" style={{ y: interferenceY }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-400"
              style={{
                left: `${5 + i * 4.5}%`,
                top: `${15 + (i % 5) * 12}%`,
                width: "2px",
                height: "2px",
                borderRadius: "50%",
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, -60, 30, -80, 0],
                x: [0, 40, -20, 60, 0],
                opacity: [0.3, 1, 0.5, 0.8, 0.3],
                scale: [0.5, 2, 1, 1.5, 0.5],
              }}
              transition={{
                duration: 12 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: quantumY }}
          animate={{
            background: [
              "conic-gradient(from 0deg at 30% 40%, rgba(96, 165, 250, 0.15) 0deg, rgba(59, 130, 246, 0.2) 90deg, rgba(29, 78, 216, 0.15) 180deg, rgba(30, 58, 138, 0.1) 270deg, rgba(96, 165, 250, 0.15) 360deg)",
              "conic-gradient(from 90deg at 70% 60%, rgba(147, 197, 253, 0.18) 0deg, rgba(96, 165, 250, 0.25) 90deg, rgba(59, 130, 246, 0.18) 180deg, rgba(29, 78, 216, 0.12) 270deg, rgba(147, 197, 253, 0.18) 360deg)",
              "conic-gradient(from 180deg at 50% 20%, rgba(59, 130, 246, 0.2) 0deg, rgba(29, 78, 216, 0.28) 90deg, rgba(30, 58, 138, 0.15) 180deg, rgba(96, 165, 250, 0.1) 270deg, rgba(59, 130, 246, 0.2) 360deg)",
              "conic-gradient(from 0deg at 30% 40%, rgba(96, 165, 250, 0.15) 0deg, rgba(59, 130, 246, 0.2) 90deg, rgba(29, 78, 216, 0.15) 180deg, rgba(30, 58, 138, 0.1) 270deg, rgba(96, 165, 250, 0.15) 360deg)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Secure perimeter boundaries */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-48 h-24 border-2 border-blue-400/40 rounded-lg"
          animate={{
            borderColor: [
              "rgba(96, 165, 250, 0.4)",
              "rgba(59, 130, 246, 0.7)",
              "rgba(29, 78, 216, 0.5)",
              "rgba(96, 165, 250, 0.4)",
            ],
            boxShadow: [
              "0 0 30px rgba(96, 165, 250, 0.2)",
              "0 0 60px rgba(59, 130, 246, 0.4)",
              "0 0 40px rgba(29, 78, 216, 0.3)",
              "0 0 30px rgba(96, 165, 250, 0.2)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/6 w-32 h-32 border-2 border-blue-300/30 rounded-full"
          animate={{
            borderColor: [
              "rgba(147, 197, 253, 0.3)",
              "rgba(96, 165, 250, 0.6)",
              "rgba(59, 130, 246, 0.4)",
              "rgba(147, 197, 253, 0.3)",
            ],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/labs" className="flex items-center group">
              <div className="mr-3 transform group-hover:-translate-x-1 transition-transform">
                <ArrowLeft size={20} />
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
            <PrismIcon />
            <div>
              <h1 className="text-6xl md:text-7xl font-light text-white leading-tight">
                Prism
                <span className="text-blue-400">.</span>
              </h1>
              <p className="text-slate-400 font-mono text-sm tracking-wide mt-2">Offline AI Evidence Generator</p>
            </div>
          </div>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-12">
            Airgapped AI evidence pack generator for cleared environments. Zero network, zero telemetry, maximum
            auditability.
          </p>

          <motion.div
            className="mb-16 p-6 bg-slate-900/40 border border-slate-700/50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img src="/images/carahsoft-logo-transparent.png" alt="Carahsoft" className="h-8 opacity-90" />
              <span className="text-blue-400 font-mono text-sm">× REWSR</span>
            </div>
            <p className="text-slate-300">
              Partnering with Carahsoft to bring Prism to government and enterprise environments requiring the highest
              levels of security and compliance.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Airgapped Features */}
      <section className="py-16 border-t border-slate-800 relative z-10">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light text-white mb-6">Airgapped Operation</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Single binary, no installation required</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Zero network connectivity needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Local ONNX/GGUF model execution</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Cryptographic evidence generation</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light text-white mb-6">Compliance Ready</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>ATO-friendly deployment model</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Deterministic, reproducible runs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Built-in PII/CUI redaction</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Cross-site hash verification</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 relative z-10 mt-32">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="text-center text-sm text-slate-500">
            © 2025 REWSR — Airgapped Infrastructure Research & Deployment
          </div>
        </div>
      </footer>
    </div>
  )
}
