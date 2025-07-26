import { Home, CreditCard, Wallet, LifeBuoy } from "lucide-react";
import { NavLink } from "react-router-dom";
import theme from "../constants/theme";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/AIChatPage", label: "AI Chat", icon: CreditCard },
  { to: "/FillExpenses", label: "Expenses", icon: Wallet },
  { to: "/SpendAnalysis", label: "Analysis", icon: LifeBuoy },
];

export default function BottomNavbar() {
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
        <ul className="flex w-full justify-between items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${theme.gradientchat} text-white shadow-md scale-[1.05]`
                      : "text-white/80 hover:bg-white/10 hover:text-white"
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
