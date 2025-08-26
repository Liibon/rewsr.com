"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Copy, Check, AlertCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { useAuth } from "@/hooks/use-auth"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [copied, setCopied] = useState(false)

  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError("")

    const result = await register(email.trim())

    if (result.success) {
      setApiKey(result.apiKey!)
    } else {
      setError(result.error!)
    }

    setIsLoading(false)
  }

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy API key")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 py-6 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <Logo size="sm" />
          </Link>
          <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors font-mono text-sm">
            Already have an API key?
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-md w-full">
          {!apiKey ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-light text-white mb-4">Get Your API Key</h1>
                <p className="text-xl text-slate-400 leading-relaxed">
                  Start running cryptographically provable computations in seconds
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <motion.div
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={16} className="text-red-400" />
                    <span className="text-red-400 text-sm">{error}</span>
                  </motion.div>
                )}

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-[#E8A0BF] focus:outline-none transition-colors text-lg"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#E8A0BF] to-white text-black hover:from-white hover:to-[#E8A0BF] transition-all duration-300 font-mono font-medium disabled:opacity-50 rounded-lg text-lg"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? "Creating Account..." : "Get API Key"}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm">
                  By signing up, you agree to our{" "}
                  <Link href="/legal" className="text-[#E8A0BF] hover:underline">
                    Terms of Service
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-[#E8A0BF] to-white rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                >
                  <Check size={40} className="text-black" />
                </motion.div>
                <h1 className="text-4xl font-light text-white mb-4">Welcome to Anansi!</h1>
                <p className="text-xl text-slate-400">Your account has been created successfully</p>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-3">Your API Key</label>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded text-[#E8A0BF] font-mono text-sm break-all">
                      {apiKey}
                    </code>
                    <motion.button
                      onClick={copyApiKey}
                      className="p-3 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? (
                        <Check size={18} className="text-green-400" />
                      ) : (
                        <Copy size={18} className="text-slate-400" />
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h3 className="text-yellow-400 font-medium mb-2">Important: Save Your API Key</h3>
                  <p className="text-yellow-400/80 text-sm">
                    Store this API key securely. You won't be able to see it again after leaving this page.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/dashboard"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#E8A0BF] to-white text-black hover:from-white hover:to-[#E8A0BF] transition-all duration-300 font-mono font-medium rounded-lg text-center"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/projects/anansi"
                    className="flex-1 px-6 py-3 border border-slate-600 text-white hover:border-[#E8A0BF] hover:text-[#E8A0BF] transition-all duration-300 font-mono font-medium rounded-lg text-center"
                  >
                    Try Live API
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
