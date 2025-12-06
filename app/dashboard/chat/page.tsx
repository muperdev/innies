"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import DashboardLayout from "@/components/dashboard-layout";
import ChatInterface from "@/components/chat/chat-interface";
import VideoCallModal from "@/components/chat/video-call-modal";
import { MessageCircle, Video, Phone, Search, Plus } from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";

export default function ChatPage() {
  const { user } = useUser();
  const [selectedChat, setSelectedChat] = useState<Id<"chats"> | null>(null);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentRoomName, setCurrentRoomName] = useState<string>("");

  // Get current user from Convex
  const currentUser = useQuery(
    api.functions.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  // Get user's chats
  const userChats = useQuery(
    api.functions.chats.getUserChats,
    currentUser?._id ? { userId: currentUser._id } : "skip"
  );

  // Get all users for creating new chats
  const allUsers = useQuery(api.functions.users.getAllUsers);

  // Create new chat mutation
  const createChat = useMutation(api.functions.chats.createChat);

  const handleStartVideoCall = () => {
    if (selectedChat) {
      setCurrentRoomName(`chat-${selectedChat}`);
      setIsVideoCallOpen(true);
    }
  };

  const handleCreateNewChat = async (otherUserId: Id<"users">) => {
    if (!currentUser) return;

    try {
      const chatId = await createChat({
        participants: [currentUser._id, otherUserId],
      });
      setSelectedChat(chatId);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  const filteredUsers = allUsers?.filter(
    (u: Doc<"users">) =>
      u._id !== currentUser?._id &&
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getOtherParticipant = (chat: Doc<"chats">): Doc<"users"> | undefined => {
    if (!allUsers || !currentUser) return undefined;
    const otherParticipantId = chat.participants.find(
      (id) => id !== currentUser._id
    );
    return allUsers.find((user) => user._id === otherParticipantId);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="flex h-screen">
          {/* Chat List Sidebar */}
          <div className="w-1/3 border-r border-white/20 bg-gray-900/50">
            <div className="p-6 border-b border-white/20">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white mb-4 flex items-center gap-2"
              >
                <MessageCircle className="w-6 h-6 text-orange-400" />
                CHATS
              </motion.h2>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/50 border border-white/30 text-white pl-10 pr-4 py-2 rounded-lg focus:border-orange-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {userChats?.map((chat: Doc<"chats">) => {
                const otherUser = getOtherParticipant(chat);
                return (
                  <motion.div
                    key={chat._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedChat(chat._id)}
                    className={`p-4 border-b border-white/10 cursor-pointer transition-colors ${
                      selectedChat === chat._id
                        ? "bg-orange-400/20 border-l-4 border-l-orange-400"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {otherUser?.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">
                          {otherUser?.name || "Unknown User"}
                        </h3>
                        <p className="text-white/60 text-sm truncate">
                          {chat.title || "No messages yet"}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-white/40">
                          {new Date(chat.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* New Chat Options */}
              {searchQuery && filteredUsers && filteredUsers.length > 0 && (
                <div className="p-4">
                  <h3 className="text-white/60 text-sm font-medium mb-2">
                    START NEW CHAT
                  </h3>
                  {filteredUsers.map((user: Doc<"users">) => (
                    <motion.div
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ x: 5 }}
                      onClick={() => handleCreateNewChat(user._id)}
                      className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">
                            {user.name}
                          </h4>
                          <p className="text-white/60 text-xs">{user.email}</p>
                        </div>
                        <Plus className="w-4 h-4 text-orange-400 ml-auto" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/20 bg-gray-900/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const chat = userChats?.find(
                          (c: Doc<"chats">) => c._id === selectedChat
                        );
                        const otherUser = chat
                          ? getOtherParticipant(chat)
                          : undefined;
                        return (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                              {otherUser?.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-white font-medium">
                                {otherUser?.name || "Unknown User"}
                              </h3>
                              <p className="text-white/60 text-sm">Online</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStartVideoCall}
                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                      >
                        <Video className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <ChatInterface
                  chatId={selectedChat}
                  currentUserId={currentUser?._id}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl text-white/60 mb-2">
                    Select a chat to start messaging
                  </h3>
                  <p className="text-white/40">
                    Choose a conversation from the sidebar or search for users
                    to start a new chat
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Video Call Modal */}
        {isVideoCallOpen && (
          <VideoCallModal
            isOpen={isVideoCallOpen}
            onClose={() => setIsVideoCallOpen(false)}
            roomName={currentRoomName}
            userIdentity={user?.id || ""}
            userName={user?.firstName || "User"}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
