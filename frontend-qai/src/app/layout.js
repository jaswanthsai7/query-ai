"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar";
import BottomNavbar from "@/components/BottomNavbar";
import theme from "@/constants/theme";
import { AuthProvider } from "@/context/authContext";

export default function RootLayout({ children }) {
  const [hideBottmNav, setHideBottamNav] = useState(false);

  useEffect(() => {}, [setHideBottamNav]);

  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen bg-gradient-custom bg-gradient-to-br ${theme.gradient} relative`}
      >
        <AuthProvider>
          <TopNavbar setHideBottamNav={setHideBottamNav} />

          {/* Main Content Area (Scrollable inside) */}
          <main className="flex-1 overflow-y-auto pt-16 pb-16">{children}</main>

          {!hideBottmNav && <BottomNavbar />}
        </AuthProvider>
      </body>
    </html>
  );
}
