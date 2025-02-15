"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@src/context/AuthContext";
import { useState } from "react";

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="w-full h-[65px] flex items-center justify-center backdrop-blur-md fixed left-0 top-[30px] z-10 px-5 shadow-lg dark:shadow-gray-800/50 ">
      <div className="absolute left-5 flex items-center">
        <Link href="/">
          <Image
            src="/images/logo/logo.png"
            alt="Logo"
            width={70}
            height={70}
            className="h-[50px]"
          />
        </Link>
      </div>

      <div className="flex items-center">
        <Link
          href="/"
          className="mx-4 px-5 py-2 rounded-lg text-lg font-bold text-black dark:text-white no-underline cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-110 relative"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="mx-4 px-5 py-2 rounded-lg text-lg font-bold text-black dark:text-white no-underline cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-110 relative"
        >
          Products
        </Link>
        <Link
          href="/downloads"
          className="mx-4 px-5 py-2 rounded-lg text-lg font-bold text-black dark:text-white no-underline cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-110 relative"
        >
          Downloads
        </Link>
        <Link
          href="/contact"
          className="mx-4 px-5 py-2 rounded-lg text-lg font-bold text-black dark:text-white no-underline cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-110 relative"
        >
          Contact
        </Link>

        {/* Conditionally render login/logout buttons */}
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="mx-4 px-5 py-2 rounded-lg text-lg font-bold text-black dark:text-white no-underline cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-110 relative"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="mx-4 px-5 py-2 rounded-lg text-lg font-bold text-black dark:text-white no-underline cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-110 relative"
          >
            Login
          </Link>
        )}

        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
        >
          {darkMode ? "🌙 Light Mode" : "☀️ Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
