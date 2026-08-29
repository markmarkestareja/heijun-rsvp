import GlassInput from "@/components/GlassInput";
import Image from "next/image";

export default function Home() {
  return (
    <main className="border min-h-screen overflow-hidden flex flex-col justify-center items-center gap-8 text-center pt-10">
      <Image
        src="/bg.webp"
        alt="Gold background"
        fill
        priority
        className="object-cover -z-10"
      />

      <div className="border max-w-3xl relative z-10">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo/emblem.webp"
            alt="emblem of Heijun"
            width={100}
            height={100}
          />

          <div className="border w-fit px-8 py-2 rounded-tl-4xl rounded-br-4xl">
            <Image
              src="/logo/logo-text.webp"
              alt="emblem of Heijun"
              width={250}
              height={100}
            />
          </div>
        </div>

        <h1 className="text-6xl flex flex-col">
          Product Presentation <span className="text-8xl">2026</span>
        </h1>

        <p className="text-xl">
          A professional presentation introducing Heijun’s products, solutions,
          and opportunities for hotels, resorts, restaurants, and other
          hospitality businesses.
        </p>
      </div>
      <div>
        <p>You're Invited</p>

        <div
          className="
            relative
            overflow-hidden
            rounded-[48px]
            border border-white/30
            bg-white/15
            backdrop-blur-2xl
            shadow-[0_20px_50px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)]
          "
        >
          {/* subtle glass highlight */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-br
              from-white/30
              via-white/5
              to-transparent
            "
          />

          <div className="relative z-10 p-8">
            <p>Please complete the form below to confirm your attendance.</p>
            <div className="flex flex-col gap-2">
              <GlassInput placeholder="First Name" />
              <GlassInput placeholder="Last Name" />
              <GlassInput placeholder="Email" />
              <GlassInput placeholder="Contact Number" />
              <GlassInput placeholder="Company Name" />
              <GlassInput placeholder="Birth Date" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
