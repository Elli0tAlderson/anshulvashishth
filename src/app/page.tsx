"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import Navbar from "./components/Navbar"; 
import AnimatedWindow from "./components/AnimatedWindow";
import ZoomSection from "./components/ZoomSection"; 
import SliderSection from "./components/SliderSection";
import HighlightsSection from "./components/HighlightsSection";

export default function Home() {
  const mouseX = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPercent = e.clientX / window.innerWidth - 0.5;
      const travelDistance = window.innerWidth * 0.62;
      mouseX.set(xPercent * travelDistance);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
  });

  const heroY = useTransform(smoothScroll, [0, 0.15], ["0vh", "-100vh"]);
  const sliderX = useTransform(smoothScroll, [0.35, 0.60], ["100vw", "0vw"]); 

  return (
    <main className="relative w-full bg-[#f4f4f4] selection:bg-pink-400 selection:text-white">
      <Navbar />

      <div ref={containerRef} className="relative w-full h-[700vh]">
        
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          <motion.div 
            style={{ y: heroY }}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none z-0"
          >
            <div className="absolute top-[57vh] w-full flex flex-col items-center">
              <div className="w-full max-w-[95vw] flex justify-between px-2 text-[1.15rem] font-semibold uppercase">
                <span className="text-black">A</span>
                <span className="text-black">Seriously</span>
                <span className="text-black">Good</span>
              </div>
              <h1 className="font-durer text-[9.25rem] font-bold tracking-tight leading-none text-zinc-950 whitespace-nowrap">
                FULLSTACK ENGINEER
              </h1>
            </div>

            <div className="absolute bottom-10 left-8 right-8 flex justify-between items-end z-40 text-sm font-medium text-black">
              <span>↓ scroll for</span>
              <span>cool sh*t ↓</span>
            </div>
          </motion.div>

          <div className="absolute top-[14vh] w-full flex justify-center items-center z-10 pointer-events-auto">
            <AnimatedWindow smoothScroll={smoothScroll} mouseX={mouseX} />
          </div>

          <motion.div
            style={{ x: sliderX }}
            className="absolute top-0 left-0 w-screen h-screen z-30 pointer-events-auto bg-[#0a0a0a] overflow-hidden"
          >
             <SliderSection smoothScroll={smoothScroll} />
          </motion.div>

        </div>
      </div>

      <ZoomSection />
      <HighlightsSection />

    </main>
  );
}