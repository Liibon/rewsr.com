"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Copy, Check, ExternalLink, X, ChevronDown, ChevronUp } from "lucide-react"
import { Logo } from "@/components/logo"

export default function AnansiPage() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [showGetStarted, setShowGetStarted] = useState(false)
  const [selectedPath, setSelectedPath] = useState<"engineer" | "compliance" | null>(null)
  const [showCliAccordion, setShowCliAccordion] = useState(false)
  const [showMarketplaceModal, setShowMarketplaceModal] = useState(false)

  const { scrollY, scrollYProgress } = useScroll()

  // Create spring-based animations for smooth wheel rotation
  const wheelRotation = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 720]), // Two full rotations
    { stiffness: 100, damping: 30, restDelta: 0.001 },
  )

  const wheelScale = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.8, 1.2, 1, 1.1, 0.9]), {
    stiffness: 200,
    damping: 40,
  })

  const wheelOpacity = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.3, 0.7, 1], [0.2, 0.8, 0.6, 0.4, 0.3]), {
    stiffness: 150,
    damping: 30,
  })

  // Track scroll velocity for dynamic effects
  useEffect(() => {
    let lastScrollY = 0
    let ticking = false

    const updateScrollVelocity = () => {
      const currentScrollY = window.scrollY
      const velocity = Math.abs(currentScrollY - lastScrollY)
      setScrollVelocity(velocity)
      lastScrollY = currentScrollY
      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollVelocity)
        ticking = true
      }
    }

    const handleScroll = () => requestTick()
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleMarketplaceClick = () => {
    setShowMarketplaceModal(true)
  }

  const engineerSteps = [
    {
      id: 1,
      title: "Install Anansi",
      subtitle: "Works with your existing setup",
      code: "pip install anansi-compute",
      description: "Just a pip install. No config files, no setup scripts, no headaches.",
    },
    {
      id: 2,
      title: "Wrap Your Function",
      subtitle: "One line change",
      code: `import anansi
result = anansi.compute(your_function, data, proof=True)`,
      description: "Your code stays the same. Just wrap it and get cryptographic proof of execution.",
    },
    {
      id: 3,
      title: "Get Your Proof",
      subtitle: "Tamper-evident results",
      code: `{
  "result": your_computed_result,
  "proof": "0x7f8a9b2c3d4e5f6a...",
  "attestation": "verified",
  "timestamp": "2025-01-20T23:33:38Z"
}`,
      description: "Standard cryptographic proof that anyone can verify. No trust required.",
    },
  ]

  const cloudProviders = [
    {
      name: "AWS",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Amazon_Web_Services_Logo-VkN1loXkFM005ogYvT5gUsxAaZwZS9.png",
    },
    {
      name: "Google Cloud",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_Cloud_Platform-Logo.wine-swls8jlzMgbSYRgpRPx3blhmA6eJNQ.png",
      size: "h-12",
    },
    {
      name: "Azure",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Microsoft_Azure.svg-9afokKMREYAkyLBCFysjMp9BL1pgBe.png",
    },
    {
      name: "Databricks",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2hDXiZUUjZg5muKKi7SsUndWgRJmAw.png",
    },
    {
      name: "Snowflake",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ocKbpCj5ZQ4esczpCQ32oNOsQUpnCP.png",
    },
  ]

  const sampleProofBundle = {
    version: "1.0",
    proof_id: "prf_2025-08-21_7c2a",
    job: {
      job_id: "dbx-13482",
      caller: "analyst@company.com",
      entrypoint: "s3://bucket/ml-training:sha256:3f8f...e21",
    },
    route: {
      cloud: "azure",
      region: "eastus",
      instance: "NCCads_H100_v5",
    },
    timing: {
      started_at: "2025-08-21T01:03:12Z",
      ended_at: "2025-08-21T01:07:55Z",
    },
    attestation: {
      cpu: {
        type: "SEV-SNP",
        verified: true,
      },
      gpu: {
        type: "NRAS",
        verified: true,
      },
    },
    signature: {
      alg: "EdDSA",
      verified: true,
    },
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Eight-Legged Wheel House - Casino Style */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative"
          style={{
            rotate: wheelRotation,
            scale: wheelScale,
            opacity: wheelOpacity,
          }}
        >
          {/* Central Hub with Glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="w-8 h-8 bg-gradient-radial from-[#E8A0BF] via-[#E8A0BF]/60 to-transparent rounded-full blur-sm" />
            <div className="absolute w-4 h-4 bg-[#E8A0BF] rounded-full" />
          </motion.div>

          {/* Eight Premium Spokes with Dynamic Effects */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute origin-bottom"
              style={{
                height: "50vw",
                maxHeight: "800px",
                width: "2px",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
              }}
            >
              {/* Main spoke */}
              <motion.div
                className="w-full h-full bg-gradient-to-t from-[#E8A0BF]/60 via-[#E8A0BF]/30 to-transparent"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleY: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  delay: i * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Velocity-based glow effect */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/20 via-white/10 to-transparent blur-sm"
                animate={{
                  opacity: scrollVelocity > 5 ? [0, 0.6, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          ))}

          {/* Dynamic Concentric Rings */}
          {[150, 250, 400, 600].map((radius, i) => (
            <motion.div
              key={i}
              className="absolute border rounded-full"
              style={{
                width: `${radius}px`,
                height: `${radius}px`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                borderColor: `rgba(232, 160, 191, ${0.1 + i * 0.05})`,
              }}
              animate={{
                rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                borderColor: [
                  `rgba(232, 160, 191, ${0.1 + i * 0.05})`,
                  `rgba(232, 160, 191, ${0.3 + i * 0.1})`,
                  `rgba(232, 160, 191, ${0.1 + i * 0.05})`,
                ],
              }}
              transition={{
                rotate: {
                  duration: 20 + i * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                borderColor: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            />
          ))}

          {/* Premium Node Points with Scroll Response */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`node-${i}`}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-300px)`,
              }}
            >
              <motion.div
                className="w-4 h-4 bg-gradient-radial from-[#E8A0BF] to-[#E8A0BF]/40 rounded-full"
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  filter: `blur(${scrollVelocity > 10 ? "2px" : "0px"})`,
                }}
              />

              {/* Trailing effect for fast scrolling */}
              <motion.div
                className="absolute inset-0 w-4 h-4 bg-white/30 rounded-full"
                animate={{
                  scale: scrollVelocity > 15 ? [1, 2, 0] : 0,
                  opacity: scrollVelocity > 15 ? [0.8, 0.2, 0] : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          ))}

          {/* Scroll Progress Indicator Ring */}
          <motion.div
            className="absolute border-2 border-transparent rounded-full"
            style={{
              width: "500px",
              height: "500px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: `conic-gradient(from 0deg, #E8A0BF ${scrollYProgress.get() * 360}deg, transparent ${scrollYProgress.get() * 360}deg)`,
              mask: "radial-gradient(circle, transparent 248px, black 250px)",
            }}
          />
        </motion.div>
      </div>

      {/* Enhanced Gradient Overlays */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70" />
        <motion.div
          className="absolute inset-0 bg-gradient-conic from-[#E8A0BF]/5 via-transparent to-[#E8A0BF]/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Marketplace Modal */}
      <AnimatePresence>
        {showMarketplaceModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMarketplaceModal(false)}
          >
            <motion.div
              className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowMarketplaceModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="text-center">
                <h3 className="text-2xl font-light text-white mb-4">Marketplace Approval Pending</h3>
                <p className="text-slate-400 mb-6">
                  We're currently waiting for marketplace approval from cloud providers. Direct CLI installation is
                  available now.
                </p>
                <div className="bg-black/50 p-4 rounded font-mono text-sm text-slate-200 mb-4">
                  <code>pip install anansi-compute</code>
                </div>
                <p className="text-slate-500 text-sm">Marketplace deployment will be available once approved.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Get Started Modal */}
      <AnimatePresence>
        {showGetStarted && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGetStarted(false)}
          >
            <motion.div
              className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-4xl w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowGetStarted(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-light text-white mb-8 text-center">Choose Your Path</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Engineers Tile */}
                <motion.div
                  className="bg-slate-800/50 border border-slate-600 rounded-lg p-8 cursor-pointer hover:border-[#E8A0BF] transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedPath("engineer")
                    setShowGetStarted(false)
                    document.getElementById("engineer-steps")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#E8A0BF]/20 rounded-lg flex items-center justify-center group-hover:bg-[#E8A0BF]/30 transition-colors relative">
                      <div className="w-6 h-6 border-2 border-[#E8A0BF] transform rotate-45"></div>
                      <div className="absolute w-3 h-3 bg-[#E8A0BF] rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">For Engineers</h3>
                      <p className="text-slate-400 text-sm">Get coding immediately</p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Jump straight to pip install and code examples. See how to integrate Anansi into your existing
                    Databricks workflows.
                  </p>
                  <div className="text-[#E8A0BF] font-mono text-sm">pip install → wrap function → get proof</div>
                </motion.div>

                {/* Compliance Tile */}
                <motion.div
                  className="bg-slate-800/50 border border-slate-600 rounded-lg p-8 cursor-pointer hover:border-[#E8A0BF] transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedPath("compliance")
                    setShowGetStarted(false)
                    document.getElementById("proof-verification")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#E8A0BF]/20 rounded-lg flex items-center justify-center group-hover:bg-[#E8A0BF]/30 transition-colors relative">
                      <div className="w-8 h-8 border-2 border-[#E8A0BF] rounded-full"></div>
                      <div className="absolute w-2 h-2 bg-[#E8A0BF] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute w-1 h-1 bg-[#E8A0BF] rounded-full top-2 left-2"></div>
                      <div className="absolute w-1 h-1 bg-[#E8A0BF] rounded-full top-2 right-2"></div>
                      <div className="absolute w-1 h-1 bg-[#E8A0BF] rounded-full bottom-2 left-2"></div>
                      <div className="absolute w-1 h-1 bg-[#E8A0BF] rounded-full bottom-2 right-2"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">For Compliance</h3>
                      <p className="text-slate-400 text-sm">Verify cryptographic proofs</p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    See how proof verification works. Understand the audit trail and cryptographic attestation that
                    makes your computations verifiable.
                  </p>
                  <div className="text-[#E8A0BF] font-mono text-sm">
                    verify signature → check attestation → audit trail
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-slate-800/50 bg-black/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/labs"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300"
            >
              <ArrowLeft size={20} />
              <span className="font-mono text-sm">Back to Labs</span>
            </Link>
            <div className="h-6 w-px bg-slate-700/50" />
            <Logo size="sm" />
            <div className="flex items-center gap-3">
              <motion.img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anansi_normal-Z4Gl2OGcgL3pCpoIRd5teLBKbKzxvt.png"
                alt="Anansi"
                className="w-8 h-8"
                style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(140deg) brightness(1.2)" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <span className="font-mono text-xl font-semibold text-white">Anansi</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/legal"
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-all duration-300 font-mono text-sm group"
            >
              Terms of Use
              <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section className="py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-7xl font-extralight text-white mb-8 leading-[0.9] tracking-tight">
              Anansi
              <br />
              <span className="font-light bg-gradient-to-r from-white to-[#E8A0BF] bg-clip-text text-transparent">
                Assurance Platform
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              Confidential computing with cryptographic proof generation for verifiable infrastructure operations across
              multi-cloud and regulated environments.
            </p>

            {/* Marketplace Login Button */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <motion.button
                onClick={handleMarketplaceClick}
                className="flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-[#E8A0BF] to-white text-black hover:from-white hover:to-[#E8A0BF] transition-all duration-500 font-mono font-medium tracking-wide"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Marketplace Login</span>
              </motion.button>
            </div>

            {/* Advanced/CLI Accordion */}
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setShowCliAccordion(!showCliAccordion)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono text-sm mx-auto"
              >
                Advanced / CLI
                {showCliAccordion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {showCliAccordion && (
                  <motion.div
                    className="mt-6 p-6 bg-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-left space-y-4">
                      <h3 className="text-white font-medium">Direct CLI Installation</h3>
                      <div className="bg-black/50 p-4 rounded font-mono text-sm text-slate-200">
                        <code>pip install anansi-compute</code>
                      </div>
                      <p className="text-slate-400 text-sm">
                        For developers who prefer direct integration without marketplace deployment.
                      </p>
                      <Link
                        href="https://github.com/rewsr/anansi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#E8A0BF] hover:text-white transition-colors text-sm font-mono"
                      >
                        View Documentation <ExternalLink size={14} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* Cloud Provider Support */}
        <section className="py-16 border-t border-slate-800/50">
          <div className="text-center mb-12">
            <p className="text-slate-400 font-mono text-sm mb-8">Runs on AWS • Azure • GCP • Databricks • Snowflake</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              {cloudProviders.map((provider, index) => (
                <motion.div
                  key={provider.name}
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.6, y: 0 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={provider.logo || "/placeholder.svg"}
                    alt={provider.name}
                    className={`${provider.size || "h-8"} object-contain filter brightness-0 invert`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What This Solves */}
        <section className="py-24 border-t border-slate-800/50">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extralight text-white mb-8 tracking-tight">
              Assurance Through
              <span className="text-[#E8A0BF] font-light"> Verification</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
              Cryptographic proof generation provides assurance for critical infrastructure operations across
              multi-cloud and regulated environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Trust Issues",
                description: "How do you prove your ML model actually trained on the data you claim? Now you can.",
                accent: "from-[#E8A0BF]/20 to-transparent",
              },
              {
                title: "Audit Trails",
                description:
                  "Compliance teams love cryptographic proof. No more explaining why your results are valid.",
                accent: "from-blue-500/20 to-transparent",
              },
              {
                title: "Reproducibility",
                description: "Research should be verifiable. This makes your computational work actually reproducible.",
                accent: "from-purple-500/20 to-transparent",
              },
            ].map((problem, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-full h-px bg-gradient-to-r ${problem.accent} mb-8 group-hover:opacity-100 opacity-50 transition-opacity duration-500`}
                />
                <h3 className="text-2xl font-light text-white mb-6 group-hover:text-[#E8A0BF] transition-colors duration-300">
                  {problem.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light text-lg">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Engineer Steps */}
        <section id="engineer-steps" className="py-24 border-t border-slate-800/50">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight text-white mb-8 tracking-tight">
              For
              <span className="text-[#E8A0BF] font-light"> Engineers</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
              Three steps. Takes about two minutes to set up. Works with whatever you're already doing.
            </p>
          </div>

          <div className="space-y-24">
            {engineerSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#E8A0BF] to-white text-black rounded-full flex items-center justify-center font-mono font-bold text-lg">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="text-3xl font-light text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 font-mono text-sm tracking-wide">{step.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xl text-slate-300 leading-relaxed font-light">{step.description}</p>
                </div>

                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <motion.div
                    className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-lg p-8 relative group backdrop-blur-xl"
                    whileHover={{
                      borderColor: "#E8A0BF",
                      boxShadow: "0 0 30px rgba(232, 160, 191, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      onClick={() => copyToClipboard(step.code, `step-${step.id}`)}
                      className="absolute top-6 right-6 p-3 bg-slate-800/80 border border-slate-600/50 hover:border-[#E8A0BF]/50 rounded-lg transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedStates[`step-${step.id}`] ? (
                        <Check size={18} className="text-[#E8A0BF]" />
                      ) : (
                        <Copy size={18} className="text-slate-400" />
                      )}
                    </motion.button>

                    <pre className="text-sm font-mono text-slate-200 overflow-x-auto pr-16 leading-relaxed">
                      <code>{step.code}</code>
                    </pre>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Proof Verification Demo */}
        <section id="proof-verification" className="py-24 border-t border-slate-800/50">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight text-white mb-8 tracking-tight">
              For
              <span className="text-[#E8A0BF] font-light"> Compliance</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
              Every computation generates a cryptographic proof bundle. Here's what auditors see.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-2xl font-light text-white mb-8">Proof Bundle Structure</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-[#E8A0BF] pl-6">
                  <h4 className="text-lg font-medium text-white mb-2">Job Identity</h4>
                  <p className="text-slate-400">Who ran it, what code, which data inputs</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-6">
                  <h4 className="text-lg font-medium text-white mb-2">Execution Environment</h4>
                  <p className="text-slate-400">Cloud, region, instance type, timing</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-6">
                  <h4 className="text-lg font-medium text-white mb-2">Cryptographic Attestation</h4>
                  <p className="text-slate-400">CPU and GPU hardware verification</p>
                </div>
                <div className="border-l-2 border-green-500 pl-6">
                  <h4 className="text-lg font-medium text-white mb-2">Digital Signature</h4>
                  <p className="text-slate-400">Tamper-evident seal over the entire bundle</p>
                </div>
              </div>
            </div>

            <div>
              <motion.div
                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-lg p-6 relative group backdrop-blur-xl"
                whileHover={{
                  borderColor: "#E8A0BF",
                  boxShadow: "0 0 30px rgba(232, 160, 191, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-white">Sample Proof Bundle</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm font-mono">VERIFIED</span>
                  </div>
                </div>

                <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-96 overflow-y-auto">
                  <code>{JSON.stringify(sampleProofBundle, null, 2)}</code>
                </pre>
              </motion.div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">Signature verified against public key</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">CPU attestation validated</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">GPU attestation validated</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">Timing and policy constraints met</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-slate-500 font-mono tracking-wide">
              © 2025 REWSR — Critical Infrastructure Research & Deployment
            </div>
            <div className="mt-8 md:mt-0 flex items-center space-x-12">
              <Link
                href="/legal"
                className="text-sm text-slate-500 hover:text-white transition-colors font-mono tracking-wide"
              >
                Terms
              </Link>
              <Link
                href="https://github.com/rewsr/anansi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-white transition-colors font-mono tracking-wide"
              >
                GitHub
              </Link>
              <Link
                href="/labs"
                className="text-sm text-slate-500 hover:text-white transition-colors font-mono tracking-wide"
              >
                Labs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
