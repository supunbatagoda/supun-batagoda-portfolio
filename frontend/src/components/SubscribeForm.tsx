"use client";

import { useState, type FormEvent } from "react";
import { subscribe } from "@/lib/api";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage(null);

    try {
      const data = await subscribe(email);
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <div className="flex-1 flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2.5 focus-within:border-signal transition-colors">
          <span className="font-mono text-signal select-none">&gt;</span>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            disabled={isSubmitting}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent font-mono text-sm text-paper placeholder:text-muted outline-none disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Sending…" : "Get notified"}
        </button>
      </form>

      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            status === "success" ? "text-signal" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
