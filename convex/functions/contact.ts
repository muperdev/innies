import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Mutation to create a new contact submission
export const createContactSubmission = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    inquiryType: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate inputs
    if (!args.firstName.trim()) {
      throw new Error("First name is required");
    }
    if (!args.lastName.trim()) {
      throw new Error("Last name is required");
    }
    if (!args.email.trim()) {
      throw new Error("Email is required");
    }
    if (!args.inquiryType.trim()) {
      throw new Error("Inquiry type is required");
    }
    if (!args.message.trim()) {
      throw new Error("Message is required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Invalid email format");
    }

    // Validate inquiry type
    const validInquiryTypes = ["general", "support", "partnership", "expert", "feedback"];
    if (!validInquiryTypes.includes(args.inquiryType)) {
      throw new Error("Invalid inquiry type");
    }

    // Validate message length
    if (args.message.length > 2000) {
      throw new Error("Message is too long (maximum 2000 characters)");
    }

    const now = Date.now();
    
    const submissionId = await ctx.db.insert("contactSubmissions", {
      firstName: args.firstName.trim(),
      lastName: args.lastName.trim(),
      email: args.email.trim().toLowerCase(),
      inquiryType: args.inquiryType,
      message: args.message.trim(),
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    return submissionId;
  },
});

// Query to get all contact submissions (admin use)
export const getAllContactSubmissions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});

// Query to get contact submissions by status
export const getContactSubmissionsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect();
  },
});

// Query to get contact submissions by email
export const getContactSubmissionsByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .order("desc")
      .collect();
  },
});

// Mutation to update contact submission status (admin use)
export const updateContactSubmissionStatus = mutation({
  args: {
    submissionId: v.id("contactSubmissions"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const validStatuses = ["new", "in_progress", "resolved"];
    if (!validStatuses.includes(args.status)) {
      throw new Error("Invalid status");
    }

    const submission = await ctx.db.get(args.submissionId);
    if (!submission) {
      throw new Error("Contact submission not found");
    }

    await ctx.db.patch(args.submissionId, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Query to get contact submission by ID
export const getContactSubmission = query({
  args: { submissionId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.submissionId);
  },
});