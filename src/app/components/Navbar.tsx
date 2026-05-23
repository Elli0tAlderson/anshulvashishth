"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  return (
    <nav className="fixed top-0 left-3 right-0 flex items-start justify-between p-6 z-50 pointer-events-none font-geist">
      
      {/* Left side */}
      <motion.div 
        className="flex items-center pointer-events-auto cursor-pointer text-zinc-950 font-medium text-[1.5rem] tracking-wider font-durer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>ANS</span>
        <motion.div
          initial={{ width: "0px", margin: "0px", opacity: 0 }}
          animate={{ 
            width: isHovered ? "50px" : "0px", 
            margin: isHovered ? "0px 3px" : "0px 0px",
            opacity: isHovered ? 1 : 0
          }}
          transition={{ 
            default: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2, delay: isHovered ? 0 : 0.3 }
          }}
          className="h-[2px] bg-zinc-950 flex-shrink-0"
        />
        <span>HUL</span>
      </motion.div>

      {/* Right side */}
      <div className="flex items-center gap-3 pointer-events-auto">
        
        <motion.div 
          animate={{ rotate: isCtaHovered ? 180 : 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="h-7 w-7 rounded-full overflow-hidden bg-zinc-200 flex-shrink-0 flex items-center justify-center"
        >
           <img src="/assets/Mobius.gif" alt="Status" className="w-full h-full object-cover" />
        </motion.div>

        {/* CTA */}
        <div className="w-34 flex justify-start">
          <button 
            className="flex items-center text-zinc-950 font-medium text-[1.5rem] font-durer tracking-wide hover:text-zinc-950 transition-colors"
            onMouseEnter={() => setIsCtaHovered(true)}
            onMouseLeave={() => setIsCtaHovered(false)}
          >
            <span>(&nbsp;L</span>
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
              <span>et&apos;s Talk</span>
            </motion.div>
            <span>&nbsp;)</span>
          </button>
        </div>

      </div>

    </nav>
  );
}