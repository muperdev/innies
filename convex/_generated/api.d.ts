/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_bookings from "../functions/bookings.js";
import type * as functions_chats from "../functions/chats.js";
import type * as functions_contact from "../functions/contact.js";
import type * as functions_messages from "../functions/messages.js";
import type * as functions_payments from "../functions/payments.js";
import type * as functions_reviews from "../functions/reviews.js";
import type * as functions_skillCategories from "../functions/skillCategories.js";
import type * as functions_userSkills from "../functions/userSkills.js";
import type * as functions_users from "../functions/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/bookings": typeof functions_bookings;
  "functions/chats": typeof functions_chats;
  "functions/contact": typeof functions_contact;
  "functions/messages": typeof functions_messages;
  "functions/payments": typeof functions_payments;
  "functions/reviews": typeof functions_reviews;
  "functions/skillCategories": typeof functions_skillCategories;
  "functions/userSkills": typeof functions_userSkills;
  "functions/users": typeof functions_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
