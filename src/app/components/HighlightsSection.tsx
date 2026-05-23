"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "FOCUS ON STRETCH PLEATS",
    img: "https://images.unsplash.com/photo-1776811789960-0de476026ce1?q=80&w=1170&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "LEVEL OF DISTANCE",
    img: "https://images.unsplash.com/photo-1777042575928-366908c3ee3f?q=80&w=1170&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "IPSA AQUA PLAY ART",
    img: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1170&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "ATELIER WEN",
    img: "https://images.unsplash.com/photo-1669326926304-b8cd6ecda8ec?q=80&w=1170&auto=format&fit=crop",
  },
  {
    num: "05",
    title: "3D: MIX",
    img: "https://images.unsplash.com/photo-1539722664268-3a5f9810b69f?w=600&auto=format&fit=crop",
  },
];

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

  // CRITICAL FIX: Safely grab the active project to prevent undefined errors during fast unmounts
  const activeProject = hoverState.lastIndex !== null && hoverState.lastIndex !== undefined
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
      const img = new Image();
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
    <section className="relative w-full bg-[#f4f4f4] py-[15vh] text-zinc-950">

      {/* FIXED IMAGE CONTAINER */}
      <motion.div
        className="fixed top-0 left-0 z-10 w-[35vw] max-w-[450px] pointer-events-none -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          aspectRatio: "4/3",
          x: smoothX,
          y: smoothY
        }}
        initial={{ clipPath: "inset(50% 0 50% 0)" }}
        animate={{
          clipPath: hoverState.index !== null ? "inset(0% 0 0% 0)" : "inset(50% 0 50% 0)",
        }}
        transition={{ duration, ease }}
      >
        <AnimatePresence>
          {/* Using the safe activeProject variable here */}
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
              <motion.img
                src={activeProject.img}
                alt={activeProject.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.35 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1 }}
                transition={{ duration, ease }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* THE LIST */}
      <div
        className="relative z-30 flex flex-col w-full max-w-[92vw] xl:max-w-[1350px] mx-auto"
        onMouseLeave={handleMouseLeave}
      >
        {projects.map((item, i) => (
          <div
            key={i}
            className="group border-b border-black/10 first:border-t first:border-t-black/60 flex items-center h-[330px] cursor-pointer w-full"
            onMouseEnter={() => handleMouseEnter(i)}
          >
            <motion.div
              className="w-full pl-[2%] md:pl-[10%]"
              animate={{
                x: hoverState.index === i ? -100 : 0,
              }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.36, 1] }}
            >
              <h2 className="text-[4rem] md:text-[5.5rem] lg:text-[7.25rem] font-durer uppercase leading-[0.85] tracking-tighter w-full max-w-[600px] lg:max-w-[900px]">
                {item.title}
              </h2>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}