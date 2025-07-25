"use client";

import { useUser } from "@clerk/nextjs";
import { useSyncUser } from "@/hooks/use-sync-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { user: convexUser, isLoading: syncLoading, error } = useSyncUser();
  const router = useRouter();

  useEffect(() => {
    if (clerkLoaded && !clerkUser) {
      router.push("/login");
    }
  }, [clerkLoaded, clerkUser, router]);

  // Show loading while Clerk or sync is loading
  if (!clerkLoaded || syncLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Redirect if no Clerk user
  if (!clerkUser) {
    return null; // Will redirect in useEffect
  }

  // Show error if sync failed
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-black tracking-wider text-white mb-2">
            AUTHENTICATION ERROR
          </h2>
          <p className="text-white/80 font-bold tracking-wider mb-2">
            Failed to sync user data
          </p>
          <p className="text-white/60 text-sm tracking-wide mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-400/20 border border-orange-400/50 rounded-lg
                     text-orange-400 font-bold tracking-wider text-sm
                     hover:bg-orange-400/30 transition-colors duration-200"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  // Show loading if Convex user not yet synced
  if (!convexUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white/80 font-bold tracking-wider">
            SETTING UP YOUR ACCOUNT...
          </p>
        </div>
      </div>
    );
  }

  // All checks passed, render protected content
  return <>{children}</>;
}