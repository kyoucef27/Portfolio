"use client";
import React from "react";
import { useScroll, useMobileMenu } from "@/hooks";

function Navbar() {
  const { isScrolled } = useScroll();
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/80 backdrop-blur-lg border-b border-gray-200/20 shadow-lg" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              YoucefCodes
            </a>
          </div>


          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
            </div>
          </div>


          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                }`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "translate-y-2"
                }`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 translate-y-2" : "translate-y-4"
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? "max-h-64 opacity-100" 
          : "max-h-0 opacity-0 overflow-hidden"
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-lg border-b border-gray-200/20">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
              onClick={closeMobileMenu}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
