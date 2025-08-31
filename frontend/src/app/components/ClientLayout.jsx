"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Dashboard navbar
import LandingNavbar from "./LandingNavbar"; // Landing page navbar
import LandingPage from "./LandingPage"; // Landing page content

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {isLandingPage ? <LandingNavbar /> : <Navbar />}

      {/* Main content */}
      <main className="flex-1 w-full overflow-auto">
        {isLandingPage ? <LandingPage /> : children}
      </main>

      {/* Optional Footer */}
  
    </div>
  );
}
