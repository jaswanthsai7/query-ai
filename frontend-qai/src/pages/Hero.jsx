import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../constants/theme";

export default function Hero() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const typingRef = useRef(null); // keep interval id safe

  const mainText = "Master Your Finances";

  useEffect(() => {
    const heroTimer = setTimeout(() => setLoading(false), 1000);
    const redirectTimer = setTimeout(() => {
      setRedirecting(true);
      setTimeout(() => navigate("/AIChatPage"), 800);
    }, 4000);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(redirectTimer);
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      setDisplayText("");
      let i = 0;

      typingRef.current = window.setInterval(() => {
        if (i < mainText.length) {
          // safer: slice avoids ever reading undefined
          setDisplayText(mainText.slice(0, i + 1));
          i++;
        } else {
          if (typingRef.current) {
            clearInterval(typingRef.current);
            typingRef.current = null;
          }
        }
      }, 100);

      return () => {
        if (typingRef.current) {
          clearInterval(typingRef.current);
          typingRef.current = null;
        }
      };
    }
  }, [loading, mainText]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen bg-gradient-to-br ${theme.gradient}`}>
        <div className="loader-custom"></div>
      </div>
    );
  }

  return (
    <section
      className={`relative flex items-center justify-center text-center 
         min-h-[calc(100vh-8rem)] 
         bg-gradient-to-br ${theme.gradient}
         overflow-hidden rounded-3xl mx-5 transition-opacity duration-1000
         ${redirecting ? "opacity-0" : "opacity-100"} animate-fade-in`}
    >
      {/* Galaxy Particle Effect */}
      <div className="galaxy-stars"></div>
      <div className="galaxy-stars galaxy-stars2"></div>
      <div className="galaxy-stars galaxy-stars3"></div>
      <div className="twinkling"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-white">
        <h1
          className={`text-5xl md:text-6xl font-extrabold leading-tight 
           tracking-wider drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]
           bg-gradient-to-r ${theme.gradientchat}
           bg-clip-text text-transparent`}
        >
          {displayText}
          <span className="animate-blink">|</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed 
                      [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]">
          A modern platform to track, analyze, and optimize your expenses—designed for simplicity and insight.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-full font-semibold text-white bg-white/20 border border-white/30
                       hover:bg-white/30 hover:scale-105 transition-transform duration-300 shadow-lg
                       backdrop-blur-md"
          >
          Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
