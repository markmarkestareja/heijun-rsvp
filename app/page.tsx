"use client";

import GlassInput from "@/components/GlassInput";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { motion } from "motion/react";

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
        <motion.div
          className="flex flex-col items-center gap-1 lg:gap-4"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/logo/emblem.webp"
            alt="emblem of Heijun"
            width={75}
            height={75}
            className="drop-shadow-md/30"
          />

          <motion.div
            className="w-fit px-8 py-2 rounded-tl-2xl rounded-br-2xl bg-white drop-shadow-md/30"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/logo/logo-text.webp"
              alt="Heijun"
              width={100}
              height={100}
            />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-xl lg:text-4xl font-bold flex flex-col"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          PRODUCT PRESENTATION
          <span className="text-4xl lg:text-6xl font-normal italic">2026</span>
        </motion.h1>

        <motion.p
          className="font-light text-sm md:text-base max-w-150"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 2.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          A professional presentation introducing Heijun’s products, solutions,
          and opportunities for hotels, resorts, restaurants, and other
          hospitality businesses.
        </motion.p>
      </div>

      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative top-0 left-0 z-1"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="relative top-6 text-8xl lg:text-9xl font-[family-name:var(--font-great-vibes)] drop-shadow-md/30">
            You&apos;re Invited
          </p>
        </motion.div>

        <motion.div
          className="
            relative
            overflow-hidden
            rounded-[48px]
            border border-white/30
            backdrop-blur-xs
            shadow-[0_20px_50px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)]
            max-w-[500px]
          "
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 4,
            ease: [0.22, 1, 0.36, 1],
          }}
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

              {error && <p className="text-red-300 text-sm pt-2">{error}</p>}

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
          </form>
        </motion.div>
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

      {submitted && (
        <motion.div
          className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/20
      backdrop-blur-[6px]
      px-4
    "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
        w-full
        max-w-[500px]
        rounded-[24px]
        overflow-hidden
        shadow-[0_30px_80px_rgba(0,0,0,0.4)]
      "
          >
            {/* Frame 146 content */}
            <div className="relative w-full text-center text-black">
              {/* Background — determines container aspect ratio */}
              <Image
                src="/ty-bg2.webp"
                alt=""
                width={1350}
                height={1080}
                className="block w-full h-auto"
              />

              {/* Content overlay */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                <p
                  className="
                    text-6xl md:text-8xl
                    font-[family-name:var(--font-great-vibes)]
                    bg-[linear-gradient(90deg,#F8D78C_0%,#D49305_41%,#F6CB6A_61%,#D49305_86%)]
                    bg-clip-text
                    text-transparent
                    leading-[1.4] py-4 px-6
                  "
                >
                  Thank you!
                </p>

                <p className="mt-4 text-sm text-black bg-yellow-200 px-2 py-1 rounded-lg">
                  Your RSVP has been successfully submitted.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  aria-label="Close thank you message"
                  className="
                    absolute
                    top-4
                    right-4
                    z-20
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-black/30
                    text-2xl
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-black/50
                    hover:scale-105
                  "
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
