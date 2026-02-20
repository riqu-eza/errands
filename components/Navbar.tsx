"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ShoppingBag, Phone, User } from "lucide-react";
import { Button } from "./ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: "Services", icon: ShoppingBag },
    { href: "/about", label: "About" },
    { href: "/reviews", label: "Reviews" },
    // { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-white py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-3 transition-transform">
            <span className="text-white font-bold text-xl">JD</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Errands<span className="text-blue-600"></span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium flex items-center gap-1 group"
            >
              {link.icon && <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
              {link.label}
            </Link>
          ))}
          
          {/* Services Dropdown - Optional enhancement */}
          {/* <div className="relative group">
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium flex items-center gap-1">
              More <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/how-it-works" className="block px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                How It Works
              </Link>
              <Link href="/faq" className="block px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                FAQ
              </Link>
              <Link href="/pricing" className="block px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                Pricing
              </Link>
            </div>
          </div> */}

          <Link
            href="/book"
            className="ml-4 bg-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-md hover:shadow-xl flex items-center gap-2"
          >
            Book Now
            <span className="text-lg">→</span>
          </Link>

          <Link
            href="/profile"
            className="ml-2 p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t shadow-xl md:hidden animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <div className="flex items-center gap-2">
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </div>
                </Link>
              ))}
               <Link
            href="/profile"
            className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
          >
            <User className="w-5 h-5 text-gray-700"> Profile</User> 
          </Link>
              {/* <Link
                href="/how-it-works"
                onClick={() => setIsOpePn(false)}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                How It Works
              </Link>
              <Link
                href="/faq"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                FAQ
              </Link> */}
              <div className="mt-4 pt-4 border-t">
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-center"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}