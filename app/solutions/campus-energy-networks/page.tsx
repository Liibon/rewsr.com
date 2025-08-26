"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function CampusEnergyNetworksPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-slate-800/30 bg-black/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={18} />
              <span className="font-mono text-sm tracking-wide">REWSR</span>
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <Logo size="sm" />
          </div>
          <div className="font-mono text-xs text-slate-500 tracking-wider">
            {currentTime.toISOString().slice(0, 19)}Z
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-2xl font-light text-white mb-2 tracking-wide">Campus Energy Networks</h1>
          <p className="text-slate-500 font-mono text-sm tracking-wide">Real-time energy distribution monitoring</p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-6 gap-8 mb-16">
          <div className="col-span-6 lg:col-span-4">
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-slate-500 font-mono text-xs tracking-wider mb-2">TOTAL CAPACITY</div>
                  <div className="text-2xl font-light text-white">{metrics.totalCapacity.toFixed(1)}</div>
                  <div className="text-slate-500 font-mono text-xs">kW</div>
                </div>
                <div>
                  <div className="text-slate-500 font-mono text-xs tracking-wider mb-2">ACTIVE LOAD</div>
                  <div className="text-2xl font-light text-white">{metrics.activeLoad.toFixed(1)}</div>
                  <div className="text-slate-500 font-mono text-xs">kW</div>
                </div>
                <div>
                  <div className="text-slate-500 font-mono text-xs tracking-wider mb-2">EFFICIENCY</div>
                  <div className="text-2xl font-light text-white">{metrics.efficiency.toFixed(1)}</div>
                  <div className="text-slate-500 font-mono text-xs">%</div>
                </div>
              </div>

              {/* Load Distribution */}
              <div>
                <div className="text-slate-500 font-mono text-xs tracking-wider mb-4">LOAD DISTRIBUTION</div>
                <div className="h-px bg-slate-800 mb-4" />
                <div className="space-y-3">
                  {stations.map((station) => (
                    <div key={station.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-xs text-slate-500 w-16">{station.id}</div>
                        <div className="text-sm text-white w-32">{station.location}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="font-mono text-xs text-slate-400">
                          {station.load.toFixed(1)} / {station.capacity.toFixed(1)} kW
                        </div>
                        <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
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
          <div className="col-span-6 lg:col-span-2">
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
        </div>

        {/* Network Topology */}
        <div className="mb-16">
          <div className="text-slate-500 font-mono text-xs tracking-wider mb-4">NETWORK TOPOLOGY</div>
          <div className="h-px bg-slate-800 mb-8" />

          <div className="grid grid-cols-5 gap-4 max-w-4xl">
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
                    className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                      station.status === "optimal" ? "bg-slate-400" : "bg-yellow-500"
                    }`}
                  />
                  <div className="font-mono text-xs text-slate-500 mb-1">{station.id}</div>
                  <div className="font-mono text-xs text-slate-600">{station.load.toFixed(0)}kW</div>
                </div>

                {/* Connection lines */}
                {index < stations.length - 1 && <div className="absolute top-1.5 left-full w-4 h-px bg-slate-800" />}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-16 border-t border-slate-800/30">
          <div className="flex items-center justify-between">
            <div className="text-slate-600 font-mono text-xs tracking-wide">
              Campus Energy Networks — Real-time Monitoring System
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
