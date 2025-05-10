"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getSubmissions, deleteSubmission, type FormState } from "../actions/contact-form"
import { Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<FormState[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadSubmissions() {
      try {
        const data = await getSubmissions()
        setSubmissions(data)
      } catch (error) {
        console.error("Failed to load submissions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSubmissions()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteSubmission(id)
      setSubmissions(submissions.filter((sub) => sub.id !== id))
      toast({
        title: "Success",
        description: "Submission deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a1a] text-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#50e6ff] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]">
          Contact Form Submissions
        </h1>

        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No submissions yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Card className="border-[#1a1a3a] bg-[#0f0f2d] shadow-md h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{submission.name}</CardTitle>
                        <CardDescription className="text-gray-400">{submission.email}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDelete(submission.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 whitespace-pre-wrap">{submission.message}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-gray-500">{new Date(submission.createdAt).toLocaleString()}</p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
