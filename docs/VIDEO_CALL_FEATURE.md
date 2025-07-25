# Video Call Feature Documentation

## Overview
This document describes the implementation of the 1-to-1 video call feature using LiveKit in the Innies platform.

## Features Implemented

### ✅ Core Video Call Functionality
- **Peer-to-peer video/audio calls** using LiveKit
- **Token-based authentication** via backend API
- **Room-based calling** with unique room names per chat
- **Real-time video conferencing** with high-quality audio/video
- **Responsive UI** that works on desktop and mobile

### ✅ User Interface Components
- **Chat Interface** (`/dashboard/chat`) - Complete messaging system
- **Video Call Modal** - Full-screen video calling interface
- **Video Call Buttons** - Quick access buttons for starting calls
- **Demo Component** - Testing interface on dashboard

### ✅ Integration Points
- **Next.js App Router** - Modern routing system
- **Clerk Authentication** - User identity management
- **Convex Database** - Chat and user data storage
- **LiveKit Cloud** - Video/audio infrastructure

## File Structure

```
app/
├── dashboard/
│   └── chat/
│       └── page.tsx              # Main chat interface
├── api/
│   └── token/
│       └── route.ts              # LiveKit token generation

components/
└── chat/
    ├── chat-interface.tsx        # Messaging component
    ├── video-call-modal.tsx      # Video call UI
    ├── video-call-button.tsx     # Call trigger buttons
    └── video-call-demo.tsx       # Demo/testing component

convex/
└── functions/
    ├── chats.ts                  # Chat management
    ├── messages.ts               # Message handling
    └── users.ts                  # User queries
```

## How to Use

### 1. Access the Chat Interface
- Navigate to `/dashboard/chat`
- View existing chats or search for users to start new conversations
- Click on a chat to open the messaging interface

### 2. Start a Video Call
- **From Chat**: Click the green video button in the chat header
- **From Dashboard**: Use the demo component to test calls
- **Programmatically**: Use the `VideoCallButton` component

### 3. Video Call Controls
- **Join Room**: Automatically connects when modal opens
- **Camera/Mic**: Toggle video and audio during call
- **Fullscreen**: Expand to full browser window
- **End Call**: Close modal to disconnect

## Technical Implementation

### LiveKit Integration
```typescript
// Token generation (server-side)
const at = new AccessToken(apiKey, apiSecret, { identity: username });
at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
return await at.toJwt();

// Client connection
<LiveKitRoom
  token={token}
  serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
  video={true}
  audio={true}
>
  <VideoConference />
</LiveKitRoom>
```

### Room Naming Convention
- **Chat Rooms**: `chat-{chatId}` - Unique per conversation
- **Demo Rooms**: `demo-room-{id}` - For testing purposes
- **Custom Rooms**: Any string identifier

### Authentication Flow
1. User clicks video call button
2. Frontend requests token from `/api/token`
3. Backend validates user and generates JWT
4. Frontend connects to LiveKit with token
5. Real-time video/audio session begins

## Environment Variables

```env
# LiveKit Configuration
LIVEKIT_URL=wss://your-livekit-instance.livekit.cloud
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-instance.livekit.cloud
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret
```

## API Endpoints

### POST/GET `/api/video-call/token`
Generates LiveKit access tokens for video calls.

**Parameters:**
- `room` (string): Room identifier
- `username` (string): User identity

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Database Schema

### Chats Table
```typescript
chats: {
  _id: Id<"chats">;
  title?: string;
  participants: Id<"users">[];
  createdAt: number;
  updatedAt: number;
  lastMessageId?: Id<"messages">;
  isActive: boolean;
}
```

### Messages Table
```typescript
messages: {
  _id: Id<"messages">;
  chatId: Id<"chats">;
  senderId: Id<"users">;
  content: string;
  timestamp: number;
  isRead: boolean;
  attachments?: string[];
}
```

## Testing the Feature

### 1. Dashboard Demo
- Visit `/dashboard` when logged in
- Scroll to "Video Call Feature" section
- Click video/audio buttons to test different rooms

### 2. Chat Interface
- Go to `/dashboard/chat`
- Create or select a conversation
- Use video call button in chat header

### 3. Multiple Users
- Open multiple browser windows/tabs
- Join the same room from different accounts
- Test video/audio quality and features

## Troubleshooting

### Common Issues
1. **Token Generation Fails**
   - Check environment variables
   - Verify LiveKit API credentials
   - Ensure proper URL encoding

2. **Video Not Loading**
   - Check browser permissions for camera/mic
   - Verify NEXT_PUBLIC_LIVEKIT_URL is set
   - Test network connectivity

3. **Connection Errors**
   - Confirm LiveKit service is running
   - Check firewall/proxy settings
   - Verify WebSocket connections

### Debug Mode
Enable console logging in video call components:
```typescript
onError={(error) => {
  console.error("LiveKit error:", error);
}}
```

## Future Enhancements

### Planned Features
- [ ] Screen sharing capability
- [ ] Recording functionality
- [ ] Group video calls (3+ participants)
- [ ] Call history and analytics
- [ ] Push notifications for incoming calls
- [ ] Mobile app integration

### Performance Optimizations
- [ ] Lazy loading of video components
- [ ] Bandwidth adaptation
- [ ] Connection quality indicators
- [ ] Automatic reconnection

## Security Considerations

- **Token Expiration**: Tokens have limited lifetime
- **Room Access**: Only authorized users can join
- **Data Encryption**: All video/audio is encrypted
- **User Validation**: Server validates user identity

## Support

For issues or questions about the video call feature:
1. Check this documentation
2. Review LiveKit documentation
3. Test with demo components
4. Check browser console for errors

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**LiveKit SDK**: 2.x  
**Next.js**: 15.x