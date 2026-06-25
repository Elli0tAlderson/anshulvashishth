"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CUT_1 = 25;
const CUT_2 = 50;

const SLICE_1_MOVE = 30;
const SLICE_2_MOVE = 15;

const START_SLICE = 0.5;
const END_SLICE = 0.8;

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.7, 0]);

  const slice1X = useTransform(smoothProgress, [START_SLICE, END_SLICE], [0, SLICE_1_MOVE]);
  const slice2X = useTransform(smoothProgress, [START_SLICE, END_SLICE], [0, SLICE_2_MOVE]);
  
  const lineScaleY = useTransform(smoothProgress, [0.2, 0.8], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative h-[620px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 w-full h-[620px] bg-accent text-dark flex items-center justify-center overflow-hidden">

        <motion.div
          style={{ y: contentY }}
          className="absolute flex flex-col items-center justify-end h-full w-full px-4 text-center"
        >

          <div className="absolute top-8 right-8 md:top-5 md:right-10 flex flex-col text-right z-30">
            <span className="text-[1.25rem] md:text-[6rem] text-dark/20 tracking-tighter font-extrabold leading-[1.1] ">
              &#169;&apos;26
            </span>
          </div>

          <div className="absolute left-[15%] md:left-[26%] top-0 w-full h-full text-left pointer-events-none z-0">
            
            <motion.div 
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              className="absolute left-0 top-0 w-[3px] h-full bg-dark/90 z-10" 
            />

            <div className="absolute top-[20%] md:top-[15%] -translate-x-[15%] md:-translate-x-[35%] flex flex-col pointer-events-auto">
              <a 
                href="https://www.linkedin.com/in/anshul-vashishth/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[4rem] md:text-[6vw] font-bold leading-[0.85] tracking-tighter text-dark/20 hover:text-dark/50 transition-colors lowercase"
              >
                linkedin
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=theavashisht0227@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[4rem] md:text-[6vw] font-bold leading-[0.85] tracking-tighter text-dark/20 hover:text-dark/50 transition-colors lowercase"
              >
                mail
              </a>
            </div>
          </div>

          <div className="relative text-[18vw] md:text-[25vw] font-bold font-durer tracking-tighter leading-none whitespace-nowrap translate-y-[23%] z-10">

            <span className="opacity-0">Anshul</span>

            <motion.span
              style={{
                clipPath: `inset(0% 0% ${100 - CUT_1}% 0%)`,
                x: slice1X
              }}
              className="absolute top-0 left-0 text-dark"
            >
              Anshul
            </motion.span>

            <motion.span
              style={{
                clipPath: `inset(${CUT_1}% 0% ${100 - CUT_2}% 0%)`,
                x: slice2X
              }}
              className="absolute top-0 left-0 text-dark"
            >
              Anshul
            </motion.span>

            <motion.span
              style={{
                clipPath: `inset(${CUT_2}% 0% 0% 0%)`
              }}
              className="absolute top-0 left-0 text-dark"
            >
              Anshul
            </motion.span>

          </div>

        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 w-full h-full bg-black pointer-events-none z-20"
        />

      </div>
    </div>
  );
}