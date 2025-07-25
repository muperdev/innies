# Clerk-Convex Integration Documentation

## Overview

This document explains how user authentication data from Clerk is synchronized with the Convex database in this application. The integration ensures that when users sign up or update their profile in Clerk, their data is automatically saved to the Convex database.

## How It Works

1. **User Authentication Flow**:
   - Users sign up or log in using Clerk (email/password, Google, or Apple)
   - Clerk handles the authentication process and stores the user's identity
   - A webhook from Clerk notifies our application when a user is created or updated
   - Our webhook handler saves the user data to the Convex database

2. **Components**:
   - `ConvexClientProvider`: Connects Clerk authentication with Convex
   - Webhook handler: Processes Clerk events and updates Convex
   - Convex user functions: Store and retrieve user data

## Implementation Details

### 1. ConvexClientProvider

The `ConvexClientProvider` component in `components/convex-client-provider.tsx` wraps the application with both Clerk and Convex providers, connecting the authentication state with the database client:

```tsx
export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
```

### 2. Webhook Handler

The webhook handler in `app/api/webhooks/clerk/route.ts` processes events from Clerk:

- Verifies the webhook signature using the Svix library
- Extracts user data from the event payload
- Calls the Convex mutation to create or update the user

### 3. Convex User Functions

The `createOrUpdateUser` mutation in `convex/functions/users.ts` handles saving user data to Convex:

```ts
export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    userType: v.optional(v.union(v.literal("seeker"), v.literal("provider"))),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    
    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
        userType: args.userType || existingUser.userType,
        bio: args.bio || existingUser.bio,
      });
      return existingUser._id;
    }
    
    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
      userType: args.userType || "seeker",
      bio: args.bio || "",
      createdAt: Date.now(),
    });
    return userId;
  },
});
```

## Accessing User Data

To access the current user's data in a component:

```tsx
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function MyComponent() {
  const { user, isLoaded } = useUser(); // Clerk user
  const currentUser = useQuery(api.functions.users.getCurrentUser); // Convex user
  
  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;
  
  return (
    <div>
      <h1>Welcome, {currentUser?.name}</h1>
      {/* Access other user data from Convex */}
    </div>
  );
}
```

## Integration Testing

To verify the Clerk-Convex integration is working properly, you should check that:

1. Users can sign up and log in using Clerk authentication
2. User data is properly synchronized to the Convex database
3. The application can access user data from both Clerk and Convex

## Troubleshooting

1. **User data not syncing to Convex**:
   - Check that the webhook is properly configured in Clerk
   - Verify the webhook secret is correctly set in your `.env.local` file
   - Check the server logs for webhook verification errors

2. **Authentication issues**:
   - Ensure the Clerk publishable and secret keys are correct
   - Check that the ConvexProviderWithClerk is properly set up
   - Verify that the Clerk domain is correctly set in both `.env.local` and `convex/auth.config.ts`