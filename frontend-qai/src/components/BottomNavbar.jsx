import { Home, CreditCard, Wallet, LifeBuoy } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import theme from "../constants/theme";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/AIChatPage", label: "AI Chat", icon: CreditCard },
  { to: "/FillExpenses", label: "Expenses", icon: Wallet },
  { to: "/SpendAnalysis", label: "Analysis", icon: LifeBuoy },
];

export default function BottomNavbar() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const index = navItems.findIndex((item) => item.to === location.pathname);
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname]);

  const currentIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <nav
        className="
          mx-auto w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%]
          rounded-full px-2 py-2
          flex items-center justify-center
          bg-white/20 backdrop-blur-lg border border-white/30
          shadow-xl
        "
      >
        <ul className="relative flex w-full justify-between items-center gap-1">
          {/* Moving Indicator */}
          <div
            className={`absolute top-0 bottom-0 rounded-full bg-gradient-to-r ${theme.gradientchat} transition-all duration-300`}
            style={{
              width: `${100 / navItems.length}%`,
              transform: `translateX(${currentIndex * 100}%)`,
            }}
          />

          {navItems.map(({ to, label, icon: Icon }, index) => (
            <li
              key={to}
              className="flex-1 relative z-10"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive || currentIndex === index
                      ? "text-white"
                      : "text-white/80"
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
