/* eslint-disable @typescript-eslint/no-explicit-any */
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Query to get review by ID
export const getReview = query({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);
    if (!review) return null;

    // Get related data
    const [booking, reviewer, reviewee] = await Promise.all([
      ctx.db.get(review.bookingId),
      ctx.db.get(review.reviewerId),
      ctx.db.get(review.revieweeId),
    ]);

    return {
      ...review,
      booking,
      reviewer,
      reviewee,
    };
  },
});

// Query to get reviews for a user (as reviewee)
export const getUserReviews = query({
  args: {
    userId: v.id("users"),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("reviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", args.userId));

    const reviews = await query.collect();

    // Filter by public status if specified
    const filteredReviews =
      args.isPublic !== undefined
        ? reviews.filter((review) => review.isPublic === args.isPublic)
        : reviews;

    // Get reviewer details for each review
    const reviewsWithDetails = await Promise.all(
      filteredReviews.map(async (review) => {
        const [reviewer, booking] = await Promise.all([
          ctx.db.get(review.reviewerId),
          ctx.db.get(review.bookingId),
        ]);

        return {
          ...review,
          reviewer,
          booking,
        };
      })
    );

    return reviewsWithDetails.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Query to get reviews by rating
export const getReviewsByRating = query({
  args: {
    userId: v.id("users"),
    minRating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", args.userId))
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();

    // Filter by minimum rating if provided
    let filteredReviews = reviews;
    if (args.minRating !== undefined) {
      const minRating = args.minRating;
      filteredReviews = reviews.filter((review) => review.rating >= minRating);
    }

    return filteredReviews.sort((a, b) => b.rating - a.rating);
  },
});

// Query to get user's rating summary
export const getUserRatingSummary = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", args.userId))
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();

    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const ratingDistribution = reviews.reduce(
      (dist, review) => {
        dist[review.rating] = (dist[review.rating] || 0) + 1;
        return dist;
      },
      {} as Record<number, number>
    );

    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: reviews.length,
      ratingDistribution,
    };
  },
});

// Query to get review for a specific booking
export const getReviewByBooking = query({
  args: {
    bookingId: v.id("bookings"),
    reviewerId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("reviews")
      .withIndex("by_booking", (q) => q.eq("bookingId", args.bookingId));

    const reviews = await query.collect();

    if (args.reviewerId) {
      return (
        reviews.find((review) => review.reviewerId === args.reviewerId) || null
      );
    }

    return reviews;
  },
});

// Mutation to create review
export const createReview = mutation({
  args: {
    bookingId: v.id("bookings"),
    revieweeId: v.id("users"),
    rating: v.number(),
    comment: v.optional(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const reviewer = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!reviewer) throw new Error("User not found");

    // Verify booking exists and is completed
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");

    if (booking.status !== "completed") {
      throw new Error("Can only review completed bookings");
    }

    // Verify user was part of this booking
    if (
      booking.providerId !== reviewer._id &&
      booking.seekerId !== reviewer._id
    ) {
      throw new Error("Not authorized to review this booking");
    }

    // Verify reviewee was the other party in the booking
    const expectedRevieweeId =
      booking.providerId === reviewer._id
        ? booking.seekerId
        : booking.providerId;

    if (args.revieweeId !== expectedRevieweeId) {
      throw new Error("Invalid reviewee for this booking");
    }

    // Check if review already exists
    const existingReview = await ctx.db
      .query("reviews")
      .withIndex("by_booking", (q) => q.eq("bookingId", args.bookingId))
      .filter((q) => q.eq(q.field("reviewerId"), reviewer._id))
      .unique();

    if (existingReview) {
      throw new Error("Review already exists for this booking");
    }

    // Validate rating
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const reviewId = await ctx.db.insert("reviews", {
      bookingId: args.bookingId,
      reviewerId: reviewer._id,
      revieweeId: args.revieweeId,
      rating: args.rating,
      comment: args.comment,
      isPublic: args.isPublic,
      createdAt: Date.now(),
    });

    // Update user's average rating
    await updateUserRating(ctx, args.revieweeId);

    return reviewId;
  },
});

// Mutation to update review
export const updateReview = mutation({
  args: {
    reviewId: v.id("reviews"),
    rating: v.optional(v.number()),
    comment: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const review = await ctx.db.get(args.reviewId);
    if (!review) throw new Error("Review not found");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || review.reviewerId !== user._id) {
      throw new Error("Not authorized to update this review");
    }

    // Validate rating if provided
    if (args.rating !== undefined && (args.rating < 1 || args.rating > 5)) {
      throw new Error("Rating must be between 1 and 5");
    }

    const updateData: any = {};
    if (args.rating !== undefined) updateData.rating = args.rating;
    if (args.comment !== undefined) updateData.comment = args.comment;
    if (args.isPublic !== undefined) updateData.isPublic = args.isPublic;

    await ctx.db.patch(args.reviewId, updateData);

    // Update user's average rating if rating changed
    if (args.rating !== undefined) {
      await updateUserRating(ctx, review.revieweeId);
    }

    return args.reviewId;
  },
});

// Mutation to delete review
export const deleteReview = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const review = await ctx.db.get(args.reviewId);
    if (!review) throw new Error("Review not found");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || review.reviewerId !== user._id) {
      throw new Error("Not authorized to delete this review");
    }

    const revieweeId = review.revieweeId;
    await ctx.db.delete(args.reviewId);

    // Update user's average rating
    await updateUserRating(ctx, revieweeId);

    return args.reviewId;
  },
});

// Helper function to update user's average rating
async function updateUserRating(ctx: any, userId: string) {
  const reviews = await ctx.db
    .query("reviews")
    .withIndex("by_reviewee", (q: any) => q.eq("revieweeId", userId))
    .filter((q: any) => q.eq(q.field("isPublic"), true))
    .collect();

  if (reviews.length === 0) {
    await ctx.db.patch(userId, { rating: undefined });
    return;
  }

  const totalRating = reviews.reduce(
    (sum: number, review: any) => sum + review.rating,
    0
  );
  const averageRating = totalRating / reviews.length;

  await ctx.db.patch(userId, {
    rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
  });
}
