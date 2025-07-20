"use client";

import { motion } from "framer-motion";
import Navigation from "../../components/navigation";

export default function ContactPage() {
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

      {/* Contact Form Section */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Side - Contact Info */}
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
                  GET IN TOUCH
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
                className="mb-12"
              >
                <motion.p
                  className="text-xl text-white/90 mb-4 tracking-wide"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CONNECT WITH OUR TEAM
                </motion.p>
                <div className="h-px w-24 bg-gradient-to-r from-white to-orange-400 mb-6" />
                <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-6">
                  Have questions about our platform? Need expert help? Want to 
                  join our network? We're here to help and would love to hear from you.
                </p>
              </motion.div>

              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="space-y-8"
              >
                {[
                  {
                    title: "EMERGENCY SUPPORT",
                    info: "Available 24/7 for urgent platform issues",
                    contact: "support@innies.network",
                    icon: "🚨",
                  },
                  {
                    title: "PARTNERSHIP INQUIRIES",
                    info: "Join our expert network or explore partnerships",
                    contact: "partners@innies.network", 
                    icon: "🤝",
                  },
                  {
                    title: "GENERAL QUESTIONS",
                    info: "Platform questions, feedback, or suggestions",
                    contact: "hello@innies.network",
                    icon: "💬",
                  },
                ].map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 + index * 0.2 }}
                    whileHover={{ x: 5 }}
                    className="relative border-l-2 border-orange-400/50 pl-6 group cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold tracking-wider text-orange-400 mb-2 group-hover:text-orange-200 transition-colors">
                          {method.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-2 group-hover:text-white/80 transition-colors">
                          {method.info}
                        </p>
                        <p className="text-white font-mono text-sm tracking-wider group-hover:text-orange-400 transition-colors">
                          {method.contact}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className="absolute left-0 top-0 w-0.5 h-full bg-orange-400 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-gray-900/50 border border-white/30 p-8 rounded-lg relative"
              >
                {/* Form Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl font-black tracking-wider mb-4">
                    SEND MESSAGE
                  </h2>
                  <div className="w-16 h-px bg-gradient-to-r from-white to-orange-400 mx-auto mb-4" />
                  <p className="text-white/70 text-sm tracking-wide">
                    WE'LL RESPOND WITHIN 24 HOURS
                  </p>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                        FIRST NAME
                      </label>
                      <motion.input
                        type="text"
                        className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                        placeholder="John"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                        LAST NAME
                      </label>
                      <motion.input
                        type="text"
                        className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                        placeholder="Doe"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                      EMAIL ADDRESS
                    </label>
                    <motion.input
                      type="email"
                      className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                      placeholder="john.doe@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                      INQUIRY TYPE
                    </label>
                    <motion.select
                      className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">SELECT CATEGORY</option>
                      <option value="general">GENERAL INQUIRY</option>
                      <option value="support">TECHNICAL SUPPORT</option>
                      <option value="partnership">PARTNERSHIP</option>
                      <option value="expert">BECOME AN EXPERT</option>
                      <option value="feedback">FEEDBACK</option>
                    </motion.select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2 tracking-wider">
                      MESSAGE
                    </label>
                    <motion.textarea
                      rows={6}
                      className="w-full bg-black border-2 border-white/30 text-white px-4 py-3 text-sm tracking-wider focus:border-orange-400 focus:outline-none transition-colors duration-300 rounded-lg resize-none"
                      placeholder="Tell us how we can help you..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-white hover:bg-orange-500 text-black font-bold py-4 px-4 text-sm tracking-wider transition-colors duration-300 rounded-lg relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">SEND MESSAGE</span>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-px bg-black/20"
                      animate={{ scaleX: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                </motion.form>

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
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 w-full py-32 px-4 border-t border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-black tracking-wider mb-20 text-center relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            QUICK ANSWERS
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-white to-orange-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <div className="space-y-6">
            {[
              {
                question: "HOW QUICKLY CAN I GET EXPERT HELP?",
                answer: "Our verified experts typically respond within 30 seconds. For emergency situations, immediate assistance is available 24/7 through our priority support system.",
              },
              {
                question: "WHAT QUALIFICATIONS DO YOUR EXPERTS HAVE?",
                answer: "Every expert undergoes thorough background checks, skill verification, and continuous performance monitoring. We verify credentials, experience, and maintain quality through real user feedback.",
              },
              {
                question: "HOW MUCH DOES EXPERT CONSULTATION COST?",
                answer: "Pricing varies by expertise level and session duration. We offer transparent, per-minute pricing with no hidden fees. Emergency support and basic troubleshooting start at competitive rates.",
              },
              {
                question: "CAN I BECOME AN EXPERT ON THE PLATFORM?",
                answer: "Yes! We're always looking for qualified professionals. The application process includes skill assessment, background verification, and quality review. Apply through our partnership program.",
              },
              {
                question: "IS MY PERSONAL INFORMATION SECURE?",
                answer: "Absolutely. We use enterprise-grade security, end-to-end encryption, and comply with international data protection standards. Your privacy and security are our top priorities.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
                className="relative bg-gray-900/30 border border-white/30 p-6 rounded-lg group cursor-pointer"
              >
                <h3 className="text-lg font-bold tracking-wider text-orange-400 mb-4 group-hover:text-orange-200 transition-colors">
                  {faq.question}
                </h3>
                <div className="w-16 h-px bg-gradient-to-r from-white/50 to-orange-400/60 mb-4" />
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                  {faq.answer}
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

      {/* Office Hours Section */}
      <section className="relative z-10 w-full py-32 px-4 border-t border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-black tracking-wider mb-16 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            WHEN WE'RE HERE
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
                service: "EXPERT HELP",
                availability: "24/7 GLOBAL",
                description: "Instant access to professionals worldwide",
              },
              {
                service: "CUSTOMER SUPPORT",
                availability: "MON-FRI 9AM-6PM EST",
                description: "Platform assistance and account help",
              },
              {
                service: "EMERGENCY RESPONSE",
                availability: "24/7 PRIORITY",
                description: "Critical issues get immediate attention",
              },
            ].map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative border border-white/30 p-6 rounded-lg bg-gray-900/30"
              >
                <h3 className="text-lg font-bold tracking-wider text-orange-400 mb-2">
                  {info.service}
                </h3>
                <span className="text-2xl font-black tracking-wider text-white block mb-3">
                  {info.availability}
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-white/50 to-orange-400/60 mx-auto mb-3" />
                <p className="text-white/60 text-sm">
                  {info.description}
                </p>
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