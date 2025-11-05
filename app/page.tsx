import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import BenefitsSection from "@/components/sections/benefits";
import CoursesSection from "@/components/sections/courses";
// import RequirementsSection from "@/components/sections/requirements";
import MedpartSection from "@/components/sections/medpart";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header/>
        <main>
        <Hero />
        <AboutSection />
        <BenefitsSection />
        <CoursesSection />
        {/* <RequirementsSection /> */}
        <MedpartSection />
        </main>
      <Footer/>
    </div>
  );
}
