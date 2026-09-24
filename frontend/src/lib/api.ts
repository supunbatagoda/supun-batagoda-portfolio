import type { SubscribeResponse, ApiErrorBody } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

/**
 * Calls the NestJS API to subscribe an email address for launch notifications.
 * Throws an Error with a user-facing message when the request fails.
 */
export async function subscribe(email: string): Promise<SubscribeResponse> {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = (await response.json().catch(() => null)) as
    | SubscribeResponse
    | ApiErrorBody
    | null;

  if (!response.ok) {
    const message = data && "message" in data ? data.message : null;
    const text = Array.isArray(message) ? message.join(" ") : message;
    throw new Error(text || "Something went wrong. Please try again.");
  }

  return data as SubscribeResponse;
}
