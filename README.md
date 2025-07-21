This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This project is a Real-Time Skill Exchange Network where users can instantly connect with skilled individuals via video call to solve real-time problems or learn something quickly. The application uses Next.js with Convex as the backend/database and Clerk for authentication.

### Key Features

- **User Authentication**: Secure authentication with Clerk, supporting email/password and social logins
- **Real-time Database**: Convex provides real-time data synchronization for instant updates
- **User Profiles**: Complete user profiles with customizable fields for both skill seekers and providers
- **Clerk-Convex Integration**: Seamless integration between Clerk authentication and Convex database

## Getting Started

### Environment Setup

1. Copy `.env.local.example` to `.env.local` and fill in the required environment variables:
   - Clerk authentication keys
   - Convex deployment URL
   - Clerk webhook secret

### Clerk Webhook Setup

1. Go to your Clerk Dashboard
2. Navigate to Webhooks
3. Create a new webhook with the endpoint: `https://your-domain.com/api/webhooks/clerk`
4. Select the following events:
   - `user.created`
   - `user.updated`
5. Copy the webhook secret and add it to your `.env.local` file as `CLERK_WEBHOOK_SECRET`

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

### Key Components

- **ConvexClientProvider**: Integrates Clerk authentication with Convex database
- **Webhook Handler**: Processes Clerk user events and syncs data with Convex

### Documentation

- **CLERK_CONVEX_INTEGRATION.md**: Detailed documentation about the Clerk-Convex integration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
