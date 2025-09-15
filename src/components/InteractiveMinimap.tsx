'use client';

import {
  motion,
  useSpring,
  useMotionValueEvent,
  useScroll,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import * as React from "react";
import { clamp } from "@/utils/clamp";

export const LINE_GAP = 8;
export const LINE_WIDTH = 1;
export const LINE_COUNT = 40;
export const LINE_HEIGHT = 24;
export const LINE_HEIGHT_ACTIVE = 32;

export const LINE_STEP = LINE_WIDTH + LINE_GAP;
export const MIN = 0;
export const MAX = LINE_STEP * (LINE_COUNT - 1);

// Controls scroll speed (higher = faster)
// Set to 1 for no smoothing at all
export const SCROLL_SMOOTHING = 0.5;

// Transformer constants
export const DEFAULT_INTENSITY = 7;
export const DISTANCE_LIMIT = 48;

// Linear interpolation function for smooth transitions
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export default function InteractiveMinimap() {
  const scrollX = useScrollX(MAX);
  const { mouseX, onMouseMove, onMouseLeave } = useMouseX();
  const { scrollY } = useScroll();
  
  // Calculate scale based on scroll position - keep minimaps throughout page
  const scaleY = useSpring(1, { damping: 30, stiffness: 300 });
  const opacity = useSpring(1, { damping: 30, stiffness: 300 });
  
  // Update scale and opacity based on scroll
  React.useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const heroHeight = window.innerHeight;
      
      // Scale down when outside hero section, but keep visible
      const scaleFactor = latest > heroHeight ? 0.3 : 1;
      scaleY.set(scaleFactor);
      
      // Keep opacity high throughout the page
      const opacityFactor = Math.max(0.7, 1 - (latest / heroHeight) * 0.3);
      opacity.set(opacityFactor);
    });
    
    return unsubscribe;
  }, [scrollY, scaleY, opacity]);

  return (
    <>
      {/* Top Minimap - Fixed below header */}
      <motion.div 
        className="fixed top-16 left-0 right-0 pointer-events-none z-10"
        style={{ 
          scaleY: scaleY,
          opacity: opacity,
          transformOrigin: 'top center',
          pointerEvents: opacity.get() > 0.1 ? 'auto' : 'none'
        }}
        onPointerMove={onMouseMove}
        onPointerLeave={onMouseLeave}
      >
        <div className="flex items-start justify-between px-4" style={{ gap: LINE_GAP }}>
          {[...Array(LINE_COUNT)].map((_, i) => (
            <Line
              key={`top-${i}`}
              index={i}
              scrollX={scrollX}
              mouseX={mouseX}
              active={isActive(i, LINE_COUNT)}
              isTop={true}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Top Numbers - Outside scaled container */}
      <div className="fixed top-20 left-0 right-0 pointer-events-none z-10" style={{ opacity: opacity.get() }}>
        <div className="flex justify-between px-4" style={{ gap: LINE_GAP }}>
          {[...Array(LINE_COUNT)].map((_, i) => (
            <NumberLabel
              key={`top-number-${i}`}
              index={i}
              isTop={true}
              mouseX={mouseX}
            />
          ))}
        </div>
      </div>

      {/* Bottom Numbers - Above the lines, outside scaled container */}
      <div className="fixed bottom-8 left-0 right-0 pointer-events-none z-10" style={{ opacity: opacity.get() }}>
        <div className="flex justify-between px-4" style={{ gap: LINE_GAP }}>
          {[...Array(LINE_COUNT)].map((_, i) => (
            <NumberLabel
              key={`bottom-number-${i}`}
              index={i}
              isTop={false}
              mouseX={mouseX}
            />
          ))}
        </div>
      </div>

      {/* Bottom Minimap - Fixed at bottom edge */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{ 
          scaleY: scaleY,
          opacity: opacity,
          transformOrigin: 'bottom center',
          pointerEvents: opacity.get() > 0.1 ? 'auto' : 'none'
        }}
        onPointerMove={onMouseMove}
        onPointerLeave={onMouseLeave}
      >
        <div className="flex items-end justify-between px-4" style={{ gap: LINE_GAP }}>
          {[...Array(LINE_COUNT)].map((_, i) => (
            <Line
              key={`bottom-${i}`}
              index={i}
              scrollX={scrollX}
              mouseX={mouseX}
              active={isActive(i, LINE_COUNT)}
              isTop={false}
            />
          ))}
        </div>
      </motion.div>

      {/* Connecting Blue Line */}
      <ConnectingLine scrollX={scrollX} opacity={opacity} />
    </>
  );
}

function Line({
  active,
  mouseX,
  scrollX,
  index,
  isTop,
}: {
  active?: boolean;
  hovered?: boolean;
  mouseX: MotionValue<number>;
  scrollX: MotionValue<number>;
  index: number;
  isTop: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const scaleY = useSpring(1, { damping: 45, stiffness: 600 });
  const centerX = index * LINE_STEP + LINE_WIDTH / 2;

  useProximity(scaleY, {
    ref,
    baseValue: 1,
    mouseX,
    scrollX,
    centerX,
  });

  return (
    <motion.div
      ref={ref}
      className={active ? "bg-accent" : "bg-muted-foreground/30"}
      style={{
        width: LINE_WIDTH,
        height: active ? LINE_HEIGHT_ACTIVE : LINE_HEIGHT,
        scaleY,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    />
  );
}

function NumberLabel({ index, isTop, mouseX }: { index: number; isTop: boolean; mouseX: MotionValue<number> }) {
  const scale = useSpring(0, { damping: 30, stiffness: 400 });
  const opacity = useSpring(0, { damping: 30, stiffness: 400 });
  
  React.useEffect(() => {
    const unsubscribe = mouseX.on('change', (latest) => {
      // Calculate the actual position of this line on screen based on viewport width
      const viewportWidth = window.innerWidth;
      const linePosition = (index / (LINE_COUNT - 1)) * viewportWidth;
      const distance = Math.abs(latest - linePosition);
      
      // Only show numbers when very close to mouse (proximity-based visibility)
      const proximity = Math.max(0, 1 - distance / 80); // Adjusted proximity range
      
      if (proximity > 0.1) {
        // Show number with animation
        const targetScale = 0.8 + proximity * 0.4; // Scale from 0.8 to 1.2
        const targetOpacity = proximity; // Opacity from 0 to 1
        scale.set(targetScale);
        opacity.set(targetOpacity);
      } else {
        // Hide number
        scale.set(0);
        opacity.set(0);
      }
    });
    
    return unsubscribe;
  }, [mouseX, index, scale, opacity]);
  
  // Top minimap shows multiples of 8, bottom minimap shows design tokens
  const displayValue = isTop 
    ? index * 8  // Top: multiples of 8 (0, 8, 16, 24, etc.)
    : (() => {
        // Bottom: design token names
        const designTokens = [
          'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl',
          '7xl', '8xl', '9xl', '10xl', '11xl', '12xl', '13xl', '14xl', '15xl', '16xl',
          '17xl', '18xl', '19xl', '20xl', '21xl', '22xl', '23xl', '24xl', '25xl', '26xl',
          '27xl', '28xl', '29xl', '30xl', '31xl', '32xl', '33xl', '34xl', '35xl', '36xl',
          '37xl', '38xl', '39xl', '40xl', '41xl', '42xl', '43xl', '44xl', '45xl', '46xl',
          '47xl', '48xl', '49xl', '50xl', '51xl', '52xl', '53xl', '54xl', '55xl', '56xl',
          '57xl', '58xl', '59xl', '60xl', '61xl', '62xl', '63xl', '64xl', '65xl', '66xl',
          '67xl', '68xl', '69xl', '70xl', '71xl', '72xl', '73xl', '74xl', '75xl', '76xl',
          '77xl', '78xl', '79xl', '80xl', '81xl', '82xl', '83xl', '84xl', '85xl', '86xl',
          '87xl', '88xl', '89xl', '90xl', '91xl', '92xl', '93xl', '94xl', '95xl', '96xl',
          '97xl', '98xl', '99xl', '100xl'
        ];
        return designTokens[index] || `t${index}`;
      })();
  
  return (
    <motion.div 
      className="text-xs text-muted-foreground font-mono text-center"
      style={{ 
        width: LINE_WIDTH,
        scale: scale,
        opacity
      }}
    >
      {displayValue}
    </motion.div>
  );
}

function ConnectingLine({ scrollX, opacity }: { scrollX: MotionValue<number>; opacity: MotionValue<number> }) {
  return (
    <motion.div
      className="fixed w-[1px] bg-accent z-10"
      style={{ 
        x: scrollX,
        top: 64, // Start right below header
        bottom: 0, // End at bottom of viewport
        left: 0, // Start from the left edge
        opacity: opacity,
      }}
    />
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////

export function transformScale(
  distance: number,
  initialValue: number,
  baseValue: number,
  intensity: number
) {
  if (Math.abs(distance) > DISTANCE_LIMIT) {
    return initialValue;
  }
  const normalizedDistance = initialValue - Math.abs(distance) / DISTANCE_LIMIT;
  const scaleFactor = normalizedDistance * normalizedDistance;
  return baseValue + intensity * scaleFactor;
}

export interface ProximityOptions {
  ref: React.RefObject<HTMLElement | null>;
  baseValue: number;
  mouseX: MotionValue<number>;
  scrollX: MotionValue<number>;
  centerX: number;
  intensity?: number;
  reset?: boolean;
  transformer?: (
    distance: number,
    initialValue: number,
    baseValue: number,
    intensity: number
  ) => number;
}

export function useProximity(
  value: MotionValue<number>,
  {
    ref,
    baseValue,
    mouseX,
    scrollX,
    centerX,
    intensity = DEFAULT_INTENSITY,
    reset = true,
    transformer = transformScale,
  }: ProximityOptions
) {
  const initialValueRef = React.useRef<number>(null);

  React.useEffect(() => {
    if (!initialValueRef.current) {
      initialValueRef.current = value.get();
    }
  }, []);

  useMotionValueEvent(mouseX, "change", (latest) => {
    // Calculate position based on viewport width for consistency with NumberLabel
    const viewportWidth = window.innerWidth;
    const lineIndex = centerX / LINE_STEP;
    const actualPosition = (lineIndex / (LINE_COUNT - 1)) * viewportWidth;
    const distance = Math.abs(latest - actualPosition);
    const targetScale = transformer(distance, initialValueRef.current!, baseValue, intensity);
    value.set(targetScale);
  });

  useMotionValueEvent(scrollX, "change", (latest) => {
    const initialValue = initialValueRef.current!;
    const distance = latest - centerX;
    const targetScale = transformer(
      distance,
      initialValue,
      baseValue,
      intensity
    );

    if (reset) {
      const currentVelocity = Math.abs(scrollX.getVelocity());
      const velocityThreshold = 300;
      const velocityFactor = Math.min(1, currentVelocity / velocityThreshold);
      const lerped = lerp(initialValue, targetScale, velocityFactor);
      value.set(lerped);
    } else {
      value.set(targetScale);
    }
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////

export function useScrollX(max: number = MAX) {
  const scrollX = useSpring(0, {
    stiffness: 500,
    damping: 40,
    // Lower mass for faster response
    mass: 0.8,
  });

  const { scrollY } = useScroll();
  const targetX = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Calculate progress based on entire page height
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = documentHeight - viewportHeight;
    
    // Map scroll progress to full viewport width
    const scrollProgress = Math.min(latest / maxScroll, 1);
    targetX.current = scrollProgress * window.innerWidth;
  });

  useRequestAnimationFrame(() => {
    const currentX = scrollX.get();
    const smoothX = lerp(currentX, targetX.current, SCROLL_SMOOTHING);
    // Only update if there's a meaningful difference
    if (Math.abs(smoothX - currentX) > 0.01) {
      scrollX.set(smoothX);
    }
  });

  return scrollX;
}

export function useMouseX() {
  const mouseX = useMotionValue<number>(0);

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
    }

    function handleMouseLeave() {
      mouseX.set(0);
    }

    // Add global mouse listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX]);

  function onPointerMove(e: React.PointerEvent) {
    mouseX.set(e.clientX);
  }

  function onPointerLeave() {
    mouseX.set(0);
  }

  return { mouseX, onMouseMove: onPointerMove, onPointerLeave: onPointerLeave };
}

/////////////////////////////////////////////////////////////////////////////////////////////

export function useRequestAnimationFrame(callback: () => void) {
  const requestRef = React.useRef<number | null>(null);

  const animate = () => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function isActive(index: number, count: number): boolean {
  // First and last ticks are always active
  if (index === 0 || index === count - 1) return true;
  // Calculate the step size between active ticks
  const step = count / (Math.floor(count / LINE_GAP) + 1);
  // Check if this index is close to a multiple of the step
  return Math.abs(index % step) < 0.5 || Math.abs((index % step) - step) < 0.5;
}