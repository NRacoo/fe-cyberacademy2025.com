"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { CarouselSize } from "../ui/courseCarousel";
import Image from "next/image";
import { Card } from "../ui/card";
import { THEME } from "@/lib/theme";

interface AnimatedElementProps {
  children: React.ReactNode;
  delay: number;
}

const images = [
  {
    src: "/images/ComputerVision.png",
    alt:"ComVis"
  },
  {
    src: "/images/Webdev.png",
    alt:"Webdev"
  },
  {
    src: "/images/Iot.png",
    alt:"Iot"
  },
  {
    src: "/images/Netsec.png",
    alt:"Netsec"
  },
];


function AnimatedElement({ children, delay }: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function CoursesSection() {
  return (
    <section
      className="min-h-screen bg-black py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      id="courses"
    >
      {/* Background grid */}
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

      {/* Animated accent circles */}
      <div className="absolute top-32 -left-40 w-80 h-80 bg-[#00D9FF]/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#B3005E]/8 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <AnimatedElement delay={0}>
          <div className="mb-20 text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 md:justify-start justify-center">
              <div className="w-1 h-10 bg-[#FF1493]" />
              <span
                className="text-xs font-pixel tracking-widest uppercase font-bold"
                style={{ letterSpacing: "0.3em" , color: THEME.colors.primary}}
              >
                Featured Courses
              </span>
            </div>

            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-pixel tracking-tight uppercase leading-tight mb-6"
             style={{
                         color:THEME.colors.white,
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

        {/* MagicBento Grid */}
        <div className="justify-center mb-24 w-full hidden md:block">
          <CarouselSize/>
        </div>

        <div className="gap-2 space-y-4 block md:hidden">
          {images.map((item, index) => (
           
            <Card key={index} className="flex items-center justify-center bg-transparent">
              <Image width={400} height={200}src={item.src} alt={item.alt} className="rounded-lg"/>
            </Card>
          ))}
        </div>
       

        {/* Bottom CTA Section */}
        <AnimatedElement delay={600}>
          <div className="mt-24 text-center">
            <button  className="relative px-14 py-4 font-pixel rounded-xl overflow-hidden group/btn transition-all duration-500 uppercase text-xs tracking-widest hover:scale-105 active:scale-95 border border-[#B3005E]/50 hover:border-[#B3005E] text-[#B3005E] cursor-pointer"
                style={{
                  boxShadow: "0 0 20px #B3005E30, inset 0 0 20px #B3005E05",
                }}
                >
              <p
                className="text-xs font-pixel text-gray-400 tracking-widest uppercase "
                style={{ letterSpacing: "0.2em" }}
              >
                Level Up Your Skills
              </p>
            </button>

          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
