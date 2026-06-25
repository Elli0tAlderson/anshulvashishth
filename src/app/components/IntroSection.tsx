"use client";

import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  MotionValue, 
  useTransform, 
  useMotionValueEvent, 
  animate,
  useAnimationFrame,
  useMotionValue,
  useSpring
} from "framer-motion";

interface IntroSectionProps {
  smoothScroll: MotionValue<number>;
}

// Planet Badge Component
function AboutPlanetBadge() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  
  const rotation = useMotionValue(0);
  const speed = useMotionValue(1);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 8, stiffness: 180, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    animate(speed, isHovered ? 11 : 1, {
      type: "spring",
      stiffness: 100,
      damping: 20,
    });
  }, [isHovered, speed]);

  useAnimationFrame((t, delta) => {
    rotation.set(rotation.get() + 0.03 * delta * speed.get());
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    
    const originLeft = rect.left - x.get();
    const originTop = rect.top - y.get();
    const originCenterX = originLeft + rect.width / 2;
    const originCenterY = originTop + rect.height / 2;

    x.set((clientX - originCenterX) * 0.35);
    y.set((clientY - originCenterY) * 0.35);

    const currentCenterX = rect.left + rect.width / 2;
    const currentCenterY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow(clientX - currentCenterX, 2) + Math.pow(clientY - currentCenterY, 2));

    if (dist < 80) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="#about"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="hidden md:flex absolute right-0 md:right-[2%] lg:right-[10%] -top-[5%] lg:-top-[20%] w-48 h-48 lg:w-[160px] lg:h-[160px] items-center justify-center z-30 select-none after:absolute after:inset-[-40px] after:content-[''] after:rounded-full"
    >
      <motion.div
        animate={{ scale: isHovered ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="absolute inset-0 w-full h-full bg-light rounded-full shadow-lg"
      />

      <motion.div 
        style={{ rotate: rotation }} 
        animate={{ scale: isHovered ? 0.70 : 0.9 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="absolute inset-0 w-full h-full origin-center text-dark pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <path
            id="text-path"
            d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
            fill="none"
          />
          <text fontSize="13" fontWeight="500" fill="currentColor" letterSpacing="0.12em" className="uppercase">
            <textPath href="#text-path" startOffset="0%" textLength="510" lengthAdjust="spacing">
              {Array.from({ length: 5 }).map((_, i) => (
                <tspan key={i}>
                  About me <tspan fill="#D60001">✦</tspan>{" "}
                </tspan>
              ))}
            </textPath>
          </text>
        </svg>
      </motion.div>

      <motion.div
        className="absolute w-20 h-20 lg:w-20 lg:h-20 flex items-center justify-center rounded-full overflow-hidden pointer-events-none"
      >
        <img 
          src="/assets/planet.png" 
          alt="About me" 
          draggable={false}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </motion.div>
    </motion.a>
  );
}

// Big Text Component
function StaggeredLine({
  text,
  index,
  smoothScroll,
}: {
  text: React.ReactNode;
  index: number;
  smoothScroll: MotionValue<number>;
}) {
  const baseStart = 0.25;
  const staggerDelay = 0.010;
  const start = baseStart + index * staggerDelay;

  const duration = 0.02 + index * 0.02;
  const end = start + duration;

  const travel = "90%";
  const y = useTransform(smoothScroll, [start, end], ["0%", travel]);

  const restingGap = "0.02em";
  const transitionGap = "0.05em";
  const marginBottom = useTransform(
    smoothScroll, 
    [start, start + (duration / 2), end], 
    [restingGap, transitionGap, restingGap]
  );

  return (
    <motion.span 
      style={{ marginBottom }} 
      className="relative block overflow-hidden"
    >
      <motion.span
        style={{ y }}
        className="block will-change-transform"
      >
        <span 
          className="absolute left-0 w-full" 
          style={{ top: `-${travel}` }} 
          aria-hidden="true"
        >
          {text}
        </span>
        <span className="block">{text}</span>
      </motion.span>
    </motion.span>
  );
}

// Scramble Typewriter Component
function ScrambleTypewriter({
  lines,
  smoothScroll,
}: {
  lines: string[];
  smoothScroll: MotionValue<number>;
}) {
  const [mounted, setMounted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false); 
  const hasTriggered = useRef(false);
  
  useEffect(() => setMounted(true), []);

  const totalChars = lines.join("").length;

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    if (latest >= 0.30 && !hasTriggered.current) {
      hasTriggered.current = true;
      setIsStarted(true);

      animate(0, totalChars, {
        duration: 3.0, 
        ease: "linear",
        onUpdate: (value) => {
          setRevealedCount(value);
        },
      });
    } 
    else if (latest < 0.25 && hasTriggered.current) {
      hasTriggered.current = false;
      setIsStarted(false);
      setRevealedCount(0);
    }
  });

  const getRandomChar = () => {
    const chars = "0123456789!@#$%^&*()_+{}[]|:;<>,.?/~£€¥¢";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  let globalIndex = 0;

  return (
    <span className="flex flex-col">
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block leading-[1.6]">
          {line.split("").map((char, charIdx) => {
            const currentIndex = globalIndex++;
            const isRevealed = currentIndex < Math.floor(revealedCount);
            
            const isGlitching =
              isStarted && 
              currentIndex >= Math.floor(revealedCount) &&
              currentIndex < Math.floor(revealedCount) + 2;

            if (isRevealed) {
              return <span key={charIdx}>{char}</span>;
            }

            if (isGlitching) {
              if (char === " ") return <span key={charIdx}>&nbsp;</span>;

              return (
                <span key={charIdx} className="relative inline-block">
                  <span className="opacity-0">{char}</span>
                  <span className="absolute inset-0 bg-accent text-light flex items-center justify-center leading-none">
                    {mounted ? getRandomChar() : char}
                  </span>
                </span>
              );
            }

            return (
              <span key={charIdx} className="opacity-0">
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

// Main Section Component
export default function IntroSection({ smoothScroll }: IntroSectionProps) {
  const bigLines = [
    "I'M ANSHUL . I DESIGN AND",
    <>BUILD <span className="font-dirtyline text-[0.95em] tracking-wide text-accent" >MODERN</span> RELIABLE & </>,
    "FAST WEBSITES THAT WORK.",
  ];

  const smallLines = [
    "RADIOHEAD AND WEEKND ARE FREE THERAPY.",
    "FOOTBALL AND F1 MAKE ME GO TOTALLY WILD.",
    "TREKKING AND TRAVELLING TO TOUCH GRASS.",
    "BINGING ANIME AND SHOWS TO SIMPLY VIBE :)"
  ];

  return (
    <section className="relative w-full h-full bg-dark flex flex-col pt-[28vh] overflow-hidden">
      
      <div className="relative z-10 w-full px-8 md:px-12 mx-auto">
        <div className="flex flex-col w-full relative">
          
          <AboutPlanetBadge />
          
          <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[80%]">
            <h2 className="text-[3rem] md:text-[4.5vw] lg:text-[5vw] font-semibold leading-none tracking-tight text-light flex flex-col uppercase">
              {bigLines.map((line, i) => (
                <StaggeredLine
                  key={i}
                  text={line}
                  index={i}
                  smoothScroll={smoothScroll}
                />
              ))}
            </h2>
          </div>

          <div className="w-full md:w-[45%] lg:w-[35%] self-end mt-8 md:-mt-4 lg:mt-20 z-20 mr-8 lg:mr-10">
            <p className="text-xs md:text-[0.65rem] lg:text-[0.7rem] font-medium text-light/70 uppercase tracking-widest leading-relaxed">
              <ScrambleTypewriter 
                lines={smallLines} 
                smoothScroll={smoothScroll} 
              />
            </p>
          </div>

        </div>
      </div>
      
    </section>
  );
}
