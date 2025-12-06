"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSyncUser } from "@/hooks/use-sync-user";
import DashboardLayout from "@/components/dashboard-layout";
import {
  User,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Edit,
  Camera,
  Clock,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const { user: currentUser } = useSyncUser();
  const [isEditing, setIsEditing] = useState(false);

  // Sample profile data - replace with actual queries
  const profileStats = [
    {
      title: "Total Bookings",
      value: "24",
      icon: Calendar,
      color: "blue",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      color: "yellow",
    },
    {
      title: "Total Earned",
      value: "$12,840",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Response Time",
      value: "< 1hr",
      icon: Clock,
      color: "orange",
    },
  ];

  const skills = [
    {
      name: "Photography",
      category: "Creative",
      experience: "Expert",
      yearsOfExperience: 8,
      rating: 4.9,
    },
    {
      name: "Photo Editing",
      category: "Creative",
      experience: "Expert",
      yearsOfExperience: 6,
      rating: 4.8,
    },
    {
      name: "Videography",
      category: "Creative",
      experience: "Intermediate",
      yearsOfExperience: 3,
      rating: 4.6,
    },
  ];

  const recentReviews = [
    {
      id: 1,
      rating: 5,
      comment:
        "Amazing photographer! Captured our wedding perfectly. Highly recommended!",
      client: "Sarah M.",
      date: "2024-01-15",
      booking: "Wedding Photography",
    },
    {
      id: 2,
      rating: 5,
      comment:
        "Professional and creative. Delivered exactly what we needed for our brand.",
      client: "Marcus T.",
      date: "2024-01-10",
      booking: "Brand Photography",
    },
    {
      id: 3,
      rating: 4,
      comment: "Great quality work and very responsive to feedback.",
      client: "Elena R.",
      date: "2024-01-08",
      booking: "Product Photography",
    },
  ];

  const getExperienceColor = (experience: string) => {
    switch (experience.toLowerCase()) {
      case "expert":
        return "text-orange-400 bg-orange-400/20 border-orange-400/30";
      case "intermediate":
        return "text-blue-400 bg-blue-400/20 border-blue-400/30";
      case "beginner":
        return "text-green-400 bg-green-400/20 border-green-400/30";
      default:
        return "text-white bg-white/20 border-white/30";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-black tracking-widest text-white">
            PROFILE
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-white/50"></div>
          <p className="text-white/70 tracking-wider">
            Manage your professional profile and showcase your skills
          </p>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-900/50 border border-white/30 p-8 rounded-lg relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 bg-orange-400/20 rounded-full flex items-center justify-center border-4 border-orange-400/30 relative group">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-orange-400" />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl font-black tracking-wider text-white">
                    {user?.fullName || "Your Name"}
                  </h2>
                  <p className="text-orange-400 text-lg font-bold tracking-wide">
                    {currentUser?.userType === "provider"
                      ? "Skill Provider"
                      : "Skill Seeker"}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                      <span className="text-white font-bold tracking-wider">
                        {currentUser?.rating || "4.8"}
                      </span>
                      <span className="text-white/60 text-sm tracking-wide">
                        (24 reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-white/70">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm tracking-wide">
                        New York, NY
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-white/80 tracking-wide leading-relaxed">
                  {currentUser?.bio ||
                    "Professional photographer with 8+ years of experience specializing in weddings, portraits, and commercial photography. Passionate about capturing authentic moments and creating lasting memories."}
                </p>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-3 bg-orange-400/20 border border-orange-400/50 rounded-lg
                             text-orange-400 font-bold tracking-wider
                             hover:bg-orange-400/30 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>EDIT PROFILE</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-blue-400/20 border border-blue-400/50 rounded-lg
                             text-blue-400 font-bold tracking-wider
                             hover:bg-blue-400/30 transition-colors duration-200"
                  >
                    VIEW PUBLIC PROFILE
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Background */}
          <motion.div
            className="absolute top-0 right-0 w-40 h-40 bg-orange-400/5 rounded-full transform translate-x-20 -translate-y-20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {profileStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-white/30 p-6 rounded-lg relative overflow-hidden"
              >
                <div className="relative z-10">
                  <Icon className="w-6 h-6 text-orange-400 mb-4" />
                  <h3 className="text-2xl font-black tracking-wider text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-white/80 text-sm font-bold tracking-wider">
                    {stat.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900/50 border border-white/30 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black tracking-widest text-white">
                SKILLS & EXPERTISE
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-green-400/20 border border-green-400/50 rounded-lg
                         text-green-400 text-sm font-bold tracking-wider
                         hover:bg-green-400/30 transition-colors duration-200"
              >
                ADD SKILL
              </motion.button>
            </div>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="p-4 bg-black/30 border border-white/10 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold tracking-wider">
                        {skill.name}
                      </h3>
                      <p className="text-white/60 text-sm tracking-wide">
                        {skill.category} • {skill.yearsOfExperience} years
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`
                        text-xs font-bold tracking-wider px-2 py-1 rounded-full border
                        ${getExperienceColor(skill.experience)}
                      `}
                      >
                        {skill.experience.toUpperCase()}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                        <span className="text-white text-sm font-bold">
                          {skill.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900/50 border border-white/30 p-6 rounded-lg"
          >
            <h2 className="text-xl font-black tracking-widest text-white mb-6">
              RECENT REVIEWS
            </h2>

            <div className="space-y-4">
              {recentReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="p-4 bg-black/30 border border-white/10 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-orange-400 fill-orange-400"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-xs tracking-wide">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-white/80 text-sm tracking-wide leading-relaxed mb-2">
                    &quot;{review.comment}&quot;
                  </p>

                  <div className="text-white/60 text-xs tracking-wide">
                    <span className="text-orange-400 font-bold">
                      {review.client}
                    </span>
                    {" • "}
                    {review.booking}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-6 text-center"
            >
              <button
                className="w-full py-2 text-orange-400 text-sm font-bold tracking-wider 
                               border border-orange-400/50 rounded-lg hover:bg-orange-400/10 
                               transition-colors duration-200"
              >
                VIEW ALL REVIEWS
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
