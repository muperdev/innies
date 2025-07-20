import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Query to get a user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
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

// Mutation to create a new user
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    userType: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUsers = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
    
    if (existingUsers.length > 0) {
      throw new Error("User with this email already exists");
    }
    
    // In a real application, you would hash the password here
    // For example: const hashedPassword = await bcrypt.hash(args.password, 10);
    
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: args.password, // In production, store hashed password
      userType: args.userType || "seeker",
      imageUrl: args.imageUrl,
      skills: args.skills || [],
      bio: args.bio || "",
      createdAt: Date.now(),
    });
    return userId;
  },
});

// Mutation to authenticate a user
export const loginUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
    
    if (users.length === 0) {
      throw new Error("User not found");
    }
    
    const user = users[0];
    
    // In a real application, you would compare hashed passwords
    // For example: const passwordMatch = await bcrypt.compare(args.password, user.password);
    
    if (user.password !== args.password) {
      throw new Error("Invalid password");
    }
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});
