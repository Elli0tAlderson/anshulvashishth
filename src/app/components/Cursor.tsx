"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const [isHovering, setIsHovering] = useState(false);

  const dotSpringConfig = { 
    damping: 25, 
    stiffness: 225, 
    mass: 0.1 
  };
  const dotXSpring = useSpring(mouseX, dotSpringConfig);
  const dotYSpring = useSpring(mouseY, dotSpringConfig);

  const circleSpringConfig = { 
    damping: 35, 
    stiffness: 185, 
    mass: 0.6 
  };
  const circleXSpring = useSpring(mouseX, circleSpringConfig);
  const circleYSpring = useSpring(mouseY, circleSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          translateX: dotXSpring,
          translateY: dotYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />
      
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 w-7.5 h-7.5 border border-white rounded-full pointer-events-none z-9999 mix-blend-difference"
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          translateX: circleXSpring,
          translateY: circleYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />
    </>
  );
}