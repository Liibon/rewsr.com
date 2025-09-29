"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { useRef } from "react"

export default function HealthcarePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const vascularY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const synapticY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const bioY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0 opacity-50" style={{ y: vascularY }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="bloodFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8A0BF" stopOpacity="0" />
                <stop offset="30%" stopColor="#E8A0BF" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#E8A0BF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E8A0BF" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="organNode" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E8A0BF" stopOpacity="1" />
                <stop offset="50%" stopColor="#E8A0BF" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#E8A0BF" stopOpacity="0.3" />
              </radialGradient>
              <filter id="bioGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Vascular network branches */}
            <motion.path
              d="M100,200 Q300,150 500,200 Q700,250 900,200 Q1000,150 1100,200"
              stroke="url(#bloodFlow)"
              strokeWidth="4"
              fill="none"
              filter="url(#bioGlow)"
              animate={{ strokeDasharray: ["0 30", "30 30"], strokeDashoffset: [0, -60] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.path
              d="M150,400 Q350,350 550,400 Q750,450 950,400"
              stroke="url(#bloodFlow)"
              strokeWidth="3"
              fill="none"
              filter="url(#bioGlow)"
              animate={{ strokeDasharray: ["0 20", "20 20"], strokeDashoffset: [0, -40] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 }}
            />
            <motion.path
              d="M80,600 Q280,550 480,600 Q680,650 880,600 Q1000,550 1120,600"
              stroke="url(#bloodFlow)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#bioGlow)"
              animate={{ strokeDasharray: ["0 25", "25 25"], strokeDashoffset: [0, -50] }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 2 }}
            />

            {/* Organ nodes */}
            <motion.circle
              cx="300"
              cy="200"
              r="12"
              fill="url(#organNode)"
              filter="url(#bioGlow)"
              animate={{ r: [10, 16, 10], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.circle
              cx="700"
              cy="400"
              r="10"
              fill="url(#organNode)"
              filter="url(#bioGlow)"
              animate={{ r: [8, 14, 8], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            />
            <motion.circle
              cx="500"
              cy="600"
              r="14"
              fill="url(#organNode)"
              filter="url(#bioGlow)"
              animate={{ r: [12, 18, 12], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Capillary branches */}
            <motion.path
              d="M300,200 L280,180 M300,200 L320,180 M300,200 L280,220 M300,200 L320,220"
              stroke="#E8A0BF"
              strokeWidth="1"
              opacity="0.6"
              filter="url(#bioGlow)"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.path
              d="M700,400 L680,380 M700,400 L720,380 M700,400 L680,420 M700,400 L720,420"
              stroke="#E8A0BF"
              strokeWidth="1"
              opacity="0.6"
              filter="url(#bioGlow)"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </motion.div>

        <motion.div className="absolute inset-0" style={{ y: synapticY }}>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 6}%`,
                top: `${20 + (i % 4) * 15}%`,
                width: "1px",
                height: "20px",
                background: "linear-gradient(to bottom, transparent, #E8A0BF, transparent)",
                filter: "blur(0.5px)",
              }}
              animate={{
                scaleY: [1, 3, 0.5, 2, 1],
                opacity: [0.4, 1, 0.2, 0.8, 0.4],
                x: [0, 20, -10, 30, 0],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0 opacity-25"
          style={{ y: bioY }}
          animate={{
            background: [
              "radial-gradient(ellipse at 30% 40%, rgba(232, 160, 191, 0.2) 0%, transparent 50%)",
              "radial-gradient(ellipse at 70% 60%, rgba(232, 160, 191, 0.3) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 20%, rgba(232, 160, 191, 0.25) 0%, transparent 50%)",
              "radial-gradient(ellipse at 30% 40%, rgba(232, 160, 191, 0.2) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* EKG-style heartbeat monitor */}
        <motion.div className="absolute top-1/3 left-0 right-0 h-px">
          <motion.div
            className="h-full bg-[#E8A0BF] opacity-60"
            style={{
              clipPath: "polygon(0% 50%, 10% 50%, 15% 20%, 20% 80%, 25% 50%, 100% 50%)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>

      {/* Header */}
      <motion.header className="border-b border-slate-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center group">
              <div className="mr-3 transform group-hover:-translate-x-1 transition-transform">
                <ArrowLeft size={20} />
              </div>
              <Logo size="sm" linkWrapper={false} />
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        {/* Hero Section */}
        <section className="py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-light text-white leading-tight mb-8">
              Healthcare
              <span className="text-[#E8A0BF]">.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-16">
              Monitoring federated learning networks across medical institutions with real-time health tracking and
              privacy compliance.
            </p>
          </motion.div>
        </section>

        {/* Network Health Monitoring */}
        <section className="py-16 border-t border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#E8A0BF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#E8A0BF]">
                  <path d="M16 4L8 8v16l8 4 8-4V8l-8-4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M16 4v24M8 8l8 8 8-8" stroke="currentColor" strokeWidth="1" />
                  <circle cx="16" cy="16" r="2" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Node Health</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#E8A0BF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#E8A0BF]">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M16 8v8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                  <circle cx="24" cy="8" r="2" fill="currentColor" />
                  <circle cx="8" cy="24" r="2" fill="currentColor" />
                  <circle cx="24" cy="24" r="2" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Training Sync</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#E8A0BF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#E8A0BF]">
                  <path
                    d="M4 16h6l4-8 4 16 4-12 6 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="6" cy="6" r="1" fill="currentColor" />
                  <circle cx="16" cy="6" r="1" fill="currentColor" />
                  <circle cx="26" cy="6" r="1" fill="currentColor" />
                  <circle cx="6" cy="26" r="1" fill="currentColor" />
                  <circle cx="26" cy="26" r="1" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Privacy Metrics</h3>
            </motion.div>
          </div>
        </section>

        {/* Cloud Provider Support */}
        <section className="py-16 border-t border-slate-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-light text-white mb-8">Trusted Execution Environments</h3>
            <div className="flex items-center justify-center gap-12 opacity-60">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Amazon_Web_Services_Logo-VkN1loXkFM005ogYvT5gUsxAaZwZS9.png"
                alt="AWS"
                className="h-8 filter brightness-0 invert opacity-60"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Microsoft_Azure.svg-9afokKMREYAkyLBCFysjMp9BL1pgBe.png"
                alt="Azure"
                className="h-8 filter brightness-0 invert opacity-60"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-51QfOKb4Mhhu6YzEpkDVVxXOpTMwox.png"
                alt="Google Cloud"
                className="h-8 opacity-60"
              />
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 relative z-10 mt-32">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="text-center text-sm text-slate-500">
            © 2025 REWSR — Healthcare Infrastructure Research & Deployment
          </div>
        </div>
      </footer>
    </div>
  )
}
