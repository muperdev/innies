"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { 
  Search, 
  Users, 
  CreditCard, 
  User, 
  Settings,
  LogOut,
  Home
} from "lucide-react";

const sidebarLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/dashboard/hire",
    label: "Hire an Expert",
    icon: Search,
  },
  {
    href: "/dashboard/recent",
    label: "Recent Experts",
    icon: Users,
  },
  {
    href: "/dashboard/payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="bg-black text-white min-h-screen font-mono relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-8 h-1 bg-white/30"
          animate={{
            scaleX: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-6 h-6 border border-orange-400/50"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-1 h-20 bg-gradient-to-b from-white/20 to-orange-400/20"
          animate={{
            scaleY: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-80 bg-gray-900/50 border-r border-white/30 backdrop-blur-sm flex flex-col"
        >
          {/* Logo/Brand */}
          <div className="p-6 border-b border-white/20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <motion.div
                  className="w-3 h-3 bg-orange-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <h1 className="text-2xl font-black tracking-widest">
                INNIES
              </h1>
            </motion.div>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-white/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              {user?.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-white/30"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm tracking-wider truncate">
                  {user?.fullName || user?.firstName || "User"}
                </p>
                <p className="text-white/70 text-xs tracking-wide truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              {sidebarLinks.map((link, index) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={link.href}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg 
                        transition-all duration-200 group
                        ${isActive 
                          ? 'bg-orange-400/20 border border-orange-400/50 text-orange-400' 
                          : 'hover:bg-white/10 border border-transparent hover:border-white/30'
                        }
                      `}
                    >
                      <Icon 
                        size={20} 
                        className={`
                          transition-colors duration-200
                          ${isActive ? 'text-orange-400' : 'text-white/70 group-hover:text-white'}
                        `}
                      />
                      <span className={`
                        text-sm font-bold tracking-wider
                        ${isActive ? 'text-orange-400' : 'text-white/80 group-hover:text-white'}
                      `}>
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </nav>

          {/* Sign Out Button */}
          <div className="p-6 border-t border-white/20">
            <SignOutButton>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
                         bg-red-900/30 border border-red-500/50 text-red-400
                         hover:bg-red-900/50 hover:border-red-500/70
                         transition-all duration-200 group"
              >
                <LogOut size={20} className="text-red-400" />
                <span className="text-sm font-bold tracking-wider">
                  Sign Out
                </span>
              </motion.button>
            </SignOutButton>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}