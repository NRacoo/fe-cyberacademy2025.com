"use client";

import { motion } from "framer-motion";
import type React from "react";

interface AnimatedElementProps {
  children: React.ReactNode;
  delay: number;
  className?: string;
}

export default function AnimatedElement({
  children,
  delay,
  className,
}: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: delay / 1000, 
      }}
      viewport={{ amount: 0.1, once: true }}
    >
      {children}
    </motion.div>
  );
}