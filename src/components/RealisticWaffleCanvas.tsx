import React from 'react';
import { WaffleBase, SauceDip, Topping, DrizzleExtra } from '../types';

interface RealisticWaffleCanvasProps {
  selectedBase: WaffleBase;
  selectedSauce: SauceDip;
  selectedToppings: Topping[];
  selectedDrizzle?: DrizzleExtra;
  className?: string;
}

export const RealisticWaffleCanvas: React.FC<RealisticWaffleCanvasProps> = ({
  selectedBase,
  selectedSauce,
  selectedToppings,
  selectedDrizzle,
  className = '',
}) => {
  // Determine waffle batter colors & gradients based on selectedBase
  const baseTheme = React.useMemo(() => {
    switch (selectedBase.id) {
      case 'base-dark':
        return {
          gradientStart: '#422420',
          gradientMid: '#2B1513',
          gradientEnd: '#1A0B09',
          ridgeColor: '#532D28',
          shadowColor: '#120706',
          pocketInner: '#1E0E0C',
          textureType: 'dark',
          sugarPearls: false,
        };
      case 'base-speculoos':
        return {
          gradientStart: '#CE8246',
          gradientMid: '#A75E25',
          gradientEnd: '#73370F',
          ridgeColor: '#E29A5E',
          shadowColor: '#522407',
          pocketInner: '#8F4A18',
          textureType: 'speculoos',
          sugarPearls: true,
        };
      case 'base-churro':
        return {
          gradientStart: '#F3B56E',
          gradientMid: '#D48637',
          gradientEnd: '#9B541B',
          ridgeColor: '#FFCB8A',
          shadowColor: '#6B350C',
          pocketInner: '#B86A22',
          textureType: 'churro',
          sugarPearls: true,
        };
      case 'base-classic':
      default:
        return {
          gradientStart: '#F9CF88',
          gradientMid: '#E39A3C',
          gradientEnd: '#A85E15',
          ridgeColor: '#FFE0A3',
          shadowColor: '#7A3F08',
          pocketInner: '#C57E24',
          textureType: 'classic',
          sugarPearls: true,
        };
    }
  }, [selectedBase.id]);

  // Determine sauce dip appearance
  const sauceColor = selectedSauce.color || '#6F4125';
  const isWhiteChocolate = selectedSauce.id === 'sauce-white-velvet';
  const isDarkChocolate = selectedSauce.id === 'sauce-dark-choco';
  const isHazelnutBueno = selectedSauce.id === 'sauce-bueno';
  const isBiscoffLava = selectedSauce.id === 'sauce-speculoos-dip';

  const sauceGradient = React.useMemo(() => {
    if (isWhiteChocolate) {
      return {
        start: '#FFFDF9',
        mid: '#F6EEDB',
        end: '#E4D3B6',
        highlight: 'rgba(255, 255, 255, 0.95)',
        shadow: '#C5B190',
      };
    }
    if (isDarkChocolate) {
      return {
        start: '#361D1A',
        mid: '#23110F',
        end: '#130807',
        highlight: 'rgba(255, 255, 255, 0.45)',
        shadow: '#0B0403',
      };
    }
    if (isHazelnutBueno) {
      return {
        start: '#E29E77',
        mid: '#C47C50',
        end: '#94532B',
        highlight: 'rgba(255, 255, 255, 0.75)',
        shadow: '#6A3719',
      };
    }
    if (isBiscoffLava) {
      return {
        start: '#CE8B54',
        mid: '#B1682F',
        end: '#7C4116',
        highlight: 'rgba(255, 255, 255, 0.8)',
        shadow: '#54280B',
      };
    }
    // Belgian Milk & Nutella default
    return {
      start: '#875131',
      mid: '#64381E',
      end: '#3D1F0E',
      highlight: 'rgba(255, 255, 255, 0.7)',
      shadow: '#261208',
    };
  }, [isWhiteChocolate, isDarkChocolate, isHazelnutBueno, isBiscoffLava]);

  // Drizzle appearance
  const drizzleColor = selectedDrizzle?.color || '#FFFFFF';

  // Grid coordinates for 4 columns x 7 rows of waffle indentations
  const gridCells = React.useMemo(() => {
    const cells = [];
    const cols = 4;
    const rows = 7;
    const cellWidth = 20;
    const cellHeight = 22;
    const startX = 77;
    const startY = 48;
    const gapX = 6;
    const gapY = 6;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Skip corner pockets to give authentic rounded oval contour
        if ((r === 0 && (c === 0 || c === 3)) || (r === 6 && (c === 0 || c === 3))) {
          continue;
        }
        cells.push({
          id: `${r}-${c}`,
          x: startX + c * (cellWidth + gapX),
          y: startY + r * (cellHeight + gapY),
          w: cellWidth,
          h: cellHeight,
          row: r,
        });
      }
    }
    return cells;
  }, []);

  // Has topping helper
  const hasTopping = (id: string) => selectedToppings.some((t) => t.id === id);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 250 370"
        className="w-full h-full max-h-[360px] drop-shadow-2xl transition-all duration-500 ease-out"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Wooden Skewer Cylindrical Shading */}
          <linearGradient id="skewerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A37148" />
            <stop offset="25%" stopColor="#DFB68F" />
            <stop offset="65%" stopColor="#C69466" />
            <stop offset="100%" stopColor="#7E4E28" />
          </linearGradient>

          {/* Waffle Batter Base Gradient */}
          <linearGradient id="waffleBatterGrad" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor={baseTheme.gradientStart} />
            <stop offset="45%" stopColor={baseTheme.gradientMid} />
            <stop offset="90%" stopColor={baseTheme.gradientEnd} />
          </linearGradient>

          {/* Pocket Inset Shadow Gradient */}
          <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={baseTheme.shadowColor} stopOpacity="0.85" />
            <stop offset="40%" stopColor={baseTheme.pocketInner} stopOpacity="0.95" />
            <stop offset="100%" stopColor={baseTheme.ridgeColor} stopOpacity="0.3" />
          </linearGradient>

          {/* Molten Chocolate Couverture Dip Gradient */}
          <linearGradient id="chocolateDipGrad" x1="20%" y1="0%" x2="75%" y2="100%">
            <stop offset="0%" stopColor={sauceGradient.start} />
            <stop offset="35%" stopColor={sauceGradient.mid} />
            <stop offset="85%" stopColor={sauceGradient.end} />
            <stop offset="100%" stopColor={sauceGradient.shadow} />
          </linearGradient>

          {/* Specular Liquid Shine for warm melted couverture */}
          <linearGradient id="specularGleam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={sauceGradient.highlight} stopOpacity="0.75" />
            <stop offset="60%" stopColor={sauceGradient.highlight} stopOpacity="0.25" />
            <stop offset="100%" stopColor={sauceGradient.highlight} stopOpacity="0" />
          </linearGradient>

          {/* Drip Droplet Specular */}
          <radialGradient id="dropletHighlight" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Drop Shadow for Waffle on Table */}
          <filter id="waffleShadow" x="-20%" y="-15%" width="140%" height="135%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#361A17" floodOpacity="0.32" />
          </filter>

          {/* Soft Shadow for Toppings */}
          <filter id="toppingShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0.5" dy="1.5" stdDeviation="1" floodColor="#180A08" floodOpacity="0.5" />
          </filter>

          {/* 3D Drizzle Shadow */}
          <filter id="drizzleShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2.5" stdDeviation="1.5" floodColor="#1F0E0B" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. WOODEN CRAFT SKEWER */}
        <g id="wooden-skewer">
          {/* Stick Shadow */}
          <rect x="115" y="240" width="20" height="118" rx="8" fill="#25120F" opacity="0.25" />
          {/* Main Stick */}
          <rect x="114" y="235" width="22" height="120" rx="9" fill="url(#skewerGrad)" />
          {/* Wood Grain Lines */}
          <line x1="118" y1="240" x2="118" y2="350" stroke="#8A5A35" strokeWidth="1" opacity="0.4" />
          <line x1="126" y1="238" x2="126" y2="352" stroke="#5E3516" strokeWidth="0.8" opacity="0.3" />
          <line x1="131" y1="242" x2="131" y2="348" stroke="#FFE2C2" strokeWidth="0.75" opacity="0.5" />
          {/* Subtle Laser Etched Brand */}
          <text
            x="125"
            y="315"
            transform="rotate(90, 125, 315)"
            fill="#5D351B"
            fontSize="7"
            fontFamily="Syne, sans-serif"
            fontWeight="900"
            letterSpacing="2"
            textAnchor="middle"
            opacity="0.75"
          >
            DRIPSTICK
          </text>
        </g>

        {/* 2. REALISTIC BELGIAN WAFFLE CONE BODY */}
        <g id="waffle-body" filter="url(#waffleShadow)">
          {/* Main Oval Waffle Crust Contour */}
          <path
            d="
              M 65 65
              C 65 20, 185 20, 185 65
              L 180 238
              C 180 254, 70 254, 70 238
              Z
            "
            fill="url(#waffleBatterGrad)"
            stroke={baseTheme.shadowColor}
            strokeWidth="1.5"
          />

          {/* Crust Outer Crispy Edge Ring (Highlight & Toast) */}
          <path
            d="
              M 66 65
              C 66 22, 184 22, 184 65
              L 179 237
              C 179 252, 71 252, 71 237
              Z
            "
            fill="none"
            stroke={baseTheme.ridgeColor}
            strokeWidth="1.2"
            opacity="0.65"
          />

          {/* Cinnamon Churro Sugar Sparkles */}
          {baseTheme.textureType === 'churro' && (
            <g opacity="0.65">
              <circle cx="95" cy="205" r="1" fill="#FFFFFF" />
              <circle cx="145" cy="215" r="1.2" fill="#FFFFFF" />
              <circle cx="120" cy="235" r="0.9" fill="#FFF8E7" />
              <circle cx="160" cy="195" r="1.1" fill="#FFFFFF" />
              <circle cx="85" cy="225" r="0.8" fill="#FFFFFF" />
              {/* Cinnamon specks */}
              <circle cx="105" cy="210" r="1" fill="#5C2607" />
              <circle cx="135" cy="225" r="1.2" fill="#4A1D04" />
              <circle cx="150" cy="238" r="0.9" fill="#5C2607" />
            </g>
          )}

          {/* 3D Deep Waffle Pockets Grid */}
          <g id="waffle-pockets">
            {gridCells.map((cell) => (
              <g key={cell.id} className="transition-all duration-300">
                {/* Pocket Outer Ridge Highlight */}
                <rect
                  x={cell.x - 0.5}
                  y={cell.y - 0.5}
                  width={cell.w + 1}
                  height={cell.h + 1}
                  rx="3.5"
                  fill="none"
                  stroke={baseTheme.ridgeColor}
                  strokeWidth="1"
                  opacity="0.45"
                />
                {/* Deep Recessed Pocket Cell */}
                <rect
                  x={cell.x}
                  y={cell.y}
                  width={cell.w}
                  height={cell.h}
                  rx="3"
                  fill="url(#pocketGrad)"
                  stroke={baseTheme.shadowColor}
                  strokeWidth="0.8"
                  opacity="0.9"
                />
                {/* Inner Pocket Bottom Glow */}
                <circle
                  cx={cell.x + cell.w / 2}
                  cy={cell.y + cell.h / 2 + 2}
                  r="4.5"
                  fill={baseTheme.ridgeColor}
                  opacity="0.25"
                />
              </g>
            ))}
          </g>

          {/* Authentic Belgian Pearl Sugar Chunks (embedded in lower visible crust) */}
          {baseTheme.sugarPearls && (
            <g id="pearl-sugars" opacity="0.85">
              <path
                d="M 88 220 L 92 218 L 94 223 L 89 224 Z"
                fill="#FFFDF5"
                stroke="#CFA067"
                strokeWidth="0.5"
              />
              <path
                d="M 148 226 L 153 224 L 154 229 L 149 231 Z"
                fill="#FFFDF5"
                stroke="#CFA067"
                strokeWidth="0.5"
              />
              <path
                d="M 120 238 L 124 236 L 126 240 L 122 241 Z"
                fill="#FFFDF5"
                stroke="#CFA067"
                strokeWidth="0.5"
              />
            </g>
          )}

          {/* 3. MOLTEN CHOCOLATE DIP COATING (Top 60% with thick organic scalloped drips) */}
          <g id="molten-chocolate-dip">
            {/* Ambient Liquid Shadow onto Waffle below the dip */}
            <path
              d="
                M 65 65
                C 65 20, 185 20, 185 65
                L 182 148
                C 172 152, 165 140, 155 145
                C 148 150, 142 178, 137 178
                C 133 178, 130 152, 122 152
                C 114 152, 110 188, 103 188
                C 97 188, 94 150, 85 152
                C 76 154, 72 144, 68 142
                Z
              "
              fill="#180A08"
              opacity="0.35"
              filter="blur(2px)"
            />

            {/* Main Molten Couverture Layer with Organic Viscous Meniscus & Drips */}
            <path
              d="
                M 65 65
                C 65 20, 185 20, 185 65
                L 182 145
                C 174 148, 168 138, 158 142
                C 152 145, 148 168, 142 168
                C 137 168, 134 146, 126 146
                C 118 146, 115 178, 107 178
                C 101 178, 97 146, 88 148
                C 78 150, 72 138, 68 140
                Z
              "
              fill="url(#chocolateDipGrad)"
              stroke={sauceGradient.shadow}
              strokeWidth="1"
            />

            {/* Slow Pulsating Drip Streams flowing into waffle crevices */}
            {/* Drip 1: Left Tear Drip */}
            <g className="animate-drip" style={{ transformOrigin: '107px 146px' }}>
              <path
                d="
                  M 103 172
                  C 103 186, 102 196, 102 206
                  C 102 213, 111 213, 111 206
                  C 111 196, 110 186, 110 172
                  Z
                "
                fill="url(#chocolateDipGrad)"
              />
              {/* Bulbous tip droplet */}
              <circle cx="106.5" cy="207" r="4.5" fill={sauceGradient.end} />
              <circle cx="105.5" cy="205.5" r="2" fill="url(#dropletHighlight)" />
            </g>

            {/* Drip 2: Center-Right Long Drip */}
            <g
              className="animate-drip"
              style={{ transformOrigin: '142px 145px', animationDelay: '0.8s' }}
            >
              <path
                d="
                  M 138 164
                  C 138 178, 137 188, 137 198
                  C 137 205, 146 205, 146 198
                  C 146 188, 145 178, 145 164
                  Z
                "
                fill="url(#chocolateDipGrad)"
              />
              <circle cx="141.5" cy="199" r="4.2" fill={sauceGradient.end} />
              <circle cx="140.5" cy="197.5" r="1.8" fill="url(#dropletHighlight)" />
            </g>

            {/* Drip 3: Right Side Medium Drip */}
            <path
              d="
                M 166 142
                C 166 154, 165 162, 165 170
                C 165 175, 172 175, 172 170
                C 172 162, 171 154, 171 142
                Z
              "
              fill="url(#chocolateDipGrad)"
            />
            <circle cx="168.5" cy="170" r="3.2" fill={sauceGradient.end} />
            <circle cx="167.5" cy="169" r="1.4" fill="url(#dropletHighlight)" />

            {/* Specular Curved Sheen across the top dome (Warm Softbox Reflection) */}
            <path
              d="
                M 78 52
                C 90 28, 160 28, 172 52
                C 152 42, 98 42, 78 52
                Z
              "
              fill="url(#specularGleam)"
            />

            {/* Subtle Liquid Highlight Lip along the wave edges */}
            <path
              d="
                M 70 141
                C 75 145, 82 147, 88 147
                M 112 168
                C 118 164, 126 146, 135 146
                M 145 166
                C 150 162, 158 143, 166 142
              "
              fill="none"
              stroke={sauceGradient.highlight}
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>

          {/* 4. REALISTIC CRUNCHY TOPPINGS (Rendered directly on warm chocolate) */}
          <g id="toppings-layer" filter="url(#toppingShadow)">
            {/* OREO CRUSHED CRUMBS */}
            {hasTopping('top-oreo') && (
              <g id="topping-oreo">
                {/* Irregular Dark Cookie Crumbles with soft 3D facets */}
                <rect x="92" y="70" width="7" height="6" rx="2" fill="#1C1412" transform="rotate(15 95 73)" />
                <rect x="135" y="65" width="8" height="7" rx="2" fill="#261A16" transform="rotate(-20 139 68)" />
                <rect x="110" y="85" width="9" height="7" rx="2.5" fill="#150E0C" transform="rotate(35 114 88)" />
                <rect x="80" y="98" width="8" height="6" rx="2" fill="#2A1C18" transform="rotate(-10 84 101)" />
                <rect x="150" y="92" width="9" height="8" rx="2" fill="#19110F" transform="rotate(25 154 96)" />
                <rect x="122" y="112" width="10" height="7" rx="2.5" fill="#241915" transform="rotate(-15 127 115)" />
                <rect x="96" y="128" width="8" height="6" rx="2" fill="#18100E" transform="rotate(40 100 131)" />
                <rect x="142" y="126" width="9" height="7" rx="2" fill="#261B17" transform="rotate(-30 146 129)" />
                {/* Smaller biscuit dust & crumbs */}
                <circle cx="85" cy="80" r="2.2" fill="#18110F" />
                <circle cx="122" cy="72" r="2" fill="#2A1C18" />
                <circle cx="102" cy="105" r="2.5" fill="#1A1210" />
                <circle cx="138" cy="100" r="2.2" fill="#261A16" />
                <circle cx="158" cy="118" r="2.4" fill="#18110F" />
                <circle cx="112" cy="138" r="2.2" fill="#2C1D19" />
                {/* Signature Oreo sweet white cream flecks */}
                <circle cx="95" cy="72" r="1.3" fill="#FFFDF8" opacity="0.95" />
                <circle cx="114" cy="87" r="1.5" fill="#FFFDF8" opacity="0.95" />
                <circle cx="145" cy="128" r="1.4" fill="#FFFDF8" opacity="0.95" />
                <circle cx="82" cy="100" r="1.2" fill="#FFFDF8" opacity="0.95" />
              </g>
            )}

            {/* LOTUS BISCOFF CRUMBS */}
            {hasTopping('top-biscoff') && (
              <g id="topping-biscoff">
                <rect x="100" y="62" width="8" height="6" rx="1.5" fill="#C97B3C" transform="rotate(-15 104 65)" />
                <rect x="128" y="76" width="9" height="7" rx="2" fill="#DE8F4E" transform="rotate(25 132 79)" />
                <rect x="88" y="90" width="8" height="6" rx="1.5" fill="#B26528" transform="rotate(45 92 93)" />
                <rect x="145" y="82" width="7" height="6" rx="1.5" fill="#E59958" transform="rotate(-35 148 85)" />
                <rect x="115" y="102" width="10" height="8" rx="2" fill="#C07233" transform="rotate(10 120 106)" />
                <rect x="135" y="118" width="9" height="7" rx="1.5" fill="#DE8F4E" transform="rotate(-20 139 121)" />
                <rect x="90" y="122" width="8" height="6" rx="1.5" fill="#A85C22" transform="rotate(15 94 125)" />
                {/* Crunchy caramel biscuit flakes */}
                <circle cx="110" cy="70" r="2.4" fill="#F0A668" />
                <circle cx="140" cy="65" r="2.2" fill="#B26528" />
                <circle cx="102" cy="116" r="2.5" fill="#E59958" />
                <circle cx="152" cy="108" r="2.2" fill="#D08242" />
                <circle cx="120" cy="132" r="2.5" fill="#F0A668" />
                <circle cx="82" cy="112" r="2" fill="#B26528" />
                {/* Glistening spiced sugar sparkles */}
                <circle cx="129" cy="78" r="0.9" fill="#FFF8E7" />
                <circle cx="116" cy="104" r="1" fill="#FFF8E7" />
                <circle cx="136" cy="120" r="0.9" fill="#FFF8E7" />
              </g>
            )}

            {/* CHUNKY KITKAT WAFER BITES */}
            {hasTopping('top-kitkat') && (
              <g id="topping-kitkat">
                {/* 3D Rectangular Wafer Blocks */}
                <g transform="translate(85, 72) rotate(12)">
                  <rect x="0" y="0" width="14" height="8" rx="2" fill="#5A3119" stroke="#3D1D0D" strokeWidth="0.8" />
                  <line x1="2" y1="4" x2="12" y2="4" stroke="#E3B383" strokeWidth="1" />
                </g>
                <g transform="translate(132, 85) rotate(-18)">
                  <rect x="0" y="0" width="15" height="9" rx="2" fill="#6A3B20" stroke="#3D1D0D" strokeWidth="0.8" />
                  <line x1="2" y1="4.5" x2="13" y2="4.5" stroke="#E3B383" strokeWidth="1.2" />
                </g>
                <g transform="translate(100, 110) rotate(22)">
                  <rect x="0" y="0" width="16" height="9" rx="2" fill="#522B15" stroke="#3D1D0D" strokeWidth="0.8" />
                  <line x1="2" y1="4.5" x2="14" y2="4.5" stroke="#E3B383" strokeWidth="1.2" />
                </g>
                <g transform="translate(138, 125) rotate(-8)">
                  <rect x="0" y="0" width="14" height="8" rx="2" fill="#63371D" stroke="#3D1D0D" strokeWidth="0.8" />
                  <line x1="2" y1="4" x2="12" y2="4" stroke="#E3B383" strokeWidth="1" />
                </g>
                {/* Wafer biscuit flakes */}
                <rect x="115" y="80" width="5" height="4" rx="1" fill="#D99E68" />
                <rect x="88" y="105" width="5" height="4" rx="1" fill="#D99E68" />
                <rect x="122" y="130" width="6" height="4" rx="1" fill="#D99E68" />
              </g>
            )}

            {/* ROASTED HAZELNUT PEARLS */}
            {hasTopping('top-hazelnut') && (
              <g id="topping-hazelnut">
                {/* Chunky golden roasted hazelnut nuggets */}
                <ellipse cx="94" cy="74" rx="4.5" ry="3.5" fill="#E8B87C" stroke="#7A3D16" strokeWidth="1.2" />
                <ellipse cx="138" cy="70" rx="5" ry="4" fill="#DDA564" stroke="#7A3D16" strokeWidth="1.2" />
                <ellipse cx="118" cy="92" rx="5.5" ry="4.5" fill="#E8B87C" stroke="#7A3D16" strokeWidth="1.4" />
                <ellipse cx="85" cy="115" rx="4.5" ry="3.8" fill="#D29654" stroke="#68300E" strokeWidth="1.2" />
                <ellipse cx="145" cy="108" rx="5" ry="4" fill="#E8B87C" stroke="#7A3D16" strokeWidth="1.2" />
                <ellipse cx="110" cy="126" rx="4.8" ry="4" fill="#DDA564" stroke="#7A3D16" strokeWidth="1.2" />
                <ellipse cx="132" cy="138" rx="4.5" ry="3.5" fill="#E8B87C" stroke="#7A3D16" strokeWidth="1.2" />
                {/* Specular gleam on roasted nut oils */}
                <circle cx="93" cy="73" r="1.2" fill="#FFF8EE" />
                <circle cx="117" cy="90" r="1.5" fill="#FFF8EE" />
                <circle cx="144" cy="106" r="1.4" fill="#FFF8EE" />
              </g>
            )}

            {/* CARNIVAL RAINBOW CONFETTI SPRINKLES */}
            {hasTopping('top-sprinkles') && (
              <g id="topping-sprinkles">
                {/* Vibrant colorful rod sprinkles */}
                <rect x="90" y="65" width="8" height="3" rx="1.5" fill="#F43F5E" transform="rotate(25 94 66)" />
                <rect x="125" y="68" width="8" height="3" rx="1.5" fill="#38BDF8" transform="rotate(-40 129 69)" />
                <rect x="145" y="78" width="8" height="3" rx="1.5" fill="#FBBF24" transform="rotate(15 149 79)" />
                <rect x="80" y="88" width="8" height="3" rx="1.5" fill="#A855F7" transform="rotate(-20 84 89)" />
                <rect x="110" y="85" width="8" height="3" rx="1.5" fill="#10B981" transform="rotate(65 114 86)" />
                <rect x="135" y="98" width="8" height="3" rx="1.5" fill="#F43F5E" transform="rotate(-15 139 99)" />
                <rect x="95" y="112" width="8" height="3" rx="1.5" fill="#38BDF8" transform="rotate(35 99 113)" />
                <rect x="150" y="115" width="8" height="3" rx="1.5" fill="#FBBF24" transform="rotate(-50 154 116)" />
                <rect x="118" y="122" width="8" height="3" rx="1.5" fill="#EC4899" transform="rotate(10 122 123)" />
                <rect x="85" y="132" width="8" height="3" rx="1.5" fill="#10B981" transform="rotate(-30 89 133)" />
                <rect x="138" y="136" width="8" height="3" rx="1.5" fill="#A855F7" transform="rotate(45 142 137)" />
                {/* Round confetti dots */}
                <circle cx="102" cy="76" r="2.2" fill="#FBBF24" />
                <circle cx="140" cy="88" r="2.2" fill="#EC4899" />
                <circle cx="90" cy="102" r="2.2" fill="#38BDF8" />
                <circle cx="128" cy="110" r="2.2" fill="#10B981" />
                <circle cx="108" cy="135" r="2.2" fill="#F43F5E" />
              </g>
            )}

            {/* BELGIAN DUAL CRISP PEARLS */}
            {hasTopping('top-choco-crisps') && (
              <g id="topping-crisp-pearls">
                {/* 3D Shiny Chocolate Spheres (Dark and Blonde Caviar Pearls) */}
                {/* Dark pearls */}
                <g>
                  <circle cx="88" cy="72" r="4.2" fill="#20110E" stroke="#000000" strokeWidth="0.5" />
                  <circle cx="86.5" cy="70.5" r="1.5" fill="#FFFFFF" opacity="0.6" />
                </g>
                <g>
                  <circle cx="142" cy="74" r="4.5" fill="#281512" stroke="#000000" strokeWidth="0.5" />
                  <circle cx="140.5" cy="72.5" r="1.6" fill="#FFFFFF" opacity="0.6" />
                </g>
                <g>
                  <circle cx="105" cy="98" r="4.8" fill="#1E0E0B" stroke="#000000" strokeWidth="0.5" />
                  <circle cx="103" cy="96" r="1.8" fill="#FFFFFF" opacity="0.6" />
                </g>
                <g>
                  <circle cx="148" cy="116" r="4.2" fill="#241310" stroke="#000000" strokeWidth="0.5" />
                  <circle cx="146.5" cy="114.5" r="1.5" fill="#FFFFFF" opacity="0.6" />
                </g>
                <g>
                  <circle cx="92" cy="126" r="4.5" fill="#1E0E0B" stroke="#000000" strokeWidth="0.5" />
                  <circle cx="90.5" cy="124.5" r="1.6" fill="#FFFFFF" opacity="0.6" />
                </g>

                {/* Blonde / White crispy pearls */}
                <g>
                  <circle cx="118" cy="68" r="4.2" fill="#E8C99B" stroke="#A88052" strokeWidth="0.5" />
                  <circle cx="116.5" cy="66.5" r="1.5" fill="#FFFFFF" opacity="0.8" />
                </g>
                <g>
                  <circle cx="82" cy="95" r="4.5" fill="#F0D5AF" stroke="#B28C5E" strokeWidth="0.5" />
                  <circle cx="80.5" cy="93.5" r="1.6" fill="#FFFFFF" opacity="0.8" />
                </g>
                <g>
                  <circle cx="132" cy="98" r="4.6" fill="#E5C392" stroke="#A88052" strokeWidth="0.5" />
                  <circle cx="130.5" cy="96.5" r="1.7" fill="#FFFFFF" opacity="0.8" />
                </g>
                <g>
                  <circle cx="120" cy="132" r="4.5" fill="#F0D5AF" stroke="#B28C5E" strokeWidth="0.5" />
                  <circle cx="118.5" cy="130.5" r="1.6" fill="#FFFFFF" opacity="0.8" />
                </g>
              </g>
            )}
          </g>

          {/* 5. ARTISANAL FINISHING DRIZZLE (3D Cylindrical Tube Effect) */}
          {selectedDrizzle && (
            <g id="finishing-drizzle" filter="url(#drizzleShadow)">
              {/* Drizzle Shadow path */}
              <path
                d="
                  M 75 78
                  Q 120 62 168 76
                  Q 112 98 78 112
                  Q 128 126 172 136
                  Q 115 156 86 166
                "
                fill="none"
                stroke="#150806"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />

              {/* Drizzle Main Sauce Body */}
              <path
                d="
                  M 75 76
                  Q 120 60 168 74
                  Q 112 96 78 110
                  Q 128 124 172 134
                  Q 115 154 86 164
                "
                fill="none"
                stroke={drizzleColor}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Drizzle Specular Highlight Ribbon down the center */}
              <path
                d="
                  M 75 75.5
                  Q 120 59.5 168 73.5
                  Q 112 95.5 78 109.5
                  Q 128 123.5 172 133.5
                  Q 115 153.5 86 163.5
                "
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.65"
              />

              {/* Edible Gold Shimmer Stars for Gold Drizzle */}
              {selectedDrizzle.id.includes('gold') && (
                <g fill="#FFF3B0" opacity="0.9">
                  <path d="M 120 56 L 122 60 L 126 60 L 123 63 L 124 67 L 120 64 L 116 67 L 117 63 L 114 60 L 118 60 Z" />
                  <path d="M 95 106 L 96.5 109 L 100 109 L 97.5 111 L 98.5 114 L 95 112 L 91.5 114 L 92.5 111 L 90 109 L 93.5 109 Z" />
                  <path d="M 155 128 L 156.5 131 L 160 131 L 157.5 133 L 158.5 136 L 155 134 L 151.5 136 L 152.5 133 L 150 131 L 153.5 131 Z" />
                </g>
              )}
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
