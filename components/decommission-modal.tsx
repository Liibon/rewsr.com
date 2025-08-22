"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useActionState } from "react"
import { submitDecommissionForm, type DecommissionFormState } from "@/app/actions"

interface DecommissionModalProps {
  isOpen: boolean
  onClose: () => void
}

const initialState: DecommissionFormState = {}

export function DecommissionModal({ isOpen, onClose }: DecommissionModalProps) {
  const [state, formAction] = useActionState(submitDecommissionForm, initialState)
  const modalRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen && formRef.current) {
      formRef.current.reset()
    }
  }, [isOpen])

  // Close modal on successful submission
  useEffect(() => {
    if (state.success) {
      // Wait a moment to show success message before closing
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state.success, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-[#f5f5f5] border border-[#222] w-full max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-[#e0e0e0]">
              <h2 className="font-mono text-xl text-[#222]">Decommission Request</h2>
              <button onClick={onClose} className="text-[#444] hover:text-[#E8A0BF] transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {state.success ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <p className="font-mono text-lg text-[#222] mb-2">Request Received</p>
                  <p className="font-mono text-sm text-[#666]">{state.message}</p>
                </motion.div>
              ) : (
                <form ref={formRef} action={formAction} className="space-y-6">
                  {state.errors?._form && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 font-mono text-sm">
                      {state.errors._form.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="companyName" className="block font-mono text-sm text-[#444]">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="w-full p-3 bg-transparent border border-[#222] font-mono text-[#222] focus:outline-none focus:border-[#E8A0BF]"
                      placeholder="Your company"
                    />
                    {state.errors?.companyName && (
                      <p className="text-red-500 font-mono text-xs mt-1">{state.errors.companyName[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-mono text-sm text-[#444]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 bg-transparent border border-[#222] font-mono text-[#222] focus:outline-none focus:border-[#E8A0BF]"
                      placeholder="you@example.com"
                    />
                    {state.errors?.email && (
                      <p className="text-red-500 font-mono text-xs mt-1">{state.errors.email[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="assetCount" className="block font-mono text-sm text-[#444]">
                      Number of Assets
                    </label>
                    <input
                      type="number"
                      id="assetCount"
                      name="assetCount"
                      min="1"
                      className="w-full p-3 bg-transparent border border-[#222] font-mono text-[#222] focus:outline-none focus:border-[#E8A0BF]"
                      placeholder="100"
                    />
                    {state.errors?.assetCount && (
                      <p className="text-red-500 font-mono text-xs mt-1">{state.errors.assetCount[0]}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full font-mono text-base px-6 py-3 bg-[#222] text-white hover:bg-[#E8A0BF] hover:text-[#222] transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Request
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
