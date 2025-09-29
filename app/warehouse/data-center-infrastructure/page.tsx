"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Logo } from "@/components/logo"

// Custom hand-drawn style icons
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

export default function DataCenterInfrastructurePage() {
  const timelineItems = [
    {
      quarter: "Q2",
      year: "2025",
      title: "Requirements Analysis",
      description: "Infrastructure assessment and technical specifications",
    },
    {
      quarter: "Q3",
      year: "2025",
      title: "Pilot Development",
      description: "Initial deployment and system integration",
    },
    {
      quarter: "Q4",
      year: "2025",
      title: "Beta Launch",
      description: "Limited release and performance validation",
    },
    {
      quarter: "Q1",
      year: "2026",
      title: "General Availability",
      description: "Full-scale enterprise deployment",
    },
  ]

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

      {/* Massive Timeline */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          {/* Timeline Container */}
          <div className="space-y-48">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-12 gap-8 items-center ${index % 2 === 0 ? "" : "text-right"}`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.3 }}
                viewport={{ once: true }}
              >
                {/* Quarter Display */}
                <div className={`col-span-12 md:col-span-4 ${index % 2 === 0 ? "md:order-1" : "md:order-3"}`}>
                  <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <div className="text-[12rem] md:text-[16rem] font-extralight leading-none text-white/10 select-none">
                      {item.quarter}
                    </div>
                    <div className="absolute top-8 left-0 text-2xl md:text-3xl font-light text-[#E8A0BF] tracking-[0.2em]">
                      {item.year}
                    </div>
                  </motion.div>
                </div>

                {/* Connecting Line */}
                <div
                  className={`col-span-12 md:col-span-4 ${index % 2 === 0 ? "md:order-2" : "md:order-2"} flex justify-center`}
                >
                  <motion.div
                    className="w-px h-32 bg-gradient-to-b from-transparent via-[#E8A0BF] to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Content */}
                <div className={`col-span-12 md:col-span-4 ${index % 2 === 0 ? "md:order-3" : "md:order-1"}`}>
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.7 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-4xl md:text-5xl font-extralight text-white leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-md">{item.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Progress Indicator */}
          <motion.div
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="flex flex-col space-y-4">
              {timelineItems.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full bg-slate-700"
                  whileInView={{ backgroundColor: "#E8A0BF", scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 relative z-10">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="text-center text-sm text-slate-500">
            © 2025 REWSR — Critical Infrastructure Research & Deployment
          </div>
        </div>
      </footer>
    </div>
  )
}
