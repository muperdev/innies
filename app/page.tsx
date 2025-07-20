"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navigation from "../components/navigation";
import { ShieldCheck, Users, Trophy } from "../components/icons";

export default function Home() {
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
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative w-full h-[400px] lg:h-[500px] bg-black overflow-hidden">
                <Image
                  src="/hero-pic.jpg"
                  alt="Innies Knowledge Network"
                  fill
                  className="object-cover filter brightness-90 contrast-125"
                  priority
                />
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="order-1 lg:order-2 text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-4xl md:text-6xl font-black tracking-[-0.02em] mb-8 relative"
              >
                <motion.span
                  className="inline-block"
                  animate={{ letterSpacing: ["0.05em", "0.15em", "0.05em"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  INNIES
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
                transition={{ duration: 1, delay: 0.9 }}
                className="mb-8"
              >
                <motion.p
                  className="text-xl text-white/90 mb-4 tracking-wide"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  INSTANT EXPERT ACCESS
                </motion.p>
                <div className="h-px w-24 bg-gradient-to-r from-white to-orange-400 mb-6" />
                <p className="text-lg text-white/70 leading-relaxed max-w-lg">
                  Connect with verified professionals instantly. From emergency
                  repairs to skill mastery—get expert guidance when you need it
                  most.
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-white hover:bg-orange-500 text-black font-bold py-4 px-12 text-lg tracking-wider group overflow-hidden transition-colors duration-300 rounded-lg"
              >
                <span className="relative z-10 transition-colors duration-300">
                  START NOW
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-px bg-black/20"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-2 h-2 bg-orange-400"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              />
              <motion.div
                className="absolute -bottom-8 -left-4 w-16 h-px bg-gradient-to-r from-white/50 to-orange-400/60"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 w-full py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {[
            {
              icon: "/window.svg",
              title: "EMERGENCY FIXES",
              desc: "Broken sink? Dead laptop? Get a pro on video in 30 seconds",
              delay: 0,
            },
            {
              icon: "/file.svg",
              title: "SKILL MASTERY",
              desc: "Learn guitar, coding, cooking from verified experts",
              delay: 0.3,
            },
            {
              icon: "/globe.svg",
              title: "24/7 SUPPORT",
              desc: "Global network of professionals ready to help anytime",
              delay: 0.6,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 + card.delay }}
              whileHover={{ y: -5 }}
              className="relative bg-gray-900/50 border border-white/30 p-8 group cursor-pointer rounded-lg hover:bg-gray-800/70 transition-colors duration-300"
            >
              <motion.div
                className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="mb-6"
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={40}
                  height={40}
                  className="mx-auto filter invert"
                />
              </motion.div>
              <h3 className="text-lg font-bold mb-4 tracking-wider group-hover:text-orange-200 transition-colors">
                {card.title}
              </h3>
              <div className="w-12 h-px bg-gradient-to-r from-white/50 to-orange-400/60 mx-auto mb-4" />
              <p className="text-white/60 text-base leading-relaxed group-hover:text-white/80 transition-colors">
                {card.desc}
              </p>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white to-orange-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Gamified System Section */}
      <section className="relative z-10 w-full py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-black tracking-wider mb-16 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            TRUST & EXPERTISE
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-px bg-white"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-white/70 mb-16 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Every expert is verified. Every interaction builds trust. Join a
            community where knowledge and reliability matter.
          </motion.p>

          {/* Trust Cards - Icon Based */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "VERIFIED EXPERTS",
                desc: "Background-checked professionals with proven track records",
                icon: ShieldCheck,
                stats: "500+ Certified",
                delay: 0,
              },
              {
                title: "COMMUNITY RATINGS",
                desc: "Real reviews from real people who got real help",
                icon: Users,
                stats: "4.9/5 Rating",
                delay: 0.2,
              },
              {
                title: "SUCCESS STORIES",
                desc: "Thousands of problems solved daily",
                icon: Trophy,
                stats: "2M+ Solved",
                delay: 0.4,
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + item.delay }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    className="relative h-80 w-full mb-6 border-2 border-white/30 hover:border-orange-400 transition-colors duration-300 rounded-lg cursor-pointer bg-gray-900/50 flex flex-col items-center justify-center p-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="mb-6"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + item.delay, duration: 0.5 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent className="w-16 h-16 text-orange-400 group-hover:text-white transition-colors duration-300" />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      className="text-4xl font-black text-orange-400 mb-4 group-hover:text-white transition-colors duration-300"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + item.delay }}
                    >
                      {item.stats}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold tracking-wider mb-4 group-hover:text-orange-200 transition-colors text-center">
                      {item.title}
                    </h3>

                    {/* Divider */}
                    <div className="w-16 h-px bg-white/50 mb-4 group-hover:bg-orange-400 transition-colors duration-300" />
                    
                    {/* Corner accent */}
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 bg-white group-hover:bg-orange-400 transition-colors duration-300"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: item.delay * 0.8 
                      }}
                    />

                    {/* Animated background accent */}
                    <motion.div
                      className="absolute inset-0 bg-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                    />
                  </motion.div>
                  
                  {/* Description below card */}
                  <motion.p
                    className="text-white/70 text-center leading-relaxed group-hover:text-white/90 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + item.delay }}
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              { level: "01", title: "NOVICE", active: false },
              { level: "05", title: "EXPERT", active: true },
              { level: "10", title: "MASTER", active: false },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`relative border-2 p-6 flex flex-col items-center cursor-pointer rounded-lg ${
                  badge.active
                    ? "border-orange-400 bg-orange-400 text-white"
                    : "border-white/50 bg-black text-white"
                }`}
              >
                <span className="text-2xl font-black tracking-wider mb-2">
                  {badge.level}
                </span>
                <span className="text-xs tracking-[0.3em]">{badge.title}</span>
                {badge.active && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* User Feedback Section */}
      <section className="relative z-10 w-full py-32 px-4 text-center border-t border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-black tracking-wider mb-20 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            REAL RESULTS
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-px bg-white"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "My kitchen was flooding at 11PM. Got a plumber on video who walked me through the fix. Saved me $300 and my security deposit.",
                author: "SARAH • RENTER",
                delay: 0,
              },
              {
                text: "Learned more about photography in 20 minutes than I did in months of YouTube tutorials. The feedback was instant and personalized.",
                author: "MARCUS • FREELANCER",
                delay: 0.2,
              },
              {
                text: "My car broke down in a remote area. A mechanic helped me diagnose and temporarily fix it over video. Got home safely.",
                author: "ELENA • TRAVELER",
                delay: 0.4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + testimonial.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative border border-white/30 p-8 group cursor-pointer rounded-lg bg-gray-900/30 hover:bg-gray-800/50 transition-colors duration-300"
              >
                <motion.div
                  className="absolute top-4 left-4 w-6 h-6 border border-white/50"
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="mt-8 mb-8">
                  <p className="text-white/80 text-base leading-relaxed tracking-wide group-hover:text-orange-100 transition-colors">
                    {testimonial.text}
                  </p>
                </div>
                <div className="w-full h-px bg-white/30 mb-4" />
                <span className="text-white/50 text-sm tracking-widest group-hover:text-orange-300 transition-colors">
                  {testimonial.author}
                </span>
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

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 w-full py-32 px-4 border-t border-white/20">
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
            HOW IT WORKS
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-white to-orange-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="mb-6">
                <span className="text-6xl font-black text-white/20">01</span>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-wider">
                DESCRIBE YOUR PROBLEM
              </h3>
              <p className="text-white/70 leading-relaxed">
                Tell us what you need help with. Emergency repair, skill
                learning, or expert advice—we&#39;ll match you instantly.
              </p>
            </motion.div>

            {/* Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                className="relative w-full h-80 bg-black border-2 border-white overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/how-it-works.jpg"
                  alt="Expert helping via video call"
                  fill
                  className="object-cover filter brightness-90 contrast-125"
                />

                {/* Overlay effects */}
                <motion.div
                  className="absolute inset-4 border border-orange-400/40 z-10"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 bg-orange-400 z-10"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="text-center lg:text-right"
            >
              <div className="mb-6 lg:text-right">
                <span className="text-6xl font-black text-white/20">02</span>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-wider">
                GET INSTANT CONNECTION
              </h3>
              <p className="text-white/70 leading-relaxed">
                Connect with a verified expert in seconds. Video call, screen
                share, or chat—whatever works best for your situation.
              </p>
            </motion.div>
          </div>

          {/* Step 3 - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="mb-6">
              <span className="text-6xl font-black text-white/20">03</span>
            </div>
            <h3 className="text-lg font-bold mb-4 tracking-wider">
              PROBLEM SOLVED
            </h3>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto text-base">
              Get the help you need, learn something new, or fix what&#39;s
              broken. Rate your experience and help others find the best
              experts.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Expert Spotlight Section */}
      <section id="experts" className="relative z-10 w-full py-32 px-4 border-t border-white/20">
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
            MEET THE EXPERTS
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-px bg-gradient-to-r from-white to-orange-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Expert Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                className="relative w-full h-96 bg-black border-2 border-white overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/expert-profile.jpg"
                  alt="Professional expert ready to help"
                  fill
                  className="object-cover filter brightness-90 contrast-125"
                />

                {/* Professional overlay */}
                <motion.div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 z-10">
                  <h3 className="text-xl font-bold mb-2">MARCUS JOHNSON</h3>
                  <p className="text-orange-300 text-sm">
                    CERTIFIED TECH SPECIALIST • 12 YEARS
                  </p>
                </motion.div>

                <motion.div
                  className="absolute top-4 left-4 border border-orange-400/60 p-2 z-10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-xs font-bold">VERIFIED</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Expert Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-4 tracking-wider">
                  VERIFIED PROFESSIONALS
                </h3>
                <p className="text-white/70 leading-relaxed mb-6 text-base">
                  Every expert undergoes thorough background checks, skill
                  verification, and continuous performance monitoring.
                  You&#39;re always in safe hands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-white/30 p-4 rounded-lg bg-gray-900/30">
                  <span className="text-2xl font-black text-orange-400">
                    98%
                  </span>
                  <p className="text-sm text-white/60 mt-1">SUCCESS RATE</p>
                </div>
                <div className="border border-white/30 p-4 rounded-lg bg-gray-900/30">
                  <span className="text-2xl font-black text-orange-400">
                    24/7
                  </span>
                  <p className="text-xs text-white/60 mt-1">AVAILABILITY</p>
                </div>
                <div className="border border-white/30 p-4 rounded-lg bg-gray-900/30">
                  <span className="text-2xl font-black text-orange-400">
                    2M+
                  </span>
                  <p className="text-xs text-white/60 mt-1">PROBLEMS SOLVED</p>
                </div>
                <div className="border border-white/30 p-4 rounded-lg bg-gray-900/30">
                  <span className="text-2xl font-black text-orange-400">
                    30S
                  </span>
                  <p className="text-xs text-white/60 mt-1">AVG RESPONSE</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Waitlist Section */}
      <section className="relative z-10 w-full py-32 px-4 border-t border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-black tracking-wider mb-6 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            JOIN THE WAITLIST
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-white to-orange-400"
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
            className="text-white/70 mb-10 text-lg leading-relaxed"
          >
            Be among the first to access instant expert help. Get early access
            and exclusive benefits.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
          >
            <motion.input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-black border-2 border-white/30 text-white px-5 py-3 text-base tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              className="bg-white hover:bg-orange-500 text-black font-bold py-3 px-6 text-base tracking-wider transition-colors duration-300 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              JOIN
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-white/40 text-sm mt-5"
          >
            No spam. Just updates on launch and early access perks.
          </motion.p>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 w-full py-32 px-4 text-center border-t border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-black tracking-wider mb-6 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            READY TO SOLVE ANYTHING?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/70 mb-10 text-lg leading-relaxed"
          >
            From midnight emergencies to weekend projects—get expert help when
            you need it most. No appointments. No waiting. Just solutions.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-white hover:bg-orange-500 text-black font-bold py-5 px-12 text-lg tracking-wider group overflow-hidden transition-colors duration-300 rounded-lg"
          >
            <span className="relative z-10 transition-colors duration-300">
              GET HELP NOW
            </span>
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full py-12 text-center border-t border-white/20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.span
              className="text-white/40 text-sm tracking-wider"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              © 2025 INNIES NETWORK. ALL RIGHTS RESERVED.
            </motion.span>
            <motion.div
              className="flex gap-8 mt-4 md:mt-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {["PRIVACY", "TERMS", "CONTACT"].map((link, index) => (
                <motion.span
                  key={link}
                  className="text-white/40 text-xs tracking-widest cursor-pointer hover:text-white/70 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
