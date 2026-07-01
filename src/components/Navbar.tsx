"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import Image from "next/image";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white border-b-4 border-black shadow-[0_4px_0_0_#000] py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-10">
        <Link href="/" className="relative z-50 flex items-center h-full text-4xl font-logo tracking-tighter uppercase text-black">
          <motion.span 
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              textShadow: [
                "2px 2px 0px #EC4899",
                "-2px 2px 0px #06B6D4",
                "2px -2px 0px #FACC15",
                "-2px -2px 0px #22C55E",
                "2px 2px 0px #EC4899"
              ],
              color: ["#000000", "#EC4899", "#06B6D4", "#FACC15", "#000000"]
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "linear"
            }}
            className="inline-block"
            style={{ textShadow: "2px 2px 0px #EC4899", color: "#000000" }}
          >
            DX
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-space font-bold uppercase text-black hover:text-brand-blue hover:-translate-y-1 transition-transform duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="#contact"
            className="text-sm font-space font-bold uppercase text-black hover:text-brand-blue hover:-translate-y-1 transition-transform duration-200"
          >
            Contact
          </Link>
          <Link
            href="#contact"
            className="brutal-btn px-6 py-2.5 text-sm uppercase"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden relative z-50 p-2 -mr-2 text-black brutal-btn bg-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-brand-yellow border-l-4 border-black flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center space-y-8 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-space font-black uppercase text-black hover:bg-black hover:text-white px-4 py-2 transition-colors border-4 border-transparent hover:border-black"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.1 }}
                className="w-full max-w-sm pt-8 border-t-4 border-black flex flex-col space-y-4 text-center mt-8"
              >
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full brutal-btn bg-white py-4 text-xl uppercase"
                >
                  Start Project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
