"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const currentUser = useQuery(api.functions.users.getCurrentUser);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <SignOutButton>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Sign Out
              </button>
            </SignOutButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {user.fullName}</p>
                <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
                <p><strong>Clerk ID:</strong> {user.id}</p>
                {user.imageUrl && (
                  <div>
                    <strong>Profile Image:</strong>
                    <img 
                      src={user.imageUrl} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Convex User Data</h2>
              {currentUser ? (
                <div className="space-y-2">
                  <p><strong>User Type:</strong> {currentUser.userType}</p>
                  <p><strong>Skills:</strong> {currentUser.skills?.join(", ") || "None"}</p>
                  <p><strong>Bio:</strong> {currentUser.bio || "No bio provided"}</p>
                  <p><strong>Created:</strong> {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                </div>
              ) : (
                <p className="text-gray-600">
                  User profile not found in Convex. This happens on first sign-in.
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Authentication Status</h3>
            <p className="text-blue-700">
              ✅ Successfully authenticated with Clerk and connected to Convex!
            </p>
            <p className="text-sm text-blue-600 mt-2">
              Your authentication is handled by Clerk, and your data is stored in Convex.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}