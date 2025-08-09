"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import theme from "@/constants/theme";
import { useAuth } from "@/context/authContext";

export default function TopNavbar({ setHideBottamNav }) {
  const pathname = usePathname()?.toLowerCase() || "";
  const router = useRouter();
  const { user, isDemo, logout } = useAuth();

  // Sync setHideBottamNav based on route, instead of inline onClick handlers
  useEffect(() => {
    if (pathname === "/signin" || pathname === "/signup") {
      setHideBottamNav(true);
    } else {
      setHideBottamNav(false);
    }
  }, [pathname, setHideBottamNav]);

  const handleLogout = async () => {
    setHideBottamNav(false);
    await logout(); // await logout to finish before redirecting
    router.push("/");
  };

  const hideSignin = pathname === "/signin";
  const hideSignup = pathname === "/signup";

  return (
    <header>
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav
          className="
            mx-auto mt-4 w-[calc(100%-2rem)] max-w-6xl
            rounded-full px-4 py-2
            flex items-center justify-between
            bg-white/20 backdrop-blur-lg border border-white/30
            shadow-xl
          "
        >
          {/* Left: Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 text-white font-semibold tracking-tight`}
          >
            <span
              className={`inline-block h-6 w-6 rounded-full bg-gradient-to-br ${theme.gradientchat}`}
            />
            <span>QueryAI</span>
          </Link>

          {/* Middle: Greeting */}
          <div className="text-white font-medium text-lg">
            Hi, {user?.Name || "Guest"}
          </div>

          {/* Right: Auth actions */}
          <div className="flex items-center gap-2">
            {isDemo ? (
              <>
                {!hideSignin && (
                  <Link
                    href="/signin"
                    className="px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
                  >
                    Sign in
                  </Link>
                )}
                {!hideSignup && (
                  <Link
                    href="/signup"
                    className={`px-4 py-2 rounded-full text-sm font-medium text-white shadow-md
                      bg-gradient-to-r ${theme.gradientchat} hover:scale-[1.03] transition-transform`}
                  >
                    Sign up
                  </Link>
                )}
              </>
            ) : (
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-full text-sm font-medium text-white shadow-md
                  bg-gradient-to-r ${theme.gradientchat} hover:scale-[1.03] transition-transform`}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
        <div className="h-20" />
      </div>
    </header>
  );
}
