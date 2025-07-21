/* eslint-disable @typescript-eslint/no-explicit-any */
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Query to get all skill categories
export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("skillCategories").collect();
  },
});

// Query to get category by ID
export const getCategory = query({
  args: { categoryId: v.id("skillCategories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.categoryId);
  },
});

// Query to get category by name
export const getCategoryByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skillCategories")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .unique();
  },
});

// Mutation to create skill category
export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    iconUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if category already exists
    const existing = await ctx.db
      .query("skillCategories")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .unique();

    if (existing) {
      throw new Error("Category with this name already exists");
    }

    return await ctx.db.insert("skillCategories", {
      name: args.name,
      description: args.description,
      iconUrl: args.iconUrl,
      createdAt: Date.now(),
    });
  },
});

// Mutation to update skill category
export const updateCategory = mutation({
  args: {
    categoryId: v.id("skillCategories"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    iconUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db.get(args.categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    // Check if new name conflicts with existing category
    if (args.name && args.name !== category.name) {
      const existing = await ctx.db
        .query("skillCategories")
        .withIndex("by_name", (q) => q.eq("name", args.name!))
        .unique();

      if (existing) {
        throw new Error("Category with this name already exists");
      }
    }

    const updateData: Record<string, any> = {};
    if (args.name !== undefined) updateData.name = args.name;
    if (args.description !== undefined)
      updateData.description = args.description;
    if (args.iconUrl !== undefined) updateData.iconUrl = args.iconUrl;

    await ctx.db.patch(args.categoryId, updateData);
    return args.categoryId;
  },
});

// Mutation to delete skill category
export const deleteCategory = mutation({
  args: { categoryId: v.id("skillCategories") },
  handler: async (ctx, args) => {
    // Check if any user skills reference this category
    const userSkills = await ctx.db
      .query("userSkills")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    if (userSkills.length > 0) {
      throw new Error("Cannot delete category that has associated user skills");
    }

    await ctx.db.delete(args.categoryId);
    return args.categoryId;
  },
});
