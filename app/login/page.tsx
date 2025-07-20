"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GoogleIcon, AppleIcon } from "../../components/icons";

export default function LoginPage() {
  return (
    <main className="bg-black text-white min-h-screen font-mono relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-px h-32 bg-orange-500/30"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-px bg-white/20"
          animate={{ scaleX: [1, 1.8, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-2 h-2 bg-orange-400"
          animate={{
            scale: [1, 0, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-16 h-16 border border-white/30"
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Login Form Section */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-md w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/50 border border-white/30 p-8 rounded-lg"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-center mb-8"
            >
              <motion.h1
                className="text-3xl font-black tracking-wider mb-4 relative"
                animate={{ letterSpacing: ["0.05em", "0.15em", "0.05em"] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                LOGIN
              </motion.h1>
              <div className="w-16 h-px bg-gradient-to-r from-white to-orange-400 mx-auto mb-4" />
              <p className="text-white/70 text-sm tracking-wide">
                ACCESS YOUR EXPERT NETWORK
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                  EMAIL
                </label>
                <motion.input
                  type="email"
                  className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                  placeholder="your.email@example.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                  PASSWORD
                </label>
                <motion.input
                  type="password"
                  className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                  placeholder="••••••••"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-white/60 text-xs tracking-wide">
                  <input type="checkbox" className="mr-2" />
                  REMEMBER ME
                </label>
                <Link
                  href="/forgot-password"
                  className="text-orange-400 hover:text-white text-xs tracking-wider transition-colors duration-300"
                >
                  FORGOT PASSWORD?
                </Link>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-white hover:bg-orange-500 text-black font-bold py-3 px-4 text-sm tracking-wider transition-colors duration-300 rounded-lg relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">SIGN IN</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-px bg-black/20"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center my-6"
            >
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-white/40 text-xs tracking-widest">
                OR
              </span>
              <div className="flex-1 h-px bg-white/20"></div>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="space-y-3"
            >
              <motion.button
                className="w-full bg-gray-800/50 hover:bg-gray-700/70 border border-white/30 text-white py-3 px-4 text-sm tracking-wider transition-colors duration-300 rounded-lg flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GoogleIcon className="w-5 h-5" />
                <span>CONTINUE WITH GOOGLE</span>
              </motion.button>
              <motion.button
                className="w-full bg-gray-800/50 hover:bg-gray-700/70 border border-white/30 text-white py-3 px-4 text-sm tracking-wider transition-colors duration-300 rounded-lg flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AppleIcon className="w-5 h-5" />
                <span>CONTINUE WITH APPLE</span>
              </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-center mt-6"
            >
              <p className="text-white/60 text-xs tracking-wide">
                DON&#39;T HAVE AN ACCOUNT?{" "}
                <Link
                  href="/signup"
                  className="text-orange-400 hover:text-white transition-colors duration-300 font-bold"
                >
                  SIGN UP
                </Link>
              </p>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-2 -right-2 w-2 h-2 bg-orange-400"
              animate={{
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-12 h-px bg-gradient-to-r from-white/50 to-orange-400/60"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
