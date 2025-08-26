"use client"

import { useEffect } from "react"

export default function AuthCallback() {
  useEffect(() => {
    // Extract auth data from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const error = urlParams.get("error")

    if (error) {
      // Send error to parent window
      window.opener?.postMessage(
        {
          type: "CLOUD_AUTH_ERROR",
          error: error,
        },
        window.location.origin,
      )
    } else if (code) {
      // In a real implementation, you'd exchange the code for tokens
      // and extract the buyer ID (AWS account ID or Azure tenant ID)
      // For now, we'll simulate this
      const buyerId = code.startsWith("aws") ? "123456789012" : "tenant-id-12345"

      // Send success to parent window
      window.opener?.postMessage(
        {
          type: "CLOUD_AUTH_SUCCESS",
          buyerId: buyerId,
        },
        window.location.origin,
      )
    }

    // Close the popup
    window.close()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#E8A0BF] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-400 font-mono">Processing authentication...</p>
      </div>
    </div>
  )
}
