interface GlassInputProps {
  name: string;
  placeholder: string;
  type?: string;
}

export default function GlassInput({
  name,
  placeholder,
  type = "text",
}: GlassInputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required
      className="
        w-full
        rounded-full
        border border-white/30
        bg-white/5
        px-5
        py-3
        text-white
        placeholder:text-white/70
        backdrop-blur-md
        outline-none
        transition
        focus:border-white/60
      "
    />
  );
}