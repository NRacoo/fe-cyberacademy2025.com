// components/layout/Footer.tsx
"use client";

import { Mail, MapPin } from "lucide-react";
import Image from "next/image"; // <-- 'Image' (I besar)
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    // 'bg-black' di sini sudah membuat background hitam solid
    <footer className="bg-black text-gray-400 border-t border-white/10 z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* === Bagian Atas Footer === */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Sisi Kiri: Logo dan Alamat */}
          <div className="flex-1 text-white">
            <Link href="/" aria-label="Home">
              <Image
                src="/images/logoCA.svg" // Path dari folder public
                alt="Cyber Physical System Laboratory Logo"
                width={200}
                height={40}
                className="h-auto object-contain"
              />
            </Link>
            <div className="space-y-3 text-center lg:text-left py-8">
                <div className="flex items-center justify-start lg:justify-start">
                    <MapPin className="w-10 md:h-10 md:w-5 h-5 mr-3 font-pixel" />
                    <span className="text-[10px] md:text-sm font-pixel text-start">
                    Telkom University Landmark Tower (13.12) Bandung, Jawa Barat
                    </span>
                </div>

                <div className="flex items-center justify-start lg:justify-start">
                    <Mail className="w-5 h-5 mr-3 font-pixel" />
                    <span className="text-sm font-pixel text-start">
                    cpslaboratory@gmail.com
                    </span>
                </div>
            </div>
          </div>

          {/* Sisi Kanan: Contact Us */}
          <div className="flex-1 md:flex-none">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <div className="flex items-center gap-5">
             <Link
                href="https://www.instagram.com/cpslaboratory"
                className="cursor-pointer hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                >
                <FaInstagram size={24} />
             </Link>
              <Link
                href={"https://www.linkedin.com/company/cpslaboratory/mycompany/"} // GANTI LINK
                className="cursor-pointer hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* === Garis Pemisah === */}
        <hr className="border-white/10 my-12" />
        
        {/* === Bagian Bawah Footer === */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Cyber Physical System
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}