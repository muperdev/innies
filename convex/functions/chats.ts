import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// Query to get a chat by ID
export const getChat = query({
    args: { chatId: v.id("chats") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.chatId);
    },
});

// Query to get all chats for a user
export const getUserChats = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        // First collect all chats, then filter them using JavaScript array methods
        const allChats = await ctx.db
            .query("chats")
            .order("desc")
            .collect();
        
        // Filter chats where the user is a participant
        return allChats.filter(chat => 
            chat.participants.some(participantId => 
                participantId.equals(args.userId)
            )
        );
    },
});

// Mutation to create a new chat
export const createChat = mutation({
    args: {
        title: v.optional(v.string()),
        participants: v.array(v.id("users")),
    },
    handler: async (ctx, args) => {
        // Ensure at least 2 participants
        if (args.participants.length < 2) {
            throw new Error("A chat requires at least 2 participants");
        }

        const chatId = await ctx.db.insert("chats", {
            title: args.title,
            participants: args.participants,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            lastMessageId: undefined,
            isActive: true,
        });
        return chatId;
    },
});