"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import MagicBento from "@/components/MagicBento";
import { BENEFITS_DATA } from "@/lib/benefits-data";
import {THEME} from "@/lib/theme"

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

interface BenefitCardProps {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  gridSpan: string;
  delay: number;
}

function BenefitCard({
  id,
  title,
  description,
  accentColor,
  gridSpan,
  delay,
}: BenefitCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <AnimatedElement delay={delay}>
      <div
        className={`${gridSpan} relative group h-full min-h-[200px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.01] backdrop-blur-sm p-8 transition-all duration-500 hover:border-white/30 cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          boxShadow: isHovered
            ? `0 0 40px ${accentColor}40, inset 0 0 40px ${accentColor}20`
            : `0 0 20px ${accentColor}10`,
        }}
      >
        {/* CHANGE: Corner accent dot */}
        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-500"
          style={{
            backgroundColor: accentColor,
            boxShadow: isHovered
              ? `0 0 20px ${accentColor}`
              : `0 0 8px ${accentColor}`,
            transform: isHovered ? "scale(1.5)" : "scale(1)",
          }}
        />

        {/* Hover glow effect */}
        {isHovered && (
          <div
            className="absolute pointer-events-none"
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${accentColor}25, transparent 70%)`,
              left: mousePosition.x - 125,
              top: mousePosition.y - 125,
              transition: "all 0.1s ease-out",
              zIndex: 0,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Top section with accent line */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-start justify-between">
              <div
                className="text-3xl md:text-4xl transition-all duration-500"
                style={{
                  color: accentColor,
                  opacity: isHovered ? 1 : 0.7,
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              >
                ◆
              </div>
              <div
                className="h-px flex-grow ml-4 transition-all duration-500"
                style={{
                  width: "auto",
                  background: `linear-gradient(to right, ${accentColor}, transparent)`,
                }}
              />
            </div>

            {/* Title */}
            <h3
              className="text-xs md:text-sm font-pixel tracking-widest uppercase flex-shrink-0 transition-all duration-300"
              style={{
                color: isHovered ? accentColor : "#FFFFFF",
                textShadow: isHovered ? `0 0 15px ${accentColor}50` : "none",
                letterSpacing: "0.15em",
              }}
            >
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed font-light">
            {description}
          </p>

          {/* Bottom accent bars */}
          <div className="mt-8 flex gap-2">
            {[...Array(id === "poin-tak" || id === "portfolio" ? 4 : 3)].map(
              (_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 transition-all duration-500 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${accentColor}, transparent)`,
                    opacity: isHovered ? 1 : 0.4,
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </AnimatedElement>
  );
}

export default function BenefitsSection() {
  return (
    <section
      className="min-h-screen bg-black py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      id="benefits"
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
      <div className="absolute top-32 -left-40 w-80 h-80 bg-[#B3005E]/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#00D9FF]/8 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <AnimatedElement delay={0}>
          <div className="mb-20 text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 md:justify-start justify-center">
              <div className="w-1 h-10 bg-gradient-to-b from-[#00D9FF] via-[#B3005E] to-[#B3005E]" />
              <span
                className="text-xs font-pixel text-[#B3005E] tracking-widest uppercase font-bold"
                style={{ letterSpacing: "0.3em" }}
              >
                Premium Benefits
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
              Unlock Your Potential
            </h2>

            <p className="text-gray-300 font-light text-sm md:text-base max-w-2xl md:max-w-none">
              Access exclusive benefits designed to accelerate your
              cybersecurity career growth
            </p>
          </div>
        </AnimatedElement>

        {/* CHANGE: MagicBento now uses BENEFITS_DATA from lib/benefits-data.ts */}
        <div className="flex justify-center mb-24">
          <MagicBento
            items={BENEFITS_DATA}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
            glowColor="179, 0, 94"
            spotlightRadius={350}
            textAutoHide={false}
            particleCount={15}
          />
        </div>
      </div>
    </section>
  );
}
