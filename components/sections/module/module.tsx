"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { BookOpen, Clock, Lock, CheckCircle2, ArrowRight, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Modul {
  id: string
  name: string
  link: string
  status: string
  topik: string
  description: string
  image: string
  available_at: string
  is_clicked: boolean
}

export default function ModuleSection() {
  const [loading, setLoading] = useState(true)
  const [moduls, setModuls] = useState<Modul[]>([])
  const api = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token")
      const userId = Cookies.get("userId")

      if (!token || !userId) {
        router.push("/login")
        return
      }

      try {
        const res = await fetch(`${api}/api/v1/modul/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message || "Failed to fetch module data")
        }

        const result = await res.json()
        const data = result.data

        setModuls(data)
        console.log("Modules:", data)
      } catch (error) {
        console.error("Error fetching module data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; color: string; icon: any }> = {
    COMINGSOON: { label: "Coming Soon", color: "bg-amber-500/20 text-amber-600", icon: Clock },
    AVAILABLE: { label: "Available", color: "bg-emerald-500/20 text-emerald-600", icon: CheckCircle2 },
    LOCKED: { label: "Locked", color: "bg-slate-500/20 text-slate-600", icon: Lock },
  }
  return configs[status] || configs.COMINGSOON
    }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        Loading modules...
      </section>
    )
  }

  return (
    <section className="min-h-screen py-20 px-4">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none select-none z-0"
        style={{
          backgroundImage: "url(/images/grid.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="border-b border-border/50 ">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8">
          <div className="space-y-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white text-start">
              Learning Modules
            </h1>
          </div>
          <p className="text-sm text-white font-light text-start md:px-1">
            Expand your knowledge with our curated collection of technical
            modules and courses.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
       {moduls.map((item) => {
        const statusConfig = getStatusConfig(item.status)
        const StatusIcon = statusConfig.icon
        const isComingSoon = item.status === "COMINGSOON"
        
        return (
            <div key={item.id} className="group relative">
                <Card className="bg-black">
                    <div className="relative aspect-video overflow-hidden px-4">
                        <Image src={item.image || "Gambar tidak tersedia"}
                        width={300}
                        height={300}
                        alt="gambar"
                        unoptimized
                        className="object-cover w-full h-full"/>
                    </div>
                    <div className="flex items-center justify-start gap-2 px-6 pt-4">
                        <div className="flex gap-2 flex-wrap">
                            <Badge className={`${statusConfig.color} border-0 gap-2 font-medium`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig.label}
                            </Badge>
                            {!isComingSoon && (
                            <Zap className="h-5 w-5 text-amber-600" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <Badge variant="outline" className="border-primary/30 bg-white">
                            {item.topik}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-4 p-6">
                    <div className="space-y-2">
                      <h3 className="text-xl  font-bold text-white transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm font-orbitron">{item.description}</p>
                    </div>

                    {/* Available At */}
                    {isComingSoon && (
                      <div className="flex items-center gap-2 rounded-lg bg-amber-500/5 px-4 py-3 text-sm text-[#FF1493]">
                        <Clock className="h-4 w-4" />
                        <span>Available {formatDate(item.available_at)}</span>
                      </div>
                    )}

                    {/* Progress or Info */}
                    <div className="space-y-3 border-t border-border/30 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <Button className="w-full border border-[#FF1493] text-white" variant={"ghost"} onClick={() => window.open(item.link, "_blank", "noopener,noreferrer")}>Read</Button>
                      </div>
                    </div>
                  </div>

                </Card>
            </div>
        )
       })}
      </div>
    </section>
  )
}
