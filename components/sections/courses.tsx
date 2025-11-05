"use client";

import type React from "react";

import { CarouselSize } from "../ui/courseCarousel";
import Image from "next/image";
import { Card } from "../ui/card";
import { THEME } from "@/lib/theme";
import { COURSES_DATA } from "@/lib/courses-data";
import {motion} from "framer-motion"

import AnimatedElement from "../ui/about/AnimatedElement";

import { useRouter } from "next/navigation";

export default function CoursesSection() {
  const router = useRouter();

  return (
    <section
      className="min-h-screen bg-black py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      id="courses"
    >
      <div className="absolute inset-0 opacity-[0.004] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
           linear-gradient(rgba(179, 0, 94, 0.3) 1px, transparent 1px),
           linear-gradient(90deg, rgba(179, 0, 94, 0.3) 1px, transparent 1px)
         `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>
      <div className="absolute top-32 -left-40 w-80 h-80 bg-[#00D9FF]/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#B3005E]/8 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement delay={0}>
          <div className="mb-20 text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 md:justify-start justify-center">
              <div className="w-1 h-10 bg-[#FF1493]" />
              <span
                className="text-xs font-pixel tracking-widest uppercase font-bold"
                style={{ letterSpacing: "0.3em", color: THEME.colors.primary }}
              >
                Featured Courses
              </span>
            </div>

            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-pixel tracking-tight uppercase leading-tight mb-6"
              style={{
                color: THEME.colors.white,
                WebkitTextStroke: `1px ${THEME.colors.primary}`,
                letterSpacing: "0.05em",
              }}
            >
              Master Tech Skills
            </h2>

            <p className="text-gray-300 font-light text-sm md:text-base max-w-2xl md:max-w-none">
              Comprehensive courses in cybersecurity, web development, AI, and
              IoT designed for ambitious learners
            </p>
          </div>
        </AnimatedElement>

        <div className="justify-center mb-24 w-full hidden md:block">
          <CarouselSize />
        </div>

        <div className="gap-2 space-y-4 block md:hidden">
          {COURSES_DATA.images.map((item, index) => (
            <Card
              key={index}
              className="flex items-center justify-center bg-transparent"
            >
              <Image
                width={400}
                height={200}
                src={item.src}
                alt={item.alt}
                className="rounded-lg"
              />
            </Card>
          ))}
        </div>

        <AnimatedElement delay={600}>
          <div className="mt-24 text-center">
                 <motion.button
              onClick={() => router.push("/daftar")}
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
              Level Up Your Skils
            </motion.button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}