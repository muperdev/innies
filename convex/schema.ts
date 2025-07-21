import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table to store user information
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    userType: v.union(v.literal("seeker"), v.literal("provider")),
    imageUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    createdAt: v.number(),
    
    // Provider-specific fields
    hourlyRate: v.optional(v.number()),
    availability: v.optional(v.array(v.object({
      dayOfWeek: v.number(), // 0-6 (Sunday to Saturday)
      startTime: v.string(), // "09:00"
      endTime: v.string(), // "17:00"
    }))),
    portfolioUrls: v.optional(v.array(v.string())),
    location: v.optional(v.string()),
    isAvailable: v.optional(v.boolean()),
    rating: v.optional(v.number()),
    totalBookings: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_clerk_id", ["clerkId"])
    .index("by_user_type", ["userType"])
    .index("by_availability", ["isAvailable"]),

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

  // Skill categories table to organize skills
  skillCategories: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    iconUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_name", ["name"]),

  // User skills junction table
  userSkills: defineTable({
    userId: v.id("users"),
    categoryId: v.id("skillCategories"),
    skillName: v.string(),
    experienceLevel: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("expert")),
    yearsOfExperience: v.optional(v.number()),
    certifications: v.optional(v.array(v.string())),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_category", ["categoryId"])
    .index("by_skill_name", ["skillName"]),

  // Bookings table for service appointments
  bookings: defineTable({
    providerId: v.id("users"),
    seekerId: v.id("users"),
    skillId: v.id("userSkills"),
    title: v.string(),
    description: v.string(),
    scheduledDate: v.number(),
    duration: v.number(), // in minutes
    totalAmount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    location: v.optional(v.string()),
    isOnline: v.boolean(),
    meetingLink: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_provider", ["providerId"])
    .index("by_seeker", ["seekerId"])
    .index("by_status", ["status"])
    .index("by_scheduled_date", ["scheduledDate"]),

  // Payments table for transaction tracking
  payments: defineTable({
    bookingId: v.id("bookings"),
    payerId: v.id("users"),
    receiverId: v.id("users"),
    amount: v.number(),
    platformFee: v.number(),
    netAmount: v.number(),
    currency: v.string(),
    paymentMethod: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("succeeded"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    paidAt: v.optional(v.number()),
    refundedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_booking", ["bookingId"])
    .index("by_payer", ["payerId"])
    .index("by_receiver", ["receiverId"])
    .index("by_status", ["status"]),

  // Reviews table for feedback system
  reviews: defineTable({
    bookingId: v.id("bookings"),
    reviewerId: v.id("users"),
    revieweeId: v.id("users"),
    rating: v.number(), // 1-5
    comment: v.optional(v.string()),
    isPublic: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_booking", ["bookingId"])
    .index("by_reviewer", ["reviewerId"])
    .index("by_reviewee", ["revieweeId"])
    .index("by_rating", ["rating"]),

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
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
});
