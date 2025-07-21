import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Query to get payment by ID
export const getPayment = query({
  args: { paymentId: v.id("payments") },
  handler: async (ctx, args) => {
    const payment = await ctx.db.get(args.paymentId);
    if (!payment) return null;
    
    // Get related data
    const [booking, payer, receiver] = await Promise.all([
      ctx.db.get(payment.bookingId),
      ctx.db.get(payment.payerId),
      ctx.db.get(payment.receiverId),
    ]);
    
    return {
      ...payment,
      booking,
      payer,
      receiver,
    };
  },
});

// Query to get payment by booking ID
export const getPaymentByBooking = query({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .withIndex("by_booking", (q) => q.eq("bookingId", args.bookingId))
      .unique();
  },
});

// Query to get user's payments (sent or received)
export const getUserPayments = query({
  args: { 
    role: v.optional(v.union(v.literal("payer"), v.literal("receiver"))),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("succeeded"),
      v.literal("failed"),
      v.literal("refunded")
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
    
    let payments: any[] = [];
    
    if (!args.role || args.role === "payer") {
      const paidPayments = await ctx.db
        .query("payments")
        .withIndex("by_payer", (q) => q.eq("payerId", user._id))
        .collect();
      payments.push(...paidPayments);
    }
    
    if (!args.role || args.role === "receiver") {
      const receivedPayments = await ctx.db
        .query("payments")
        .withIndex("by_receiver", (q) => q.eq("receiverId", user._id))
        .collect();
      payments.push(...receivedPayments);
    }
    
    // Filter by status if provided
    if (args.status) {
      payments = payments.filter(payment => payment.status === args.status);
    }
    
    // Get related data for each payment
    const paymentsWithDetails = await Promise.all(
      payments.map(async (payment) => {
        const [booking, payer, receiver] = await Promise.all([
          ctx.db.get(payment.bookingId),
          ctx.db.get(payment.payerId),
          ctx.db.get(payment.receiverId),
        ]);
        
        return {
          ...payment,
          booking,
          payer,
          receiver,
        };
      })
    );
    
    return paymentsWithDetails.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Query to get provider earnings summary
export const getProviderEarnings = query({
  args: { 
    providerId: v.optional(v.id("users")),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    let providerId = args.providerId;
    
    if (!providerId) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .unique();
      
      if (!user || user.userType !== "provider") {
        throw new Error("User is not a provider");
      }
      providerId = user._id;
    }
    
    let payments = await ctx.db
      .query("payments")
      .withIndex("by_receiver", (q) => q.eq("receiverId", providerId))
      .filter((q) => q.eq(q.field("status"), "succeeded"))
      .collect();
    
    // Filter by date range if provided
    if (args.startDate || args.endDate) {
      payments = payments.filter(payment => {
        if (args.startDate && payment.paidAt && payment.paidAt < args.startDate) return false;
        if (args.endDate && payment.paidAt && payment.paidAt > args.endDate) return false;
        return true;
      });
    }
    
    const totalEarnings = payments.reduce((sum, payment) => sum + payment.netAmount, 0);
    const totalPlatformFees = payments.reduce((sum, payment) => sum + payment.platformFee, 0);
    const totalBookings = payments.length;
    
    return {
      totalEarnings,
      totalPlatformFees,
      totalBookings,
      payments,
    };
  },
});

// Mutation to create payment intent
export const createPayment = mutation({
  args: {
    bookingId: v.id("bookings"),
    paymentMethod: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const seeker = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!seeker) throw new Error("User not found");
    
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");
    
    // Verify user is the seeker for this booking
    if (booking.seekerId !== seeker._id) {
      throw new Error("Not authorized to pay for this booking");
    }
    
    // Check if payment already exists
    const existingPayment = await ctx.db
      .query("payments")
      .withIndex("by_booking", (q) => q.eq("bookingId", args.bookingId))
      .unique();
    
    if (existingPayment) {
      throw new Error("Payment already exists for this booking");
    }
    
    // Calculate platform fee (5% of total amount)
    const platformFeeRate = 0.05;
    const platformFee = booking.totalAmount * platformFeeRate;
    const netAmount = booking.totalAmount - platformFee;
    
    return await ctx.db.insert("payments", {
      bookingId: args.bookingId,
      payerId: seeker._id,
      receiverId: booking.providerId,
      amount: booking.totalAmount,
      platformFee,
      netAmount,
      currency: "USD",
      paymentMethod: args.paymentMethod,
      stripePaymentIntentId: args.stripePaymentIntentId,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

// Mutation to update payment status
export const updatePaymentStatus = mutation({
  args: {
    paymentId: v.id("payments"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("succeeded"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db.get(args.paymentId);
    if (!payment) throw new Error("Payment not found");
    
    const updateData: any = {
      status: args.status,
    };
    
    if (args.stripePaymentIntentId !== undefined) {
      updateData.stripePaymentIntentId = args.stripePaymentIntentId;
    }
    
    // Set timestamps based on status
    if (args.status === "succeeded" && !payment.paidAt) {
      updateData.paidAt = Date.now();
      
      // Auto-confirm the booking when payment succeeds
      const booking = await ctx.db.get(payment.bookingId);
      if (booking && booking.status === "pending") {
        await ctx.db.patch(payment.bookingId, {
          status: "confirmed",
          updatedAt: Date.now(),
        });
      }
    }
    
    if (args.status === "refunded" && !payment.refundedAt) {
      updateData.refundedAt = Date.now();
    }
    
    await ctx.db.patch(args.paymentId, updateData);
    return args.paymentId;
  },
});

// Mutation to process refund
export const processRefund = mutation({
  args: { 
    paymentId: v.id("payments"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const payment = await ctx.db.get(args.paymentId);
    if (!payment) throw new Error("Payment not found");
    
    if (payment.status !== "succeeded") {
      throw new Error("Can only refund succeeded payments");
    }
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    // Check authorization (payer or receiver can request refund)
    if (payment.payerId !== user._id && payment.receiverId !== user._id) {
      throw new Error("Not authorized to refund this payment");
    }
    
    const booking = await ctx.db.get(payment.bookingId);
    if (!booking) throw new Error("Booking not found");
    
    // Business rules for refunds
    const now = Date.now();
    const timeDiff = now - booking.scheduledDate;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    // Can only refund if booking hasn't started or is within 24 hours
    if (booking.status === "in_progress" || booking.status === "completed") {
      throw new Error("Cannot refund booking that has started or completed");
    }
    
    // Full refund if cancelled more than 24 hours before
    // Partial refund if cancelled within 24 hours
    let refundAmount = payment.amount;
    if (hoursDiff > -24) { // Less than 24 hours before scheduled time
      refundAmount = payment.amount * 0.5; // 50% refund
    }
    
    await ctx.db.patch(args.paymentId, {
      status: "refunded",
      refundedAt: Date.now(),
    });
    
    // Cancel the booking
    await ctx.db.patch(payment.bookingId, {
      status: "cancelled",
      updatedAt: Date.now(),
    });
    
    return {
      paymentId: args.paymentId,
      refundAmount,
    };
  },
});