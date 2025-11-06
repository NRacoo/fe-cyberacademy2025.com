"use client";
import { motion } from "framer-motion";
import { THEME } from "@/lib/theme";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // pakai router
import Cookies from "js-cookie";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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


export default function DashboardSection() {
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
   const handleGetStarted = () => {
    router.push("/dashboard/module");
  };

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
            console.log("user: ", user)
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
    <section className="min-h-screen py-20 px-4">
         <div
            className="absolute inset-0 opacity-20 pointer-events-none select-none z-0"
            style={{
            backgroundImage: "url(/images/grid.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
       /> 
       <div className="border-b border-border/50 md:pt-20">
            <div className="space-y-4 flex flex-col items-center text-center justify-center">
            <motion.h1
                className="text-2xl md:text-4xl"
                style={{
                color: THEME.colors.white,
                letterSpacing: "0.05em",
                textShadow: `0 0 10px ${THEME.colors.primary}`,
                }}
            >
                Greeting,{user?.name || "Guest"}
            </motion.h1>
            <motion.p className="text-white text-sm text-center md:max-w-4xl mb-2">
                Welcome to Cyber Academy. An immersive program where you will not just learn, but also master essential topics in the cyber world, which we have specially selected and designed for your career success.
            </motion.p>
            </div>
       </div>

        <div className="flex flex-col text-center mt-10 md:mt-20 mb-4 space-y-4 items-center justify-center">
            <motion.h1 className="text-white text-2xl md:text-4xl"
            style={{
              color: THEME.colors.white,
              letterSpacing: "0.05em",
              textShadow: `0 0 10px ${THEME.colors.primary}`,
            }}>
                
                What Will You Learn
            </motion.h1>
            <Accordion type="single" collapsible className="w-full md:max-w-xl border"
            defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-white px-4">Level 1</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-white text-start px-4">
                            You will learn to understand the fundamental concepts of {user?.topik}. This level focuses on building a solid foundation, helping you grasp the essential principles and key terminologies that will support your learning journey in the next stages.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-white px-4 ">Level 2</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-white text-start px-4">
                            At this level, you will continue to deepen your understanding by exploring more complex ideas and applying the knowledge you gained previously. You will be encouraged to analyze real-world scenarios, solve practical problems, and strengthen your critical thinking skills as you advance toward mastery.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-white px-4">Level 3</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-white text-start px-4">
                           In this stage, you will begin creating and developing your own projects based on the knowledge you have acquired. You will learn how to design, plan, and implement your ideas while following best practices and industry standards.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-white px-4">Level 4</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-white text-start px-4">
                            At this final stage, you will engage in hands-on activities and present your completed project. You will apply all the skills and concepts learned throughout the course to demonstrate your understanding and problem-solving abilities. This level culminates with a final presentation, where you showcase your project results and reflect on your overall learning experience.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        <div className="flex items-center justify-center">
            <motion.button
              onClick={handleGetStarted}
              className="px-7 py-3 text-base font-bold tracking-wider
                         transition-all duration-300 ease-out 
                         font-pixel relative cursor-pointer
                         w-full sm:w-auto
                         animate-pulse-glow 
                         hover:scale-[1.05] 
                         hover:bg-[#FF1493] 
                         hover:shadow-[0_0_40px_#FF1493,0_0_60px_#B3005E]
                         hover:animate-none
                         active:scale-95 transform-gpu"
              style={{
                color: THEME.colors.white,
                backgroundColor: THEME.colors.primary,
                border: `2px solid ${THEME.colors.primary}`,
              }}
            >
             View Module
            </motion.button>
        </div>
    
    </section>
  );
}
