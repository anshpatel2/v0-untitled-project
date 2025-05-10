"use server"

import { revalidatePath } from "next/cache"

export type FormState = {
  name: string
  email: string
  message: string
  createdAt: Date
  id: string
}

// This would typically connect to a database
// For now, we'll use an in-memory store
let submissions: FormState[] = []

export async function submitContactForm(formData: FormData) {
  try {
    const name = `${formData.get("first-name")} ${formData.get("last-name")}`
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Create a new submission
    const newSubmission: FormState = {
      name,
      email,
      message,
      createdAt: new Date(),
      id: Date.now().toString(),
    }

    // Add to our "database"
    submissions.push(newSubmission)

    // In a real app, you would save to a database here
    // await db.insert(...)

    revalidatePath("/")

    return {
      success: true,
      message: "Message sent successfully!",
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    }
  }
}

export async function getSubmissions() {
  // In a real app, you would fetch from a database
  return submissions
}

export async function deleteSubmission(id: string) {
  submissions = submissions.filter((sub) => sub.id !== id)
  revalidatePath("/")
  return { success: true }
}
