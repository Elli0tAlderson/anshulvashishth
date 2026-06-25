"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue
} from "framer-motion";

// --- DATA ---
const projects = [
  {
    num: "01",
    title: "eNipp",
    img: "/assets/enipp.png", 
  },
  {
    num: "02",
    title: "heAthen's cOre",
    img: "/assets/heath.png",
  },
  {
    num: "03",
    title: "eNipp 2.0",
    img: "/assets/enipp2.png",
  },
  {
    num: "04",
    title: "One finAnciAl",
    img: "/assets/onefi.png",
  },
];

const marqueeImages = [
  "/assets/elliot.jpeg",
  "/assets/waves.png",
  "/assets/arcadia.webp"
];

// --- MARQUEE COMPONENT ---
function VelocityMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const pairs = [0, 1, 2, 3, 4, 5];
  const textString = "think/diffeRently";

  // The base content block
  const marqueeContent = pairs.map((index) => (
    <div key={index} className="flex items-center gap-6 md:gap-10 px-4 h-full">
      <span className="text-[80px] md:text-[80px] font-bold font-dirtyline tracking-wide leading-[0.8] text-dark flex items-center h-full pt-3 whitespace-nowrap">
        {textString}
      </span>
      
      <div className="relative w-[180px] h-[80px] md:w-[150px] md:h-[70px] rounded-[100px] overflow-hidden shrink-0 bg-dark/20 flex items-center justify-center">
        <Image
          src={marqueeImages[index % 3]} 
          alt={`Marquee visual ${index + 1}`}
          fill
          sizes="(max-width: 768px) 180px, 220px"
          className="object-cover"
        />
      </div>
    </div>
  ));

  return (
    <div 
      className="relative w-full overflow-hidden flex items-center mt-[20vh] mb-[15vh] z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* PARENT CONTAINER */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative w-full h-[100px] md:h-[85px] flex items-center"
      >
        
        {/* TOP STRIP */}
        <motion.div
          className="absolute inset-0 bg-light border-t border-light/20 z-10"
          style={{ clipPath: "inset(0 0 50% 0)" }}
          variants={{
            hidden: { x: "100vw" },
            visible: { x: "0vw", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
          }}
        >
          {/* Hover Fill */}
          <motion.div className="absolute top-0 left-0 h-full bg-accent z-0 origin-left" style={{ width: "50%" }} initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="absolute top-0 right-0 h-full bg-accent z-0 origin-right" style={{ width: "50%" }} initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} />

          {/* Text Layer */}
          <div className="absolute inset-0 z-10">
            <motion.div 
              className="flex items-center h-full w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            >
              <div className="flex items-center shrink-0 h-full">{marqueeContent}</div>
              <div className="flex items-center shrink-0 h-full">{marqueeContent}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* BOTTOM STRIP */}
        <motion.div
          className="absolute inset-0 bg-light border-b border-light/20 shadow-2xl z-10"
          style={{ clipPath: "inset(50% 0 0 0)" }}
          variants={{
            hidden: { x: "-100vw" },
            visible: { x: "0vw", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
          }}
        >
          {/* Hover Fill */}
          <motion.div className="absolute top-0 left-0 h-full bg-accent z-0 origin-left" style={{ width: "50%" }} initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="absolute top-0 right-0 h-full bg-accent z-0 origin-right" style={{ width: "50%" }} initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} />

          {/* Bottom Text ALIGNED */}
          <motion.div 
            className="absolute inset-0 z-10" 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="flex items-center h-full w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            >
              <div className="flex items-center shrink-0 h-full">{marqueeContent}</div>
              <div className="flex items-center shrink-0 h-full">{marqueeContent}</div>
            </motion.div>
          </motion.div>

          {/* Bottom Text OPPOSITE */}
          <motion.div 
            className="absolute inset-0 z-10" 
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="flex items-center h-full w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            >
              <div className="flex items-center shrink-0 h-full">{marqueeContent}</div>
              <div className="flex items-center shrink-0 h-full">{marqueeContent}</div>
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
}

// --- MAIN SECTION COMPONENT ---
export default function HighlightsSection() {
  const [hoverState, setHoverState] = useState<{
    index: number | null;
    lastIndex: number | null;
    id: number;
  }>({
    index: null,
    lastIndex: null,
    id: 0,
  });

  const activeProject =
    hoverState.lastIndex !== null && hoverState.lastIndex !== undefined
      ? projects[hoverState.lastIndex]
      : null;

  const duration = 1.2;
  const ease = [0.25, 1, 0.5, 1] as const;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 15, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    projects.forEach((project) => {
      const img = new window.Image();
      img.src = project.img;
    });

    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleMouseEnter = (i: number) => {
    setHoverState((prev) => {
      if (prev.index === i) return prev;
      if (prev.lastIndex === i) {
        return { ...prev, index: i };
      }
      return { index: i, lastIndex: i, id: prev.id + 1 };
    });
  };

  const handleMouseLeave = () => {
    setHoverState((prev) => ({ ...prev, index: null }));
  };

  return (
    <section className="relative w-full bg-dark pt-[15vh] text-light overflow-hidden">
      {/* Fixed image container */}
      <motion.div
        className="fixed top-0 left-0 z-10 w-[35vw] max-w-[500px] pointer-events-none -translate-x-1/2 -translate-y-1/2 "
        style={{
          aspectRatio: "2.2/1",
          x: smoothX,
          y: smoothY,
        }}
        initial={{ clipPath: "inset(50% 0 50% 0)" }}
        animate={{
          clipPath:
            hoverState.index !== null ? "inset(0% 0 0% 0)" : "inset(50% 0 50% 0)",
        }}
        transition={{ duration, ease }}
      >
        <AnimatePresence>
          {activeProject && (
            <motion.div
              key={hoverState.id}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ zIndex: hoverState.id }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-40%" }}
              transition={{ duration, ease }}
            >
              <motion.div 
                className="relative w-full h-full"
                initial={{ scale: 1.35 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1 }}
                transition={{ duration, ease }}
              >
                <Image
                  src={activeProject.img}
                  alt={activeProject.title}
                  fill
                  sizes="(max-width: 768px) 35vw, 500px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* The list */}
      <div
        className="relative z-30 flex flex-col w-full max-w-[92vw] xl:max-w-[1350px] mx-auto"
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full flex justify-center mb-12">
          <span className="text-[1.25rem] font-geist font-semibold uppercase tracking-widest text-accent">
            Projects
          </span>
        </div>

        {projects.map((item, i) => (
          <div
            key={i}
            className={`group border-b border-light/10 flex items-center h-[200px] cursor-pointer w-full ${
              i === 0 ? "border-t border-t-light/60" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(i)}
          >
            <motion.div
              className="w-full pl-[2%] md:pl-[10%]"
              animate={{
                x: hoverState.index === i ? -100 : 0,
              }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.36, 1] }}
            >
              <h2 className="text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] font-dirtyline leading-[0.85] tracking-normal w-full max-w-[600px] lg:max-w-[900px]">
                {item.title}
              </h2>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Marquee component */}
      <VelocityMarquee />
    </section>
  );
}