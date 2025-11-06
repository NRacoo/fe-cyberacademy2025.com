"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card";
import { GraduationCap, Users } from "lucide-react";
import { THEME } from "@/lib/theme"

interface UserData{
  id:string;
  name: string;
  nim: string;
  className: string;
  noHp: string;
  gender: string;
  email: string;
  major: string;
  faculty: string;
  year: string;
  topik: string;
  document: string;

}

export default function ProfileSection(){
     const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData>({
    id:"",
    name:"",
    nim:"",
    className:"",
    noHp:"",
    gender:"",
    email:"",
    major:"",
    faculty:"",
    year:"",
    topik:"",
    document:""
  });
  const api = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

   useEffect(() => {
    const fetchData = async () => {
        const token = Cookies.get("token")
        if(!token){
            router.push("/login");
            return
        }
        try {
            const res = await fetch(`${api}/api/v1/service/whoami`, {
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to fetch data user");
            }
            const result = await res.json();
            const data = result.data;
            setUser({
                id:data.id,
                name:data.name,
                nim:data.nim,
                className:data.className,
                noHp:data.noHp,
                gender:data.gender,
                email:data.email,
                major:data.major,
                faculty:data.faculty,
                year:data.year,
                topik:data.topik,
                document:data.document
            })
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }finally{
            setLoading(false)
        }
    }
    fetchData()

  }, [router, api]);

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
        <section className="min-h-screen py-20">
             <div
            className="absolute inset-0 opacity-20 pointer-events-none select-none z-0"
            style={{
            backgroundImage: "url(/images/grid.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
                }}
            /> 
            <div className="relative px-4 pt-12 mb-8 md:pt-16 md:pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row md:item-start md:justify-between gap-8">
                            <div className="flex-1 space-y-3">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">{user?.name}</h1>
                                <p className="text-sm md:text-lg text-white">{user?.major}</p>

                                <div className="flex flex-wrap gap-3">
                                    <Badge variant={"outline"} className="text-white">
                                        {user?.nim}
                                    </Badge>
                                    <Badge variant={"outline"} className="text-white">
                                        {user?.className}
                                    </Badge>
                                    <Badge variant={"outline"} className="text-[#FF1493]">
                                        {user?.topik}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-[#FF1493] mb-12 mt-10"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-transparent backdrop-blur-sm">
                                <h2 className="text-sm font-bold text-white flex items-center gap-2 px-4">
                                    <GraduationCap className="w-5 h-5 text-white"/>
                                    Informasi Akademik
                                </h2>
                                <div className="space-y-4 px-4">
                                    <div>
                                        <p className="text-[13px] text-white mb-1 ">Program Studi</p>
                                        <p className="text-[13px] text-white font-medium">{user?.major}</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-white mb-1">Fakultas</p>
                                        <p className="text-[13px] text-white font-medium">{user?.faculty}</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-white mb-1">Kelas</p>
                                        <p className="text-[13px] text-white font-medium">{user?.className}</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-white mb-1">Nomor Induk Mahasiswa</p>
                                        <p className="text-[13px] text-white font-medium">{user?.nim}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-transparent">
                                <h2 className="flex gap-2 text-sm font-bold text-white px-4">
                                    <Users className="w-5 h-5"/>
                                    Informasi Pribadi
                                </h2>
                                <div className="space-y-3 px-4">
                                     <div>
                                        <p className="text-[13px] text-white mb-1">Email</p>
                                        <p className="text-[13px] text-white font-medium">{user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-white mb-1">Nomor Telepon</p>
                                        <p className="text-[13px] text-white font-medium">{user?.noHp}</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-white mb-1">Tahun Masuk</p>
                                        <p className="text-[13px] text-white font-medium">{user?.year}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}