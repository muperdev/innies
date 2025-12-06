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

// Query to get all skill providers
export const getProviders = query({
  args: {
    skillCategory: v.optional(v.string()),
    isAvailable: v.optional(v.boolean()),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("users")
      .withIndex("by_user_type", (q) => q.eq("userType", "provider"));

    const providers = await query.collect();

    return providers.filter((provider) => {
      if (
        args.isAvailable !== undefined &&
        provider.isAvailable !== args.isAvailable
      ) {
        return false;
      }
      if (args.location && provider.location !== args.location) {
        return false;
      }
      return true;
    });
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

// Query to get a user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

// Mutation to create or update user from Clerk webhook
export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    userType: v.optional(v.union(v.literal("seeker"), v.literal("provider"))),
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
      bio: args.bio || "",
      createdAt: Date.now(),
    });
    return userId;
  },
});

// Mutation to update user profile
export const updateUserProfile = mutation({
  args: {
    userType: v.optional(v.union(v.literal("seeker"), v.literal("provider"))),
    bio: v.optional(v.string()),
    hourlyRate: v.optional(v.number()),
    availability: v.optional(
      v.array(
        v.object({
          dayOfWeek: v.number(),
          startTime: v.string(),
          endTime: v.string(),
        })
      )
    ),
    portfolioUrls: v.optional(v.array(v.string())),
    location: v.optional(v.string()),
    isAvailable: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      userType: args.userType || user.userType,
      bio: args.bio || user.bio,
    };

    // Only update provider-specific fields if user is a provider
    if (args.userType === "provider" || user.userType === "provider") {
      if (args.hourlyRate !== undefined)
        updateData.hourlyRate = args.hourlyRate;
      if (args.availability !== undefined)
        updateData.availability = args.availability;
      if (args.portfolioUrls !== undefined)
        updateData.portfolioUrls = args.portfolioUrls;
      if (args.location !== undefined) updateData.location = args.location;
      if (args.isAvailable !== undefined)
        updateData.isAvailable = args.isAvailable;
    }

    await ctx.db.patch(user._id, updateData);

    return user._id;
  },
});
