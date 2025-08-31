"use client";
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        CitizenDesk
      </Link>

      {/* Links */}
      <div className="flex gap-6">
        <p>Powered By Quartex</p>
      </div>
    </nav>
  );
}
