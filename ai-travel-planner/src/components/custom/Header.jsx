import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { googleLogout } from "@react-oauth/google";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Add event listener for storage changes
    const handleStorageChange = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };

    // Initial check for user
    handleStorageChange();

    // Listen for changes
    window.addEventListener("storage", handleStorageChange);

    // Custom event listener for user updates
    window.addEventListener("userUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/logo.png"
              className="h-28 sm:h-28 w-auto object-contain cursor-pointer"
              alt="Logo"
              onClick={() => (window.location.href = "/")}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/my-trips")}
                  className="rounded-full px-6 py-2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
                >
                  My Trips
                </Button>
                <div className="relative group">
                  <img
                    src={user?.picture}
                    className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-blue-500 cursor-pointer hover:ring-purple-500 transition-all duration-300"
                    alt="Profile"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      onClick={() => (window.location.href = "/profile")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        setUser(null);
                        window.location.href = "/";
                      }}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/my-trips")}
                  className="w-full rounded-full mb-2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
                >
                  My Trips
                </Button>
                <div className="flex items-center gap-3 p-2">
                  <img
                    src={user?.picture}
                    className="w-8 h-8 rounded-full"
                    alt="Profile"
                  />
                  <span
                    className="text-sm text-gray-700"
                    onClick={() => (window.location.href = "/profile")}
                  >
                    Profile
                  </span>
                </div>
              </>
            ) : (
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
