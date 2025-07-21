import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

// Initialize the Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', {
      status: 400,
    });
  }

  // Handle the webhook
  const { type, data } = evt;

  // Handle user creation or update
  if (type === 'user.created' || type === 'user.updated') {
    const { id, first_name, last_name, email_addresses, image_url } = data;

    if (!id || !email_addresses || email_addresses.length === 0) {
      return new Response('Error: Missing user data', {
        status: 400,
      });
    }

    // Get the primary email
    const primaryEmail = email_addresses.find(email => email.id === data.primary_email_address_id);
    const emailAddress = primaryEmail ? primaryEmail.email_address : email_addresses[0].email_address;

    try {
      // Call the Convex mutation to create or update the user
      await convex.mutation(api.functions.users.createOrUpdateUser, {
        clerkId: id,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        email: emailAddress,
        imageUrl: image_url,
      });

      return new Response('User synchronized with Convex', { status: 200 });
    } catch (error) {
      console.error('Error saving user to Convex:', error);
      return new Response('Error saving user to Convex', { status: 500 });
    }
  }

  // Return a response to acknowledge receipt of the webhook
  return new Response('Webhook received', { status: 200 });
}