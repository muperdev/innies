import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// Query to get all messages for a chat
export const getChatMessages = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chatId"), args.chatId))
      .order("asc")
      .collect();
  },
});

// Mutation to send a message
export const sendMessage = mutation({
  args: {
    chatId: v.id("chats"),
    senderId: v.id("users"),
    content: v.string(),
    attachments: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    // Verify chat exists
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Verify sender is a participant
    if (!chat.participants.includes(args.senderId)) {
      throw new Error("Sender is not a participant in this chat");
    }

    // Create the message
    const messageId = await ctx.db.insert("messages", {
      chatId: args.chatId,
      senderId: args.senderId,
      content: args.content,
      timestamp: Date.now(),
      isRead: false,
      attachments: args.attachments || [],
    });

    // Update the chat's lastMessageId and updatedAt
    await ctx.db.patch(args.chatId, {
      lastMessageId: messageId,
      updatedAt: Date.now(),
    });

    return messageId;
  },
});

// Mutation to mark messages as read
export const markMessagesAsRead = mutation({
  args: {
    messageIds: v.array(v.id("messages")),
  },
  handler: async (ctx, args) => {
    for (const messageId of args.messageIds) {
      await ctx.db.patch(messageId, { isRead: true });
    }
    return true;
  },
});