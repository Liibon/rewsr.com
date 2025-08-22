"use server"

import { z } from "zod"
import { createServerSupabaseClient } from "@/lib/supabase"

// Define validation schema for invitation code
const InvitationCodeSchema = z.object({
  invitationCode: z.string().min(4, { message: "Invitation code is required" }),
})

export type InvitationCodeState = {
  errors?: {
    invitationCode?: string[]
    _form?: string[]
  }
  success?: boolean
  isValid?: boolean
}

export async function validateInvitationCode(
  prevState: InvitationCodeState,
  formData: FormData,
): Promise<InvitationCodeState> {
  try {
    const invitationCode = formData.get("invitationCode") as string

    // Validate form data
    const validatedFields = InvitationCodeSchema.safeParse({
      invitationCode,
    })

    // Return errors if validation fails
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        isValid: false,
      }
    }

    // Check if the code is the special "rewsr-alpha" code
    if (invitationCode === "rewsr-alpha") {
      return {
        success: true,
        isValid: true,
      }
    }

    // If not the special code, check the database
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("invitation_codes")
      .select("*")
      .eq("code", invitationCode)
      .eq("is_active", true)
      .single()

    if (error || !data) {
      return {
        errors: {
          invitationCode: ["Invalid invitation code"],
          _form: ["The invitation code you entered is not valid or has expired."],
        },
        success: false,
        isValid: false,
      }
    }

    // Valid code found
    return {
      success: true,
      isValid: true,
    }
  } catch (error) {
    console.error("Error validating invitation code:", error)
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      success: false,
      isValid: false,
    }
  }
}

// Define validation schema for pilot form
const PilotFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  transactionType: z.enum(["buy", "sell"]),
  urgency: z.string().transform(Number),
  fileCount: z.string().transform(Number).optional(),
  notes: z.string().optional(),
})

export type PilotFormState = {
  errors?: {
    email?: string[]
    transactionType?: string[]
    quantity?: string[]
    assetType?: string[]
    urgency?: string[]
    _form?: string[]
  }
  success?: boolean
  message?: string
}

export async function submitPilotForm(prevState: PilotFormState, formData: FormData): Promise<PilotFormState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // Extract form data
    const email = formData.get("email") as string
    const transactionType = formData.get("transactionType") as string
    const urgency = formData.get("urgency") as string
    const notes = formData.get("notes") as string

    // Count files
    let actualFileCount = 0
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file-")) {
        actualFileCount++
      }
    }

    // Validate form data
    const validatedFields = PilotFormSchema.safeParse({
      email,
      transactionType,
      urgency,
      fileCount: actualFileCount.toString(),
      notes,
    })

    // Return errors if validation fails
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        message: "Please fix the errors in the form.",
      }
    }

    // Collect asset types and quantities directly from form data
    const assetTypes: Record<string, number> = {}
    let totalQuantity = 0

    // Get all selected asset types
    const selectedTypes = formData.getAll("assetTypes")

    // For each selected type, get its quantity
    for (const type of selectedTypes) {
      const typeId = type.toString()
      const quantityValue = formData.get(`quantity-${typeId}`)

      if (quantityValue) {
        const quantity = Number.parseInt(quantityValue.toString()) || 0
        if (quantity > 0) {
          assetTypes[typeId] = quantity
          totalQuantity += quantity
        }
      }
    }

    // Check if at least one asset type is selected with quantity
    if (Object.keys(assetTypes).length === 0) {
      return {
        errors: {
          assetType: ["Please select at least one asset type with quantity"],
          _form: ["Please select at least one asset type with quantity"],
        },
        success: false,
      }
    }

    // TEMPORARY SOLUTION: Skip database insertion and simulate success
    // This helps us determine if the issue is specifically with the database interaction
    console.log("Form data validated successfully. Skipping database insertion for now.")
    console.log("Email:", email)
    console.log("Transaction Type:", transactionType)
    console.log("Asset Types:", assetTypes)
    console.log("Total Quantity:", totalQuantity)
    console.log("Urgency:", urgency)
    console.log("File Count:", actualFileCount)
    console.log("Notes:", notes)

    // Return success message without actually inserting into the database
    return {
      success: true,
      message:
        "Your request has been processed successfully. (Note: This is a temporary solution while we resolve database issues.)",
    }
  } catch (error) {
    console.error("Error submitting form:", error)
    // Handle any errors
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      success: false,
    }
  }
}

// Keep the original hardware form actions for backward compatibility
export type HardwareFormState = {
  errors?: {
    email?: string[]
    pickupDate?: string[]
    files?: string[]
    invitationCode?: string[]
    _form?: string[]
  }
  success?: boolean
  message?: string
}

export async function submitHardwareForm(prevState: HardwareFormState, formData: FormData): Promise<HardwareFormState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // Extract form data
    const userType = formData.get("userType") as string
    const email = formData.get("email") as string
    const pickupDate = formData.get("pickupDate") as string
    const idleHardware = formData.has("idleHardware")
    const invitationCode = formData.get("invitationCode") as string

    // Count files
    let fileCount = 0
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file-")) {
        fileCount++
      }
    }

    // Check if files were uploaded
    if (fileCount === 0) {
      return {
        errors: {
          files: ["Please upload a spreadsheet or photos"],
          _form: ["Missing required files. Please upload a spreadsheet or photos."],
        },
        success: false,
      }
    }

    // Check if invitation code is the special code
    if (invitationCode === "rewsr-alpha") {
      // Return success message based on user type
      return {
        success: true,
        message: "Your request has been received. We'll contact you shortly.",
      }
    }

    // Verify invitation code is valid in the database
    const supabase = createServerSupabaseClient()
    const { data: codeData, error: codeError } = await supabase
      .from("invitation_codes")
      .select("*")
      .eq("code", invitationCode)
      .eq("is_active", true)
      .single()

    if (codeError || !codeData) {
      return {
        errors: {
          invitationCode: ["Invalid invitation code"],
          _form: ["The invitation code you entered is not valid or has expired."],
        },
        success: false,
      }
    }

    // Store the submission in the database
    const { data, error } = await supabase.from("hardware_requests").insert([
      {
        email,
        user_type: userType,
        pickup_date: pickupDate,
        idle_hardware: idleHardware,
        invitation_code: invitationCode,
        file_count: fileCount,
      },
    ])

    if (error) {
      console.error("Error storing submission:", error)
      return {
        errors: {
          _form: ["Failed to store your request. Please try again."],
        },
        success: false,
      }
    }

    // Update the invitation code usage count
    await supabase
      .from("invitation_codes")
      .update({ used_count: codeData.used_count + 1 })
      .eq("code", invitationCode)

    // Return success message based on user type
    return {
      success: true,
      message: "Your request has been received. We'll contact you shortly.",
    }
  } catch (error) {
    console.error("Error submitting form:", error)
    // Handle any errors
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      success: false,
    }
  }
}

export type DecommissionFormState = {
  errors?: {
    email?: string[]
    assetCount?: string[]
    companyName?: string[]
    _form?: string[]
  }
  success?: boolean
  message?: string
}

export async function submitDecommissionForm(
  prevState: DecommissionFormState,
  formData: FormData,
): Promise<DecommissionFormState> {
  // Redirect to the new form action
  return submitHardwareForm(prevState as any, formData) as any
}
