"use client";

import { useRef } from "react";
import Image from "next/image";
import LogoLoop from "@/components/LogoLoop";
import { THEME } from "@/lib/theme";
import { PARTNERS } from "@/lib/constants";

export default function MedpartSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const partners = PARTNERS.map((partner) => ({
    node: (
      <Image
        src={partner.src || "/placeholder.svg"}
        alt={partner.alt}
        width={100}
        height={100}
        className="object-contain"
      />
    ),
  }));

  return (
    <section
      className="relative min-h-screen bg-black overflow-hidden py-20 px-4"
      ref={containerRef}
      id="medpart"
    >
      {/* Background Grid */}
      <Image
        src="/images/grid.svg"
        alt="Grid Background"
        fill
        className="object-cover opacity-20 pointer-events-none select-none z-0"
      />

      {/* Glow Effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 animate-pulse pointer-events-none z-0"
        style={{ background: THEME.colors.primary }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 animate-pulse pointer-events-none z-0"
        style={{ background: THEME.colors.primary }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="mb-20 text-center">
          <h2
            className="text-4xl md:text-7xl font-black text-center mt-4 relative text-balance font-pixel"
            style={{
              color: THEME.colors.white,
              WebkitTextStroke: `1px ${THEME.colors.primary}`,
              letterSpacing: "0.05em",
            }}
          >
            Media Partner
          </h2>

          <div
            className="h-1 w-32 mx-auto mt-8"
            style={{ background: THEME.colors.primary }}
          />
        </div>

        <div className="relative h-40 overflow-hidden flex items-center z-10">
          <LogoLoop
            logos={partners}
            speed={80}
            direction="left"
            gap={80}
            logoHeight={100}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor={THEME.colors.black}
            ariaLabel="Partner Logos"
          />
        </div>
      </div>
    </section>
  );
}
