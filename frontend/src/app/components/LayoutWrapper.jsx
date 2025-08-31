"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import LandingNavbar from "./LandingNavbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide Navbar only on landing page (/)
  const hideNavbar = pathname === "/";

  return (
    <>
      {!hideNavbar && <LandingNavbar />}
      {children}
    </>
  );
}
