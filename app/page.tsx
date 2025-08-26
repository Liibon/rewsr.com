"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { useRef } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative">
      {/* Abstract background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div
          className="absolute top-0 right-0 bottom-0 w-1/3 bg-slate-900 transform -skew-x-12 origin-top-right"
          style={{ right: "-5%" }}
        ></div>
      </div>

      {/* Abstract geometric shapes - Made more visible */}
      <motion.div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <motion.div
          className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-slate-700 border border-slate-600"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          style={{
            left: "10%",
            top: "15%",
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] border-2 border-slate-500 bg-slate-800/30"
          style={{
            rotate: 45,
            right: "15%",
            top: "20%",
          }}
          animate={{
            rotate: [45, 47, 43, 45],
          }}
          transition={{
            rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        />

        <motion.div
          className="absolute w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] border-2 border-slate-500 bg-slate-800/20"
          style={{
            borderRadius: "60% 40% 30% 70% / 30% 30% 70% 70%",
            right: "25%",
            bottom: "15%",
          }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 30% 30% 70% 70%",
              "40% 60% 70% 30% / 70% 70% 30% 30%",
              "60% 40% 30% 70% / 30% 30% 70% 70%",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Glitch effect line */}
      <div className="absolute left-0 right-0 h-[1px] bg-[#E8A0BF] z-10 opacity-70" style={{ top: "30%" }}></div>

      {/* Header */}
      <motion.header
        className="border-b border-slate-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50 relative"
        style={{ y: headerY }}
      >
        <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between">
          <Logo size="sm" />
          <nav className="hidden md:flex items-center space-x-12">
            <div className="relative group">
              <button className="text-sm text-slate-400 hover:text-white transition-colors">Solutions</button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 border border-slate-700 rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/solutions/campus-energy-networks"
                  className="block py-2 text-sm text-slate-300 hover:text-white"
                >
                  Campus Energy Networks
                </Link>
                <Link
                  href="/solutions/data-center-infrastructure"
                  className="block py-2 text-sm text-slate-300 hover:text-white"
                >
                  Data Center Infrastructure
                </Link>
              </div>
            </div>
            <Link href="/methodology" className="text-sm text-slate-400 hover:text-white transition-colors">
              Methodology
            </Link>
            <Link href="/labs" className="text-sm text-slate-400 hover:text-white transition-colors">
              Labs
            </Link>
            <Link
              href="https://github.com/Rewsr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <motion.section className="max-w-5xl mx-auto px-8 py-32 relative" style={{ y: heroY }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-light text-white leading-[0.9] mb-16 flex items-center flex-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            <span className="mr-8">Connections</span>
            <motion.span
              className="text-[#E8A0BF] font-normal mx-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5, type: "spring", stiffness: 200 }}
            >
              ×
            </motion.span>
            <motion.span
              className="font-normal relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              Execution
              <motion.div
                className="absolute -bottom-2 left-0 h-px bg-white"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
              />
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-400 leading-relaxed mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            We see connections others don't—between ideas, technologies, and possibilities—then build the technical
            implementations that make them real.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Philosophy Section - Now transparent */}
      <section className="border-t border-slate-800 relative z-10">
        <div className="max-w-5xl mx-auto px-8 py-32">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.blockquote
              className="text-3xl font-light text-white leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
            >
              "The most valuable connections
              <br />
              are the ones nobody thought to make
              <br />
              <span className="flex items-center justify-center gap-4 mt-4">
                until now."
                <motion.span
                  className="text-[#E8A0BF] text-4xl ml-4"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  ×
                </motion.span>
              </span>
            </motion.blockquote>
            <motion.div
              className="w-16 h-px bg-slate-700 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="border-t border-slate-800 relative z-10">
        <div className="max-w-5xl mx-auto px-8 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-medium text-white mb-6">Research</h3>
              <p className="text-slate-400 leading-relaxed">
                We study existing standards, identify gaps between specification and implementation, and design
                enforcement mechanisms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-medium text-white mb-6">Development</h3>
              <p className="text-slate-400 leading-relaxed">
                We build substrate layers that make compliance automatic, turning policy into executable infrastructure
                components.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-medium text-white mb-6">Deployment</h3>
              <p className="text-slate-400 leading-relaxed">
                We deploy enforcement systems that operate transparently, ensuring standards compliance without manual
                intervention.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 relative z-10">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-slate-500">© 2025 REWSR — Enforcement Substrate Research</div>
            <div className="mt-6 md:mt-0 flex items-center space-x-8">
              <Link
                href="https://github.com/Rewsr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-white transition-colors"
              >
                GitHub
              </Link>
              <Link href="/labs" className="text-sm text-slate-500 hover:text-white transition-colors">
                Labs
              </Link>
              <Link href="/methodology" className="text-sm text-slate-500 hover:text-white transition-colors">
                Methodology
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
