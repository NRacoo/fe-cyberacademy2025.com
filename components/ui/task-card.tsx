"use client"
import { useState } from "react"
import { Clock, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Input } from "./input"

interface TaskCardProps {
  task: {
    id: string
    title: string
    desctription: string
    file: string
    deadline: string
    topik: string
    isSubmitted:boolean,
    submissionsFile?:string,
    submissionsStatus?:string,
  }
  onSubmit: (taskId: string, file: string) => Promise<void>
}

export function TaskCard({ task, onSubmit }: TaskCardProps) {
  const [isSubmitted, setIsSubmitted] = useState(task.isSubmitted || task.submissionsStatus === "DONE")
  const [submissionFile, setSubmissionFile] = useState("")   
  const [openDialog, setOpenDialog] = useState(false)  

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const isOverdue = new Date(task.deadline) < new Date()

  const handleSubmit = async () => {
    try {
      await onSubmit(task.id, submissionFile)
      setIsSubmitted(true)
      setOpenDialog(false)
    } catch (error) {
      console.error("Error submitting task:", error)
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
            <CardDescription className="mt-1 text-xs uppercase tracking-wider">
              {task.topik}
            </CardDescription>
          </div>
          {isSubmitted && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {task.desctription}
          </p>
        </div>

        <div className="space-y-2 pt-2">
          {task.file && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
              <a
                href={task.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate"
              >
                View Instructions
              </a>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className={isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}>
              {formatDate(task.deadline)}
            </span>
            {isOverdue && <AlertCircle className="w-4 h-4 text-destructive shrink-0" />}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Dialog open={openDialog} onOpenChange={(open) => {
            if (!isSubmitted) setOpenDialog(open)
        } }>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    {isSubmitted ? "Submitted" : "Add Task"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Task</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Input type="text" placeholder="Link File" value={submissionFile} onChange={(e) => setSubmissionFile(e.target.value)}/>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button variant={"secondary"} onClick={handleSubmit} disabled={isSubmitted}>
                           {isSubmitted ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
