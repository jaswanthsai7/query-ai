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

    return (<div className="fixed bottom-4 left-0 right-0 z-50">
        <nav
            className="
            mx-auto w-[calc(100%-40rem)] max-w-xl
            rounded-full px-4 py-2
            flex items-center justify-center
            bg-white/20 backdrop-blur-lg border border-white/30
            shadow-xl
          "
        >
            <ul className="flex items-center gap-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
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
    </div>)
}