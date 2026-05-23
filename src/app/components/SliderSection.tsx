"use client";

import { useState } from "react";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  Transition,
  MotionValue
} from "framer-motion";

const gallery = [
  { id: 1, img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop" },
  { id: 2, img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, img: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop" },
  { id: 5, img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop" },
  { id: 6, img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2000&auto=format&fit=crop" },
  { id: 7, img: "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?q=80&w=2000&auto=format&fit=crop" },
  { id: 8, img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop" },
];

const numbers = Array.from({ length: gallery.length }, (_, i) => i + 1);

const sharedSpring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 18,
  mass: 0.2,
};

interface SliderSectionProps {
  smoothScroll: MotionValue<number>;
}

export default function SliderSection({ smoothScroll }: SliderSectionProps) {
  const [activeIndex, setActiveIndex] = useState(1);

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    // Waits until the pan actually begins at 0.70
    if (latest < 0.70) {
      if (activeIndex !== 1) setActiveIndex(1);
    } else {
      // Adjusted math for the 0.20 pan depth (0.70 to 0.90) divided by 7 gaps
      const index = Math.round(((latest - 0.70) / 0.028571) + 1);
      const clampedIndex = Math.max(1, Math.min(8, index));
      if (clampedIndex !== activeIndex) {
        setActiveIndex(clampedIndex);
      }
    }
  });

  // Fade in the counter
  const counterOpacity = useTransform(smoothScroll, [0.60, 0.65], [0, 1]);

  // Text Tracking Animation: Starts as soon as section locks (0.60) and stretches slightly to the very end (1.0)
  const titleTracking = useTransform(smoothScroll, [0.60, 1.0], ["0.025em", "0.075em"], { clamp: true });

  // Phase 1: Sizing & Positioning (0.60 to 0.70)
  const firstWidth = useTransform(smoothScroll, [0.60, 0.70], ["65vw", "18vw"], { clamp: true });
  const firstHeight = useTransform(smoothScroll, [0.60, 0.70], ["65vh", "55vh"], { clamp: true });
  const trackPaddingLeft = useTransform(smoothScroll, [0.60, 0.70], ["17.5vw", "41vw"], { clamp: true });
  const firstRadius = useTransform(smoothScroll, [0.60, 0.70], ["12px", "4px"], { clamp: true });
  const firstImageScale = useTransform(smoothScroll, [0.60, 0.70], [1, 1.3], { clamp: true });

  // Phase 2: Stretched heavy horizontal pan (0.70 to 0.90)
  const firstImageX = useTransform(smoothScroll, [0.70, 0.90], ["0vw", "4vw"], { clamp: true });
  const trackX = useTransform(smoothScroll, [0.70, 0.90], ["0vw", "-140vw"]);
  const tileParallaxX = useTransform(smoothScroll, [0.70, 0.90], ["-11vw", "11vw"]);

  return (
    <div className="relative w-full h-full flex items-center bg-[#0a0a0a] overflow-hidden">

      {/* THE SOLID BLACK MASK */}
      <div className="absolute left-0 top-0 h-full w-[10vw] bg-[#0a0a0a] z-40 pointer-events-none"></div>

      {/* THE ANIMATED VERTICAL 'SKILLS' TITLE */}
      <div className="absolute left-[-1vw] top-0 h-full flex items-center z-50 pointer-events-none">
        <motion.h2 
          className="text-white text-[8rem] uppercase font-durer tracking-wide" 
          style={{ 
            writingMode: 'vertical-rl', 
            transform: 'rotate(180deg)',
            letterSpacing: titleTracking 
          }}
        >
          Skills
        </motion.h2>
      </div>

      <motion.div
        className="flex h-full items-center gap-[2vw]"
        style={{ x: trackX, paddingLeft: trackPaddingLeft }}
      >
        {gallery.map((item, index) => {
          const isFirst = index === 0;

          return (
            <motion.div
              key={item.id}
              className="relative shrink-0 flex items-center"
              style={{
                width: isFirst ? firstWidth : "18vw",
                height: isFirst ? firstHeight : "55vh",
              }}
            >
              <motion.div
                className="absolute inset-0 overflow-hidden bg-neutral-900 shadow-2xl origin-center"
                style={{ borderRadius: isFirst ? firstRadius : "4px" }}
              >
                <motion.div
                  className="absolute top-0 h-full will-change-transform origin-center"
                  style={
                    isFirst
                      ? { width: "100%", left: "0%", scale: firstImageScale, x: firstImageX }
                      : { width: "220%", left: "-60%", scale: 1, x: tileParallaxX }
                  }
                >
                  <img
                    src={item.img}
                    alt={`Gallery image`}
                    className="absolute inset-0 w-full h-full object-cover origin-center"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        style={{ opacity: counterOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white text-sm tracking-wide font-normal pointer-events-none z-50"
      >
        <div className="relative h-[1.2em] w-[1ch] overflow-hidden">
          <motion.div
            className="flex flex-col will-change-transform"
            animate={{ y: `-${(activeIndex - 1) * 1.2}em` }}
            transition={sharedSpring}
          >
            {numbers.map((num) => (
              <span key={num} className="h-[1.2em] flex items-center justify-center leading-none">
                {num}
              </span>
            ))}
          </motion.div>
        </div>
        <span className="opacity-60">—</span>
        <span className="opacity-60">8</span>
      </motion.div>

    </div>
  );
}