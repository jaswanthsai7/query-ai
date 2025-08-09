"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import FullScreenBG from "@/components/FullScreenBG";
import AuthCard from "@/components/AuthCard";
import theme from "@/constants/theme";
import { signUp } from "@/services/authService"; // import your signUp API function

export default function SignUp() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.password) newErrors.password = "Password is required.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      setLoading(true);
      const data = await signUp({ name: form.name, email: form.email, password: form.password });
      login({ token: data.token, user: data.user });
      router.push("/");
    } catch (err) {
      setServerError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FullScreenBG>
      <AuthCard>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-2xl font-extrabold text-white text-center">Create Account</h2>
          {serverError && <div className="text-red-300 text-sm text-center">{serverError}</div>}

          {/* Name */}
          <div>
            <label className="block text-sm text-white/80 mb-1 flex items-center gap-2">
              <User size={18} /> Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-orange-400 outline-none transition"
            />
            {errors.name && <p className="text-red-300 text-xs">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-white/80 mb-1 flex items-center gap-2">
              <Mail size={18} /> Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-orange-400 outline-none transition"
            />
            {errors.email && <p className="text-red-300 text-xs">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-white/80 mb-1 flex items-center gap-2">
              <Lock size={18} /> Password
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-orange-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPwd((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-300 text-xs">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-white/80 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPwd ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-orange-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPwd((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                aria-label={showConfirmPwd ? "Hide password" : "Show password"}
              >
                {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-300 text-xs">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 w-full py-2 rounded-full font-semibold text-white bg-gradient-to-r ${theme.gradientchat} shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Sign Up
          </button>

          <p className="text-center text-white/70 text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-white hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </form>
      </AuthCard>
    </FullScreenBG>
  );
}
