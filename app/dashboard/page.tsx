"use client";

import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DashboardLayout from "@/components/dashboard-layout";
import VideoCallDemo from "@/components/chat/video-call-demo";
import {
  Calendar,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const currentUser = useQuery(api.functions.users.getCurrentUser);

  if (!isLoaded) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full"
          />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-white/80 font-bold tracking-wider">
              Please sign in to access the dashboard.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Sample data - replace with actual queries when backend is ready
  const stats = [
    {
      title: "Total Bookings",
      value: "12",
      change: "+3 this month",
      icon: Calendar,
      color: "orange"
    },
    {
      title: "Total Earnings",
      value: "$2,840",
      change: "+12% this month",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "98% positive",
      icon: Star,
      color: "yellow"
    },
    {
      title: "Active Skills",
      value: "3",
      change: "Photography, Design",
      icon: Users,
      color: "blue"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "booking",
      title: "Photography session completed",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received - $120",
      time: "1 day ago",
      status: "success"
    },
    {
      id: 3,
      type: "review",
      title: "New 5-star review received",
      time: "2 days ago",
      status: "positive"
    },
    {
      id: 4,
      type: "booking",
      title: "New booking request",
      time: "3 days ago",
      status: "pending"
    }
  ];

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
            DASHBOARD
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-white/50"></div>
          <p className="text-white/70 tracking-wider">
            Welcome back, {user.firstName || "User"}! Here's your overview.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-white/30 p-6 rounded-lg relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-6 h-6 text-orange-400" />
                    <TrendingUp className="w-4 h-4 text-white/50" />
                  </div>
                  <h3 className="text-2xl font-black tracking-wider text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-white/80 text-sm font-bold tracking-wider mb-2">
                    {stat.title}
                  </p>
                  <p className="text-orange-400 text-xs tracking-wide">
                    {stat.change}
                  </p>
                </div>
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-orange-400/10 rounded-full transform translate-x-8 -translate-y-8"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-gray-900/50 border border-white/30 p-6 rounded-lg"
          >
            <h2 className="text-xl font-black tracking-widest text-white mb-6">
              PROFILE OVERVIEW
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-white/80 text-sm font-bold tracking-wider uppercase">
                  Account Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm tracking-wide">Name</span>
                    <span className="text-white font-bold tracking-wider">
                      {user.fullName || "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm tracking-wide">Email</span>
                    <span className="text-white font-bold tracking-wider text-xs">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm tracking-wide">Status</span>
                    <span className="text-orange-400 font-bold tracking-wider text-sm">
                      ● ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white/80 text-sm font-bold tracking-wider uppercase">
                  Platform Data
                </h3>
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm tracking-wide">User Type</span>
                      <span className="text-orange-400 font-bold tracking-wider uppercase">
                        {currentUser.userType}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm tracking-wide">Member Since</span>
                      <span className="text-white font-bold tracking-wider text-sm">
                        {new Date(currentUser.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm tracking-wide">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                        <span className="text-white font-bold tracking-wider">
                          {currentUser.rating || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-white/60 text-sm tracking-wide">
                    Profile data loading...
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900/50 border border-white/30 p-6 rounded-lg"
          >
            <h2 className="text-xl font-black tracking-widest text-white mb-6">
              RECENT ACTIVITY
            </h2>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-black/30 border border-white/10"
                >
                  <div className={`
                    w-2 h-2 rounded-full mt-2 flex-shrink-0
                    ${activity.status === 'completed' ? 'bg-green-400' :
                      activity.status === 'success' ? 'bg-orange-400' :
                        activity.status === 'positive' ? 'bg-yellow-400' : 'bg-blue-400'}
                  `} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold tracking-wide truncate">
                      {activity.title}
                    </p>
                    <p className="text-white/60 text-xs tracking-wide">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-6 text-center"
            >
              <button className="w-full py-2 text-orange-400 text-sm font-bold tracking-wider 
                               border border-orange-400/50 rounded-lg hover:bg-orange-400/10 
                               transition-colors duration-200">
                VIEW ALL ACTIVITY
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Video Call Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <VideoCallDemo
            userIdentity={user?.id || "demo-user"}
            userName={user?.firstName || "Demo User"}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-900/50 border border-white/30 p-6 rounded-lg"
        >
          <h2 className="text-xl font-black tracking-widest text-white mb-6">
            QUICK ACTIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-orange-400/20 border border-orange-400/50 rounded-lg 
                       text-orange-400 font-bold tracking-wider text-sm
                       hover:bg-orange-400/30 transition-colors duration-200"
            >
              FIND EXPERTS
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-blue-400/20 border border-blue-400/50 rounded-lg 
                       text-blue-400 font-bold tracking-wider text-sm
                       hover:bg-blue-400/30 transition-colors duration-200"
            >
              VIEW BOOKINGS
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-green-400/20 border border-green-400/50 rounded-lg 
                       text-green-400 font-bold tracking-wider text-sm
                       hover:bg-green-400/30 transition-colors duration-200"
            >
              CHECK EARNINGS
            </motion.button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}