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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const prismY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const lightY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0 opacity-15" style={{ y: backgroundY }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="prismGrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#1e40af" strokeWidth="0.3" />
                <path d="M 4 0 L 8 4 L 4 8 L 0 4 Z" fill="none" stroke="#3b82f6" strokeWidth="0.2" />
              </pattern>
              <linearGradient id="lightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#prismGrid)" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute w-24 h-24 border border-blue-400/30"
          style={{
            left: "15%",
            top: "25%",
            y: prismY,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
          animate={{
            rotate: [0, 3, -3, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-32 h-16 border border-blue-300/25"
          style={{
            right: "20%",
            top: "35%",
            y: prismY,
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
          animate={{
            rotate: [0, -2, 2, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="absolute w-1 h-40 bg-gradient-to-b from-blue-400/20 to-transparent"
          style={{
            left: "60%",
            bottom: "30%",
            y: lightY,
            transform: "rotate(15deg)",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleY: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          className="absolute w-1 h-32 bg-gradient-to-b from-blue-300/15 to-transparent"
          style={{
            left: "25%",
            bottom: "45%",
            y: lightY,
            transform: "rotate(-20deg)",
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scaleY: [1, 1.3, 1],
          }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
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
