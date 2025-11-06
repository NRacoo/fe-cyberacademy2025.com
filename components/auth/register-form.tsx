"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { AuthFormField } from "./auth-form-field";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  name: string;
  nim: string;
  className: string;
  noHp: string;
  gender: string;
  email: string;
  major: string;
  faculty: string;
  year: string;
  topik: string ;
  document: string;
}

const TOPIC_OPTIONS = ["WebDev", "IoT", "ComVis", "NetSec"];

const API = process.env.NEXT_PUBLIC_API_URL


export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    nim: "",
    className: "",
    noHp: "",
    gender: "",
    email: "",
    major: "",
    faculty: "",
    year: "",
    topik: "",
    document:""
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTopicSelect = (topik: string) => {
    setFormData((prev) => ({ ...prev, topik }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("data", formData)
    try {
      setLoading(true)
      const res = await fetch(`${API}/api/v1/auth/register`,{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(
          {
            name:formData.name,
            nim:formData.nim,
            className:formData.className,
            email:formData.email,
            noHp:formData.noHp,
            gender:formData.gender.toLowerCase(),
            faculty:formData.faculty,
            year:formData.year,
            major:formData.major,
            topik:formData.topik,
            document:formData.document,
          }
        ),
      });
      setLoading(false)
      const result = await res.json();
      console.log("register", result)
      if(res.ok){
        console.log({message:"register berhasil", result});
        alert("Registrasi berhasil, terima kasih")
      }
      router.push("/login")
    } catch (error) {
      console.error({message:`error di registrasi ${error}`})
    }finally{
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <AuthFormField
            label="Name"
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <AuthFormField
            label="NIM"
            id="nim"
            type="text"
            name="nim"
            placeholder="Student ID"
            value={formData.nim}
            onChange={handleInputChange}
          />

          <AuthFormField
            label="Class Name"
            id="className"
            type="text"
            name="className"
            placeholder="e.g., TT-48"
            value={formData.className}
            onChange={handleInputChange}
          />

          <AuthFormField
            label="Phone Number"
            id="noHp"
            type="tel"
            name="noHp"
            placeholder="Your phone number"
            value={formData.noHp}
            onChange={handleInputChange}
          />

          {/* Gender Radio Buttons */}
          <div className="space-y-2">
            <p className="text-white font-semibold text-sm font-pixel">
              Gender:
            </p>
            <div className="flex gap-4 items-center text-white">
              {["Male", "Female"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleInputChange}
                    className="accent-[#FF1493]"
                    required
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <AuthFormField
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleInputChange}
          />

          <AuthFormField
            label="Major"
            id="major"
            type="text"
            name="major"
            placeholder="Your major"
            value={formData.major}
            onChange={handleInputChange}
          />

          <AuthFormField
            label="Faculty"
            id="faculty"
            type="text"
            name="faculty"
            placeholder="Your faculty"
            value={formData.faculty}
            onChange={handleInputChange}
          />

          <AuthFormField
            label="Year"
            id="year"
            type="number"
            name="year"
            placeholder="2024"
            value={formData.year}
            onChange={handleInputChange}
          />

          {/* File Uploader */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-pixel">
              </label>
                <AuthFormField
              label="Document"
              id="document"
              type="text"
              name="document"
              placeholder="link Gdrive"
              value={formData.document}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-white font-semibold text-sm font-pixel">
          TOPIC Request:
        </p>
        <div className="flex gap-2 flex-wrap">
          {TOPIC_OPTIONS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => handleTopicSelect(topic)}
              className={`px-4 py-2 rounded-full border font-pixel transition ${
                formData.topik === topic
                  ? "bg-[#FF1493] text-white border-[#FF1493]"
                  : "bg-black/70 text-white border-[#FF1493] hover:bg-black/50"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 ">
          <h1 className="text-white ">Pembayaran: BLU / 003274244576 a/n Citra Kusumadewi Sribawono</h1>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-[#FF1493] rounded-lg text-white font-bold hover:bg-[#B3005E] transition shadow-lg font-pixel cursor-pointer"
        disabled={loading}
      >
         {loading ? "Processing..." : "Register"}
      </button>

      {/* Link to Login */}
      <div className="text-center pt-4 font-orbitroncour">
        <p className="text-white text-sm font-orbitron">
          Sudah daftar?{" "}
          <Link
            href="/login"
            className="text-[#FF1493] hover:text-white transition duration-300 font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}