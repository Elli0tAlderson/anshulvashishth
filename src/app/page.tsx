"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import Navbar from "./components/Navbar";
import AnimatedWindow from "./components/AnimatedWindow";
import IntroSection from "./components/IntroSection";
import ZoomSection from "./components/ZoomSection";
import SliderSection from "./components/SliderSection";
import HighlightsSection from "./components/HighlightsSection";
import Footer from "./components/Footer";
import { useLoading } from "./components/LoadingContext";

const topTextContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const bottomTextContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const skewedTextVars: Variants = {
  hidden: { y: "150%", rotateZ: 8, opacity: 0 },
  visible: {
    y: "0%",
    rotateZ: 0,
    opacity: 1,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

const slitVars: Variants = {
  hidden: { width: "0%", opacity: 1 },
  visible: {
    width: "100%",
    opacity: 0,
    transition: {
      width: { duration: 0.6, ease: "easeInOut", delay: 0.5 },
      opacity: { duration: 0.1, delay: 1.1 },
    },
  },
};

const topShutterVars: Variants = {
  hidden: { y: "0%" },
  visible: {
    y: "-100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.1 },
  },
};

const bottomShutterVars: Variants = {
  hidden: { y: "0%" },
  visible: {
    y: "100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.1 },
  },
};

const shutterWindowVars: Variants = {
  hidden: { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
  visible: {
    clipPath: "polygon(-20% -50%, 120% -50%, 120% 150%, -20% 150%)",
    transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
  },
};

export default function Home() {
  const { isLoaderFinished } = useLoading();
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
    mass: 0.05,
    stiffness: 120,
    damping: 25,
  });

  const heroY = useTransform(smoothScroll, [0, 0.15], ["0vh", "-100vh"]);
  const contentY = useTransform(smoothScroll, [0.15, 0.30], ["0vh", "-100vh"]);
  const sliderX = useTransform(smoothScroll, [0.40, 0.55], ["100vw", "0vw"]);

  return (
    <main className="relative w-full bg-dark selection:bg-accent selection:text-light">
      <Navbar />

      <div ref={containerRef} className="relative w-full h-[900vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          <motion.div
            style={{ y: heroY }}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none z-0"
          >
            <div className="absolute top-[58vh] w-full flex flex-col items-center gap-1">
              
              <motion.div
                initial="hidden"
                animate={isLoaderFinished ? "visible" : "hidden"}
                variants={topTextContainer}
                className="w-full max-w-[95vw] flex justify-between text-[1.15rem] font-semibold uppercase"
              >
                <span className="overflow-hidden block">
                  <motion.span variants={skewedTextVars} className="block text-light">A</motion.span>
                </span>
                <span className="overflow-hidden block">
                  <motion.span variants={skewedTextVars} className="block text-light">Seriously</motion.span>
                </span>
                <span className="overflow-hidden block">
                  <motion.span variants={skewedTextVars} className="block text-light">Good</motion.span>
                </span>
              </motion.div>

              <motion.div 
                initial="hidden" 
                animate={isLoaderFinished ? "visible" : "hidden"}
                className="relative overflow-hidden pt-2 pb-4 px-2 -mt-2"
              >
                <h1 className="font-dirtyline text-[9.25rem] font-semibold tracking-tight leading-none text-light whitespace-nowrap">
                  FullStack Devel<span className="text-accent">O</span>per
                </h1>
                
                <motion.div variants={topShutterVars} className="absolute top-0 left-0 w-full h-[40%] bg-dark z-10" />
                <motion.div variants={bottomShutterVars} className="absolute bottom-0 left-0 w-full h-[60%] bg-dark z-10" />
                
                <motion.div 
                  variants={slitVars} 
                  className="absolute top-[40%] -translate-y-1/2 left-0 h-[3px] bg-accent z-20 shadow-[0_0_8px_rgba(214,0,1,0.4)]" 
                />
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              animate={isLoaderFinished ? "visible" : "hidden"}
              variants={bottomTextContainer}
              className="absolute bottom-5 left-8 right-8 flex justify-between items-end z-40 text-sm font-medium text-light"
            >
              <span className="overflow-hidden block">
                <motion.span variants={skewedTextVars} className="block"><span className="text-accent">↓</span> scroll for</motion.span>
              </span>
              <span className="overflow-hidden block">
                <motion.span variants={skewedTextVars} className="block">cool sh*t <span className="text-accent">↓</span></motion.span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: contentY }}
            className="absolute top-0 left-0 w-full z-10 pointer-events-auto"
          >
            <motion.div
              initial="hidden"
              animate={isLoaderFinished ? "visible" : "hidden"}
              variants={shutterWindowVars}
              className="absolute top-[14vh] w-full flex justify-center items-center"
            >
              <AnimatedWindow smoothScroll={smoothScroll} mouseX={mouseX} />
            </motion.div>

            <div className="absolute top-[100vh] w-full h-screen">
              <IntroSection smoothScroll={smoothScroll} />
            </div>
          </motion.div>

          <motion.div
            style={{ x: sliderX }}
            className="absolute top-0 left-0 w-screen h-screen z-30 pointer-events-auto bg-dark overflow-hidden"
          >
            <SliderSection smoothScroll={smoothScroll} />
          </motion.div>
        </div>
      </div>

      <div className="relative z-30 -mt-[100vh]">
        <ZoomSection />
      </div>

      <HighlightsSection />
      <Footer />
    </main>
  );
}