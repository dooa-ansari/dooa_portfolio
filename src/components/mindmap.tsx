"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSpring, animated, config } from "react-spring";

// Types for our mindmap data
interface MindMapNode {
  id: string;
  name: string;
  description: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface MindMapLink {
  source: string;
  target: string;
}

// Core values data with proper initial positioning
const createCoreValues = (centerX: number, centerY: number): MindMapNode[] => [
  {
    id: "center",
    name: "Me",
    description: "Software Engineer & Designer",
    color: "#6366f1",
    x: centerX,
    y: centerY,
    vx: 0,
    vy: 0,
  },
  {
    id: "innovation",
    name: "Innovation",
    description: "Pushing boundaries with creative solutions",
    color: "#10b981",
    x: centerX + Math.cos(0) * 150,
    y: centerY + Math.sin(0) * 150,
    vx: 0,
    vy: 0,
  },
  {
    id: "excellence",
    name: "Excellence",
    description: "Striving for the highest quality in everything",
    color: "#f59e0b",
    x: centerX + Math.cos(2 * Math.PI / 5) * 150,
    y: centerY + Math.sin(2 * Math.PI / 5) * 150,
    vx: 0,
    vy: 0,
  },
  {
    id: "collaboration",
    name: "Collaboration",
    description: "Building great things together",
    color: "#ef4444",
    x: centerX + Math.cos(4 * Math.PI / 5) * 150,
    y: centerY + Math.sin(4 * Math.PI / 5) * 150,
    vx: 0,
    vy: 0,
  },
  {
    id: "growth",
    name: "Growth",
    description: "Continuous learning and improvement",
    color: "#8b5cf6",
    x: centerX + Math.cos(6 * Math.PI / 5) * 150,
    y: centerY + Math.sin(6 * Math.PI / 5) * 150,
    vx: 0,
    vy: 0,
  },
  {
    id: "integrity",
    name: "Integrity",
    description: "Honest and ethical in all actions",
    color: "#06b6d4",
    x: centerX + Math.cos(8 * Math.PI / 5) * 150,
    y: centerY + Math.sin(8 * Math.PI / 5) * 150,
    vx: 0,
    vy: 0,
  },
];

const links: MindMapLink[] = [
  { source: "center", target: "innovation" },
  { source: "center", target: "excellence" },
  { source: "center", target: "collaboration" },
  { source: "center", target: "growth" },
  { source: "center", target: "integrity" },
];

export default function MindMap() {
  const [nodes, setNodes] = useState<MindMapNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const width = 900;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;

  // Create spring animations for each node using useMemo
  const nodeSprings = useMemo(() => {
    return nodes.map((node, index) => {
      const isHovered = hoveredNode === node.id;
      const delay = isLoaded ? index * 100 : 0;
      return {
        scale: isHovered ? 1.2 : 1,
        opacity: isLoaded ? 1 : 0,
        delay,
      };
    });
  }, [nodes, hoveredNode, isLoaded]);

  useEffect(() => {
    // Initialize nodes with proper positions
    const initialNodes = createCoreValues(centerX, centerY);
    setNodes(initialNodes);
    
    // Trigger entrance animation after a short delay
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [centerX, centerY]);

  return (
    <div className="w-full flex justify-center items-center p-8">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Links */}
        {links.map((link, i) => {
          const source = nodes.find(n => n.id === link.source);
          const target = nodes.find(n => n.id === link.target);
          
          if (!source || !target) return null;
          
          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: isLoaded ? 1 : 0,
                transitionDelay: `${i * 150}ms`,
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, index) => {
          const isHovered = hoveredNode === node.id;
          const isCenter = node.id === "center";
          const springProps = nodeSprings[index];

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer transition-all duration-500 ease-out"
              style={{
                transform: `translate(${node.x}px, ${node.y}px) scale(${springProps.scale})`,
                transformOrigin: 'center',
                opacity: springProps.opacity,
                transitionDelay: `${springProps.delay}ms`,
              }}
            >
              {/* Node circle */}
              <circle
                r={isCenter ? 35 : 25}
                fill={node.color}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={isHovered ? "3" : "1"}
                className="transition-all duration-300 drop-shadow-lg"
              />
              
              {/* Glow effect on hover */}
              {isHovered && (
                <circle
                  r={isCenter ? 45 : 35}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                />
              )}
              
              {/* Node text */}
              <text
                x={0}
                y={isCenter ? 8 : 6}
                textAnchor="middle"
                fill="white"
                fontSize={isCenter ? "14" : "12"}
                fontWeight="bold"
                className="select-none pointer-events-none"
              >
                {node.name}
              </text>
              
              {/* Description tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={-80}
                    y={-50}
                    width={160}
                    height={40}
                    fill="rgba(0,0,0,0.9)"
                    rx="8"
                    className="drop-shadow-xl"
                  />
                  <text
                    x={0}
                    y={-30}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    className="select-none pointer-events-none"
                  >
                    {node.description}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
