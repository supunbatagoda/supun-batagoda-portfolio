"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { sendMessage } from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus("submitting");
    setMessage(null);
    try {
      const res = await sendMessage({
        name: String(d.get("name")),
        email: String(d.get("email")),
        message: String(d.get("message")),
      });
      setStatus("success");
      setMessage(res.message);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[18px] rounded-2xl border border-line bg-surface/45 p-[30px] backdrop-blur-[14px]">
      <FormField id="name" label="Name" type="text" placeholder="Your name" required />
      <FormField id="email" label="Email" type="email" placeholder="you@example.com" required />
      <FormField id="message" label="Message" multiline placeholder="Tell me about it..." required />
      <Button type="submit" disabled={status === "submitting"} className="disabled:opacity-50">
        {status === "submitting" ? "Sending…" : "Send message →"}
      </Button>
      {message && (
        <p role="status" className={status === "success" ? "text-sm text-signal" : "text-sm text-red-400"}>{message}</p>
      )}
    </form>
  );
}
