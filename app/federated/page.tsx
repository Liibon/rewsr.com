"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function FederatedPage() {
  const [time, setTime] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() / 1000)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const WaveEffect = () => {
    const waveOffset1 = Math.sin(time * 0.8) * 150 + Math.cos(time * 1.2) * 100
    const waveOffset2 = Math.cos(time * 0.6) * 120 + Math.sin(time * 1.5) * 80
    const waveAmplitude = 30 + Math.sin(time * 0.3) * 20

    return (
      <div className="relative w-full h-40 flex items-center justify-center overflow-visible">
        <svg
          width="1000"
          height="160"
          viewBox="0 0 1000 160"
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#86efac" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <path
            d={`M 0 80 Q ${250 + waveOffset1} ${50 + waveAmplitude} 500 80 T 1000 80`}
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mix-blend-screen"
            style={{
              opacity: 0.85,
              filter: `drop-shadow(0 0 6px rgba(59,130,246,.25))`,
              transform: `translateY(${Math.sin(time * 0.5) * 8}px)`,
            }}
          />

          <path
            d={`M 0 85 Q ${300 + waveOffset2} ${55 + waveAmplitude * 0.5} 500 85 T 1000 85`}
            stroke="url(#waveGradient2)"
            strokeWidth="1.5"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: `translateX(${Math.sin(time * 0.7) * 20}px) translateY(${Math.cos(time * 0.4) * 6}px)`,
              opacity: 0.55,
            }}
          />

          <path
            d={`M 0 75 Q ${200 + Math.cos(time * 0.9) * 70} ${45 + Math.sin(time * 0.8) * 15} 500 75 T 1000 75`}
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: `translateX(${Math.cos(time * 0.3) * 25}px)`,
            }}
          />

          {[...Array(10)].map((_, i) => (
            <circle
              key={i}
              cx={i * 100 + 50 + Math.sin(time * 0.6 + i) * 20}
              cy={80 + Math.sin(time * 0.8 + i * 0.5) * 15}
              r={1 + Math.sin(time * 1.2 + i) * 0.5}
              fill={i % 3 === 0 ? "#93c5fd" : i % 3 === 1 ? "#ffffff" : "#86efac"}
              style={{
                opacity: 0.5 + Math.sin(time * 1.5 + i) * 0.2,
              }}
            />
          ))}
        </svg>

        <div className="relative z-10 text-center">
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-thin tracking-tighter text-white mb-4 leading-none">
            FEDERATED
          </h1>
          <div className="text-lg md:text-xl font-light text-white/90 tracking-[0.15em] uppercase">
            Intelligence without boundaries
          </div>
        </div>
      </div>
    )
  }

  const WikiSidebar = () => {
    return (
      <div className="fixed left-0 top-0 h-screen w-80 bg-white/8 backdrop-blur-md border-r border-white/20 overflow-hidden z-50">
        <div className="p-6 border-b border-white/20">{/* Removed Link component that wasn't working */}</div>

        <div className="p-6 h-[calc(100vh-100px)] flex flex-col">
          <div className="border-b border-white/20 pb-4 flex-shrink-0">
            <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Contents</h2>
          </div>

          <div className="flex-1 space-y-4 mt-4 text-sm">
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Definition</h3>
              <p className="text-white/70 text-xs leading-relaxed">
                Machine learning technique where multiple entities collaboratively train a model while keeping data
                decentralized.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Key Principles</h3>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• Data privacy preservation</li>
                <li>• Decentralized learning</li>
                <li>• Parameter sharing only</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Applications</h3>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• Healthcare systems</li>
                <li>• Anansi TEE API</li>
                <li>• Edge computing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Advantages</h3>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• Privacy by design</li>
                <li>• Reduced data transfer</li>
                <li>• Regulatory compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden" ref={containerRef}>
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + (i % 2)}px`,
              height: `${1 + (i % 2)}px`,
              backgroundColor: i % 3 === 0 ? "#93c5fd" : i % 3 === 1 ? "#86efac" : "#ffffff",
              left: `${35 + ((i * 1.618) % 30)}%`,
              top: `${35 + ((i * 2.414) % 30)}%`,
              opacity: 0.05 + Math.sin(time + i) * 0.02,
              transform: `translate(${Math.sin(time * 0.1 + i) * 5}px, ${Math.cos(time * 0.15 + i) * 5}px)`,
            }}
          />
        ))}
      </div>

      <WikiSidebar />

      <div className="relative z-20 h-screen flex items-center justify-center ml-80 pr-8">
        <div className="text-center max-w-5xl mx-auto">
          <WaveEffect />
          <button
            onClick={() => router.push("/")}
            className="mt-8 inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/20 transition-all duration-200"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
