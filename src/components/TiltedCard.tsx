import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string | number;
  containerWidth?: string | number;
  imageHeight?: string | number;
  imageWidth?: string | number;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText = 'Tilted card image',
  captionText,
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.06,
  rotateAmplitude = 14,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent,
  className = '',
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for raw mouse coordinates normalized to [-1, 1]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position in pixels for tooltip & glare
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics spring configuration for ultra-smooth buttery tilt
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothScale = useSpring(1, springConfig);

  // Map normalized coordinates to rotation angles
  // Moving mouse to right (positive x) tilts card so right side moves away => positive rotateY
  // Moving mouse to top (negative y) tilts top backwards => positive rotateX
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

  // Dynamic specular glare opacity & position
  const glareOpacity = useTransform(smoothScale, [1, scaleOnHover], [0, 0.35]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mousePosX = e.clientX - rect.left;
    const mousePosY = e.clientY - rect.top;

    // Relative to center normalized from -0.5 to 0.5
    const xPct = mousePosX / width - 0.5;
    const yPct = mousePosY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    mouseX.set(mousePosX);
    mouseY.set(mousePosY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    smoothScale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    smoothScale.set(1);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none cursor-pointer [perspective:1000px] ${className}`}
      style={{
        width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth,
        height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight,
      }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 group-hover:shadow-2xl"
        style={{
          rotateX,
          rotateY,
          scale: smoothScale,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main Image */}
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            width: typeof imageWidth === 'number' ? `${imageWidth}px` : imageWidth,
            height: typeof imageHeight === 'number' ? `${imageHeight}px` : imageHeight,
          }}
          referrerPolicy="no-referrer"
        />

        {/* Ambient Dark Gradient Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#26140A]/70 via-transparent to-transparent pointer-events-none" />

        {/* Interactive Specular Glare/Shine */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle 180px at ${mouseX.get()}px ${mouseY.get()}px, rgba(255,255,255,0.45), transparent 70%)`,
          }}
        />

        {/* Overlay Content */}
        {displayOverlayContent && overlayContent && (
          <div
            className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-3"
            style={{ transform: 'translateZ(30px)' }}
          >
            {overlayContent}
          </div>
        )}

        {/* Child Slot */}
        {children && (
          <div className="relative z-10 w-full h-full" style={{ transform: 'translateZ(20px)' }}>
            {children}
          </div>
        )}
      </motion.div>

      {/* Floating Caption / Tooltip Following Cursor (ReactBits signature feature) */}
      {showTooltip && captionText && isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="pointer-events-none absolute z-50 px-2.5 py-1 rounded-full bg-[#4A2C2A]/90 backdrop-blur-xs text-[#FDF8F2] text-[10px] font-bold tracking-wider uppercase border border-white/20 shadow-lg"
          style={{
            left: mouseX.get() + 12,
            top: mouseY.get() + 12,
          }}
        >
          {captionText}
        </motion.div>
      )}

      {/* Mobile Notice if requested */}
      {showMobileWarning && (
        <div className="sm:hidden absolute top-2 right-2 text-[9px] bg-white/80 px-1.5 py-0.5 rounded text-[#4A2C2A]">
          Tilt on desktop
        </div>
      )}
    </div>
  );
};
