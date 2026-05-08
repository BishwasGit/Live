You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
preloader.tsx

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "হ্যালো"]

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
}
const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
}

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
 
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (index === words.length - 1) {
      // Start exit animation after showing the last word
      setTimeout(() => {
        setIsExiting(true)
        // Call onComplete after exit animation
        setTimeout(() => {
          onComplete?.()
        }, 1000)
      }, 1000)
      return
    }

    setTimeout(
      () => {
        setIndex(index + 1)
      },
      index === 0 ? 1000 : 150,
    )
  }, [index, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }


  return (
      <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black z-[99999999999]"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="flex items-center text-white text-4xl md:text-5xl lg:text-6xl absolute z-10 font-medium"
          >
            <span className="block w-2.5 h-2.5 bg-white rounded-full mr-2.5"></span>
            {words[index]}
          </motion.p>
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path variants={curve} initial="initial" animate={isExiting ? "exit" : "initial"} fill="#070b13" />
          </svg>
        </>
      )}
    </motion.div>
  );
};



demo.tsx
"use client"

import { motion } from "framer-motion"
import { useState, useCallback } from "react"
import Preloader from "@/components/ui/preloader"

const DemoOne = () => {
  const [showPreloader, setShowPreloader] = useState(true)

  const handleComplete = useCallback(() => {
    setShowPreloader(false)
  }, [])

  const handleReplay = useCallback(() => {
    setShowPreloader(true)
  }, [])



  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div
          className="text-center space-y-8 max-w-3xl"
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Welcome</h1>
          <p className="text-xl text-muted-foreground">
            Your content has loaded successfully. The preloader animation has completed.
          </p>
          <button
            onClick={handleReplay}
            className="px-6 py-3 mt-6 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            Replay Preloader
          </button>
        </motion.div>
      </main>
    </>
  )
}

export { DemoOne }




```

Install NPM dependencies:
```bash
framer-motion
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them


Hero Section Text : 
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
gooey-text-morphing.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      // Cleanup function if needed
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        />
      </div>
    </div>
  );
}

demo.tsx
import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

function GooeyTextDemo() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <GooeyText
        texts={["Design", "Engineering", "Is", "Awesome"]}
        morphTime={1}
        cooldownTime={0.25}
        className="font-bold"
      />
    </div>
  );
}

export { GooeyTextDemo };
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
