"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(loggedInUser ? JSON.parse(loggedInUser) : null);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">
        <Link href="/">CitizenDesk</Link>
      </h1>

      {/* Show only if user is logged in */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">
            Welcome, <b>{user.name}</b>
          </span>
          <Link
            href="/new"
            className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
          >
            + New
          </Link>
        </div>
      )}
    </header>
  );
}
