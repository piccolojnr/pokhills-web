import { useState } from "react";
import { submitContact } from "@/lib/api";

const SUBJECTS = [
  "General enquiry",
  "Room enquiry",
  "Event enquiry",
  "Feedback",
  "Other",
] as const;

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full font-body text-sm text-bark bg-cream border border-stone/40 rounded-sm px-4 py-3 outline-none transition-colors duration-150 placeholder:text-stone/40 focus:border-ochre";

const labelClass =
  "block font-body text-[10px] uppercase tracking-[0.16em] text-muted mb-1.5";

function isEmailLike(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate() {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Name is required.";
    if (!contact.trim()) {
      errors.contact = "Email or phone is required.";
    } else if (contact.includes("@") && !isEmailLike(contact)) {
      errors.contact = "Please enter a valid email address.";
    }
    if (!message.trim()) errors.message = "Message is required.";
    return errors;
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setStatus("loading");
    try {
      await submitContact({
        name: name.trim(),
        contact: contact.trim(),
        subject,
        message: message.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-deep/10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-green-deep"
            aria-hidden="true"
          >
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p className="font-display text-[22px] text-bark leading-snug">
            Thank you, {name}.
          </p>
          <p className="font-body text-sm text-muted mt-1">
            We'll be in touch soon.
          </p>
        </div>
        <a
          href="/"
          className="font-body text-[11px] uppercase tracking-[0.14em] text-ochre border border-ochre px-6 py-2.5 rounded-sm hover:bg-ochre hover:text-cream transition-colors duration-150 mt-2"
        >
          Back to home
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 w-full max-w-lg mx-auto"
    >
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className={labelClass}>
          Name
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className={inputClass}
        />
        {fieldErrors.name && (
          <p className="font-body text-[11px] text-red-500 mt-1">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Contact */}
      <div>
        <label htmlFor="cf-contact" className={labelClass}>
          Email or phone
        </label>
        <input
          id="cf-contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="hello@example.com or 233 202 400 666"
          required
          className={inputClass}
        />
        {fieldErrors.contact && (
          <p className="font-body text-[11px] text-red-500 mt-1">
            {fieldErrors.contact}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="cf-subject" className={labelClass}>
          Subject
        </label>
        <select
          id="cf-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value as typeof subject)}
          className={`${inputClass} cursor-pointer`}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          rows={4}
          required
          className={`${inputClass} resize-none`}
        />
        {fieldErrors.message && (
          <p className="font-body text-[11px] text-red-500 mt-1">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="font-body text-[12px] text-red-500 text-center">
          Something went wrong. Please try WhatsApp or email us directly.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="font-body text-[11px] uppercase tracking-[0.14em] text-cream bg-ochre px-8 py-3.5 rounded-sm transition-colors duration-200 hover:bg-ochre-light disabled:opacity-60 disabled:cursor-not-allowed self-start"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
