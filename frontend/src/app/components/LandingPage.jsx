"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Emblem_of_Sri_Lanka.svg/846px-Emblem_of_Sri_Lanka.svg.png?20201228183927" 
          alt="Sri Lankan Government Logo"
          className="w-20 h-27 mb-4"
        />

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to Citizen Desk
        </h1>

        <p className="text-lg md:text-xl text-white max-w-2xl mb-10 drop-shadow-md">
          A platform to share complaints and feedback with the government. Users
          can submit complaints or feedback, and administrators can respond
          efficiently.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition text-center drop-shadow"
          >
            Login as User
          </Link>
          <Link
            href="/admin/login"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition text-center drop-shadow"
          >
            Login as Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
