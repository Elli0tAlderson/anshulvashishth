"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion";

const TickerChar = ({ char, index, isWideChar }: { char: string; index: number; isWideChar?: boolean }) => {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const animate = async () => {
      await new Promise((resolve) => setTimeout(resolve, index * 80));

      while (isMounted) {
        await controls.start({
          y: "-100%",
          transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }, 
        });
        if (!isMounted) break;

        controls.set({ y: "0%" });

        await new Promise((resolve) => setTimeout(resolve, 3500));
      }
    };

    animate();

    return () => {
      isMounted = false;
    };
  }, [controls, index]);

  if (char === " ") {
    return <span className="inline-block w-[0.25em]">&nbsp;</span>;
  }

  const charPadding = isWideChar ? "py-[0.15em] px-[0.05em]" : "";

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <motion.span
        animate={controls}
        initial={{ y: "0%" }}
        className="relative flex flex-col"
      >
        <span className={`block ${charPadding}`}>{char}</span>
        <span className={`absolute left-0 top-full block ${charPadding}`}>{char}</span>
      </motion.span>
    </span>
  );
};

const AnimatedLine = ({ 
  text, 
  className, 
  isWideFont 
}: { 
  text: string; 
  className?: string; 
  isWideFont?: boolean 
}) => {
  return (
    <span className={`block whitespace-nowrap ${className || ""}`}>
      {text.split("").map((char, index) => (
        <TickerChar key={`${char}-${index}`} char={char} index={index} isWideChar={isWideFont} />
      ))}
    </span>
  );
};

export default function ZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 180,
    damping: 35,
    restDelta: 0.001
  });

  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"], 
  });

  const dynamicShadow = useTransform(
    entryProgress,
    [0, 0.8, 1],
    [
      "drop-shadow(0px -20px 25px rgba(0,0,0,0.7))",
      "drop-shadow(0px -20px 25px rgba(0,0,0,0.7))",
      "drop-shadow(0px -20px 25px rgba(0,0,0,0))"
    ]
  );

  const jaggedEdge = "polygon(0% 12%, 25% 18%, 60% 12%, 100% 15%, 100% 100%, 0% 100%)";
  const flatEdge = "polygon(0% 0%, 40% 0%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)";

  const animatedClipPath = useTransform(
    entryProgress, 
    [0, 0.5, 1], 
    [jaggedEdge, jaggedEdge, flatEdge]
  ); 

  const viewBoxString = useTransform(smoothScroll, (p) => {
    const snapProgress = 1 - Math.pow(1 - p, 4); 
    const s = Math.pow(250, snapProgress); 

    const w = 1920 / s;
    const h = 1080 / s;

    const originPercentageX = 0.368;
    const originPercentageY = 0.5105;

    const originX = 1920 * originPercentageX;
    const originY = 1080 * originPercentageY;

    const minX = originX - (w * originPercentageX);
    const minY = originY - (h * originPercentageY);

    return `${minX} ${minY} ${w} ${h}`;
  });

  const textScale = useTransform(smoothScroll, [0.50, 0.85], [0.01, 1]);
  const textOpacity = useTransform(smoothScroll, [0.50, 0.80], [0, 1]);

  return (
    <motion.section 
      ref={containerRef} 
      style={{ filter: dynamicShadow }}
      className="relative h-[300vh] w-full z-50"
    >
      <motion.div 
        style={{ clipPath: animatedClipPath }}
        className="relative w-full h-full bg-dark"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-dark">
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-0">
            <div className="absolute inset-0 w-full h-full grid grid-cols-8 divide-x divide-light/5 z-0 pointer-events-none" />

            <motion.div 
              style={{ scale: textScale, opacity: textOpacity }}
              className="relative z-10 flex flex-col items-center justify-center w-[70vw] mx-auto text-center font-extrabold text-light leading-[0.85] tracking-tighter origin-center"
            >
              <span className="absolute -top-6 left-40 text-md font-normal opacity-70 font-geist pointer-events-none">+</span>
              <span className="absolute -top-6 right-40 text-md font-normal opacity-70 font-geist pointer-events-none">+</span>

              <span className="block whitespace-nowrap text-[5vw]">WHAT YOU GET</span>
              <span className="block whitespace-nowrap text-[5vw] mt-[1.5vw]">WHEN CLARITY</span>
              <span className="block whitespace-nowrap text-[5vw] mt-[1.5vw]">MEETS</span>
              
              <AnimatedLine 
                text="perfOrmAnce" 
                className="text-[5.5vw] font-dirtyline mt-[1.5vw] tracking-tight pr-2 text-accent" 
                isWideFont={true}
              />
            </motion.div>
          </div>

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
                    style={{ fontSize: "150px" }}
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
                fill="#D60001" 
                mask="url(#zoom-text-mask)" 
              />
            </motion.svg>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}