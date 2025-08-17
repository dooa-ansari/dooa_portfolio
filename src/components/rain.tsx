"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import type { Raindrop, Dimensions } from "@/types/rain_t";

const Rain: React.FC = () => {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [isRaining, setIsRaining] = useState<boolean>(true);
  const [windSpeed, setWindSpeed] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const GRAVITY = 500;
  const TERMINAL_VELOCITY = 400;
  const AIR_RESISTANCE = 0.1;

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setMounted(true), []);

  const createRaindrop = useCallback((): Raindrop => {
    const mass = Math.random() * 0.3 + 0.7;
    const startX = Math.random() * (dimensions.width + 200) - 100;
    return {
      id: Math.random(),
      x: startX,
      y: -50 - Math.random() * 100,
      vx: windSpeed + (Math.random() - 0.5) * 3,
      vy: Math.random() * 50 + 50,
      mass,
      opacity: Math.random() * 0.15 + 0.1,
      length: mass * 8 + 4,
      width: mass * 0.8 + 0.3,
    };
  }, [windSpeed, dimensions.width]);

  useEffect(() => {
    if (!mounted || !isRaining) {
      setRaindrops([]);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const updatePhysics = (): void => {
      const now = Date.now();
      const deltaTime = Math.min((now - lastUpdateRef.current) / 1000, 1 / 30);
      lastUpdateRef.current = now;

      setRaindrops((prev) => {
        const updated = prev
          .map((drop) => {
            const dragForce = drop.vy * drop.vy * AIR_RESISTANCE * 0.001;
            const netAcceleration = GRAVITY - dragForce;
            drop.vy = Math.min(
              drop.vy + netAcceleration * deltaTime,
              TERMINAL_VELOCITY
            );
            drop.x += drop.vx * deltaTime;
            drop.y += drop.vy * deltaTime;
            return drop;
          })
          .filter(
            (drop) =>
              drop.y < dimensions.height + 100 &&
              drop.x > -200 &&
              drop.x < dimensions.width + 200
          );

        if (Math.random() < 0.4) {
          const dropsToAdd = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < dropsToAdd; i++) {
            updated.push(createRaindrop());
          }
        }
        return updated.slice(-150);
      });

      if (isRaining) {
        animationFrameRef.current = requestAnimationFrame(updatePhysics);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [mounted, isRaining, createRaindrop, dimensions.height, dimensions.width]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden -z-10"
      style={{
        background: "linear-gradient(to bottom, #1e293b, #111827, #374151)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(194, 65, 12, 0.1), rgba(88, 28, 135, 0.05), transparent)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {raindrops.map((drop: Raindrop) => {
          const angle = (Math.atan2(drop.vx, drop.vy) * 180) / Math.PI;
          return (
            <div
              key={drop.id}
              className="absolute"
              style={{
                left: `${drop.x}px`,
                top: `${drop.y}px`,
                width: `${drop.width}px`,
                height: `${drop.length}px`,
                background: `linear-gradient(to bottom, transparent, rgba(200,210,230,${drop.opacity}), rgba(180,190,210,${drop.opacity * 0.8}))`,
                borderRadius: "50% 50% 50% 50% / 20% 20% 80% 80%",
                transform: `rotate(${angle}deg)`,
                transformOrigin: "center top",
                filter: "blur(0.3px)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Rain;
