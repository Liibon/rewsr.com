"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Key, Copy, Check, AlertCircle, Loader2, Zap } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode?: "signup" | "login"
}

export function AuthModal({ isOpen, onClose, mode = "signup" }: AuthModalProps) {
  const [currentMode, setCurrentMode] = useState(mode)
  const [email, setEmail] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [newApiKey, setNewApiKey] = useState("")
  const [copied, setCopied] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)
  const { register, createDemoAccount, login } = useAuth()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError("")

    try {
      console.log("Form submission - attempting registration")
      const result = await register(email.trim())
      console.log("Registration result:", result)

      if (result.success) {
        setNewApiKey(result.apiKey!)
        setCurrentMode("success")
      } else {
        setError(result.error!)
        if (result.error?.includes("already registered")) {
          setTimeout(() => {
            setCurrentMode("login")
            setError("")
          }, 2000)
        }
      }
    } catch (err) {
      console.error("Form submission error:", err)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoAccount = async () => {
    setIsLoading(true)
    setError("")

    try {
      console.log("Creating demo account")
      const result = await createDemoAccount()
      console.log("Demo account result:", result)

      if (result.success) {
        setNewApiKey(result.apiKey!)
        setCurrentMode("success")
      } else {
        setError(result.error!)
      }
    } catch (err) {
      console.error("Demo account error:", err)
      setError("Failed to create demo account.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!apiKey.trim()) return

    setIsLoading(true)
    setError("")

    try {
      console.log("Form submission - attempting login")
      const result = await login(apiKey.trim())
      console.log("Login result:", result)

      if (result.success) {
        onClose()
      } else {
        setError(result.error!)
      }
    } catch (err) {
      console.error("Form submission error:", err)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(newApiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy API key")
    }
  }

  const handleClose = () => {
    console.log("Closing auth modal")
    setEmail("")
    setApiKey("")
    setError("")
    setNewApiKey("")
    setCopied(false)
    setCurrentMode(mode)
    onClose()
  }

  const handleSuccessClose = () => {
    console.log("Success - closing modal and navigating")
    handleClose()
    // Force a page refresh to ensure the dashboard loads properly
    window.location.href = "/dashboard"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/* Simplified backdrop */}
          <div className="absolute inset-0 bg-black/90" />

          {/* Custom modal container */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-md bg-black border-2 border-[#E8A0BF] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Static corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#E8A0BF]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#E8A0BF]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#E8A0BF]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#E8A0BF]" />

            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-[#E8A0BF] hover:bg-[#E8A0BF] hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>

            <div className="p-8 relative z-10">
              {currentMode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className="relative inline-block mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                    >
                      <div className="w-16 h-16 border-2 border-[#E8A0BF] flex items-center justify-center">
                        <Mail size={24} className="text-[#E8A0BF]" />
                      </div>
                    </motion.div>
                    <h2 className="text-2xl font-mono font-bold text-[#E8A0BF] mb-2 tracking-wider">ACCESS_REQUEST</h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#E8A0BF] to-transparent mb-4" />
                    <p className="text-white/70 text-sm font-mono">ENTER_EMAIL_FOR_API_KEY_GENERATION</p>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-6">
                    {/* Error display */}
                    {error && (
                      <motion.div
                        className="p-4 border border-red-500 bg-red-500/10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                          <span className="text-red-400 text-sm font-mono">{error}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Email input */}
                    <div className="space-y-2">
                      <label className="block text-[#E8A0BF] text-sm font-mono tracking-wider">EMAIL_ADDRESS</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-2 border-white/20 px-4 py-3 text-white font-mono focus:border-[#E8A0BF] focus:outline-none transition-all duration-300"
                          placeholder="user@domain.com"
                          required
                          disabled={isLoading}
                        />
                        <Mail size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                      </div>
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative overflow-hidden bg-[#E8A0BF] text-black py-3 font-mono font-bold tracking-wider disabled:opacity-50 group"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            GENERATING_KEY...
                          </>
                        ) : (
                          "REQUEST_ACCESS"
                        )}
                      </span>
                    </motion.button>

                    {/* Demo account button */}
                    <motion.button
                      type="button"
                      onClick={handleDemoAccount}
                      disabled={isLoading}
                      className="w-full relative overflow-hidden bg-transparent border-2 border-[#E8A0BF] text-[#E8A0BF] py-3 font-mono font-bold tracking-wider disabled:opacity-50 group hover:bg-[#E8A0BF] hover:text-black transition-all duration-300"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            CREATING_DEMO...
                          </>
                        ) : (
                          <>
                            <Zap size={16} />
                            SKIP_WITH_DEMO_ACCOUNT
                          </>
                        )}
                      </span>
                    </motion.button>

                    {/* Skip for Testing button */}
                    <motion.button
                      type="button"
                      onClick={handleClose}
                      className="w-full text-slate-500 hover:text-slate-300 py-2 font-mono text-sm tracking-wider transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      SKIP_FOR_TESTING →
                    </motion.button>

                    {/* Mode switch */}
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setCurrentMode("login")}
                        className="text-white/60 hover:text-[#E8A0BF] text-sm font-mono transition-colors"
                        disabled={isLoading}
                      >
                        EXISTING_USER? → LOGIN
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {currentMode === "login" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className="relative inline-block mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                    >
                      <div className="w-16 h-16 border-2 border-[#E8A0BF] flex items-center justify-center">
                        <Key size={24} className="text-[#E8A0BF]" />
                      </div>
                    </motion.div>
                    <h2 className="text-2xl font-mono font-bold text-[#E8A0BF] mb-2 tracking-wider">AUTHENTICATION</h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#E8A0BF] to-transparent mb-4" />
                    <p className="text-white/70 text-sm font-mono">ENTER_API_KEY_FOR_ACCESS</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    {/* Error display */}
                    {error && (
                      <motion.div
                        className="p-4 border border-red-500 bg-red-500/10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                          <span className="text-red-400 text-sm font-mono">{error}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* API key input */}
                    <div className="space-y-2">
                      <label className="block text-[#E8A0BF] text-sm font-mono tracking-wider">API_KEY</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          onFocus={() => setFocusedField("apiKey")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-2 border-white/20 px-4 py-3 text-white font-mono focus:border-[#E8A0BF] focus:outline-none transition-all duration-300"
                          placeholder="ak_a1b2c3d4e5f6..."
                          required
                          disabled={isLoading}
                        />
                        <Key size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                      </div>
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative overflow-hidden bg-[#E8A0BF] text-black py-3 font-mono font-bold tracking-wider disabled:opacity-50 group"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            AUTHENTICATING...
                          </>
                        ) : (
                          "AUTHENTICATE"
                        )}
                      </span>
                    </motion.button>

                    {/* Demo account button */}
                    <motion.button
                      type="button"
                      onClick={handleDemoAccount}
                      disabled={isLoading}
                      className="w-full relative overflow-hidden bg-transparent border-2 border-[#E8A0BF] text-[#E8A0BF] py-3 font-mono font-bold tracking-wider disabled:opacity-50 group hover:bg-[#E8A0BF] hover:text-black transition-all duration-300"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            CREATING_DEMO...
                          </>
                        ) : (
                          <>
                            <Zap size={16} />
                            USE_DEMO_ACCOUNT
                          </>
                        )}
                      </span>
                    </motion.button>

                    {/* Skip for Testing button */}
                    <motion.button
                      type="button"
                      onClick={handleClose}
                      className="w-full text-slate-500 hover:text-slate-300 py-2 font-mono text-sm tracking-wider transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      SKIP_FOR_TESTING →
                    </motion.button>

                    {/* Mode switch */}
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setCurrentMode("signup")}
                        className="text-white/60 hover:text-[#E8A0BF] text-sm font-mono transition-colors"
                        disabled={isLoading}
                      >
                        NEW_USER? → REGISTER
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {currentMode === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  {/* Success header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className="relative inline-block mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                    >
                      <div className="w-20 h-20 bg-[#E8A0BF] flex items-center justify-center">
                        <Check size={32} className="text-black" />
                      </div>
                    </motion.div>
                    <h2 className="text-2xl font-mono font-bold text-[#E8A0BF] mb-2 tracking-wider">ACCESS_GRANTED</h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#E8A0BF] to-transparent mb-4" />
                    <p className="text-white/70 text-sm font-mono">
                      {newApiKey.startsWith("ak_demo_") ? "DEMO_ACCOUNT_CREATED" : "ACCOUNT_CREATED_SUCCESSFULLY"}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* API key display */}
                    <div className="p-4 border-2 border-[#E8A0BF] bg-[#E8A0BF]/5">
                      <label className="block text-[#E8A0BF] text-sm font-mono tracking-wider mb-2">YOUR_API_KEY</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 bg-black border border-white/20 text-[#E8A0BF] font-mono text-sm break-all">
                          {newApiKey}
                        </code>
                        <motion.button
                          onClick={copyApiKey}
                          className="p-2 bg-[#E8A0BF] text-black hover:bg-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </motion.button>
                      </div>
                    </div>

                    {/* Demo notice or warning */}
                    {newApiKey.startsWith("ak_demo_") ? (
                      <div className="p-4 border border-blue-500 bg-blue-500/10">
                        <div className="flex items-start gap-3">
                          <Zap size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-blue-400 text-sm font-mono font-bold mb-1">DEMO_MODE_ACTIVE</p>
                            <p className="text-blue-400/80 text-xs font-mono">
                              THIS_IS_A_DEMO_ACCOUNT_FOR_TESTING_PURPOSES
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 border border-yellow-500 bg-yellow-500/10">
                        <div className="flex items-start gap-3">
                          <AlertCircle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-yellow-400 text-sm font-mono font-bold mb-1">SECURITY_WARNING</p>
                            <p className="text-yellow-400/80 text-xs font-mono">
                              STORE_KEY_SECURELY_NO_RECOVERY_POSSIBLE
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Continue button */}
                    <motion.button
                      onClick={handleSuccessClose}
                      className="w-full relative overflow-hidden bg-[#E8A0BF] text-black py-3 font-mono font-bold tracking-wider group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">CONTINUE_TO_DASHBOARD</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
