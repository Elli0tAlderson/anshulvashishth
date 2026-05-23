"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // HIGH-MOMENTUM PHYSICS
  // This creates that "snappy" but smooth glide seen in high-end portfolios.
  const smoothScroll = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 180, // Higher stiffness for faster reaction
    damping: 35,    // Higher damping to prevent "wobble" after the snap
    restDelta: 0.001
  });

  const viewBoxString = useTransform(smoothScroll, (p) => {
    /**
     * THE SNAP ENGINE (Power 4 Easing)
     * This creates the "magnetic" effect. 
     * At 5% scroll, this formula already puts us at 20% zoom progress.
     */
    const snapProgress = 1 - Math.pow(1 - p, 4); 
    
    // Total scale depth
    const s = Math.pow(250, snapProgress); 

    const w = 1920 / s;
    const h = 1080 / s;

    // Perfected anchor points
    const originPercentageX = 0.37;
    const originPercentageY = 0.515;

    const originX = 1920 * originPercentageX;
    const originY = 1080 * originPercentageY;

    const minX = originX - (w * originPercentageX);
    const minY = originY - (h * originPercentageY);

    return `${minX} ${minY} ${w} ${h}`;
  });

  // Adjust opacity to trigger later in the snap
  const contentOpacity = useTransform(smoothScroll, [0.8, 0.95], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full z-30">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f4f4f4]">

        {/* 1. CONTENT BEHIND THE MASK */}
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-0"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-black tracking-tight uppercase">
            Welcome to White
          </h2>
          <p className="mt-4 text-zinc-600 font-medium text-lg">
            You successfully scrolled through the text.
          </p>
        </motion.div>

        {/* 2. THE MASK CONTAINER */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <motion.svg 
            viewBox={viewBoxString} 
            className="w-full h-screen" 
            preserveAspectRatio="xMidYMid slice"
            textRendering="geometricPrecision"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <mask id="zoom-text-mask">
                <rect x="0" y="0" width="1920" height="1080" fill="white" />
                <text
                  x="960"
                  y="540"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  className="font-black uppercase tracking-tighter"
                  style={{ 
                    fontSize: "150px", 
                  }}
                >
                  CLARITY + PERFORMANCE
                </text>
              </mask>
            </defs>

            <rect 
              x="0" 
              y="0" 
              width="1920" 
              height="1080" 
              fill="#181818" 
              mask="url(#zoom-text-mask)" 
            />
          </motion.svg>
        </div>

      </div>
    </section>
  );
}