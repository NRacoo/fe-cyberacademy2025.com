"use client"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import {motion} from "framer-motion"
import { BookOpen } from "lucide-react"
import { TaskCard } from "@/components/ui/task-card"
import { THEME } from "@/lib/theme"


interface Task{
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


export default function TaskSection (){
    const [loading, setIsLoading] = useState(true)
    const [tasks, setTasks] = useState<Task[]>([])
    const api = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()

    useEffect(() => {
        const fetctData = async () =>{
            const token = Cookies.get("token")
            const topik = Cookies.get("topik")
            if (!token || !topik) {
            router.push("/login")
            return
            }

            try {
                const res = await fetch(`${api}/api/v1/task/by-topik/${topik}`, {
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                })
                if(!res.ok){
                    const errorData = await res.json()
                    console.log(res.json())
                    throw new Error(errorData.message || "Failed to fetch module data")
                }
                const result = await res.json()
                const data = result.data
                setTasks(data)
            } catch (error) {
                console.error("Fetch error:", error)
            }finally{
                setIsLoading(false)
            }
        }
        fetctData()

    }, [])

    const HandleSubmit = async (taskID : string, file:string) => {
        const token = Cookies.get("token")
        const userId = Cookies.get("userId")
        try {
            const res = await fetch(`${api}/api/v1/submission/upload-submission`, {
                method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    file:file,
                    taskId:taskID,
                    userId:userId
                })
            })
            if(!res.ok){
                const ErrorData = await res.json()
                console.log(ErrorData)
                throw new Error(ErrorData.message || "Failed to submit task")
            }

        } catch (error) {
            console.error(error)
            throw error
        }
    }

    if (loading)
      return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
          <motion.div
            className="relative w-20 h-20 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-0 border-4 rounded-full"
              style={{ borderColor: THEME.colors.primary }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: THEME.colors.primary }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <motion.p
            className="mt-6 text-sm uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading...
          </motion.p>
        </section>
      );

    return (
        <section className="min-h-screen py-20 px-4">
            <div className="border-b border-border/50">
                <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8">
            <div className="space-y-4">
                <div className="rounded-lg bg-primary/10 p-3">
                <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white text-start">
                    Tasks
                </h1>
            </div>
            <p className="text-sm text-white font-light text-start md:px-1 pt-2">
                This task is designed to assess your understanding of the current module. 
                Follow the instructions carefully and submit your work before the deadline.
            </p>
            </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
                {tasks.map((task) => (
                    <motion.div 
                    key={task.id}
                    initial={{opacity: 0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{duration:0.3}}>
                        <TaskCard task={task} onSubmit={HandleSubmit}/>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}