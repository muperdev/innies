import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table to store user information
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(), // Clerk user ID
    userType: v.optional(v.string()), // Added user type (seeker/expert)
    imageUrl: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
    createdAt: v.number(), // Timestamp
  }).index("by_email", ["email"]).index("by_clerk_id", ["clerkId"]),

  // Chats table to store chat sessions between users
  chats: defineTable({
    title: v.optional(v.string()),
    participants: v.array(v.id("users")), // Reference to users table
    createdAt: v.number(),
    updatedAt: v.number(),
    lastMessageId: v.optional(v.id("messages")), // Reference to the last message
    isActive: v.boolean(),
  }),

  // Messages table to store individual messages within chats
  messages: defineTable({
    chatId: v.id("chats"), // Reference to chats table
    senderId: v.id("users"), // Reference to users table
    content: v.string(),
    timestamp: v.number(),
    isRead: v.boolean(),
    attachments: v.optional(v.array(v.string())), // URLs to any attachments
  }),

  // Contact submissions table to store contact form submissions
  contactSubmissions: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    inquiryType: v.string(),
    message: v.string(),
    status: v.string(), // "new", "in_progress", "resolved"
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
});
