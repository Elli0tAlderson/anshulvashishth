"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useLoading } from "./LoadingContext";

const navContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const navItemVars: Variants = {
  hidden: { y: "150%", rotateZ: 8, opacity: 0 },
  visible: {
    y: "0%",
    rotateZ: 0,
    opacity: 1,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const { isLoaderFinished } = useLoading();

  return (
    <motion.nav
      initial="hidden"
      animate={isLoaderFinished ? "visible" : "hidden"}
      variants={navContainer}
      className="fixed top-0 left-3 right-0 flex items-start justify-between p-6 z-50 pointer-events-none font-geist"
    >

      <div className="overflow-hidden block pb-2">
        <motion.div
          variants={navItemVars}
          className="flex items-center pointer-events-auto cursor-pointer text-light font-medium text-[1.5rem] tracking-wider font-dirtyline"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span>anS</span>
          <motion.div
            initial={{ width: "0px", margin: "0px", opacity: 0 }}
            animate={{
              width: isHovered ? "45px" : "0px",
              margin: isHovered ? "0px 2px" : "0px 0px",
              opacity: isHovered ? 1 : 0
            }}
            transition={{
              default: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, delay: isHovered ? 0 : 0.3 }
            }}
            className="h-[2px] bg-accent flex-shrink-0"
          />
          <span>hul</span>
        </motion.div>
      </div>

      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="overflow-hidden block pb-2">
          <motion.div variants={navItemVars} className="w-36 flex justify-start">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=theavashisht0227@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-light font-medium text-[1.5rem] font-dirtyline tracking-wide hover:text-light transition-colors"
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
            >
              <span className="text-accent">(</span>
              <span>&nbsp;l</span>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: isCtaHovered ? "auto" : 0,
                  opacity: isCtaHovered ? 1 : 0
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span>et&apos;s talk</span>
              </motion.div>

              <span>&nbsp;</span>
              <span className="text-accent">)</span>
            </a>
          </motion.div>
        </div>
      </div>

    </motion.nav>
  );
}