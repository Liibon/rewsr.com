"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-stone-600 hover:text-black transition-all duration-300"
            >
              <ArrowLeft size={20} />
              <span className="font-mono text-sm">Back</span>
            </Link>
            <div className="h-6 w-px bg-stone-300/50" />
            <Logo size="sm" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Hero */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-8xl font-extralight text-black mb-16 tracking-tight leading-none">Methodology</h1>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-32"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Approach */}
          <section className="text-center">
            <div className="relative">
              <div className="w-24 h-px bg-stone-300 mx-auto mb-8"></div>
              <p className="text-2xl font-light text-stone-700 leading-relaxed max-w-2xl mx-auto">
                We build systems that work quietly in the background, making complex infrastructure problems disappear.
              </p>
              <div className="w-24 h-px bg-stone-300 mx-auto mt-8"></div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-2 h-2 bg-stone-400 rounded-full mx-auto mb-8 group-hover:bg-black transition-colors duration-300"></div>
              <h3 className="text-lg font-light text-black mb-4 tracking-wide">Evidence</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Every system we deploy generates cryptographic proof of its operations.
              </p>
            </motion.div>

            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-2 h-2 bg-stone-400 rounded-full mx-auto mb-8 group-hover:bg-black transition-colors duration-300"></div>
              <h3 className="text-lg font-light text-black mb-4 tracking-wide">Clarity</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Complex problems deserve simple, elegant solutions that people actually understand.
              </p>
            </motion.div>

            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-2 h-2 bg-stone-400 rounded-full mx-auto mb-8 group-hover:bg-black transition-colors duration-300"></div>
              <h3 className="text-lg font-light text-black mb-4 tracking-wide">Durability</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                We build for the long term, creating systems that remain reliable for decades.
              </p>
            </motion.div>
          </section>

          {/* Ornamental Divider */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-32 h-32 border border-stone-300 transform rotate-45"></div>
              <div className="absolute inset-4 border border-stone-200 transform rotate-45"></div>
              <div className="absolute inset-8 border border-stone-100 transform rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-stone-400 rounded-full"></div>
            </div>
          </motion.div>

          {/* Process */}
          <section className="text-center space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-extralight text-black mb-8 tracking-tight">Process</h2>
              <div className="max-w-xl mx-auto space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-8 h-px bg-stone-300"></div>
                  <span className="text-stone-600 font-light whitespace-nowrap">Listen deeply</span>
                  <div className="flex-1 h-px bg-stone-300"></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-8 h-px bg-stone-300"></div>
                  <span className="text-stone-600 font-light whitespace-nowrap">Build precisely</span>
                  <div className="flex-1 h-px bg-stone-300"></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-8 h-px bg-stone-300"></div>
                  <span className="text-stone-600 font-light whitespace-nowrap">Verify thoroughly</span>
                  <div className="flex-1 h-px bg-stone-300"></div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Final Statement */}
          <motion.section
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-px h-16 bg-stone-300 mx-auto mb-8"></div>
            <p className="text-xl font-extralight text-stone-800 leading-relaxed max-w-lg mx-auto italic">
              The best infrastructure is invisible until you need to prove it works.
            </p>
            <div className="w-px h-16 bg-stone-300 mx-auto mt-8"></div>
          </motion.section>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-16 bg-stone-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-sm text-stone-500 font-light tracking-wide">
            © 2025 REWSR — Infrastructure Research & Deployment
          </div>
        </div>
      </footer>
    </div>
  )
}
