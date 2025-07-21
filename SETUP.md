# Setup Instructions

## Convex Setup

The application uses Convex as the backend for storing data. Follow these steps to set up Convex:

### 1. Install Convex CLI
```bash
npm install -g convex
```

### 2. Initialize Convex in your project
```bash
npx convex dev
```

This will:
- Create a Convex project
- Generate the deployment URL
- Start the Convex development server

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env.local`
2. Replace `NEXT_PUBLIC_CONVEX_URL` with your actual Convex deployment URL from step 2

### 4. Deploy Schema and Functions
The schema and functions are already defined in the `convex/` folder:
- `convex/schema.ts` - Defines the `contactSubmissions` table
- `convex/functions/contact.ts` - Contains mutations and queries for contact form

Run the following to deploy:
```bash
npx convex deploy
```

## Clerk Authentication Setup

### 1. Create a Clerk Account
Sign up at [clerk.com](https://clerk.com) and create a new application.

### 2. Configure Environment Variables
Add the following to your `.env.local` file:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### 3. Set Up Webhook
1. In your Clerk Dashboard, navigate to Webhooks
2. Create a new webhook with the endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Select the following events:
   - `user.created`
   - `user.updated`
4. Copy the webhook secret and add it to your `.env.local` file:
```bash
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

### 4. Install Required Packages
```bash
npm install svix
```

## Features

### ✅ Authentication
- User signup and login with email/password
- OAuth providers (Google, Apple)
- User data synced to Convex database
- Protected routes and pages

### ✅ Form Validation
- Required field validation
- Email format validation
- Message length validation (max 2000 characters)
- Inquiry type validation

### ✅ Error Handling
- Network error handling
- Validation error display
- User-friendly error messages

### ✅ Success Feedback
- Success message display
- Form reset after successful submission
- Loading states during submission

### ✅ UI/UX
- Loading spinner during submission
- Disabled form fields during submission
- Character counter for message field
- Consistent design with landing pages

### ✅ Data Storage
- Secure storage in Convex database
- Indexed fields for efficient queries
- Proper data types and validation

## Database Schema

The contact submissions are stored with the following fields:
- `firstName` - User's first name
- `lastName` - User's last name  
- `email` - User's email address
- `inquiryType` - Type of inquiry (general, support, partnership, expert, feedback)
- `message` - User's message
- `status` - Submission status (new, in_progress, resolved)
- `createdAt` - Timestamp when submitted
- `updatedAt` - Timestamp when last updated

## Admin Functions

The following queries are available for admin use:
- `getAllContactSubmissions` - Get all submissions
- `getContactSubmissionsByStatus` - Filter by status
- `getContactSubmissionsByEmail` - Get submissions by email
- `updateContactSubmissionStatus` - Update submission status

## Testing

To test the contact form:
1. Make sure Convex is running (`npx convex dev`)
2. Start the Next.js development server (`bun run dev`)
3. Navigate to `/contact`
4. Fill out and submit the form
5. Check the Convex dashboard to see the stored submission