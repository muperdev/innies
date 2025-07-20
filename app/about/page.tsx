"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navigation from "../../components/navigation";

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen font-mono relative overflow-hidden">
      <Navigation />
      
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

      {/* Hero Section */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-4xl md:text-6xl font-black tracking-[-0.02em] mb-8 relative"
              >
                <motion.span
                  className="inline-block"
                  animate={{ letterSpacing: ["0.05em", "0.15em", "0.05em"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ABOUT INNIES
                </motion.span>
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-white to-orange-400 origin-left"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="mb-8"
              >
                <motion.p
                  className="text-xl text-white/90 mb-4 tracking-wide"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  REVOLUTIONIZING EXPERT ACCESS
                </motion.p>
                <div className="h-px w-24 bg-gradient-to-r from-white to-orange-400 mb-6" />
                <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-6">
                  Born from frustration with traditional service models, Innies 
                  connects you with verified professionals instantly. No more 
                  waiting days for help when you need it most.
                </p>
                <p className="text-lg text-white/70 leading-relaxed max-w-lg">
                  Whether it&apos;s a midnight emergency or weekend learning session, 
                  our global network of experts is ready to solve your problems 
                  through video calls, real-time guidance, and personalized support.
                </p>
              </motion.div>

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-2 h-2 bg-orange-400"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              />
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="relative"
            >
              <div className="relative w-full h-[400px] lg:h-[500px] bg-black overflow-hidden">
                <Image
                  src="/expert-profile.jpg"
                  alt="About Innies Network"
                  fill
                  className="object-cover filter brightness-90 contrast-125"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative z-10 w-full py-32 px-4 border-t border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-black tracking-wider mb-20 text-center relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            OUR MISSION
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-white to-orange-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative bg-gray-900/50 border border-white/30 p-8 rounded-lg group"
            >
              <motion.div
                className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 transition-colors duration-300"
              />
              <h3 className="text-2xl font-black mb-6 tracking-wider text-orange-400">
                DEMOCRATIZE EXPERTISE
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-white/50 to-orange-400/60 mb-6" />
              <p className="text-white/70 leading-relaxed">
                We believe everyone deserves instant access to professional help. 
                From emergency repairs to skill mastery, expertise should be 
                available to all, regardless of location or time zone.
              </p>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white to-orange-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative bg-gray-900/50 border border-white/30 p-8 rounded-lg group"
            >
              <motion.div
                className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 transition-colors duration-300"
              />
              <h3 className="text-2xl font-black mb-6 tracking-wider text-orange-400">
                BUILD TRUST NETWORKS
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-white/50 to-orange-400/60 mb-6" />
              <p className="text-white/70 leading-relaxed">
                Every interaction builds a stronger community. Our platform 
                creates lasting relationships between experts and learners, 
                fostering trust and continuous knowledge sharing.
              </p>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white to-orange-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 w-full py-32 px-4 border-t border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-black tracking-wider mb-20 text-center relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            CORE VALUES
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-white to-orange-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "INSTANT RELIABILITY",
                desc: "When you need help, seconds matter. Our verified experts respond within 30 seconds, ensuring you get solutions when it counts most.",
                icon: "⚡",
                delay: 0,
              },
              {
                title: "VERIFIED EXPERTISE",
                desc: "Every professional undergoes rigorous background checks and skill verification. Trust isn't assumed—it's proven through consistent results.",
                icon: "🛡️",
                delay: 0.2,
              },
              {
                title: "GLOBAL ACCESSIBILITY",
                desc: "Knowledge knows no boundaries. Our 24/7 platform connects you with experts worldwide, breaking down geographic and time barriers.",
                icon: "🌍",
                delay: 0.4,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + value.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative bg-gray-900/50 border border-white/30 p-8 group cursor-pointer rounded-lg hover:bg-gray-800/70 transition-colors duration-300"
              >
                <motion.div
                  className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 transition-colors duration-300"
                />
                <div className="text-4xl mb-6 text-center">{value.icon}</div>
                <h3 className="text-lg font-bold mb-4 tracking-wider group-hover:text-orange-200 transition-colors text-center">
                  {value.title}
                </h3>
                <div className="w-12 h-px bg-gradient-to-r from-white/50 to-orange-400/60 mx-auto mb-4" />
                <p className="text-white/60 text-base leading-relaxed group-hover:text-white/80 transition-colors text-center">
                  {value.desc}
                </p>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white to-orange-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 w-full py-32 px-4 border-t border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-black tracking-wider mb-20 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            BUILDING THE FUTURE
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-px bg-gradient-to-r from-white to-orange-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/70 text-xl leading-relaxed max-w-4xl mx-auto mb-16"
          >
            Our team combines decades of technology experience with deep 
            understanding of human connection. We&apos;re not just building a platform—
            we&apos;re creating a new way for people to help each other.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { metric: "500K+", label: "PROBLEMS SOLVED" },
              { metric: "2M+", label: "EXPERT HOURS" },
              { metric: "150+", label: "COUNTRIES" },
              { metric: "24/7", label: "SUPPORT" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative border border-white/30 p-6 rounded-lg bg-gray-900/30 cursor-pointer"
              >
                <span className="text-3xl font-black tracking-wider text-orange-400 block mb-2">
                  {stat.metric}
                </span>
                <span className="text-xs tracking-[0.3em] text-white/60">
                  {stat.label}
                </span>
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}