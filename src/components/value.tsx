"use client";
import React from "react";
import { useLottie } from "lottie-react";
import circleWave from "@/assets/circle_wave.json";

interface ValueProps {
  title: string;
  description: string;
}

const Value = ({ title, description }: ValueProps) => {
  const options = {
    animationData: circleWave,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="relative w-30 h-30 [perspective:600px] group">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:rotate-y-180">
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 opacity-30 [backface-visibility:hidden]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center [backface-visibility:hidden]">
          <div className="absolute inset-0 flex items-center justify-center">
            {View}
          </div>
          <span className="absolute text-white font-semibold text-sm drop-shadow-lg">
            {title}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-blue bg-opacity-80 text-white text-xs p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default Value;
