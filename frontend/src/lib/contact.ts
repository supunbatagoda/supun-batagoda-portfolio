import type { SubscribeResponse, ApiErrorBody } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export interface ContactPayload { name: string; email: string; message: string }

export async function sendMessage(payload: ContactPayload): Promise<SubscribeResponse> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => null)) as SubscribeResponse | ApiErrorBody | null;
  if (!res.ok) {
    const m = data && "message" in data ? data.message : null;
    throw new Error((Array.isArray(m) ? m.join(" ") : m) || "Something went wrong. Please try again.");
  }
  return data as SubscribeResponse;
}
