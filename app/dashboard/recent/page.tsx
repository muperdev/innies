"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Clock, Star, MapPin, Calendar, Filter } from "lucide-react";

export default function RecentExpertsPage() {
  const [filterBy, setFilterBy] = useState("all");

  // Sample recent experts data - replace with actual data from Convex
  const recentExperts = [
    {
      id: 1,
      name: "Sarah Johnson",
      skill: "Photography",
      rating: 4.9,
      lastBooked: "2024-01-15",
      location: "New York, NY",
      sessionType: "Wedding Photography",
      duration: "8 hours",
      amount: 600,
      status: "completed",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Marcus Chen", 
      skill: "Web Development",
      rating: 4.8,
      lastBooked: "2024-01-10",
      location: "San Francisco, CA",
      sessionType: "E-commerce Website",
      duration: "40 hours",
      amount: 4800,
      status: "completed",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      skill: "Graphic Design",
      rating: 4.7,
      lastBooked: "2024-01-08",
      location: "Austin, TX", 
      sessionType: "Brand Identity",
      duration: "16 hours",
      amount: 1040,
      status: "in_progress",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 4,
      name: "David Kim",
      skill: "Video Editing",
      rating: 4.6,
      lastBooked: "2024-01-05",
      location: "Los Angeles, CA",
      sessionType: "Corporate Video",
      duration: "12 hours",
      amount: 960,
      status: "completed",
      avatar: "/api/placeholder/100/100"
    }
  ];

  const filterOptions = [
    { value: "all", label: "All Sessions" },
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const filteredExperts = recentExperts.filter(expert => {
    if (filterBy === "all") return true;
    return expert.status === filterBy;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "in_progress":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
      case "cancelled":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      default:
        return "bg-white/20 text-white border-white/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
            RECENT EXPERTS
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-white/50"></div>
          <p className="text-white/70 tracking-wider">
            Review your recent collaborations and sessions
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-900/50 border border-white/30 p-6 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-white/50" />
            <div className="flex space-x-2">
              {filterOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilterBy(option.value)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-bold tracking-wider transition-all duration-200
                    ${filterBy === option.value
                      ? 'bg-orange-400/20 border border-orange-400/50 text-orange-400'
                      : 'bg-white/10 border border-white/30 text-white/80 hover:bg-white/20'
                    }
                  `}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/70 text-sm tracking-wider"
        >
          Showing {filteredExperts.length} session{filteredExperts.length !== 1 ? 's' : ''}
        </motion.div>

        {/* Recent Experts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredExperts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-900/50 border border-white/30 p-6 rounded-lg relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {/* Expert Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-400/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-400 font-black text-xl tracking-wider">
                        {expert.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-black tracking-wider text-lg">
                        {expert.name}
                      </h3>
                      <p className="text-orange-400 text-sm font-bold tracking-wide">
                        {expert.skill}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                        <span className="text-white/80 text-sm font-bold tracking-wider">
                          {expert.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`
                    text-xs font-bold tracking-wider px-3 py-1 rounded-full border uppercase
                    ${getStatusColor(expert.status)}
                  `}>
                    {expert.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-white/60 text-xs font-bold tracking-wider uppercase">
                      Session Type
                    </p>
                    <p className="text-white font-bold tracking-wide text-sm">
                      {expert.sessionType}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-white/60 text-xs font-bold tracking-wider uppercase">
                      Duration
                    </p>
                    <p className="text-white font-bold tracking-wide text-sm">
                      {expert.duration}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-white/60 text-xs font-bold tracking-wider uppercase">
                      Date
                    </p>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-white/60" />
                      <p className="text-white font-bold tracking-wide text-sm">
                        {formatDate(expert.lastBooked)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-white/60 text-xs font-bold tracking-wider uppercase">
                      Amount
                    </p>
                    <p className="text-green-400 font-black tracking-wider text-lg">
                      ${expert.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-white/70 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="tracking-wide">{expert.location}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-orange-400/20 border border-orange-400/50 rounded-lg
                             text-orange-400 text-sm font-bold tracking-wider
                             hover:bg-orange-400/30 transition-colors duration-200"
                  >
                    VIEW DETAILS
                  </motion.button>
                  
                  {expert.status === "completed" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-blue-400/20 border border-blue-400/50 rounded-lg
                               text-blue-400 text-sm font-bold tracking-wider
                               hover:bg-blue-400/30 transition-colors duration-200"
                    >
                      LEAVE REVIEW
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg
                             text-white text-sm font-bold tracking-wider
                             hover:bg-white/20 transition-colors duration-200"
                  >
                    BOOK AGAIN
                  </motion.button>
                </div>
              </div>

              {/* Animated Background Element */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-orange-400/5 rounded-full transform translate-x-16 -translate-y-16"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results State */}
        {filteredExperts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <Clock className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 font-bold tracking-wider">
              No recent sessions found
            </p>
            <p className="text-white/40 text-sm tracking-wide mt-2">
              Your collaboration history will appear here
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}