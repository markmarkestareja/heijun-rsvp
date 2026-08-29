import React from "react";

export default function GlassInput({placeholder,}: {
    placeholder: string;
}) {
  return (
    <input
      placeholder={placeholder}
      required
      className="
                  w-full
                  rounded-full
                  border border-white/30
                  bg-white/20
                  px-5
                  py-3
                  text-sm
                  text-white
                  placeholder:text-white/70
                  backdrop-blur-md
                  shadow-[
                    inset_0_1px_1px_rgba(255,255,255,0.5),
                    0_4px_12px_rgba(0,0,0,0.08)
                  ]
                  outline-none
                  transition
                  focus:border-white/60
                  focus:bg-white/25
                "
    />
  );
}
