"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { Logo } from "@/components/logo"

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute border border-slate-700/20 rounded-full"
              style={{
                width: `${400 + i * 200}px`,
                height: `${400 + i * 200}px`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 relative z-20 bg-black/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <ArrowLeft size={20} className="mr-3 transform group-hover:-translate-x-1 transition-transform" />
            <Logo size="sm" linkWrapper={false} />
          </Link>
          <div className="font-mono text-xs text-slate-500">Research Division</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-8 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-light text-white leading-tight mb-8">
              Research
              <span className="text-[#E8A0BF]">.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-16">
              We research the fundamental gaps between security standards and their real-world implementations, then
              build enforcement substrates that make compliance automatic.
            </p>
          </motion.div>
        </section>

        {/* Current Projects */}
        <section className="border-t border-slate-800 py-24 bg-black/70 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-8">
            <motion.h2
              className="text-3xl font-medium text-white mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Active Projects
            </motion.h2>

            <motion.div
              className="bg-slate-900/50 border border-slate-700/50 p-8 hover:border-[#E8A0BF]/30 transition-all duration-300 group backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/projects/anansi" className="block">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anansi_normal-Z4Gl2OGcgL3pCpoIRd5teLBKbKzxvt.png"
                      alt="Anansi"
                      className="w-12 h-12"
                      style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(140deg) brightness(1.2)" }}
                    />
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-[#E8A0BF] transition-colors">
                        Anansi
                      </h3>
                      <span className="text-sm text-[#E8A0BF] bg-[#E8A0BF]/10 px-3 py-1 rounded">
                        Active Development
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-slate-500 group-hover:text-[#E8A0BF] transition-colors" />
                </div>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Multi-cloud compute orchestration with cryptographic proof generation. Enables verifiable computation
                  across distributed environments with tamper-evident results.
                </p>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Thoughts Section */}
        <section className="border-t border-slate-800 py-24 bg-black/70 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-8">
            <motion.h2
              className="text-3xl font-medium text-white mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Thoughts
            </motion.h2>

            <motion.div
              className="bg-slate-900/50 border border-slate-700/50 p-8 hover:border-[#E8A0BF]/30 transition-all duration-300 group backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/thoughts/gpu-tee-aws-headache" className="block">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-[#E8A0BF] transition-colors">
                      GPU TEEs and the AWS Headache
                    </h3>
                    <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded">2025.01.21</span>
                  </div>
                  <ExternalLink size={16} className="text-slate-500 group-hover:text-[#E8A0BF] transition-colors" />
                </div>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Building Anansi Alpha while AWS drags their feet on GPU confidential computing. Here's how we're
                  working around it with multi-cloud MPC.
                </p>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="border-t border-slate-800 py-24 bg-black/70 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-8">
            <motion.h2
              className="text-3xl font-medium text-white mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Research Focus Areas
            </motion.h2>

            <div className="space-y-12">
              {[
                {
                  title: "Enforcement Substrate Architecture",
                  description:
                    "Designing infrastructure layers that automatically enforce compliance without manual intervention.",
                  status: "Active Research",
                },
                {
                  title: "Standards Implementation Gap Analysis",
                  description:
                    "Identifying disconnects between specification and real-world implementation across security standards.",
                  status: "Ongoing",
                },
                {
                  title: "Executable Policy Frameworks",
                  description: "Converting human-readable policies into machine-executable enforcement mechanisms.",
                  status: "Early Stage",
                },
              ].map((area, index) => (
                <motion.div
                  key={index}
                  className="border-l-2 border-[#E8A0BF] pl-8 bg-black/50 backdrop-blur-sm p-6 rounded-r-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-medium text-white">{area.title}</h3>
                    <span className="text-sm text-[#E8A0BF] bg-[#E8A0BF]/10 px-3 py-1 rounded">{area.status}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed max-w-3xl">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="border-t border-slate-800 py-24 bg-black/70 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-8">
            <motion.h2
              className="text-3xl font-medium text-white mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Publications
            </motion.h2>

            <motion.div
              className="bg-slate-900/50 border border-slate-700/50 p-8 hover:border-[#E8A0BF]/30 transition-colors backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-medium text-white max-w-3xl">
                  Towards Automated Standards Enforcement in Distributed Systems
                </h3>
                <span className="text-sm text-slate-500 font-mono">2025</span>
              </div>
              <div className="text-sm text-slate-400 mb-2">
                REWSR Research Team • <span className="text-[#E8A0BF]">In Preparation</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Exploring methods for automatic enforcement of security and compliance standards in modern distributed
                architectures through substrate-level policy implementation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Collaboration */}
        <section className="border-t border-slate-800 py-24 bg-black/70 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-medium text-white mb-8">Research Collaboration</h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-12">
                Interested in collaborating on enforcement substrate research? We're always looking for partners who
                share our vision of making standards executable.
              </p>
              <Link
                href="https://github.com/Rewsr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-mono text-base px-8 py-4 border border-[#E8A0BF] text-[#E8A0BF] hover:bg-[#E8A0BF] hover:text-black transition-all duration-300 group"
              >
                View Our Work on GitHub
                <Github size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 relative z-10 bg-black/90 backdrop-blur-sm">
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
              <Link href="/" className="text-sm text-slate-500 hover:text-white transition-colors">
                Home
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
