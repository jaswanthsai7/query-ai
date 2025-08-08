import { useState, useEffect } from "react";
import theme from "../constants/theme";

export default function SplashScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`h-screen flex items-center justify-center text-white text-xl font-sans bg-gradient-to-r ${theme.gradientchat}`}
      >
        Loading QueryAI...
      </div>
    );
  }

  return children;
}
