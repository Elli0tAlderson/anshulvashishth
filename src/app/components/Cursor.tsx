"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

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
    const handleMouseMove = (e : MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          translateX: dotXSpring,
          translateY: dotYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />
      
      <motion.div
        className="fixed top-0 left-0 w-7.5 h-7.5 border border-white rounded-full pointer-events-none z-9999 mix-blend-difference"
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