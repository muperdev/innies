"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center"
          >
            <Link href="/" className="group">
              <motion.span
                className="text-xl font-black tracking-wider text-white group-hover:text-orange-400 transition-colors duration-300"
                animate={{ letterSpacing: ["0.05em", "0.1em", "0.05em"] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                INNIES
              </motion.span>
            </Link>
            <motion.div
              className="ml-2 w-2 h-2 bg-orange-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link
              href="#features"
              className="text-white/70 hover:text-white text-sm tracking-wider transition-colors duration-300 relative group"
            >
              FEATURES
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-orange-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </Link>
            <Link
              href="#experts"
              className="text-white/70 hover:text-white text-sm tracking-wider transition-colors duration-300 relative group"
            >
              EXPERTS
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-orange-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </Link>
            <Link
              href="#how-it-works"
              className="text-white/70 hover:text-white text-sm tracking-wider transition-colors duration-300 relative group"
            >
              HOW IT WORKS
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-orange-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </Link>
          </motion.div>

          {/* Auth Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex items-center space-x-4"
          >
            <Link href="/login">
              <motion.button
                className="text-white/80 hover:text-white text-sm tracking-wider transition-colors duration-300 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LOGIN
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-px bg-white/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </motion.button>
            </Link>
            
            <Link href="/signup">
              <motion.button
                className="bg-white hover:bg-orange-500 text-black font-bold py-2 px-6 text-sm tracking-wider transition-colors duration-300 rounded-lg relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">SIGN UP</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-px bg-black/20"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="md:hidden"
          >
            <motion.button
              className="text-white/80 hover:text-white p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-orange-400/30 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/20 to-transparent"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
    </motion.nav>
  );
}