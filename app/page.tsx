import GlassInput from "@/components/GlassInput";
import Image from "next/image";

export default function Home() {
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
      ">
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
          PRODUCT PRESENTATION <span className="text-4xl lg:text-6xl font-normal italic">2026</span>
        </h1>

        <p className="font-light text-sm md:text-base max-w-150">
          A professional presentation introducing Heijun’s products, solutions,
          and opportunities for hotels, resorts, restaurants, and other
          hospitality businesses.
        </p>
      </div>
      <div className="relative flex flex-col items-center">
        <div className="relative top-0 left-0 z-1">
          <p className="relative top-6 text-8xl lg:text-9xl font-[Great_Vibes] drop-shadow-md/30">You&apos;re Invited</p>
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
          {/* subtle glass highlight */}
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

          <form className="relative z-10 p-8">
            <p className="text-light">Please complete the form below to confirm your attendance.</p>
            <div className="flex flex-col gap-2 pt-2">
              <GlassInput placeholder="First Name" />
              <GlassInput placeholder="Last Name" />
              <GlassInput placeholder="Email" type="email" />
              <GlassInput placeholder="Contact Number" type="tel" />
              <GlassInput placeholder="Company Name" />
              <GlassInput placeholder="Birth Date" type="date" />
              
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:mt-10 flex flex-col items-center gap-2">
        <p className="
          border
          rounded-tl-2xl rounded-br-2xl
          border border-white/30
          backdrop-blur-xs
          shadow-[0_20px_50px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)]
          py-4
          px-6
          w-fit
        ">6:00 pm - 9:00 pm</p>
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
