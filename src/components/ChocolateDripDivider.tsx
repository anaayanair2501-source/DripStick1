import React from 'react';

interface ChocolateDripDividerProps {
  fillColor?: string;
  secondaryFillColor?: string;
  inverted?: boolean;
  showDrops?: boolean;
  accentType?: 'chocolate' | 'strawberry' | 'caramel' | 'pistachio' | 'blue';
  customDropColor?: string;
}

export const ChocolateDripDivider: React.FC<ChocolateDripDividerProps> = ({
  fillColor = '#4A2C2A',
  secondaryFillColor,
  inverted = false,
  showDrops = true,
  accentType = 'chocolate',
  customDropColor,
}) => {
  const dropColors: Record<string, string> = {
    chocolate: '#4A2C2A',
    strawberry: '#F472B6',
    caramel: '#F59E0B',
    pistachio: '#10B981',
    blue: '#38BDF8',
  };

  const dropColor = customDropColor || dropColors[accentType] || secondaryFillColor || fillColor;

  return (
    <div className={`relative w-full overflow-hidden leading-none z-10 ${inverted ? 'rotate-180 -mt-1' : '-mb-1'}`}>
      
      {/* Background secondary pastel shadow wave */}
      {secondaryFillColor && (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute inset-0 block w-full h-12 sm:h-16 lg:h-20 opacity-40 translate-y-1.5"
        >
          <path
            d="M0,0 L0,45 C50,45 70,105 100,105 C130,105 150,35 190,35 C230,35 250,115 280,115 C310,115 330,50 370,50 C410,50 430,85 460,85 C490,85 510,25 550,25 C590,25 610,110 650,110 C690,110 710,40 750,40 C790,40 820,95 850,95 C880,95 900,30 940,30 C980,30 1000,120 1040,120 C1080,120 1110,55 1150,55 C1180,55 1195,80 1200,80 L1200,0 Z"
            fill={secondaryFillColor}
          />
        </svg>
      )}

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
            className="absolute top-10 left-[7.5%] w-2.5 h-3 rounded-full animate-drop"
            style={{ backgroundColor: dropColor, animationDelay: '0.2s', animationDuration: '3.2s' }}
          />
          <div
            className="absolute top-12 left-[22.5%] w-3 h-4 rounded-full animate-drop"
            style={{ backgroundColor: dropColor, animationDelay: '1.4s', animationDuration: '4s' }}
          />
          <div
            className="absolute top-11 left-[53.3%] w-2.5 h-3.5 rounded-full animate-drop"
            style={{ backgroundColor: dropColor, animationDelay: '0.8s', animationDuration: '3.6s' }}
          />
          <div
            className="absolute top-12 left-[85.8%] w-3.5 h-4.5 rounded-full animate-drop"
            style={{ backgroundColor: dropColor, animationDelay: '2.1s', animationDuration: '4.2s' }}
          />
        </div>
      )}
    </div>
  );
};

