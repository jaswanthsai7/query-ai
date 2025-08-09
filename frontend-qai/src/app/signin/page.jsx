"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { signIn } from "@/services/authService";
import AuthCard from "@/components/AuthCard";
import FullScreenBG from "@/components/FullScreenBG";
import Link from "next/link";
import { useRouter } from "next/navigation";
import theme from "@/constants/theme";

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      const data = await signIn(form.email, form.password); // API call
      login({ token: data.token, user: data.user });         // Update auth context
      router.push("/");                                        // Redirect on success
    } catch (err) {
      setServerError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FullScreenBG>
      <AuthCard>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-2xl font-extrabold text-white text-center">
            Sign In
          </h2>

          {serverError && (
            <div className="text-red-300 text-sm text-center">{serverError}</div>
          )}

          {/* Email Input */}
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
            {errors.email && (
              <p className="text-red-300 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
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
                onClick={() => setShowPwd((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-xs">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 w-full py-2 rounded-full font-semibold text-white bg-gradient-to-r ${theme.gradientchat} shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Sign In
          </button>

          <p className="text-center text-white/70 text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-white hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </AuthCard>
    </FullScreenBG>
  );
}
