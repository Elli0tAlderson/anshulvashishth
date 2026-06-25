"use client";

import { useRef, useEffect } from "react";
import { motion, useTransform, MotionValue, Variants } from "framer-motion";

interface SliderSectionProps {
  smoothScroll: MotionValue<number>;
}

const SKILLS = [
  "REACT.JS",
  "NEXT.JS",
  "TYPESCRIPT",
  "FRAMER MOTION",
  "THREE.JS",
  "TAILWIND",
  "SUPABASE",
  "SANITY",
  "NODE.JS"
];

const SECONDARY_SKILLS = [
  "Web design",
  "API Integration",
  "Git & Version Control",
  "Search engine optimization (SEO)",
  "Deployment & Hosting"
];

const SCROLL_START = 0.45;

const titleContainerVars: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

const skewedTextVars: Variants = {
  hidden: { y: "150%", rotateZ: 8, opacity: 0 },
  visible: {
    y: "0%",
    rotateZ: 0,
    opacity: 1,
    transition: { type: "spring", damping: 20, stiffness: 120 },
  },
};

function SkillItem({
  skill,
  index,
  travelNum
}: {
  skill: string;
  index: number;
  travelNum: MotionValue<number>;
}) {
  const wordHeightVh = 14;
  const peak = -(50 + (wordHeightVh / 2) + index * wordHeightVh);

  const opacity = useTransform(
    travelNum,
    [peak - 25, peak - 2, peak + 2, peak + 25],
    [0.25, 1, 1, 0.25] 
  );

  return (
    <motion.div
      className="text-light text-[9vw] font-bold uppercase leading-[0.85] tracking-tighter"
      style={{ opacity }}
    >
      {skill}
    </motion.div>
  );
}

function SecondarySkillsItem({
  index,
  travelNum
}: {
  index: number;
  travelNum: MotionValue<number>;
}) {
  const wordHeightVh = 14;
  const peak = -(50 + (wordHeightVh / 2) + index * wordHeightVh);

  const opacity = useTransform(
    travelNum,
    [peak - 25, peak - 2, peak + 2, peak + 25],
    [0.25, 1, 1, 0.25] 
  );

  return (
    <motion.div
      className="flex items-center gap-2 text-light text-[1vw] font-normal tracking-wide uppercase pt-8"
      style={{ opacity }}
    >
      {SECONDARY_SKILLS.map((skill, i) => (
        <span key={i} className="flex items-center gap-2">
          <span>{skill}</span>
          {i !== SECONDARY_SKILLS.length - 1 && (
            <span className="text-accent text-[0.8em]">✦</span>
          )}
        </span>
      ))}
    </motion.div>
  );
}

export default function SliderSection({ smoothScroll }: SliderSectionProps) {
  const titleTracking = useTransform(smoothScroll, [0.55, 1.0], ["0.020em", "0.070em"], { clamp: true });
  const travelNum = useTransform(smoothScroll, [0, SCROLL_START, 1], [0, 0, -270]);
  const listY = useTransform(travelNum, val => `${val}vh`);

  const starContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starContainerRef.current;
    if (!container) return;
    
    container.innerHTML = '';

    const count = 100;
    const stars: { el: HTMLDivElement; initialY: number; speed: number }[] = [];

    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'bg-star absolute bg-white rounded-full opacity-80 will-change-transform';

      const x = Math.random() * 100;
      const y = Math.random() * 100; 
      
      const isStatic = Math.random() < 0.3;
      const z = isStatic ? 0 : 0.2 + Math.random() * 0.6; 
      const size = isStatic ? 1 + Math.random() : 1 + Math.random() * 2; 

      s.style.left = x + '%';
      s.style.top = y + '%';
      s.style.width = size + 'px';
      s.style.height = size + 'px';

      s.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
      s.style.animation = `twinkle var(--duration) infinite ease-in-out`;
      s.style.animationDelay = (Math.random() * 5) + 's';

      container.appendChild(s);
      stars.push({ el: s, initialY: y, speed: z });
    }

    let animationFrameId: number;

    const render = () => {
      const scrollVal = smoothScroll.get() * 4000; 
      
      const rawVelocity = smoothScroll.getVelocity(); 
      const fakeVelocity = isNaN(rawVelocity) ? 0 : rawVelocity * 20; 
      const stretch = Math.max(1, Math.min(1 + Math.abs(fakeVelocity) * 0.15, 4));

      stars.forEach(star => {
        if (star.speed === 0) {
          star.el.style.transform = 'scaleY(1)';
          return;
        }

        let pos = (star.initialY - (scrollVal * star.speed * 0.05)) % 100;
        if (pos < 0) pos += 100; 

        star.el.style.top = pos + '%';
        star.el.style.transform = `scaleY(${stretch})`;
      });

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [smoothScroll]);

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center bg-dark overflow-hidden border-l-[7px] border-light">
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <div 
        ref={starContainerRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" 
      />

      <motion.div 
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 h-full w-[10vw] bg-accent z-40 pointer-events-none origin-top"
      />

      <div className="absolute left-[4.5vw] top-3 h-full flex items-center z-50 pointer-events-none">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={titleContainerVars}
          className="flex gap-[0.2em] text-light text-[6.5rem] font-dirtyline tracking-wide"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: titleTracking
          }}
        >
          <span className="overflow-hidden block py-2">
            <motion.span variants={skewedTextVars} className="block">teCh</motion.span>
          </span>
          <span className="overflow-hidden block py-2">
            <motion.span variants={skewedTextVars} className="block">stAck</motion.span>
          </span>
        </motion.div>
      </div>

      <div className="absolute inset-0 flex justify-center items-start pt-[100vh] pl-[15vw] pointer-events-none overflow-hidden z-10">
        <motion.div
          className="flex flex-col items-center justify-start gap-0"
          style={{ y: listY }}
        >
          {SKILLS.map((skill, index) => (
            <SkillItem
              key={index}
              skill={skill}
              index={index}
              travelNum={travelNum}
            />
          ))}
          <SecondarySkillsItem 
            index={SKILLS.length} 
            travelNum={travelNum} 
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center pl-[15vw] justify-center pointer-events-none mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-light text-sm font-mono tracking-widest z-100 uppercase mb-[30vh]"
        >
          [WHAT I USE]
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-light text-md tracking-wide text-center max-w-lg mt-[10vh]"
        >
          Skills are frameworks of thinking, they allow me to
          transform ideas into structured, interactive environments
        </motion.div>
      </div>

    </div>
  );
}