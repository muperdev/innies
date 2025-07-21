import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Query to get booking by ID
export const getBooking = query({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) return null;
    
    // Get related data
    const [provider, seeker, skill] = await Promise.all([
      ctx.db.get(booking.providerId),
      ctx.db.get(booking.seekerId),
      ctx.db.get(booking.skillId),
    ]);
    
    return {
      ...booking,
      provider,
      seeker,
      skill,
    };
  },
});

// Query to get user's bookings (as provider or seeker)
export const getUserBookings = query({
  args: { 
    role: v.optional(v.union(v.literal("provider"), v.literal("seeker"))),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    )),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user) return [];
    
    let bookings: any[] = [];
    
    if (!args.role || args.role === "provider") {
      const providerBookings = await ctx.db
        .query("bookings")
        .withIndex("by_provider", (q) => q.eq("providerId", user._id))
        .collect();
      bookings.push(...providerBookings);
    }
    
    if (!args.role || args.role === "seeker") {
      const seekerBookings = await ctx.db
        .query("bookings")
        .withIndex("by_seeker", (q) => q.eq("seekerId", user._id))
        .collect();
      bookings.push(...seekerBookings);
    }
    
    // Filter by status if provided
    if (args.status) {
      bookings = bookings.filter(booking => booking.status === args.status);
    }
    
    // Get related data for each booking
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const [provider, seeker, skill] = await Promise.all([
          ctx.db.get(booking.providerId),
          ctx.db.get(booking.seekerId),
          ctx.db.get(booking.skillId),
        ]);
        
        return {
          ...booking,
          provider,
          seeker,
          skill,
        };
      })
    );
    
    return bookingsWithDetails.sort((a, b) => b.scheduledDate - a.scheduledDate);
  },
});

// Query to get provider's upcoming bookings
export const getProviderUpcomingBookings = query({
  args: { providerId: v.id("users") },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db
      .query("bookings")
      .withIndex("by_provider", (q) => q.eq("providerId", args.providerId))
      .filter((q) => q.and(
        q.gte(q.field("scheduledDate"), now),
        q.or(
          q.eq(q.field("status"), "confirmed"),
          q.eq(q.field("status"), "in_progress")
        )
      ))
      .collect();
  },
});

// Mutation to create booking
export const createBooking = mutation({
  args: {
    providerId: v.id("users"),
    skillId: v.id("userSkills"),
    title: v.string(),
    description: v.string(),
    scheduledDate: v.number(),
    duration: v.number(),
    isOnline: v.boolean(),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const seeker = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!seeker) throw new Error("User not found");
    
    // Verify provider exists and is a provider
    const provider = await ctx.db.get(args.providerId);
    if (!provider || provider.userType !== "provider") {
      throw new Error("Provider not found");
    }
    
    // Verify skill exists and belongs to provider
    const skill = await ctx.db.get(args.skillId);
    if (!skill || skill.userId !== args.providerId) {
      throw new Error("Skill not found or doesn't belong to provider");
    }
    
    // Check provider availability
    if (!provider.isAvailable) {
      throw new Error("Provider is not currently available");
    }
    
    // Calculate total amount (hourly rate * duration in hours)
    const durationHours = args.duration / 60;
    const totalAmount = (provider.hourlyRate || 0) * durationHours;
    
    // Check for scheduling conflicts
    const conflictingBookings = await ctx.db
      .query("bookings")
      .withIndex("by_provider", (q) => q.eq("providerId", args.providerId))
      .filter((q) => q.and(
        q.or(
          q.eq(q.field("status"), "confirmed"),
          q.eq(q.field("status"), "in_progress")
        ),
        q.lte(q.field("scheduledDate"), args.scheduledDate + (args.duration * 60 * 1000)),
        q.gte(q.field("scheduledDate"), args.scheduledDate - (args.duration * 60 * 1000))
      ))
      .collect();
    
    if (conflictingBookings.length > 0) {
      throw new Error("Provider has a scheduling conflict at this time");
    }
    
    return await ctx.db.insert("bookings", {
      providerId: args.providerId,
      seekerId: seeker._id,
      skillId: args.skillId,
      title: args.title,
      description: args.description,
      scheduledDate: args.scheduledDate,
      duration: args.duration,
      totalAmount,
      status: "pending",
      location: args.location,
      isOnline: args.isOnline,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Mutation to update booking status
export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    meetingLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    // Check authorization (only provider or seeker can update)
    if (booking.providerId !== user._id && booking.seekerId !== user._id) {
      throw new Error("Not authorized to update this booking");
    }
    
    // Business logic for status transitions
    const validTransitions: Record<string, string[]> = {
      "pending": ["confirmed", "cancelled"],
      "confirmed": ["in_progress", "cancelled"],
      "in_progress": ["completed", "cancelled"],
      "completed": [],
      "cancelled": [],
    };
    
    if (!validTransitions[booking.status]?.includes(args.status)) {
      throw new Error(`Cannot transition from ${booking.status} to ${args.status}`);
    }
    
    // Only provider can confirm bookings
    if (args.status === "confirmed" && booking.providerId !== user._id) {
      throw new Error("Only provider can confirm bookings");
    }
    
    const updateData: any = {
      status: args.status,
      updatedAt: Date.now(),
    };
    
    if (args.meetingLink !== undefined) {
      updateData.meetingLink = args.meetingLink;
    }
    
    await ctx.db.patch(args.bookingId, updateData);
    
    // Update provider's total bookings if completed
    if (args.status === "completed") {
      const provider = await ctx.db.get(booking.providerId);
      if (provider) {
        await ctx.db.patch(booking.providerId, {
          totalBookings: (provider.totalBookings || 0) + 1,
        });
      }
    }
    
    return args.bookingId;
  },
});

// Mutation to cancel booking
export const cancelBooking = mutation({
  args: { 
    bookingId: v.id("bookings"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    // Check authorization
    if (booking.providerId !== user._id && booking.seekerId !== user._id) {
      throw new Error("Not authorized to cancel this booking");
    }
    
    // Can only cancel if not completed
    if (booking.status === "completed") {
      throw new Error("Cannot cancel completed booking");
    }
    
    await ctx.db.patch(args.bookingId, {
      status: "cancelled",
      updatedAt: Date.now(),
    });
    
    return args.bookingId;
  },
});