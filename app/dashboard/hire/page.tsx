"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Search, Filter, Star, MapPin, Clock, DollarSign } from "lucide-react";

export default function HireExpertPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample expert data - replace with actual data from Convex
  const experts = [
    {
      id: 1,
      name: "Sarah Johnson",
      skill: "Photography",
      category: "Creative",
      rating: 4.9,
      hourlyRate: 75,
      location: "New York, NY",
      avatar: "/api/placeholder/100/100",
      availability: "Available",
      portfolio: ["Portrait", "Wedding", "Commercial"]
    },
    {
      id: 2,
      name: "Marcus Chen",
      skill: "Web Development",
      category: "Technology",
      rating: 4.8,
      hourlyRate: 120,
      location: "San Francisco, CA",
      avatar: "/api/placeholder/100/100",
      availability: "Busy",
      portfolio: ["React", "Node.js", "TypeScript"]
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      skill: "Graphic Design",
      category: "Creative",
      rating: 4.7,
      hourlyRate: 65,
      location: "Austin, TX",
      avatar: "/api/placeholder/100/100",
      availability: "Available",
      portfolio: ["Branding", "UI/UX", "Print Design"]
    }
  ];

  const categories = [
    "All",
    "Creative",
    "Technology", 
    "Business",
    "Education",
    "Health"
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.skill.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           expert.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
            HIRE AN EXPERT
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-white/50"></div>
          <p className="text-white/70 tracking-wider">
            Find and book skilled professionals for your projects
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-900/50 border border-white/30 p-6 rounded-lg space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search experts by name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/30 rounded-lg
                         text-white placeholder-white/50 focus:border-orange-400 focus:outline-none
                         tracking-wider font-mono"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-white/50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-black/50 border border-white/30 rounded-lg
                         text-white focus:border-orange-400 focus:outline-none
                         tracking-wider font-mono appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
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
          Found {filteredExperts.length} expert{filteredExperts.length !== 1 ? 's' : ''}
        </motion.div>

        {/* Experts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExperts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 border border-white/30 p-6 rounded-lg relative overflow-hidden group"
            >
              <div className="relative z-10">
                {/* Expert Avatar and Basic Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-orange-400/20 rounded-full flex items-center justify-center">
                    <span className="text-orange-400 font-black text-xl tracking-wider">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-black tracking-wider">
                      {expert.name}
                    </h3>
                    <p className="text-orange-400 text-sm font-bold tracking-wide">
                      {expert.skill}
                    </p>
                  </div>
                </div>

                {/* Rating and Availability */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="text-white font-bold tracking-wider text-sm">
                      {expert.rating}
                    </span>
                  </div>
                  <span className={`
                    text-xs font-bold tracking-wider px-2 py-1 rounded-full
                    ${expert.availability === 'Available' 
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                      : 'bg-red-400/20 text-red-400 border border-red-400/30'
                    }
                  `}>
                    {expert.availability}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="tracking-wide">{expert.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <DollarSign className="w-4 h-4" />
                    <span className="tracking-wide">${expert.hourlyRate}/hour</span>
                  </div>
                </div>

                {/* Portfolio Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.portfolio.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-white/10 border border-white/20 px-2 py-1 rounded
                               text-white/80 font-bold tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 bg-orange-400/20 border border-orange-400/50 rounded-lg
                             text-orange-400 text-sm font-bold tracking-wider
                             hover:bg-orange-400/30 transition-colors duration-200"
                  >
                    VIEW PROFILE
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 bg-white/10 border border-white/30 rounded-lg
                             text-white text-sm font-bold tracking-wider
                             hover:bg-white/20 transition-colors duration-200"
                  >
                    BOOK NOW
                  </motion.button>
                </div>
              </div>

              {/* Animated Background Element */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-orange-400/5 rounded-full transform translate-x-8 -translate-y-8"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
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
            <Search className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 font-bold tracking-wider">
              No experts found matching your criteria
            </p>
            <p className="text-white/40 text-sm tracking-wide mt-2">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}