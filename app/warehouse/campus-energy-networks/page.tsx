"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function CampusEnergyNetworksPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMobile, setIsMobile] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const energyY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -150])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Real-time data simulation
  const [metrics] = useState({
    totalCapacity: 2847.3,
    activeLoad: 1923.7,
    efficiency: 94.2,
    peakDemand: 2156.8,
    storageLevel: 78.4,
    gridStability: 99.7,
  })

  const stations = [
    { id: "EN-001", location: "North Campus", capacity: 450.2, load: 312.8, status: "optimal" },
    { id: "EN-002", location: "Engineering", capacity: 680.5, load: 445.3, status: "optimal" },
    { id: "EN-003", location: "Residence Hall", capacity: 320.8, load: 298.1, status: "high" },
    { id: "EN-004", location: "Medical Center", capacity: 890.3, load: 567.2, status: "optimal" },
    { id: "EN-005", location: "Athletics", capacity: 505.5, load: 300.3, status: "optimal" },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0 opacity-10" style={{ y: energyY }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="energyGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#22c55e" strokeWidth="0.3" />
                <circle cx="5" cy="5" r="0.3" fill="#22c55e" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#energyGrid)" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute w-16 h-16 border border-green-500/30 rounded-full"
          style={{
            left: "12%",
            top: "20%",
            y: gridY,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-12 h-12 border border-green-400/25 rounded-lg"
          style={{
            right: "18%",
            top: "35%",
            y: gridY,
          }}
          animate={{
            rotate: [0, 90, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />

        <svg className="absolute inset-0 w-full h-full opacity-15">
          <motion.path
            d="M50,100 Q200,50 400,100 T800,100"
            stroke="#22c55e"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800/30 bg-black/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 text-slate-500 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={isMobile ? 16 : 18} />
              <span className="font-mono text-xs sm:text-sm tracking-wide">REWSR</span>
            </Link>
            <div className="h-3 sm:h-4 w-px bg-slate-800" />
            <Logo size="sm" />
          </div>
          <div className="font-mono text-xs text-slate-500 tracking-wider">
            {isMobile
              ? currentTime.toLocaleTimeString("en-US", { hour12: false })
              : `${currentTime.toISOString().slice(0, 19)}Z`}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        {/* Title */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-xl sm:text-2xl font-light text-white mb-2 tracking-wide">
            {isMobile ? "Campus Energy" : "Campus Energy Networks"}
          </h1>
          <p className="text-slate-500 font-mono text-xs sm:text-sm tracking-wide">
            {isMobile ? "Energy monitoring" : "Real-time energy distribution monitoring"}
          </p>
        </div>

        {/* Warehouse Facility Showcase Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-slate-500 font-mono text-xs tracking-wider mb-3 sm:mb-4">
            {isMobile ? "FACILITY" : "WAREHOUSE FACILITY"}
          </div>
          <div className="h-px bg-slate-800 mb-6 sm:mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4">Industrial-Grade Infrastructure</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Our warehouse facility houses dozens of industrial kiosks and terminals, representing tens of thousands
                in investment as of September 29th, 2025. This infrastructure serves as the backbone for our energy
                monitoring and distribution systems.
              </p>
              <div className="space-y-2 text-sm text-slate-300">
                <div>• Industrial-grade monitoring terminals</div>
                <div>• Real-time data processing infrastructure</div>
                <div>• Scalable deployment architecture</div>
                <div>• Enterprise-ready hardware solutions</div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/warehouse-kiosks.png"
                alt="REWSR Warehouse Facility - Industrial Kiosks"
                className="w-3/4 mx-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              <div className="absolute bottom-4 left-4 text-xs text-white/80 font-mono">
                Warehouse Facility — Sept 29, 2025
              </div>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="lg:col-span-4">
            <div className="space-y-6 sm:space-y-8">
              {/* Key Metrics */}
              <div className={`grid ${isMobile ? "grid-cols-2 gap-4" : "grid-cols-3 gap-8"}`}>
                <div>
                  <div className="text-slate-500 font-mono text-xs tracking-wider mb-1 sm:mb-2">
                    {isMobile ? "CAPACITY" : "TOTAL CAPACITY"}
                  </div>
                  <div className="text-lg sm:text-2xl font-light text-white">{metrics.totalCapacity.toFixed(1)}</div>
                  <div className="text-slate-500 font-mono text-xs">kW</div>
                </div>
                <div>
                  <div className="text-slate-500 font-mono text-xs tracking-wider mb-1 sm:mb-2">
                    {isMobile ? "LOAD" : "ACTIVE LOAD"}
                  </div>
                  <div className="text-lg sm:text-2xl font-light text-white">{metrics.activeLoad.toFixed(1)}</div>
                  <div className="text-slate-500 font-mono text-xs">kW</div>
                </div>
                {!isMobile && (
                  <div>
                    <div className="text-slate-500 font-mono text-xs tracking-wider mb-2">EFFICIENCY</div>
                    <div className="text-2xl font-light text-white">{metrics.efficiency.toFixed(1)}</div>
                    <div className="text-slate-500 font-mono text-xs">%</div>
                  </div>
                )}
              </div>

              {/* Mobile: Show efficiency in second row */}
              {isMobile && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-500 font-mono text-xs tracking-wider mb-1">EFFICIENCY</div>
                    <div className="text-lg font-light text-white">{metrics.efficiency.toFixed(1)}</div>
                    <div className="text-slate-500 font-mono text-xs">%</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-mono text-xs tracking-wider mb-1">STORAGE</div>
                    <div className="text-lg font-light text-white">{metrics.storageLevel.toFixed(1)}</div>
                    <div className="text-slate-500 font-mono text-xs">%</div>
                  </div>
                </div>
              )}

              {/* Load Distribution */}
              <div>
                <div className="text-slate-500 font-mono text-xs tracking-wider mb-3 sm:mb-4">
                  {isMobile ? "DISTRIBUTION" : "LOAD DISTRIBUTION"}
                </div>
                <div className="h-px bg-slate-800 mb-3 sm:mb-4" />
                <div className="space-y-2 sm:space-y-3">
                  {stations.map((station) => (
                    <div key={station.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="font-mono text-xs text-slate-500 w-12 sm:w-16">{station.id}</div>
                        <div className={`text-xs sm:text-sm text-white ${isMobile ? "w-20" : "w-32"}`}>
                          {isMobile ? station.location.split(" ")[0] : station.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-6">
                        {!isMobile && (
                          <div className="font-mono text-xs text-slate-400">
                            {station.load.toFixed(1)} / {station.capacity.toFixed(1)} kW
                          </div>
                        )}
                        <div className={`${isMobile ? "w-12" : "w-24"} h-1 bg-slate-800 rounded-full overflow-hidden`}>
                          <div
                            className={`h-full transition-all duration-1000 ${
                              station.status === "high" ? "bg-yellow-500" : "bg-slate-400"
                            }`}
                            style={{ width: `${(station.load / station.capacity) * 100}%` }}
                          />
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            station.status === "optimal" ? "bg-slate-400" : "bg-yellow-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          {!isMobile && (
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <div className="text-slate-500 font-mono text-xs tracking-wider mb-4">SYSTEM STATUS</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white">Grid Stability</div>
                      <div className="font-mono text-xs text-slate-400">{metrics.gridStability}%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white">Storage Level</div>
                      <div className="font-mono text-xs text-slate-400">{metrics.storageLevel}%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white">Peak Demand</div>
                      <div className="font-mono text-xs text-slate-400">{metrics.peakDemand} kW</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 font-mono text-xs tracking-wider mb-4">ALERTS</div>
                  <div className="text-sm text-slate-500">No active alerts</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile System Status */}
        {isMobile && (
          <div className="mb-12">
            <div className="text-slate-500 font-mono text-xs tracking-wider mb-4">SYSTEM STATUS</div>
            <div className="h-px bg-slate-800 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-white">Grid</div>
                <div className="font-mono text-xs text-slate-400">{metrics.gridStability}%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-white">Peak</div>
                <div className="font-mono text-xs text-slate-400">{metrics.peakDemand} kW</div>
              </div>
            </div>
          </div>
        )}

        {/* JLL Partnership Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-slate-500 font-mono text-xs tracking-wider mb-3 sm:mb-4">
            {isMobile ? "PARTNERSHIPS" : "STRATEGIC PARTNERSHIPS"}
          </div>
          <div className="h-px bg-slate-800 mb-6 sm:mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/jll-logo.png"
                  alt="JLL"
                  className="h-8 w-auto filter brightness-0 invert opacity-90"
                />
                <span className="text-slate-400 font-mono text-sm">×</span>
                <span className="text-white font-mono text-lg">REWSR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4">JLL Energy Reliability Pilot</h3>
            </div>
          </div>
        </div>

        {/* Data Center Expansion Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-slate-500 font-mono text-xs tracking-wider mb-3 sm:mb-4">
            {isMobile ? "EXPANSION" : "MARKET EXPANSION"}
          </div>
          <div className="h-px bg-slate-800 mb-6 sm:mb-8" />

          <div className="max-w-4xl">
            <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Data Center Infrastructure</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              We're partnering with manufacturers and aiming to break into data centers as soon as possible. Our energy
              reliability systems are designed to handle the demanding requirements of modern data center operations,
              providing real-time monitoring and predictive analytics for critical infrastructure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/30 border border-slate-700/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Manufacturing Partners</h4>
                <p className="text-slate-400 text-sm">
                  Collaborating with hardware manufacturers to integrate our monitoring systems directly into equipment.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-700/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Data Center Ready</h4>
                <p className="text-slate-400 text-sm">
                  Scalable solutions designed for the high-availability requirements of enterprise data centers.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-700/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Predictive Analytics</h4>
                <p className="text-slate-400 text-sm">
                  AI-powered systems that predict equipment failures before they impact operations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Network Topology */}
        <div className="mb-12 sm:mb-16">
          <div className="text-slate-500 font-mono text-xs tracking-wider mb-3 sm:mb-4">
            {isMobile ? "TOPOLOGY" : "NETWORK TOPOLOGY"}
          </div>
          <div className="h-px bg-slate-800 mb-6 sm:mb-8" />

          <div className={`grid ${isMobile ? "grid-cols-3 gap-2" : "grid-cols-5 gap-4"} max-w-4xl`}>
            {stations.map((station, index) => (
              <motion.div
                key={station.id}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-center">
                  <div
                    className={`${isMobile ? "w-2 h-2" : "w-3 h-3"} rounded-full mx-auto mb-1 sm:mb-2 ${
                      station.status === "optimal" ? "bg-slate-400" : "bg-yellow-500"
                    }`}
                  />
                  <div className="font-mono text-xs text-slate-500 mb-1">{station.id}</div>
                  <div className="font-mono text-xs text-slate-600">{station.load.toFixed(0)}kW</div>
                </div>

                {/* Connection lines - hide on mobile for cleaner look */}
                {!isMobile && index < stations.length - 1 && (
                  <div className="absolute top-1.5 left-full w-4 h-px bg-slate-800" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 sm:pt-16 border-t border-slate-800/30">
          <div className={`flex ${isMobile ? "flex-col gap-4" : "items-center justify-between"}`}>
            <div className="text-slate-600 font-mono text-xs tracking-wide">
              {isMobile ? "Campus Energy — Monitoring" : "Campus Energy Networks — Real-time Monitoring System"}
            </div>
            <div className="text-slate-600 font-mono text-xs tracking-wide">
              Last updated: {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
