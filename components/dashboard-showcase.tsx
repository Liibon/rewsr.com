"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/animated-counter"
import { Activity, Zap, Shield, TrendingUp, Server, Database } from "lucide-react"
import { useEffect, useState } from "react"

const MetricCard = ({
  title,
  value,
  suffix,
  icon: Icon,
  trend,
  delay,
}: {
  title: string
  value: number
  suffix: string
  icon: any
  trend: number
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-[#E8A0BF]/10 rounded-lg">
            <Icon className="h-5 w-5 text-[#E8A0BF]" />
          </div>
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend > 0 ? "+" : ""}
            {trend}%
          </Badge>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-3xl font-bold text-white">
            <AnimatedCounter end={value} suffix={suffix} />
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const ConnectionLine = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay }}
    viewport={{ once: true }}
  >
    <svg className="w-full h-full">
      <motion.path
        d="M 50 50 Q 150 50 250 150"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, delay: delay + 0.5 }}
        viewport={{ once: true }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8A0BF" stopOpacity="0" />
          <stop offset="50%" stopColor="#E8A0BF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E8A0BF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
)

const gRPCLogs = [
  { timestamp: "14:32:01", service: "auth-service", method: "ValidateToken", latency: "2.3ms", status: "OK" },
  { timestamp: "14:32:01", service: "user-service", method: "GetProfile", latency: "1.8ms", status: "OK" },
  { timestamp: "14:32:02", service: "payment-service", method: "ProcessPayment", latency: "45.2ms", status: "OK" },
  { timestamp: "14:32:02", service: "notification-service", method: "SendEmail", latency: "12.1ms", status: "OK" },
  { timestamp: "14:32:03", service: "analytics-service", method: "TrackEvent", latency: "3.4ms", status: "OK" },
]

export function DashboardShowcase() {
  const [currentLogIndex, setCurrentLogIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % gRPCLogs.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #E8A0BF20 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, #E8A0BF20 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, #E8A0BF20 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-6 bg-[#E8A0BF]/10 text-[#E8A0BF] border-[#E8A0BF]/20">Live Dashboard</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-mono">
            gRPC Performance
            <br />
            <span className="text-[#E8A0BF]">Dashboard</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-mono">
            Real-time monitoring and analytics for distributed microservices architecture with sub-millisecond latency
            tracking.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <MetricCard title="Requests/Second" value={12847} suffix="" icon={Zap} trend={23} delay={0.1} />
          <MetricCard title="Avg Latency" value={2} suffix="ms" icon={Activity} trend={-15} delay={0.2} />
          <MetricCard title="Success Rate" value={99} suffix="%" icon={Shield} trend={0.2} delay={0.3} />
          <MetricCard title="Active Services" value={24} suffix="" icon={Server} trend={12} delay={0.4} />
        </div>

        {/* Main Dashboard */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Service Map */}
          <Card className="lg:col-span-2 bg-slate-900/30 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-mono flex items-center gap-2">
                <Database className="h-5 w-5 text-[#E8A0BF]" />
                Service Topology
              </CardTitle>
            </CardHeader>
            <CardContent className="relative h-80">
              {/* Service Nodes */}
              <div className="absolute inset-4 grid grid-cols-3 gap-4">
                {["API Gateway", "Auth Service", "User Service", "Payment Service", "Notification", "Analytics"].map(
                  (service, index) => (
                    <motion.div
                      key={service}
                      className="flex items-center justify-center p-4 bg-slate-800 rounded-lg border border-slate-600 text-sm text-white font-mono relative"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.05, borderColor: "#E8A0BF" }}
                      viewport={{ once: true }}
                    >
                      {service}
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-[#E8A0BF] rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                      />
                    </motion.div>
                  ),
                )}
              </div>

              {/* Connection Lines */}
              <ConnectionLine delay={1} />
            </CardContent>
          </Card>

          {/* Real-time Logs */}
          <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-mono flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#E8A0BF]" />
                Live gRPC Calls
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 overflow-hidden">
              <div className="space-y-3">
                {gRPCLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-lg border text-xs font-mono transition-all duration-300 ${
                      index === currentLogIndex
                        ? "bg-[#E8A0BF]/10 border-[#E8A0BF]/30 text-[#E8A0BF]"
                        : "bg-slate-800/50 border-slate-600 text-slate-400"
                    }`}
                    animate={index === currentLogIndex ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">{log.service}</span>
                      <Badge variant="outline" className="text-xs">
                        {log.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>{log.method}</span>
                      <span>{log.latency}</span>
                    </div>
                    <div className="text-xs opacity-60">{log.timestamp}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-mono flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#E8A0BF]" />
                Latency Distribution (Last 24h)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-40">
              <div className="flex items-end justify-between h-full gap-1">
                {Array.from({ length: 24 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-t from-[#E8A0BF]/80 to-[#E8A0BF]/40 rounded-t-sm flex-1 min-w-0"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${Math.random() * 80 + 20}%` }}
                    transition={{ duration: 0.8, delay: i * 0.03 + 0.5 }}
                    whileHover={{
                      backgroundColor: "#E8A0BF",
                      transition: { duration: 0.2 },
                    }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
