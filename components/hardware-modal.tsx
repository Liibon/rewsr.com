"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Check, ChevronDown, AlertCircle, Unlock } from "lucide-react"
import { useFormState } from "react-dom"
import { submitHardwareForm, validateInvitationCode } from "@/app/actions"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"

interface HardwareModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HardwareModal({ isOpen, onClose }: HardwareModalProps) {
  const router = useRouter()
  const [state, formAction] = useFormState(submitHardwareForm, {})
  const [codeState, validateCode] = useFormState(validateInvitationCode, {})
  const modalRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const codeFormRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [userType, setUserType] = useState<"seller" | "buyer">("seller")
  const [files, setFiles] = useState<File[]>([])
  const [fileNames, setFileNames] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [invitationCode, setInvitationCode] = useState<string>("")
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  // Handle form submission for the invitation code
  const handleCodeSubmit = async (formData: FormData) => {
    const code = formData.get("invitationCode") as string

    // If the code is "rewsr-alpha", redirect immediately to the /access page
    if (code === "rewsr-alpha") {
      onClose()
      router.push("/access")
      return
    }

    // Otherwise, validate the code normally
    setIsValidating(true)
    validateCode(formData)
    setIsValidating(false)
  }

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
    if (!isOpen) {
      if (formRef.current) formRef.current.reset()
      if (codeFormRef.current) codeFormRef.current.reset()
      setFiles([])
      setFileNames([])
      setFileError(null)
      setIsCodeVerified(false)
      setInvitationCode("")
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

  // Update code verification status when code validation completes
  useEffect(() => {
    if (codeState.isValid) {
      const code = codeFormRef.current?.invitationCode.value || ""
      setInvitationCode(code)
      setIsCodeVerified(true)
    }
  }, [codeState.isValid])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      setFileNames((prevNames) => [...prevNames, ...newFiles.map((file) => file.name)])
      setFileError(null)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setFileNames((prevNames) => prevNames.filter((_, i) => i !== index))

    // Show error if all files are removed
    if (files.length <= 1) {
      setFileError("Please upload a spreadsheet or photos")
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      setFileNames((prevNames) => [...prevNames, ...newFiles.map((file) => file.name)])
      setFileError(null)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    // Validate files are present
    if (files.length === 0) {
      setFileError("Please upload a spreadsheet or photos")
      return
    }

    // Add files to FormData
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file)
    })
    formData.append("userType", userType)
    formData.append("invitationCode", invitationCode)

    // Call the form action
    setIsPending(true)
    formAction(formData)
    setIsPending(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-[#f7f7f7] border border-[#111] w-full max-w-md relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#E8A0BF]"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#E8A0BF]"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#E8A0BF]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#E8A0BF]"></div>

            <div className="flex justify-between items-center p-6 border-b border-[#e0e0e0]">
              <h2 className="font-mono text-xl text-[#111] font-bold tracking-tight flex items-center">
                <Logo size="sm" withText={false} href={null} />
                <span className="ml-3">{isCodeVerified ? "Request Form" : "Access Required"}</span>
              </h2>
              <motion.button
                onClick={onClose}
                className="text-[#333] hover:text-[#E8A0BF] transition-colors"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="p-6">
              {state.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 flex flex-col items-center"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#E8A0BF] flex items-center justify-center mb-6 relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                  >
                    <Check size={32} className="text-[#111]" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#E8A0BF]"
                      initial={{ scaleX: 1.2, opacity: 1 }}
                      animate={{ scaleX: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.div>
                  </motion.div>
                  <p className="font-mono text-xl text-[#111] mb-3 font-bold text-center">Request Received</p>
                  <p className="font-mono text-sm text-[#444] text-center">{state.message}</p>
                </motion.div>
              ) : isCodeVerified ? (
                // Main Form (only shown after code verification)
                <form ref={formRef} action={handleSubmit} className="space-y-8" onDragEnter={handleDrag}>
                  {state.errors?._form && (
                    <motion.div
                      className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {state.errors._form.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Unlock size={16} className="text-[#E8A0BF] mr-2" />
                      <span className="font-mono text-xs text-[#666]">Access granted</span>
                    </div>
                    <div className="font-mono text-xs bg-[#f0f0f0] px-2 py-1 text-[#333]">Code: {invitationCode}</div>
                  </div>

                  {/* User Type Toggle */}
                  <div className="space-y-3">
                    <label className="block font-mono text-sm text-[#333] font-medium flex items-center">
                      <span className="inline-block w-1 h-1 bg-[#E8A0BF] mr-2"></span>I want to:
                    </label>
                    <div className="flex border border-[#111] p-0.5 bg-[#f0f0f0]">
                      <motion.button
                        type="button"
                        className={`flex-1 py-3 font-mono text-sm relative overflow-hidden`}
                        onClick={() => setUserType("seller")}
                        whileHover={{ backgroundColor: userType === "seller" ? "#111" : "#e5e5e5" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {userType === "seller" && (
                          <motion.div
                            className="absolute inset-0 bg-[#111]"
                            layoutId="userTypeBackground"
                            transition={{ type: "spring", damping: 15, stiffness: 150 }}
                          />
                        )}
                        <span className={`relative z-10 ${userType === "seller" ? "text-white" : "text-[#333]"}`}>
                          Supply
                        </span>
                      </motion.button>
                      <motion.button
                        type="button"
                        className={`flex-1 py-3 font-mono text-sm relative overflow-hidden`}
                        onClick={() => setUserType("buyer")}
                        whileHover={{ backgroundColor: userType === "buyer" ? "#111" : "#e5e5e5" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {userType === "buyer" && (
                          <motion.div
                            className="absolute inset-0 bg-[#111]"
                            layoutId="userTypeBackground"
                            transition={{ type: "spring", damping: 15, stiffness: 150 }}
                          />
                        )}
                        <span className={`relative z-10 ${userType === "buyer" ? "text-white" : "text-[#333]"}`}>
                          Request
                        </span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="block font-mono text-sm text-[#333] font-medium flex items-center"
                    >
                      <span className="inline-block w-1 h-1 bg-[#E8A0BF] mr-2"></span>
                      Contact Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full p-3 pl-4 bg-transparent border border-[#111] font-mono text-[#111] focus:outline-none focus:border-[#E8A0BF] focus:ring-1 focus:ring-[#E8A0BF] transition-all"
                        placeholder="you@example.com"
                      />
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#E8A0BF] opacity-0 transition-opacity group-focus-within:opacity-100"></div>
                    </div>
                    {state.errors?.email && (
                      <motion.p
                        className="text-red-500 font-mono text-xs mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {state.errors.email[0]}
                      </motion.p>
                    )}
                  </div>

                  {/* Pickup Date */}
                  <div className="space-y-3">
                    <label
                      htmlFor="pickupDate"
                      className="block font-mono text-sm text-[#333] font-medium flex items-center"
                    >
                      <span className="inline-block w-1 h-1 bg-[#E8A0BF] mr-2"></span>
                      Preferred Timeline
                    </label>
                    <div className="relative">
                      <select
                        id="pickupDate"
                        name="pickupDate"
                        className="w-full p-3 bg-transparent border border-[#111] font-mono text-[#111] focus:outline-none focus:border-[#E8A0BF] focus:ring-1 focus:ring-[#E8A0BF] appearance-none transition-all"
                      >
                        <option value="ASAP">As Soon As Possible</option>
                        <option value="1week">Within 1 Week</option>
                        <option value="2weeks">Within 2 Weeks</option>
                        <option value="1month">Within 1 Month</option>
                        <option value="custom">Custom Date</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown size={16} className="text-[#333]" />
                      </div>
                    </div>
                    {state.errors?.pickupDate && (
                      <motion.p
                        className="text-red-500 font-mono text-xs mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {state.errors.pickupDate[0]}
                      </motion.p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-3">
                    <label className="block font-mono text-sm text-[#333] font-medium flex items-center">
                      <span className="inline-block w-1 h-1 bg-[#E8A0BF] mr-2"></span>
                      Upload Spreadsheet or Photos <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf,.xlsx,.csv"
                      required
                    />
                    <motion.div
                      className={`relative w-full p-6 border-2 ${
                        dragActive
                          ? "border-[#E8A0BF]"
                          : fileError
                            ? "border-red-500 border-dashed"
                            : "border-dashed border-[#111]"
                      } flex flex-col items-center justify-center gap-2 transition-colors min-h-[120px]`}
                      whileHover={{ backgroundColor: "#f0f0f0" }}
                      onClick={triggerFileInput}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {fileError ? (
                        <AlertCircle size={24} className="text-red-500" />
                      ) : (
                        <Upload size={24} className={dragActive ? "text-[#E8A0BF]" : "text-[#333]"} />
                      )}
                      <span className={`font-mono text-sm text-center ${fileError ? "text-red-500" : ""}`}>
                        {fileError ? fileError : dragActive ? "Drop files here" : "Click to upload or drag files here"}
                      </span>
                      <span className="font-mono text-xs text-[#666]">
                        Please include a spreadsheet or photos of your items
                      </span>
                      <span className="font-mono text-xs text-[#666] italic">
                        or upload your existing asset list (CSV, XLSX, PDF)
                      </span>
                    </motion.div>

                    {/* File List */}
                    <AnimatePresence>
                      {fileNames.length > 0 && (
                        <motion.div
                          className="mt-3 space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {fileNames.map((name, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center justify-between p-2 bg-[#f0f0f0] font-mono text-xs"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="truncate max-w-[80%]">{name}</span>
                              <motion.button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-[#333] hover:text-[#E8A0BF]"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X size={14} />
                              </motion.button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {state.errors?.files && (
                      <motion.p
                        className="text-red-500 font-mono text-xs mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {state.errors.files[0]}
                      </motion.p>
                    )}
                  </div>

                  {/* Idle Hardware Checkbox (for sellers only) */}
                  {userType === "seller" && (
                    <div className="flex items-start gap-3 group cursor-pointer">
                      <div className="relative mt-0.5">
                        <input type="checkbox" id="idleHardware" name="idleHardware" className="peer sr-only" />
                        <div className="h-5 w-5 border border-[#111] bg-transparent peer-checked:bg-[#E8A0BF] peer-checked:border-[#E8A0BF] transition-colors"></div>
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center text-[#111] opacity-0 peer-checked:opacity-100"
                          initial={false}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        >
                          <Check size={14} />
                        </motion.div>
                      </div>
                      <label
                        htmlFor="idleHardware"
                        className="font-mono text-sm text-[#333] cursor-pointer group-hover:text-[#111]"
                      >
                        Include idle items you want us to find
                      </label>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isPending}
                    className="w-full font-mono text-base px-6 py-4 bg-[#111] text-white hover:bg-[#E8A0BF] hover:text-[#111] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    whileHover={{ scale: isPending ? 1 : 1.02 }}
                    whileTap={{ scale: isPending ? 1 : 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-[#E8A0BF] transform origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ zIndex: -1 }}
                    />
                    <span className="relative z-10 group-hover:text-[#111]">
                      {isPending ? "Processing..." : userType === "seller" ? "Submit Request" : "Submit Request"}
                    </span>
                  </motion.button>
                </form>
              ) : (
                // Go straight to the invitation code form
                <form ref={codeFormRef} action={handleCodeSubmit} className="space-y-8">
                  {codeState.errors?._form && (
                    <motion.div
                      className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {codeState.errors._form.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </motion.div>
                  )}

                  <div className="py-2">{/* Simplified access form */}</div>

                  <div className="space-y-3">
                    <label
                      htmlFor="invitationCode"
                      className="block font-mono text-sm text-[#333] font-medium flex items-center"
                    >
                      <span className="inline-block w-1 h-1 bg-[#E8A0BF] mr-2"></span>
                      Invitation Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="invitationCode"
                        name="invitationCode"
                        required
                        className="w-full p-3 pl-4 bg-transparent border border-[#111] font-mono text-[#111] focus:outline-none focus:border-[#E8A0BF] focus:ring-1 focus:ring-[#E8A0BF] transition-all uppercase"
                        placeholder="ENTER-CODE"
                      />
                    </div>
                    {codeState.errors?.invitationCode && (
                      <motion.p
                        className="text-red-500 font-mono text-xs mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {codeState.errors.invitationCode[0]}
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isValidating}
                    className="w-full font-mono text-base px-6 py-4 bg-[#111] text-white hover:bg-[#E8A0BF] hover:text-[#111] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    whileHover={{ scale: isValidating ? 1 : 1.02 }}
                    whileTap={{ scale: isValidating ? 1 : 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-[#E8A0BF] transform origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ zIndex: -1 }}
                    />
                    <span className="relative z-10 group-hover:text-[#111]">
                      {isValidating ? "Verifying..." : "Continue"}
                    </span>
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
