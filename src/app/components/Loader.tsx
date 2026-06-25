"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoading } from "./LoadingContext";

const MaskedChar = ({ char, index }: { char: string; index: number }) => (
  <span
    className="relative inline-block h-[0.88em] align-top"
    style={{ clipPath: "inset(0 -100% 0 -100%)" }}
  >
    <span className={`falling-letter falling-letter-${index} block leading-none`}>{char}</span>
  </span>
);

const BrandText = () => (
  <div className="relative z-20 font-black text-[7.5vw] uppercase tracking-tighter text-light flex items-center justify-center w-full h-full">
    <div className="flex items-start relative">
      <div className="letter-a inline-block leading-none h-[0.88em] origin-bottom-right">A</div>

      {["N", "S", "H", "U", "L"].map((char, i) => (
        <MaskedChar key={`first-${i}`} char={char} index={i} />
      ))}

      <div className="w-[3vw]"></div>

      {["V", "A", "S", "H", "I", "S"].map((char, i) => (
        <MaskedChar key={`last1-${i}`} char={char} index={i + 5} />
      ))}

      <span
        className="target-v-container relative inline-grid h-[0.88em] align-top origin-bottom-left place-items-center"
        style={{ clipPath: "inset(0 -100% 0 -100%)" }}
      >
        <span className="falling-letter falling-letter-11 block leading-none col-start-1 row-start-1">H</span>
        <span className="new-v opacity-0 block leading-none col-start-1 row-start-1">V</span>
      </span>

      {["T", "H"].map((char, i) => (
        <MaskedChar key={`last2-${i}`} char={char} index={i + 12} />
      ))}
    </div>
  </div>
);

export default function Loader() {
  const container = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const { setIsLoaderFinished } = useLoading();

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      gsap.set(".new-v", { yPercent: -100, opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsComplete(true);
        },
      });

      tl.add("start", 0);
      tl.add("movePhase", 1.8);
      tl.add("scalePhase", 2.8);
      tl.add("drawSplit", 3.9);
      tl.add("split", 5.0);

      //  TEXT ENTRY ANIMATION
      tl.from(".ui-text-inner", {
        yPercent: 120,
        duration: 1.2,
        ease: "expo.out"
      }, "start");

      const counterProxy = { val: 0 };
      tl.to(counterProxy, {
        val: 100,
        duration: 5.1, 
        ease: "power1.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.round(counterProxy.val).toString();
          }
        }
      }, "start"); 

      for (let i = 0; i < 14; i++) {
        tl.to(
          `.falling-letter-${i}`,
          {
            yPercent: 100,
            duration: 0.6,
            ease: "power3.inOut",
          },
          `start+=${i * 0.09}`
        );
      }

      tl.to(".new-v", {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.inOut",
      }, "start+=0.99");

      tl.to(".letter-a", {
        x: "32.5vw", 
        duration: 1.2,
        ease: "expo.inOut",
      }, "movePhase")
      .to(".target-v-container", {
        x: "-23.5vw", 
        duration: 1.2,
        ease: "expo.inOut",
      }, "movePhase");

      tl.to(".target-v-container", {
        x: "-26vw", 
        scale: 2, 
        transformOrigin: "center center", 
        duration: 1.2,
        ease: "expo.inOut",
      }, "scalePhase")
      .to(".letter-a", {
        x: "26vw", 
        y: "-5vw", 
        scale: 0.5, 
        transformOrigin: "right bottom", 
        duration: 1.2,
        ease: "expo.inOut",
      }, "scalePhase");

      tl.to(".peel-wipe", {
        attr: { width: 1.2 }, 
        duration: 1, 
        ease: "power4.inOut", 
      }, "drawSplit");

      tl.call(() => {
        setIsLoaderFinished(true);
      }, undefined, "split+=0.5");

      // --- UI TEXT EXIT ANIMATION ---
      tl.to(".ui-text-top .ui-text-inner", {
        yPercent: -120,
        duration: 1.2,
        ease: "expo.inOut",
      }, "split-=0.2")
      .to(".ui-text-bottom .ui-text-inner", {
        yPercent: 120,
        duration: 1.2,
        ease: "expo.inOut",
      }, "split-=0.2");
      // ------------------------------

      tl.to(".loader-top", {
        yPercent: -100,
        duration: 1.5,
        ease: "expo.inOut",
      }, "split")
      .to(".loader-bottom", {
        yPercent: 100,
        duration: 1.5,
        ease: "expo.inOut",
      }, "split")
      .to(container.current, {
        opacity: 0,
        duration: 0.4,
      }, "split+=1");
    },
    { scope: container }
  );

  if (isComplete) return null;

  return (
    <div ref={container} className="fixed inset-0 z-9999 pointer-events-none">
      
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <mask id="top-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect x="-0.1" y="-0.1" width="1.2" height="1.2" fill="white" />
            <rect className="peel-wipe" x="0" y="0.96" width="0" height="0.04" fill="black" />
          </mask>
          <mask id="bottom-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect x="-0.1" y="-0.1" width="1.2" height="1.2" fill="white" />
            <rect className="peel-wipe" x="0" y="-0.02" width="0" height="0.04" fill="black" />
          </mask>
        </defs>
      </svg>

      <div 
        className="loader-top absolute left-0 top-0 w-full h-[calc(50vh+2px)] bg-accent overflow-hidden z-20"
        style={{ WebkitMaskImage: "url(#top-mask)", maskImage: "url(#top-mask)" }}
      >
        <div className="ui-text ui-text-top absolute top-[12vh] left-[8vw] text-sm md:text-[0.9vw] font-medium tracking-wide text-light z-30 overflow-hidden">
          <span className="ui-text-inner block">HELLO</span>
        </div>

        <div className="absolute top-0 left-0 w-full h-[100vh]">
          <BrandText />
        </div>
      </div>

      <div 
        className="loader-bottom absolute left-0 bottom-0 w-full h-[50vh] bg-accent overflow-hidden z-10"
        style={{ WebkitMaskImage: "url(#bottom-mask)", maskImage: "url(#bottom-mask)" }}
      >
        <div className="ui-text ui-text-bottom absolute bottom-[10vh] left-[25vw] text-sm md:text-[0.9vw] font-medium tracking-wide text-light z-30 overflow-hidden">
          <span className="ui-text-inner block">FRIEND</span>
        </div>

        <div className="ui-text ui-text-bottom absolute bottom-[25vh] right-[8vw] text-sm md:text-[0.9vw] font-medium tracking-wide text-light z-30 overflow-hidden">
          <span className="ui-text-inner flex items-center gap-1">
            <span>LOADING</span>
            <span ref={counterRef} className="inline-block w-[3ch] text-right tabular-nums">0</span>
          </span>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[100vh]">
          <BrandText />
        </div>
      </div>

    </div>
  );
}