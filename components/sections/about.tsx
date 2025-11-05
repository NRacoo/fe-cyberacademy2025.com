"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import TextPressure from "../TextPressure";
import { THEME } from "@/lib/theme";
import {motion} from "framer-motion"
import { useRouter } from "next/navigation";

interface AnimatedElementProps {
  children: React.ReactNode;
  delay: number;
}

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

interface ProgramCardProps {
  title: string;
  description: string;
  accentColor: string;
  delay: number;
}

function ProgramCard({
  title,
  description,
  accentColor,
  delay,
}: ProgramCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedElement delay={delay}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col items-start justify-between p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/30 cursor-pointer min-h-[180px]"
        style={{
          boxShadow: isHovered
            ? `inset 0 0 20px ${accentColor}20, 0 0 20px ${accentColor}20`
            : "none",
          transition: "all 500ms cubic-bezier(0.23, 1, 0.320, 1)",
        }}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(to right, ${accentColor}, transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex-1">
          <h3
            className="text-xs font-pixel text-white mb-3 transition-all duration-300 tracking-widest uppercase"
            style={{
              color: isHovered ? accentColor : "#FFFFFF",
              textShadow: isHovered ? `0 0 10px ${accentColor}40` : "none",
              letterSpacing: "0.1em",
            }}
          >
            {title}
          </h3>
          <p className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom accent indicator */}
        <div
          className="h-1 rounded-full transition-all duration-500 mt-4"
          style={{
            background: `linear-gradient(to right, ${accentColor}, transparent)`,
            width: isHovered ? "32px" : "12px",
          }}
        />
      </div>
    </AnimatedElement>
  );
}

export default function AboutSection() {
  const router = useRouter()
  return (
    <section className="min-h-screen bg-black pt-32 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="about">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(179, 0, 94, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(179, 0, 94, 0.5) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
        <div className="mb-24">
          <AnimatedElement delay={0}>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-6 bg-gradient-to-b from-[#00D9FF] to-[#B3005E]" />
              <span
                className="text-[10px] font-pixel text-gray-400 tracking-widest"
                style={{ letterSpacing: "0.2em" }}
              >
                ABOUT US
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <div
              style={{
                position: "relative",
                height: "200px",
                marginBottom: "32px",
              }}
            >
              <TextPressure
                text="Cyber Academy"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#FFFFFF"
                strokeColor="#B3005E"
                minFontSize={48}
              />
            </div>
          </AnimatedElement>

          <AnimatedElement delay={200}>
            <p className="text-xs text-gray-400 max-w-3xl leading-loose tracking-wide font-light font-pixel">
              Cyber Academy delivers intensive, hands-on training in
              cutting-edge cybersecurity and emerging technologies. We bridge
              the gap between theoretical knowledge and industry-ready expertise
              through immersive learning experiences tailored for the digital
              era.
            </p>
          </AnimatedElement>
        </div>

        {/* CTA section */}
        <AnimatedElement delay={800}>
          <div className="group relative p-10 md:p-16 rounded-lg border border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.01] to-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-700 hover:border-white/30 hover:bg-white/[0.04]">
            {/* Gradient accent corners */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#00D9FF]/5 to-transparent rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#B3005E]/5 to-transparent rounded-full blur-3xl -z-10" />

            <div className="text-center">
              <h3
                className="text-base md:text-lg font-pixel text-white mb-6 tracking-widest uppercase"
                style={{ letterSpacing: "0.15em" }}
              >
                Begin Your Journey
              </h3>
              <p className="text-xs text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed font-light">
                Join industry leaders and aspiring professionals in our
                transformative cybersecurity programs designed for the modern
                era.
              </p>
            <motion.button
              onClick={() => router.push("#courses")}
              className="px-7 py-3 text-sm font-bold tracking-wider
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
              Explores Program
            </motion.button>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
