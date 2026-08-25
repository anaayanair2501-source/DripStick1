import React, { useRef, useState, useEffect, ReactNode } from 'react';

export interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  borderWidth?: number;
  borderRadius?: string;
  interactive?: boolean;
  animatedBeam?: boolean;
  beamDuration?: number;
  beamColor?: string;
}

export const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  glowColor = '#D2916C',
  glowSize = 250,
  borderWidth = 3,
  borderRadius = 'rounded-t-full rounded-b-3xl',
  interactive = true,
  animatedBeam = true,
  beamDuration = 6,
  beamColor = 'rgba(210, 145, 108, 0.95)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (interactive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (interactive) setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative p-[${borderWidth}px] ${borderRadius} transition-all duration-300 group/glow ${className}`}
      style={{
        padding: `${borderWidth}px`,
      }}
    >
      {/* 1. Ambient Outer Diffuse Glow on background */}
      <div
        className={`absolute -inset-2 ${borderRadius} blur-xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-70 scale-102' : 'opacity-35'
        }`}
        style={{
          background: `radial-gradient(circle ${glowSize * 1.2}px at ${mousePosition.x}px ${
            mousePosition.y
          }px, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* 2. Continuous Rotating / Orbiting Border Beam (Conic Gradient) */}
      {animatedBeam && (
        <div
          className={`absolute inset-0 ${borderRadius} overflow-hidden pointer-events-none`}
        >
          <div
            className="absolute -inset-[100%] w-[300%] h-[300%] top-[-100%] left-[-100%] animate-spin pointer-events-none"
            style={{
              animationDuration: `${beamDuration}s`,
              background: `conic-gradient(from 0deg, transparent 0deg 300deg, ${beamColor} 340deg, #FFFFFF 355deg, ${beamColor} 360deg)`,
            }}
          />
        </div>
      )}

      {/* 3. Mouse-Tracking Interactive Border Glow (Radial Gradient Mask) */}
      {interactive && (
        <div
          className={`absolute inset-0 ${borderRadius} transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-40'
          }`}
          style={{
            background: `radial-gradient(circle ${glowSize}px at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, #F5EEDB 40%, transparent 75%)`,
          }}
        />
      )}

      {/* 4. Base Static Accent Border Fallback */}
      <div
        className={`absolute inset-0 ${borderRadius} border border-white/60 pointer-events-none shadow-inner`}
      />

      {/* 5. Inner Card Content Layer */}
      <div className={`relative z-10 w-full h-full ${borderRadius} overflow-hidden bg-[#3D2314]`}>
        {children}
      </div>

      {/* 6. Corner Specular Edge Highlight */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/3 ${borderRadius} bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-20`}
      />
    </div>
  );
};
