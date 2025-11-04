"use client";
import { useRouter } from "next/navigation";
import { THEME } from "@/lib/theme";

export default function Hero() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20 relative overflow-hidden"
      id="home"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none select-none"
        style={{
          backgroundImage: "url(/images/grid.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content - Now on Top Layer */}
      <div className="relative z-0 flex flex-col items-center w-full max-w-4xl">
        <h1
          className="text-5xl md:text-7xl font-black text-center mb-8 text-balance select-none font-pixel"
          style={{
            color: THEME.colors.white,
            WebkitTextStroke: `1px ${THEME.colors.primary}`,
            letterSpacing: "0.05em",
          }}
        >
          Welcome To
          <br />
          Cyber Academy
        </h1>

        <p className="text-white text-center text-lg md:text-xl mb-12 tracking-wider text-pretty select-none font-pixel">
          ARE YOU READY?, IT'S TIME TO SET A NEW HIGH SCORE!
        </p>

        <button
          onClick={handleGetStarted}
          className="px-8 py-4 text-lg font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:shadow-2xl font-pixel relative cursor-pointer"
          style={{
            color: THEME.colors.white,
            backgroundColor: THEME.colors.primary,
            border: `2px solid ${THEME.colors.primary}`,
            boxShadow: `0 0 20px ${THEME.colors.primary}`,
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = "scale(1.08)";
            btn.style.boxShadow = `0 0 40px ${THEME.colors.primaryHover}, 0 0 60px ${THEME.colors.primary}`;
            btn.style.backgroundColor = THEME.colors.primaryHover;
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = "scale(1)";
            btn.style.boxShadow = `0 0 20px ${THEME.colors.primary}`;
            btn.style.backgroundColor = THEME.colors.primary;
          }}
        >
          Let's Get Started
        </button>
      </div>

      {/* Gradient Overlay - No Click Blocking */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${THEME.colors.primary}, ${THEME.colors.secondary}, ${THEME.colors.black})`,
        }}
      />
    </section>
  );
}
