"use client";

import GlassInput from "@/components/GlassInput";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      contact_number: formData.get("contact_number"),
      company_name: formData.get("company_name"),
      birth_date: formData.get("birth_date"),
    };

    console.log("SENDING RSVP:", data);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Read as text first so we can see exactly what the server returned
      const responseText = await response.text();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", responseText);

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned invalid JSON: ${responseText || "(empty response)"}`,
        );
      }

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("RSVP ERROR:", error);

      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        flex
        flex-col
        justify-start
        items-center
        gap-8
        text-center
        text-white
        pt-5
        px-6
      "
    >
      <Image
        src="/bg.webp"
        alt="Gold background"
        fill
        priority
        className="object-cover -z-10"
      />

      <div className="absolute inset-0 bg-black/20 -z-[5]" />

      <div className="max-w-3xl relative z-10 flex flex-col gap-1 lg:gap-4">
        <div className="flex flex-col items-center gap-1 lg:gap-4">
          <Image
            src="/logo/emblem.webp"
            alt="emblem of Heijun"
            width={75}
            height={75}
            className="drop-shadow-md/30"
          />

          <div className="w-fit px-8 py-2 rounded-tl-2xl rounded-br-2xl bg-white drop-shadow-md/30">
            <Image
              src="/logo/logo-text.webp"
              alt="emblem of Heijun"
              width={100}
              height={100}
            />
          </div>
        </div>

        <h1 className="text-xl lg:text-4xl font-bold flex flex-col">
          PRODUCT PRESENTATION
          <span className="text-4xl lg:text-6xl font-normal italic">2026</span>
        </h1>

        <p className="font-light text-sm md:text-base max-w-150">
          A professional presentation introducing Heijun’s products, solutions,
          and opportunities for hotels, resorts, restaurants, and other
          hospitality businesses.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative top-0 left-0 z-1">
          <p className="relative top-6 text-8xl lg:text-9xl font-[family-name:var(--font-great-vibes)] drop-shadow-md/30">
            You&apos;re Invited
          </p>
        </div>

        <div
          className="
            relative
            overflow-hidden
            rounded-[48px]
            border border-white/30
            backdrop-blur-xs
            shadow-[0_20px_50px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)]
            max-w-[500px]
          "
        >
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-br
              from-white/7
              via-white/3
              to-transparent
            "
          />

          <form onSubmit={handleSubmit} className="relative z-10 p-8">
            {!submitted ? (
              <>
                <p className="text-light">
                  Please complete the form below to confirm your attendance.
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  <GlassInput name="first_name" placeholder="First Name" />

                  <GlassInput name="last_name" placeholder="Last Name" />

                  <GlassInput name="email" type="email" placeholder="Email" />

                  <GlassInput
                    name="contact_number"
                    type="tel"
                    placeholder="Contact Number"
                  />

                  <GlassInput name="company_name" placeholder="Company Name" />

                  <GlassInput
                    name="birth_date"
                    type="date"
                    placeholder="Birth Date"
                  />

                  {error && (
                    <p className="text-red-300 text-sm pt-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      mt-2
                      rounded-full
                      bg-white
                      px-6
                      py-3
                      font-medium
                      text-black
                      transition
                      hover:bg-white/80
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </>
            ) : (
              <div className="py-8">
                <p className="text-3xl font-semibold">Thank You!</p>

                <p className="mt-3 text-white/80">
                  Your RSVP has been successfully submitted.
                </p>

                <p className="mt-2 text-sm text-white/60">
                  We look forward to seeing you at the Heijun Product
                  Presentation 2026.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="lg:mt-10 flex flex-col items-center gap-2">
        <p
          className="
            rounded-tl-2xl
            rounded-br-2xl
            border border-white/30
            backdrop-blur-xs
            shadow-[0_20px_50px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)]
            py-4
            px-6
            w-fit
          "
        >
          6:00 pm - 9:00 pm
        </p>

        <div className="relative w-full">
          <Image
            src="/date.png"
            alt="date"
            width={1600}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </main>
  );
}
