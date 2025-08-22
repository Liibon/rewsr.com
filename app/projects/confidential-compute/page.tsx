"use client"

import { useState, useEffect, useRef } from "react"
import { useScroll, useTransform } from "framer-motion"
import { motion } from "framer-motion"
import Link from "next/link"
import { Github, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { CopyButton } from "@/components/copy-button"

const features = [
  {
    title: "One-line workflow",
    description:
      "Go from source to secure deployment with a single command. No complex configurations or scripts needed.",
  },
  {
    title: "Multi-cloud TEEs",
    description: "Deploy consistently across AWS Nitro Enclaves, Intel SGX/TDX, and AMD SEV-SNP without code changes.",
  },
  {
    title: "Zero lock-in",
    description: "Built on open standards. Eject at any time without rewriting your applications or infrastructure.",
  },
  {
    title: "MIT-licensed OSS",
    description: "Fully open-source and community-driven. Inspect, modify, and contribute to the core platform.",
  },
]

export default function ConfidentialComputePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])
  const shapeScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className="min-h-screen bg-background flex flex-col justify-between overflow-hidden relative"
      >
        {/* Header */}
        <header className="border-b border-[#E8A0BF] relative z-20">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <ArrowLeft size={20} className="mr-3 transform group-hover:-translate-x-1 transition-transform" />
              <Logo size="sm" linkWrapper={false} />
            </Link>
            <div className="font-mono text-xs text-[#E8A0BF]">Case Study</div>
          </div>
        </header>

        {/* Abstract background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-background"></div>
          <div
            className="absolute top-0 right-0 bottom-0 w-1/3 bg-[#E8A0BF] transform -skew-x-12 origin-top-right"
            style={{ right: "-5%" }}
          ></div>
        </div>

        {/* Abstract geometric shapes with refined animations */}
        <motion.div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: backgroundOpacity }}>
          <motion.div
            className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-[#E8A0BF]/50 mix-blend-difference dark:mix-blend-normal"
            animate={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
            }}
            style={{
              scale: shapeScale,
              left: "10%",
              top: "15%",
            }}
            transition={{ type: "spring", damping: 50, stiffness: 20 }}
          />

          <motion.div
            className="absolute w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] border border-[#E8A0BF]"
            style={{
              rotate: 45,
              right: "15%",
              top: "20%",
              scale: shapeScale,
            }}
            animate={{
              rotate: [45, 47, 43, 45],
            }}
            transition={{
              rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          />

          <motion.div
            className="absolute w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] border-2 border-[#E8A0BF]/50"
            style={{
              borderRadius: "60% 40% 30% 70% / 30% 30% 70% 70%",
              right: "25%",
              bottom: "15%",
              scale: shapeScale,
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

        <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-16 md:pt-24 lg:pt-32 relative z-10 text-center">
          <motion.h1
            className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Docker-run simplicity for Confidential Compute
          </motion.h1>

          <motion.p
            className="font-mono text-lg md:text-xl text-[#E8A0BF] leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Pack • Attest • Deploy — one command
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <CopyButton textToCopy="curl -sSL rewsr.dev/install.sh | sh" successColor="#E8A0BF" />
            <Link
              href="https://github.com/rewsr/rewsr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-mono text-base px-6 py-3 border border-[#E8A0BF] text-[#E8A0BF] hover:bg-[#E8A0BF] hover:text-background transition-all duration-300 group w-full sm:w-auto whitespace-nowrap"
            >
              GitHub Repo
              <Github size={16} className="ml-2" />
            </Link>
          </motion.div>

          {/* Quickstart Section */}
          <motion.div
            className="w-full max-w-4xl mb-24 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="font-mono text-sm uppercase text-[#E8A0BF] mb-4 text-center">Quickstart</h2>
            <div className="bg-[#E8A0BF]/50 dark:bg-[#E8A0BF]/20 border border-[#E8A0BF] p-4 font-mono text-sm text-foreground overflow-x-auto">
              <pre className="text-left">
                <code>
                  <span className="text-green-500 dark:text-green-400"># 1. Install rewsr</span>
                  <br />
                  <span className="text-blue-500 dark:text-blue-400">$</span> curl -sSL rewsr.dev/install.sh | sh
                  <br />
                  <br />
                  <span className="text-green-500 dark:text-green-400"># 2. Package your application</span>
                  <br />
                  <span className="text-blue-500 dark:text-blue-400">$</span> rewsr pack my-app:latest
                  <br />
                  <br />
                  <span className="text-green-500 dark:text-green-400"># 3. Deploy to a TEE</span>
                  <br />
                  <span className="text-blue-500 dark:text-blue-400">$</span> rewsr deploy my-app:latest --cloud aws
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {features.map((feature, index) => (
              <div key={index} className="border-t-2 border-[#E8A0BF] pt-4">
                <h3 className="font-mono text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="font-mono text-base text-[#E8A0BF]">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </main>

        <motion.footer
          className="py-8 px-8 md:px-16 lg:px-24 border-t border-[#E8A0BF] font-mono text-xs text-[#E8A0BF] text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          © 2025 REWSR — MIT License
        </motion.footer>
      </div>
    </>
  )
}
