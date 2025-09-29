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

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const waveY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const dataY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ y: waveY }}
        >
          <path
            d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
            fill="url(#wave1)"
            stroke="#E8A0BF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z"
            fill="url(#wave2)"
            stroke="#E8A0BF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8A0BF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#E8A0BF" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8A0BF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#E8A0BF" stopOpacity="0.03" />
            </linearGradient>
          </defs>
        </motion.svg>

        <motion.div
          className="absolute w-2 h-2 bg-[#E8A0BF] rounded-full opacity-60"
          style={{ left: "10%", top: "20%", y: dataY }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-1 h-1 bg-[#E8A0BF] rounded-full opacity-40"
          style={{ right: "20%", top: "30%", y: dataY }}
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 bg-[#E8A0BF] rounded-full opacity-50"
          style={{ left: "70%", bottom: "40%", y: dataY }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />

        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="#E8A0BF"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.path
            d="M200,400 Q400,300 600,400 T1000,400"
            stroke="#E8A0BF"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </svg>
      </div>

      {/* Header */}
      <motion.header
        className="border-b border-slate-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50 relative"
        style={{ y: headerY }}
      >
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
              Monitoring the health of federated learning networks across medical institutions.
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
