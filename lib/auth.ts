// Authentication utilities and API calls
export interface User {
  id: number
  email: string
  api_key: string
  created_at: string
  active: boolean
}

export interface ComputeRun {
  run_id: string
  function: string
  cloud: string
  cost_usd: number
  timestamp: string
  status: string
  result?: any
}

export interface UserState {
  isAuthenticated: boolean
  apiKey: string | null
  userProfile: User | null
  computeHistory: ComputeRun[]
}

const API_BASE = "https://anansi-ilua.onrender.com"

// Local storage keys
const STORAGE_KEYS = {
  API_KEY: "anansi_api_key",
  USER_PROFILE: "anansi_user_profile",
}

export class AuthService {
  // Generate a demo API key for testing
  static generateDemoApiKey(): { api_key: string; user_id: number } {
    const demoKey = `ak_demo_${Math.random().toString(36).substring(2, 15)}`
    return {
      api_key: demoKey,
      user_id: Math.floor(Math.random() * 1000),
    }
  }

  // Register new user
  static async register(email: string): Promise<{ api_key: string; user_id: number }> {
    try {
      console.log("Attempting to register with:", email)
      console.log("API endpoint:", `${API_BASE}/auth/register`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
        mode: "cors",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch (e) {
          console.log("Could not parse error response as JSON")
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log("Registration success:", result)
      return result
    } catch (error) {
      console.error("Registration fetch error:", error)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timed out. The server may be slow to respond.")
        }
        if (error.message === "Failed to fetch") {
          throw new Error("Unable to connect to server. Please check your internet connection or try again later.")
        }
      }

      throw error
    }
  }

  // Get user profile
  static async getProfile(apiKey: string): Promise<User> {
    try {
      // If it's a demo API key, return demo profile
      if (apiKey.startsWith("ak_demo_")) {
        return {
          id: Math.floor(Math.random() * 1000),
          email: "demo@anansi.dev",
          api_key: apiKey,
          created_at: new Date().toISOString(),
          active: true,
        }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(`${API_BASE}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch (e) {
          console.log("Could not parse error response as JSON")
        }
        throw new Error(errorMessage)
      }

      return response.json()
    } catch (error) {
      console.error("Profile fetch error:", error)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timed out. The server may be slow to respond.")
        }
        if (error.message === "Failed to fetch") {
          throw new Error("Unable to connect to server. Please check your connection.")
        }
      }

      throw error
    }
  }

  // Compute API call
  static async compute(apiKey: string, payload: any): Promise<any> {
    try {
      // If it's a demo API key, return demo compute result
      if (apiKey.startsWith("ak_demo_")) {
        // Simulate some processing time
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

        return {
          job_id: `job_${Date.now()}`,
          result: {
            output: "Demo computation completed successfully",
            computation_time: Math.random() * 5 + 1,
            verified: true,
          },
          cost_usd: Math.random() * 0.1,
          metadata: { cloud: "demo-cloud", region: "us-west-1" },
          proof: { verified: true, hash: `0x${Math.random().toString(16).substring(2, 10)}` },
        }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 seconds for compute

      const response = await fetch(`${API_BASE}/compute`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        mode: "cors",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch (e) {
          console.log("Could not parse error response as JSON")
        }
        throw new Error(errorMessage)
      }

      return response.json()
    } catch (error) {
      console.error("Compute fetch error:", error)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Compute request timed out. The operation may be taking longer than expected.")
        }
        if (error.message === "Failed to fetch") {
          throw new Error("Unable to connect to server. Please check your connection.")
        }
      }

      throw error
    }
  }

  // Health check
  static async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(`${API_BASE}/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error("Health check error:", error)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Health check timed out.")
        }
        if (error.message === "Failed to fetch") {
          throw new Error("Unable to connect to server.")
        }
      }

      throw error
    }
  }

  // Local storage helpers
  static saveApiKey(apiKey: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey)
    }
  }

  static getApiKey(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEYS.API_KEY)
    }
    return null
  }

  static saveUserProfile(profile: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
    }
  }

  static getUserProfile(): User | null {
    if (typeof window !== "undefined") {
      const profile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
      return profile ? JSON.parse(profile) : null
    }
    return null
  }

  static clearStorage(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.API_KEY)
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE)
    }
  }

  static maskApiKey(apiKey: string): string {
    if (!apiKey || apiKey.length <= 8) return apiKey || ""
    return `****${apiKey.slice(-4)}`
  }
}
