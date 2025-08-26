"use client"

import { useState, useEffect, useCallback } from "react"
import { AuthService, type UserState } from "@/lib/auth"

interface AuthResult {
  success: boolean
  error?: string
  apiKey?: string
}

interface CloudLoginResult {
  success: boolean
  error?: string
  deployUrl?: string
  changeSetId?: string
}

export function useAuth() {
  const [state, setState] = useState<UserState>({
    isAuthenticated: false,
    apiKey: null,
    userProfile: null,
    computeHistory: [],
  })

  const [isLoading, setIsLoading] = useState(true)

  // Cloud deployment state
  const [cloudState, setCloudState] = useState<{
    uiState: "idle" | "waiting" | "deploy"
    deployUrl?: string
    changeSetId?: string
    cloud?: "aws" | "azure"
  }>({
    uiState: "idle",
  })

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const apiKey = AuthService.getApiKey()
        const userProfile = AuthService.getUserProfile()

        console.log("Initializing auth with:", { apiKey, userProfile })

        if (apiKey && userProfile) {
          // Use cached profile data to avoid initial fetch issues
          setState({
            isAuthenticated: true,
            apiKey,
            userProfile,
            computeHistory: [],
          })
          console.log("Auth initialized successfully")
        } else {
          console.log("No cached auth data found")
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        // Clear invalid data
        AuthService.clearStorage()
        setState({
          isAuthenticated: false,
          apiKey: null,
          userProfile: null,
          computeHistory: [],
        })
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // OIDC popup handler
  const openOidcPopup = useCallback(async (cloud: "aws" | "azure"): Promise<string> => {
    return new Promise((resolve, reject) => {
      const clientId =
        cloud === "aws" ? process.env.NEXT_PUBLIC_AWS_OIDC_CLIENT_ID : process.env.NEXT_PUBLIC_AZURE_OIDC_CLIENT_ID

      if (!clientId) {
        reject(new Error(`${cloud.toUpperCase()} OIDC client ID not configured`))
        return
      }

      const authUrl =
        cloud === "aws"
          ? `https://signin.aws.amazon.com/oauth?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${encodeURIComponent(window.location.origin + "/auth/callback")}`
          : `https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${encodeURIComponent(window.location.origin + "/auth/callback")}`

      const popup = window.open(authUrl, "cloudAuth", "width=500,height=600,scrollbars=yes,resizable=yes")

      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          reject(new Error("Authentication cancelled"))
        }
      }, 1000)

      // Listen for message from popup
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return

        if (event.data.type === "CLOUD_AUTH_SUCCESS") {
          clearInterval(checkClosed)
          popup?.close()
          window.removeEventListener("message", messageHandler)
          resolve(event.data.buyerId)
        } else if (event.data.type === "CLOUD_AUTH_ERROR") {
          clearInterval(checkClosed)
          popup?.close()
          window.removeEventListener("message", messageHandler)
          reject(new Error(event.data.error))
        }
      }

      window.addEventListener("message", messageHandler)
    })
  }, [])

  // Cloud login handler
  const handleCloudLogin = useCallback(
    async (cloud: "aws" | "azure"): Promise<CloudLoginResult> => {
      try {
        console.log(`Starting ${cloud} cloud login`)
        setCloudState({ uiState: "waiting", cloud })

        // 1. Pop OIDC login
        const buyerId = await openOidcPopup(cloud)
        console.log(`Got buyer ID: ${buyerId}`)

        // 2. Ask backend to allow-list that ID
        const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || "https://anansi-ilua.onrender.com"
        const response = await fetch(`${backendBase}/marketplace/allow-list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ buyerId, cloud }),
        })

        if (!response.ok) {
          throw new Error(`Allow-list request failed: ${response.status}`)
        }

        const { changeSetId } = await response.json()
        console.log(`Got changeSetId: ${changeSetId}`)

        setCloudState((prev) => ({ ...prev, changeSetId }))

        // 3. Poll every 10 seconds
        const poll = setInterval(async () => {
          try {
            const pollResponse = await fetch(`${backendBase}/marketplace/allow-list/${changeSetId}`)
            if (!pollResponse.ok) {
              console.error("Poll request failed:", pollResponse.status)
              return
            }

            const result = await pollResponse.json()
            console.log("Poll result:", result)

            if (result.status === "READY") {
              clearInterval(poll)
              setCloudState({
                uiState: "deploy",
                deployUrl: result.listingUrl,
                changeSetId,
                cloud,
              })
            }
          } catch (error) {
            console.error("Polling error:", error)
          }
        }, 10000)

        // Cleanup after 10 minutes
        setTimeout(() => {
          clearInterval(poll)
          if (cloudState.uiState === "waiting") {
            setCloudState({ uiState: "idle" })
          }
        }, 600000)

        return { success: true, changeSetId }
      } catch (error) {
        console.error("Cloud login error:", error)
        setCloudState({ uiState: "idle" })
        return {
          success: false,
          error: error instanceof Error ? error.message : "Cloud login failed",
        }
      }
    },
    [openOidcPopup, cloudState.uiState],
  )

  // Disconnect handler
  const disconnect = useCallback(async () => {
    try {
      const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || "https://anansi-ilua.onrender.com"
      await fetch(`${backendBase}/destroy`, { method: "POST" })
      setCloudState({ uiState: "idle" })
    } catch (error) {
      console.error("Disconnect error:", error)
    }
  }, [])

  const register = useCallback(async (email: string): Promise<AuthResult> => {
    try {
      console.log("Starting registration for:", email)
      const result = await AuthService.register(email)
      console.log("Registration result:", result)

      const apiKey = result.api_key

      // Create user profile
      const profile = {
        id: result.user_id,
        email: email,
        api_key: apiKey,
        created_at: new Date().toISOString(),
        active: true,
      }

      // Save to localStorage
      AuthService.saveApiKey(apiKey)
      AuthService.saveUserProfile(profile)

      // Update state
      setState({
        isAuthenticated: true,
        apiKey,
        userProfile: profile,
        computeHistory: [],
      })

      console.log("Registration completed, user authenticated")
      return { success: true, apiKey }
    } catch (error) {
      console.error("Registration error:", error)
      const errorMessage = error instanceof Error ? error.message : "Registration failed"

      // Handle specific error cases
      if (errorMessage.includes("already registered") || errorMessage.includes("409")) {
        return { success: false, error: "Email already registered. Try signing in instead." }
      }

      return {
        success: false,
        error: errorMessage,
      }
    }
  }, [])

  const createDemoAccount = useCallback(async (): Promise<AuthResult> => {
    try {
      console.log("Creating demo account...")
      const result = AuthService.generateDemoApiKey()
      const apiKey = result.api_key

      console.log("Generated demo API key:", apiKey)

      // Create demo user profile
      const profile = {
        id: result.user_id,
        email: "demo@anansi.dev",
        api_key: apiKey,
        created_at: new Date().toISOString(),
        active: true,
      }

      console.log("Created demo profile:", profile)

      // Save to localStorage
      AuthService.saveApiKey(apiKey)
      AuthService.saveUserProfile(profile)

      // Update state
      setState({
        isAuthenticated: true,
        apiKey,
        userProfile: profile,
        computeHistory: [],
      })

      console.log("Demo account created and user authenticated")
      return { success: true, apiKey }
    } catch (error) {
      console.error("Demo account creation error:", error)
      return {
        success: false,
        error: "Failed to create demo account",
      }
    }
  }, [])

  const login = useCallback(async (apiKey: string): Promise<AuthResult> => {
    try {
      console.log("Attempting login with API key")

      // Try to get profile to verify the API key
      const profile = await AuthService.getProfile(apiKey)

      // Save to localStorage
      AuthService.saveApiKey(apiKey)
      AuthService.saveUserProfile(profile)

      // Update state
      setState({
        isAuthenticated: true,
        apiKey,
        userProfile: profile,
        computeHistory: [],
      })

      console.log("Login completed, user authenticated")
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage = error instanceof Error ? error.message : "Login failed"

      // Handle specific error cases
      if (errorMessage.includes("401") || errorMessage.includes("unauthorized") || errorMessage.includes("invalid")) {
        return { success: false, error: "Invalid API key. Please check and try again." }
      }

      return {
        success: false,
        error: errorMessage,
      }
    }
  }, [])

  const logout = useCallback(() => {
    console.log("Logging out user")
    AuthService.clearStorage()
    setState({
      isAuthenticated: false,
      apiKey: null,
      userProfile: null,
      computeHistory: [],
    })
    setCloudState({ uiState: "idle" })
  }, [])

  const compute = useCallback(
    async (payload: any) => {
      if (!state.apiKey) {
        throw new Error("Not authenticated")
      }

      try {
        const result = await AuthService.compute(state.apiKey, payload)

        // Add to compute history with better metadata
        const newRun = {
          run_id: result.job_id || `run_${Date.now()}`,
          function: payload.fn,
          cloud: result.metadata?.cloud || result.route?.cloud || "unknown",
          cost_usd: result.proof?.cost_usd || result.cost_usd || 0,
          timestamp: new Date().toISOString(),
          status: result.error ? "failed" : "completed",
          result,
        }

        setState((prev) => ({
          ...prev,
          computeHistory: [newRun, ...prev.computeHistory.slice(0, 9)], // Keep last 10
        }))

        return result
      } catch (error) {
        // Add failed run to history
        const failedRun = {
          run_id: `failed_${Date.now()}`,
          function: payload.fn,
          cloud: "unknown",
          cost_usd: 0,
          timestamp: new Date().toISOString(),
          status: "failed",
          result: { error: error instanceof Error ? error.message : "Unknown error" },
        }

        setState((prev) => ({
          ...prev,
          computeHistory: [failedRun, ...prev.computeHistory.slice(0, 9)],
        }))

        throw error
      }
    },
    [state.apiKey],
  )

  return {
    ...state,
    isLoading,
    register,
    createDemoAccount,
    login,
    logout,
    compute,
    // Cloud deployment methods
    handleCloudLogin,
    disconnect,
    cloudState,
  }
}
