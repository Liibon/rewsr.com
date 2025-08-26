"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, CheckCircle } from "lucide-react"
import { Logo } from "@/components/logo"

const cloudOptions = [
  {
    id: "aws-govcloud",
    name: "AWS GovCloud",
    description: "US Government workloads",
    icon: "🇺🇸",
    compliance: ["FedRAMP", "ITAR", "CJIS"],
  },
  {
    id: "azure-government",
    name: "Azure Government",
    description: "US Government cloud",
    icon: "🏛️",
    compliance: ["FedRAMP", "DoD IL2-6", "CJIS"],
  },
  {
    id: "eu-sovereign",
    name: "EU Sovereign Cloud",
    description: "European data residency",
    icon: "🇪🇺",
    compliance: ["GDPR", "Digital Sovereignty", "NIS2"],
  },
  {
    id: "private-cloud",
    name: "Private Cloud",
    description: "Your own infrastructure",
    icon: "🏢",
    compliance: ["Custom", "Air-gapped", "On-premises"],
  },
]

export default function SovereignPage() {
  const [selectedCloud, setSelectedCloud] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    organization: "",
    useCase: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCloud || !formData.email || !formData.organization) return

    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-slate-800 py-6 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/projects/anansi"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-mono text-sm">Back to Anansi</span>
            </Link>
            <div className="h-6 w-px bg-slate-700" />
            <Logo size="sm" />
          </div>
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-purple-400" />
            <span className="font-mono text-lg font-semibold text-white">Sovereign Cloud</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-16">
        {!isSubmitted ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Hero */}
            <div className="text-center mb-16">
              <motion.div
                className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
              >
                <Shield size={32} className="text-purple-400" />
              </motion.div>

              <h1 className="text-5xl font-extralight text-white mb-6 tracking-tight">
                Deploy in Your
                <span className="text-purple-400 font-light"> Sovereign Cloud</span>
              </h1>

              <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                Run Anansi inside your government, sovereign, or private cloud environment. No credentials shared, full
                compliance maintained.
              </p>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 font-mono font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Choose Your Cloud</h3>
                <p className="text-slate-400 text-sm">Select your sovereign or private cloud environment</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 font-mono font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Private Marketplace</h3>
                <p className="text-slate-400 text-sm">We create a private offer in your cloud marketplace</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 font-mono font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Deploy & Run</h3>
                <p className="text-slate-400 text-sm">Launch in your tenant, no credentials shared</p>
              </motion.div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Cloud Selection */}
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-white mb-6">Select Your Cloud Environment</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cloudOptions.map((cloud) => (
                    <motion.div
                      key={cloud.id}
                      className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedCloud === cloud.id
                          ? "border-purple-400 bg-purple-500/10"
                          : "border-slate-700 bg-slate-900/30 hover:border-slate-600"
                      }`}
                      onClick={() => setSelectedCloud(cloud.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{cloud.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-white mb-2">{cloud.name}</h3>
                          <p className="text-slate-400 text-sm mb-3">{cloud.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {cloud.compliance.map((comp) => (
                              <span
                                key={comp}
                                className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded font-mono"
                              >
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                        {selectedCloud === cloud.id && (
                          <CheckCircle size={20} className="text-purple-400 flex-shrink-0" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-white mb-6">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">Business Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="you@organization.gov"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">Organization *</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="Department of Defense"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Use Case (Optional)</label>
                  <textarea
                    value={formData.useCase}
                    onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none transition-colors h-24 resize-none"
                    placeholder="Describe your confidential computing requirements..."
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!selectedCloud || !formData.email || !formData.organization || isLoading}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:from-purple-400 hover:to-purple-300 transition-all duration-300 font-mono font-medium disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? "Submitting Request..." : "Request Private Marketplace Offer"}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
          >
            <motion.div
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
            >
              <CheckCircle size={32} className="text-green-400" />
            </motion.div>

            <h1 className="text-4xl font-light text-white mb-6">Request Submitted</h1>

            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              We'll create your private marketplace offer and send you the deployment instructions within 24 hours.
            </p>

            <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-lg font-medium text-white mb-4">What happens next:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300 text-sm">Private offer created in your cloud marketplace</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300 text-sm">Deployment guide sent to {formData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300 text-sm">Launch Anansi in your sovereign environment</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects/anansi"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:from-purple-400 hover:to-purple-300 transition-all duration-300 font-mono font-medium rounded-lg"
              >
                Back to Anansi
              </Link>
              <Link
                href="/legal"
                className="px-8 py-3 border border-slate-600 text-white hover:border-purple-400 hover:text-purple-400 transition-all duration-300 font-mono font-medium rounded-lg"
              >
                Terms of Service
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
