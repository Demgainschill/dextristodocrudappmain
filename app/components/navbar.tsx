"use client";

import Link from "next/link";
import Search from "./search";
import { useState, useRef, useEffect } from "react";

const PROFILE = {
  name: "Dextris",
  email: "dextris@example.com",
  avatar: "D",
  role: "Admin",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="text-center bg-blue-500 h-20 flex items-center justify-center gap-20 px-6 relative">
      <Link href="/" className="font-semibold hover:underline">Home</Link>
      <Search />
      <Link href="/posts" className="font-semibold hover:underline">Posts</Link>
      <Link href="/help" className="font-semibold hover:underline">Help</Link>

      {/* Avatar + Dropdown — all in one relative container */}
      <div ref={containerRef} className="absolute right-6 px-6 py-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-10 h-10 rounded-full bg-red-700 text-white font-bold text-sm flex items-center justify-center shadow-md hover:bg-green-800 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Open profile"
        >
          {PROFILE.avatar}
        </button>

        {/* Dropdown anchored directly below avatar, no backdrop, no blur */}
        {open && (
          <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex flex-col gap-3 z-50">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold leading-none"
            >
              ×
            </button>

            <div className="flex flex-col items-center gap-1 pt-1">
              <div className="w-12 h-12 rounded-full bg-green-700 text-white font-black text-xl flex items-center justify-center shadow">
                {PROFILE.avatar}
              </div>
              <h2 className="text-base font-bold text-gray-900 mt-1">{PROFILE.name}</h2>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-0.5 rounded-full font-semibold">
                {PROFILE.role}
              </span>
              <p className="text-xs text-gray-500">{PROFILE.email}</p>
            </div>

            <hr className="border-gray-100" />

            <div className="flex flex-col gap-1">
              <button className="w-full text-left px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Edit Profile
              </button>
              <button className="w-full text-left px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Settings
              </button>
              <button className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
