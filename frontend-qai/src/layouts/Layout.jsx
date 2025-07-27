import { Outlet } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import theme from "../constants/theme";
import { useEffect, useState } from "react";

export default function Layout() {
  const [hideBottmNav, setHideBottamNav] = useState(false);
  useEffect(() => { }, [setHideBottamNav])

  return (
    <div className={`flex flex-col min-h-screen bg-[var(--bg)] bg-gradient-to-br ${theme.gradient}  relative`}>

      {<TopNavbar setHideBottamNav={setHideBottamNav} />}
      {/* Main Content Area (Scrollable inside) */}
      <main className="flex-1 overflow-y-auto pt-16 pb-16">
        <Outlet />
      </main>

      {!hideBottmNav && <BottomNavbar />}

    </div>
  );
}
