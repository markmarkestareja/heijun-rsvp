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
    </main>
  );
}
