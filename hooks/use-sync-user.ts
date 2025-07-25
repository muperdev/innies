"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

export const useSyncUser = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const convexUser = useQuery(
    api.functions.users.getCurrentUser,
    isLoaded && clerkUser ? {} : "skip"
  );

  const createOrUpdateUser = useMutation(
    api.functions.users.createOrUpdateUser
  );

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !clerkUser || isSyncing) return;

      // If user exists in Convex, no need to sync
      if (convexUser !== null) return;

      // If query is still loading, wait
      if (convexUser === undefined) return;

      const email = clerkUser.emailAddresses[0]?.emailAddress;
      if (!email) {
        setSyncError("No email found for user");
        return;
      }

      setIsSyncing(true);
      setSyncError(null);

      try {
        await createOrUpdateUser({
          clerkId: clerkUser.id,
          name: clerkUser.fullName || clerkUser.firstName || "",
          email,
          imageUrl: clerkUser.imageUrl,
          userType: "seeker", // Default to seeker
        });
      } catch (error) {
        setSyncError(
          error instanceof Error ? error.message : "Failed to sync user"
        );
      } finally {
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [isLoaded, clerkUser, convexUser, createOrUpdateUser, isSyncing]);

  return {
    user: convexUser,
    isLoading: !isLoaded || convexUser === undefined || isSyncing,
    error: syncError,
  };
};
