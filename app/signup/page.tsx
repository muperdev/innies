/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GoogleIcon, AppleIcon } from "../../components/icons";
import { useSignUp } from "@clerk/nextjs";
import { useState, FormEvent } from "react";

function GoogleSignUpButton() {
  const { isLoaded, signUp } = useSignUp();
  const [error, setError] = useState<string>("");

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      setError("Failed to sign up with Google");
    }
  };

  return (
    <div className="space-y-2">
      <motion.button
        onClick={handleGoogleSignUp}
        disabled={!isLoaded}
        className="w-full bg-gray-800/50 hover:bg-gray-700/70 border border-white/30 text-white py-3 px-4 text-sm tracking-wider transition-colors duration-300 rounded-lg flex items-center justify-center space-x-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <GoogleIcon className="w-5 h-5" />
        <span>CONTINUE WITH GOOGLE</span>
      </motion.button>
      {error && (
        <p className="text-red-400 text-xs tracking-wide text-center">
          {error}
        </p>
      )}
    </div>
  );
}

function AppleSignUpButton() {
  const { isLoaded, signUp } = useSignUp();
  const [error, setError] = useState<string>("");

  const handleAppleSignUp = async () => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_apple",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Apple");
    }
  };

  return (
    <div className="space-y-2">
      <motion.button
        onClick={handleAppleSignUp}
        disabled={!isLoaded}
        className="w-full bg-gray-800/50 hover:bg-gray-700/70 border border-white/30 text-white py-3 px-4 text-sm tracking-wider transition-colors duration-300 rounded-lg flex items-center justify-center space-x-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AppleIcon className="w-5 h-5" />
        <span>CONTINUE WITH APPLE</span>
      </motion.button>
      {error && (
        <p className="text-red-400 text-xs tracking-wide text-center">
          {error}
        </p>
      )}
    </div>
  );
}

export default function SignupPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");
    setIsSubmitting(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await signUp.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.emailAddress,
        password: formData.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/dashboard";
      } else {
        // Handle verification step if needed
        console.log("Verification required:", result);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };
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

      {/* Signup Form Section */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-12">
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
                SIGN UP
              </motion.h1>
              <div className="w-16 h-px bg-gradient-to-r from-white to-orange-400 mx-auto mb-4" />
              <p className="text-white/70 text-sm tracking-wide">
                JOIN THE EXPERT NETWORK
              </p>
            </motion.div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-center text-sm tracking-wide"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                    FIRST NAME
                  </label>
                  <motion.input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                    placeholder="John"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                    LAST NAME
                  </label>
                  <motion.input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                    placeholder="Doe"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                  EMAIL
                </label>
                <motion.input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                  placeholder="your.email@example.com"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                  PASSWORD
                </label>
                <motion.input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                  placeholder="••••••••"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                  CONFIRM PASSWORD
                </label>
                <motion.input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                  placeholder="••••••••"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                  USER TYPE
                </label>
                <motion.select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                  whileFocus={{ scale: 1.02 }}
                  required
                >
                  <option value="">SELECT YOUR ROLE</option>
                  <option value="seeker">HELP SEEKER</option>
                  <option value="expert">EXPERT PROVIDER</option>
                </motion.select>
              </div>

              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-white/60 text-xs tracking-wide leading-relaxed">
                  I AGREE TO THE{" "}
                  <Link
                    href="/terms"
                    className="text-orange-400 hover:text-white transition-colors"
                  >
                    TERMS OF SERVICE
                  </Link>{" "}
                  AND{" "}
                  <Link
                    href="/privacy"
                    className="text-orange-400 hover:text-white transition-colors"
                  >
                    PRIVACY POLICY
                  </Link>
                </label>
              </div>

              {/* Bot Protection CAPTCHA */}
              <div
                id="clerk-captcha"
                data-cl-theme="dark"
                data-cl-size="normal"
                className="flex justify-center"
              />

              <motion.button
                type="submit"
                disabled={!isLoaded || isSubmitting}
                className="w-full bg-white hover:bg-orange-500 text-black font-bold py-3 px-4 text-sm tracking-wider transition-colors duration-300 rounded-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </span>
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

            {/* Social Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="space-y-3"
            >
              <GoogleSignUpButton />
              <AppleSignUpButton />
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-center mt-6"
            >
              <p className="text-white/60 text-xs tracking-wide">
                ALREADY HAVE AN ACCOUNT?{" "}
                <Link
                  href="/login"
                  className="text-orange-400 hover:text-white transition-colors duration-300 font-bold"
                >
                  SIGN IN
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
