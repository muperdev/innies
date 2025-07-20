import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Query to get a user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Query to get current user (authenticated with Clerk)
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    return user;
  },
});

// Query to get all users
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Query to get a user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
    return users.length > 0 ? users[0] : null;
  },
});

// Mutation to create or update user from Clerk webhook
export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    userType: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    
    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
        userType: args.userType || existingUser.userType,
        skills: args.skills || existingUser.skills,
        bio: args.bio || existingUser.bio,
      });
      return existingUser._id;
    }
    
    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
      userType: args.userType || "seeker",
      skills: args.skills || [],
      bio: args.bio || "",
      createdAt: Date.now(),
    });
    return userId;
  },
});

// Mutation to update user profile
export const updateUserProfile = mutation({
  args: {
    userType: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    await ctx.db.patch(user._id, {
      userType: args.userType || user.userType,
      skills: args.skills || user.skills,
      bio: args.bio || user.bio,
    });
    
    return user._id;
  },
});
