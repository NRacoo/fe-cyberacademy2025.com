import type React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  showGradient?: boolean;
}

export function AuthLayout({
  title,
  children,
  showGradient = true,
}: AuthLayoutProps) {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-8 py-10 relative overflow-hidden min-h-screen bg-black">
      {/* Gradient Atas */}
      {showGradient && (
        <div className="absolute top-0 left-0 w-screen h-32 bg-gradient-to-b from-[#B3005E] via-[#4D0040] to-[#000000] z-0 pointer-events-none" />
      )}

      {/* Grid Background */}
      <Image
        src="/images/grid.svg"
        alt="Grid Background"
        fill
        priority
        className="object-cover opacity-40 pointer-events-none select-none z-0"
      />

      {/* Container */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="border-2 border-[#FF1493] bg-black/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_30px_#FF1493,inset_0_0_20px_rgba(255,20,147,0.1)] flex flex-col">
          {/* Title */}
          <h1
            className="text-3xl md:text-5xl font-black mb-6 text-center"
            style={{
              color: "white",
              WebkitTextStroke: "1px #B3005E",
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </h1>

          {/* Content */}
          {children}
        </div>
      </div>

      {/* Gradient Bawah */}
      {showGradient && (
        <div className="absolute bottom-0 left-0 w-screen h-32 bg-gradient-to-t from-[#B3005E] via-[#4D0040] to-[#000000] z-0 pointer-events-none" />
      )}
    </section>
  );
}
