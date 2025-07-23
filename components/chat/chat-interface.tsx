"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Send, Paperclip, Smile } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

type Message = {
  _id: Id<"messages">;
  chatId: Id<"chats">;
  senderId: Id<"users">;
  content: string;
  timestamp: number;
  isRead: boolean;
  attachments?: string[];
};

type User = {
  _id: Id<"users">;
  name: string;
  email: string;
  clerkId: string;
  imageUrl?: string;
};

interface ChatInterfaceProps {
  chatId: Id<"chats">;
  currentUserId?: Id<"users">;
}

export default function ChatInterface({ chatId, currentUserId }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get messages for this chat
  const messages = useQuery(api.messages.getChatMessages, { chatId }) as Message[] | undefined;
  
  // Get all users to display sender names
  const allUsers = useQuery(api.users.getAllUsers) as User[] | undefined;
  
  // Send message mutation
  const sendMessage = useMutation(api.messages.sendMessage);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentUserId) return;

    try {
      await sendMessage({
        chatId,
        senderId: currentUserId,
        content: message.trim()
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const getUserById = (userId: Id<"users">): User | undefined => {
    return allUsers?.find(user => user._id === userId);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages?.forEach(message => {
      const dateKey = new Date(message.timestamp).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    
    return groups;
  };

  const messageGroups = messages ? groupMessagesByDate(messages) : {};

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
          <div key={dateKey}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-gray-700 text-white/60 text-xs px-3 py-1 rounded-full">
                {formatDate(new Date(dateKey).getTime())}
              </div>
            </div>
            
            {/* Messages for this date */}
            {dayMessages.map((msg, index) => {
              const sender = getUserById(msg.senderId);
              const isCurrentUser = msg.senderId === currentUserId;
              const showAvatar = index === 0 || dayMessages[index - 1].senderId !== msg.senderId;
              
              return (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isCurrentUser && (
                    <div className="w-8 h-8 flex-shrink-0">
                      {showAvatar && (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {sender?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-1' : ''}`}>
                    {showAvatar && !isCurrentUser && (
                      <div className="text-white/60 text-xs mb-1 ml-1">
                        {sender?.name}
                      </div>
                    )}
                    
                    <div className={`rounded-2xl px-4 py-2 ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' 
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    
                    <div className={`text-xs text-white/40 mt-1 ${
                      isCurrentUser ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                  
                  {isCurrentUser && (
                    <div className="w-8 h-8 flex-shrink-0">
                      {showAvatar && (
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {sender?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
            </div>
            <div className="bg-gray-700 rounded-2xl px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/20 bg-gray-900/30">
        <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type a message..."
              rows={1}
              className="w-full bg-black/50 border border-white/30 text-white px-4 py-3 pr-12 rounded-2xl focus:border-orange-400 focus:outline-none transition-colors resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button
                type="button"
                className="text-white/50 hover:text-white/80 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="text-white/50 hover:text-white/80 transition-colors"
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <motion.button
            type="submit"
            disabled={!message.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-full transition-all ${
              message.trim() 
                ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:shadow-lg' 
                : 'bg-gray-600 text-white/50 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}