import { Link } from "react-router-dom";
import theme from "../constants/theme";



export default function TopNavbar() {
    return (
        <header>
            {/* Top Navbar */}
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
                        to="/"
                        className="flex items-center gap-2 text-white font-semibold tracking-tight"
                    >
                        <span className={`inline-block h-6 w-6 rounded-full bg-gradient-to-br ${theme.gradientchat}`} />
                        <span>QueryAI</span>
                    </Link>

                    {/* Right: Auth actions */}
                    <div className="flex items-center gap-2">
                        <Link
                            to="/signin"
                            className="px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/signup"
                            className={`px-4 py-2 rounded-full text-sm font-medium text-white shadow-md
                       bg-gradient-to-r ${theme} hover:scale-[1.03] transition-transform`}
                        >
                            Sign up
                        </Link>
                    </div>
                </nav>
                {/* Spacer */}
                <div className="h-20" />
            </div>

            {/* Bottom Navbar */}

        </header>
    );
}
