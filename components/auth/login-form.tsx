"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { AuthFormField } from "./auth-form-field";
import { useRouter } from "next/navigation";
import { LoginFormField } from "./loginForm-field";
import Cookies from "js-cookie"

interface LoginFormData {
  nim:string,
  password:string
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>(
    {
      nim:"",
      password:"",
    }
  )
  const API = process.env.NEXT_PUBLIC_API_URL

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch(`${API}/api/v1/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nim:formData.nim,
            password:formData.password
        }),
      });
      setLoading(false)
      const result = await res.json();

      if(!res.ok){
        console.error({message:"error", data:result})
        alert("login tidak berhasil")
      }
      
      const {token, payload} = result.data
      const {id} = payload
      const {topik} = payload
      Cookies.set("token", token, {expires: 7})
      Cookies.set("userId", id)
      Cookies.set("topik", topik)
      router.push("/dashboard")
      
    } catch (error) {
      console.log({message:"Internal Server Error", data:error})
    }finally{
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-auto">
      <AuthFormField
        label="Username"
        id="username"
        type="text"
        name="nim"
        placeholder="Enter your nim"
        value={formData.nim}
        onChange={handleInputChange}
      />

      <LoginFormField
      label="Password"
      id="password"
      type="password"
      name="password"
      placeholder="enter your password"
      value={formData.password}
      onChange={handleInputChange}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full border-2 border-[#B3005E] bg-[#B3005E] text-white px-8 py-3 font-pixel text-base hover:bg-[#FF1493] transition duration-300 mt-8"
        disabled={loading}
      >
        {loading ? "Processing..." : "Login"}
      </button>

      {/* Links */}
      <div className="space-y-2 text-center pt-2">
        <p className="text-white text-sm font-orbitron">
          Belum daftar?{" "}
          <Link
            href="/daftar"
            className="text-[#FF1493] hover:text-white transition duration-300 font-bold"
          >
            Daftar
          </Link>
        </p>
        <Link
          href="/"
          className="block text-[#B3005E] hover:text-[#FF1493] transition duration-300 font-orbitron text-sm"
        >
          Back to Home
        </Link>
        <Link href={"https://docs.google.com/document/d/1EP5IcTOGAV0hm6atr8gXssrkbRwPkZ7_/edit?usp=sharing&ouid=102258087144165933837&rtpof=true&sd=true"} className="block text-[#B3005E] hover:text-[#FF1493] transition duration-300 font-orbitron text-sm">
          Pemberitahuan Login
        </Link>
      </div>
    </form>
  );
}
