"use client";

import { motion, useSpring, useTransform, MotionValue } from "framer-motion";

interface AnimatedWindowProps {
  smoothScroll: MotionValue<number>;
  mouseX: MotionValue<number>;
}

export default function AnimatedWindow({ smoothScroll, mouseX }: AnimatedWindowProps) {
  const smoothMouseX = useSpring(mouseX, {
    mass: 0.5,
    stiffness: 200,
    damping: 25,
  });

  // Window animation sequence
  const windowWidth = useTransform(smoothScroll, [0, 0.15], ["33vw", "96vw"]);
  const windowHeight = useTransform(smoothScroll, [0, 0.15], ["40vh", "92vh"]);
  const windowY = useTransform(smoothScroll, [0, 0.15], ["0vh", "-10vh"]);
  const windowBorderRadius = useTransform(
    smoothScroll,
    [0, 0.15],
    ["0.5rem", "1.25rem"]
  );
  
  // Scale
  const windowScale = useTransform(smoothScroll, [0, 0.1], [0.96, 1]);

  const finalX = useTransform(() => {
    const currentMouseX = smoothMouseX.get();
    const currentScroll = smoothScroll.get();

    if (currentScroll >= 0.15) return 0;
    const fadeMultiplier = 1 - currentScroll / 0.15;

    return currentMouseX * fadeMultiplier;
  });

  return (
    <motion.div
      style={{
        x: finalX,
        y: windowY,
        scale: windowScale,
        width: windowWidth,
        height: windowHeight,
        borderRadius: windowBorderRadius,
      }}
      className="bg-[#000000] overflow-hidden"
    >
      <video
        className="w-full h-full object-cover"
        src="/assets/hero-video.mp4" 
        autoPlay
        loop
        muted
        playsInline
      />
    </motion.div>
  );
}