"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Copy, Check, User, Calendar, Shield, LogOut } from "lucide-react"
import { AuthService } from "@/lib/auth"
import { useAuth } from "@/hooks/use-auth"

interface ApiKeyDisplayProps {
  apiKey: string
}

export function ApiKeyDisplay({ apiKey }: ApiKeyDisplayProps) {
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const { userProfile, logout } = useAuth()

  const copyApiKey = async () => {
    if (!apiKey) return

    try {
      await navigator.clipboard.writeText(apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy API key")
    }
  }

  const maskedKey = showKey ? apiKey || "" : AuthService.maskApiKey(apiKey || "")
  const isDemoAccount = apiKey?.startsWith("ak_demo_") || false

  // If no API key is provided, show a placeholder state
  if (!apiKey) {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#E8A0BF]/20 to-white/20 rounded-full flex items-center justify-center">
              <User size={24} className="text-[#E8A0BF]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">No API Key</h3>
              <p className="text-slate-400 text-sm">Please authenticate to view your profile</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Profile Section */}
      <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-[#E8A0BF]/20 to-white/20 rounded-full flex items-center justify-center">
            <User size={24} className="text-[#E8A0BF]" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">User Profile</h3>
            <p className="text-slate-400 text-sm">Account information and settings</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <User size={16} className="text-slate-400" />
              <span className="text-slate-300 text-sm">Email</span>
            </div>
            <span className="text-white font-mono text-sm">{userProfile?.email || "demo@anansi.dev"}</span>
          </div>

          {/* User ID */}
          <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-slate-400" />
              <span className="text-slate-300 text-sm">User ID</span>
            </div>
            <span className="text-white font-mono text-sm">#{userProfile?.id || "demo"}</span>
          </div>

          {/* Created Date */}
          <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-slate-300 text-sm">Created</span>
            </div>
            <span className="text-white font-mono text-sm">
              {userProfile?.created_at
                ? new Date(userProfile.created_at).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Account Status */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-slate-400" />
              <span className="text-slate-300 text-sm">Status</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isDemoAccount ? "bg-blue-400" : "bg-green-400"}`} />
              <span className={`text-sm font-mono ${isDemoAccount ? "text-blue-400" : "text-green-400"}`}>
                {isDemoAccount ? "Demo" : "Active"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Key Section */}
      <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-white">API Key</h3>
            <p className="text-slate-400 text-sm">Use this key to authenticate API requests</p>
          </div>
          {isDemoAccount && (
            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
              <span className="text-blue-400 text-xs font-mono">DEMO</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* API Key Display */}
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg">
              <code className="text-[#E8A0BF] font-mono text-sm break-all">{maskedKey}</code>
            </div>
            <motion.button
              onClick={() => setShowKey(!showKey)}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showKey ? <EyeOff size={16} className="text-slate-400" /> : <Eye size={16} className="text-slate-400" />}
            </motion.button>
            <motion.button
              onClick={copyApiKey}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-400" />}
            </motion.button>
          </div>

          {/* Demo Account Notice */}
          {isDemoAccount && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>Demo Account:</strong> This is a demonstration account for testing purposes. All computations
                will return mock results.
              </p>
            </div>
          )}

          {/* Security Warning */}
          {!isDemoAccount && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-sm">
                <strong>Security:</strong> Keep your API key secure and never share it publicly. If compromised, contact
                support immediately.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <motion.button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600/20 border border-red-600/30 text-red-400 hover:bg-red-600/30 hover:border-red-600/50 transition-all duration-300 font-mono font-medium rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>
      </div>
    </div>
  )
}
