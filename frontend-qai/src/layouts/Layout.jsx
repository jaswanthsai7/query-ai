import { Outlet } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import theme from "../constants/theme";

export default function Layout() {
  return (
    <div className={`flex flex-col min-h-screen bg-[var(--bg)] bg-gradient-to-br ${theme.gradient}  relative`}>
      <TopNavbar />

      {/* Main Content Area (Scrollable inside) */}
     <main className="flex-1 overflow-y-auto pt-16 pb-16">
  <Outlet />
</main>


      <BottomNavbar />
    </div>
  );
}
