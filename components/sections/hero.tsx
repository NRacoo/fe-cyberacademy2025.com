"use client";
import { useRouter } from "next/navigation";
import { THEME } from "@/lib/theme";
import { motion, Variants } from "framer-motion";
import Lottie from "lottie-react";

import cyberAnimation from "@/public/lottie/game.json";

export default function Hero() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center 
                 px-4 md:px-8 py-20 relative overflow-hidden bg-black"
      id="home"
    >
        <div
        className="absolute inset-0 opacity-20 pointer-events-none select-none z-0"
        style={{
         backgroundImage: "url(/images/grid.svg)",
         backgroundSize: "cover",
         backgroundPosition: "center",
        }}
       /> 

      <motion.div
        className="relative flex flex-col md:flex-row items-center 
                   justify-between w-full max-w-7xl gap-8 md:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center md:items-start md:text-left 
                     w-full md:w-3/5 order-2 md:order-1"
        >
          <motion.h1
            className="font-black mb-5 text-balance font-pixel leading-tight"
            style={{
              color: THEME.colors.white,
              WebkitTextStroke: `1px ${THEME.colors.primary}`,
              letterSpacing: "0.05em",
              textShadow: `0 0 10px ${THEME.colors.primary}`,
            }}
            variants={itemVariants}
          >
            <span className="block text-2xl sm:text-3xl lg:text-3xl">
              WELCOME TO
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-5xl">
              CYBER ACADEMY
            </span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white mb-10 tracking-wide text-pretty font-pixel max-w-2xl"
            variants={itemVariants}
          >
            ARE YOU READY? IT&apos;S TIME TO SET A NEW HIGH SCORE!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            variants={itemVariants}
          >
            <motion.a
              href="#about"
              className="px-7 py-3 text-base font-bold tracking-wider
                         transition-all duration-300 ease-out 
                         font-pixel relative cursor-pointer
                         w-full sm:w-auto 
                         bg-transparent border-2 
                         hover:scale-[1.05] 
                         hover:bg-primary/20
                         active:scale-95 transform-gpu
                         text-center no-underline"
              style={{
                color: THEME.colors.white,
                borderColor: THEME.colors.primary,
              }}
            >
              Learn More
            </motion.a>

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
              Let&apos;s Get Started
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-2/5 order-1 md:order-2"
          variants={itemVariants}
        >
          <Lottie animationData={cyberAnimation} loop={true} />
        </motion.div>
      </motion.div>

        <div
        className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
        style={{
         background: `linear-gradient(to top, ${THEME.colors.black} 0%, ${THEME.colors.secondary} 50%, transparent 100%)`,
        }}
       /> 

    </section>
  );
}