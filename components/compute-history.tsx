"use client"

import { motion } from "framer-motion"
import { Activity, DollarSign, CheckCircle, XCircle, Clock } from "lucide-react"
import type { ComputeRun } from "@/lib/auth"

interface ComputeHistoryProps {
  runs?: ComputeRun[]
}

export function ComputeHistory({ runs = [] }: ComputeHistoryProps) {
  const totalCost = runs.reduce((sum, run) => sum + run.cost_usd, 0)
  const successCount = runs.filter((run) => run.status === "completed").length
  const failureCount = runs.filter((run) => run.status === "failed").length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-[#E8A0BF]/20 to-white/20 rounded-lg flex items-center justify-center">
          <Activity size={24} className="text-[#E8A0BF]" />
        </div>
        <div>
          <h2 className="text-2xl font-light text-white">Compute History</h2>
          <p className="text-slate-400 text-sm">Your recent computation runs</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign size={20} className="text-green-400" />
            <span className="text-slate-300 text-sm font-medium">Total Cost</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">${totalCost.toFixed(4)}</div>
        </motion.div>

        <motion.div
          className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={20} className="text-green-400" />
            <span className="text-slate-300 text-sm font-medium">Successful</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">{successCount}</div>
        </motion.div>

        <motion.div
          className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <XCircle size={20} className="text-red-400" />
            <span className="text-slate-300 text-sm font-medium">Failed</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">{failureCount}</div>
        </motion.div>
      </div>

      {/* Runs List */}
      <div className="space-y-4">
        {runs.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No computations yet</h3>
            <p className="text-slate-400 text-sm">
              Run your first computation to see it appear here. Try the live API test!
            </p>
          </motion.div>
        ) : (
          runs.map((run, index) => (
            <motion.div
              key={run.run_id}
              className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur-sm hover:border-[#E8A0BF]/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${run.status === "completed" ? "bg-green-400" : "bg-red-400"}`}
                  />
                  <div>
                    <h3 className="text-white font-mono font-medium">{run.function}</h3>
                    <p className="text-slate-400 text-sm">
                      {new Date(run.timestamp).toLocaleString()} • {run.cloud}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-mono">${run.cost_usd.toFixed(4)}</div>
                  <div
                    className={`text-sm font-medium ${run.status === "completed" ? "text-green-400" : "text-red-400"}`}
                  >
                    {run.status === "completed" ? "Success" : "Failed"}
                  </div>
                </div>
              </div>

              {/* Result Preview */}
              <div className="mt-4 p-4 bg-slate-900/50 border border-slate-600/50 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-slate-400 text-xs font-mono">Result</span>
                </div>
                <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
                  {JSON.stringify(run.result, null, 2).slice(0, 200)}
                  {JSON.stringify(run.result, null, 2).length > 200 && "..."}
                </pre>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
