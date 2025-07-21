import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Query to get all skills for a user
export const getUserSkills = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const userSkills = await ctx.db
      .query("userSkills")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    // Get category details for each skill
    const skillsWithCategories = await Promise.all(
      userSkills.map(async (skill) => {
        const category = await ctx.db.get(skill.categoryId);
        return {
          ...skill,
          category,
        };
      })
    );
    
    return skillsWithCategories;
  },
});

// Query to get skills by category
export const getSkillsByCategory = query({
  args: { categoryId: v.id("skillCategories") },
  handler: async (ctx, args) => {
    const skills = await ctx.db
      .query("userSkills")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .collect();
    
    // Get user details for each skill
    const skillsWithUsers = await Promise.all(
      skills.map(async (skill) => {
        const user = await ctx.db.get(skill.userId);
        return {
          ...skill,
          user,
        };
      })
    );
    
    return skillsWithUsers;
  },
});

// Query to search skills by name
export const searchSkills = query({
  args: { 
    skillName: v.string(),
    experienceLevel: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("expert"))),
  },
  handler: async (ctx, args) => {
    const skills = await ctx.db
      .query("userSkills")
      .withIndex("by_skill_name", (q) => q.eq("skillName", args.skillName))
      .collect();
    
    let filteredSkills = skills;
    if (args.experienceLevel) {
      filteredSkills = skills.filter(skill => skill.experienceLevel === args.experienceLevel);
    }
    
    // Get user and category details
    const skillsWithDetails = await Promise.all(
      filteredSkills.map(async (skill) => {
        const [user, category] = await Promise.all([
          ctx.db.get(skill.userId),
          ctx.db.get(skill.categoryId),
        ]);
        return {
          ...skill,
          user,
          category,
        };
      })
    );
    
    return skillsWithDetails;
  },
});

// Query to get current user's skills
export const getCurrentUserSkills = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user) return [];
    
    return await ctx.db
      .query("userSkills")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});

// Mutation to add skill to user
export const addUserSkill = mutation({
  args: {
    categoryId: v.id("skillCategories"),
    skillName: v.string(),
    experienceLevel: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("expert")),
    yearsOfExperience: v.optional(v.number()),
    certifications: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    // Check if skill already exists for this user
    const existingSkill = await ctx.db
      .query("userSkills")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.and(
        q.eq(q.field("categoryId"), args.categoryId),
        q.eq(q.field("skillName"), args.skillName)
      ))
      .unique();
    
    if (existingSkill) {
      throw new Error("Skill already exists for this user");
    }
    
    // Verify category exists
    const category = await ctx.db.get(args.categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    
    return await ctx.db.insert("userSkills", {
      userId: user._id,
      categoryId: args.categoryId,
      skillName: args.skillName,
      experienceLevel: args.experienceLevel,
      yearsOfExperience: args.yearsOfExperience,
      certifications: args.certifications,
      createdAt: Date.now(),
    });
  },
});

// Mutation to update user skill
export const updateUserSkill = mutation({
  args: {
    skillId: v.id("userSkills"),
    experienceLevel: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("expert"))),
    yearsOfExperience: v.optional(v.number()),
    certifications: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const skill = await ctx.db.get(args.skillId);
    if (!skill) throw new Error("Skill not found");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user || skill.userId !== user._id) {
      throw new Error("Not authorized to update this skill");
    }
    
    const updateData: any = {};
    if (args.experienceLevel !== undefined) updateData.experienceLevel = args.experienceLevel;
    if (args.yearsOfExperience !== undefined) updateData.yearsOfExperience = args.yearsOfExperience;
    if (args.certifications !== undefined) updateData.certifications = args.certifications;
    
    await ctx.db.patch(args.skillId, updateData);
    return args.skillId;
  },
});

// Mutation to remove user skill
export const removeUserSkill = mutation({
  args: { skillId: v.id("userSkills") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const skill = await ctx.db.get(args.skillId);
    if (!skill) throw new Error("Skill not found");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user || skill.userId !== user._id) {
      throw new Error("Not authorized to remove this skill");
    }
    
    // Check if there are any bookings for this skill
    const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("skillId"), args.skillId))
      .collect();
    
    const activeBookings = bookings.filter(booking => 
      ["pending", "confirmed", "in_progress"].includes(booking.status)
    );
    
    if (activeBookings.length > 0) {
      throw new Error("Cannot remove skill with active bookings");
    }
    
    await ctx.db.delete(args.skillId);
    return args.skillId;
  },
});