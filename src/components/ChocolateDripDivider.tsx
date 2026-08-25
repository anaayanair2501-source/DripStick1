import React from 'react';

interface ChocolateDripDividerProps {
  fillColor?: string;
  inverted?: boolean;
  showDrops?: boolean;
}

export const ChocolateDripDivider: React.FC<ChocolateDripDividerProps> = ({
  fillColor = '#4A2C2A',
  inverted = false,
  showDrops = true,
}) => {
  return (
    <div className={`relative w-full overflow-hidden leading-none z-10 ${inverted ? 'rotate-180 -mt-1' : '-mb-1'}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-12 sm:h-16 lg:h-20"
      >
        {/* Organic Molten Drip Curves */}
        <path
          d="M0,0 
             L0,40 
             C40,40 60,95 90,95 
             C120,95 140,30 180,30 
             C220,30 240,110 270,110 
             C300,110 320,45 360,45 
             C400,45 420,80 450,80 
             C480,80 500,20 540,20 
             C580,20 600,105 640,105 
             C680,105 700,35 740,35 
             C780,35 810,90 840,90 
             C870,90 890,25 930,25 
             C970,25 990,115 1030,115 
             C1070,115 1100,50 1140,50 
             C1170,50 1190,75 1200,75 
             L1200,0 Z"
          fill={fillColor}
        />
      </svg>

      {/* Falling liquid droplets */}
      {showDrops && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-10 left-[7.5%] w-2.5 h-3 rounded-full bg-[#4A2C2A] animate-drop"
            style={{ animationDelay: '0.2s', animationDuration: '3.2s' }}
          />
          <div
            className="absolute top-12 left-[22.5%] w-3 h-4 rounded-full bg-[#4A2C2A] animate-drop"
            style={{ animationDelay: '1.4s', animationDuration: '4s' }}
          />
          <div
            className="absolute top-11 left-[53.3%] w-2.5 h-3.5 rounded-full bg-[#4A2C2A] animate-drop"
            style={{ animationDelay: '0.8s', animationDuration: '3.6s' }}
          />
          <div
            className="absolute top-12 left-[85.8%] w-3.5 h-4.5 rounded-full bg-[#4A2C2A] animate-drop"
            style={{ animationDelay: '2.1s', animationDuration: '4.2s' }}
          />
        </div>
      )}
    </div>
  );
};
