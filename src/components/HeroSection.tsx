import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Check,
  Plus,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { soundEffects } from '../utils/soundEffects';
import { ShowStopperProduct } from '../types';

interface HeroSectionProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
  onBuildCustom: () => void;
  onAddProductToCart?: (product: ShowStopperProduct) => void;
}

interface FlavorOption {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  price: number;
  rating: number;
  accentColor: string;
  chocolateColor: string;
  image: string;
  origin: string;
}

const FLAVORS: FlavorOption[] = [
  {
    id: 'prod-oreo-drip',
    name: 'Antwerp Oreo Noir',
    shortName: 'Oreo Noir',
    tagline: '38% Belgian milk fondue with crushed dark cocoa biscuits',
    price: 189,
    rating: 4.96,
    accentColor: '#3B82F6',
    chocolateColor: '#361A17',
    image: ASSETS.waffleOreo,
    origin: 'Belgian Milk Fondue',
  },
  {
    id: 'prod-pistachio-dream',
    name: 'Dubai Emerald Pistachio',
    shortName: 'Pistachio Gold',
    tagline: 'Toasted golden kadaifi soaked in Sicilian pistachio cream',
    price: 249,
    rating: 4.98,
    accentColor: '#10B981',
    chocolateColor: '#2D5A27',
    image: ASSETS.wafflePistachio,
    origin: 'Sicilian Pistachio',
  },
  {
    id: 'prod-nutella-royale',
    name: 'Turin Nutella Royale',
    shortName: 'Nutella Royale',
    tagline: 'Warm Piedmont hazelnut cocoa spread with wafer crunches',
    price: 229,
    rating: 4.97,
    accentColor: '#92400E',
    chocolateColor: '#451A03',
    image: ASSETS.waffleNutella,
    origin: 'Piedmont Hazelnut',
  },
  {
    id: 'prod-biscoff',
    name: 'Lotus Speculoos Lava',
    shortName: 'Lotus Biscoff',
    tagline: 'Brown sugar spice, white velvet fondue & biscuit crunch',
    price: 219,
    rating: 4.94,
    accentColor: '#D97706',
    chocolateColor: '#8B4513',
    image: ASSETS.waffleBiscoff,
    origin: 'Belgian Speculoos',
  },
  {
    id: 'prod-strawberry-bliss',
    name: 'Alpine Ruby Strawberry',
    shortName: 'Ruby Berry',
    tagline: 'Freeze-dried tart alpine berries over Swiss white chocolate',
    price: 209,
    rating: 4.92,
    accentColor: '#EC4899',
    chocolateColor: '#BE185D',
    image: ASSETS.waffleStrawberry,
    origin: 'Swiss Berry & White',
  },
];

type DipDepth = 'drizzle' | 'deep' | 'drowned';

const DIP_LEVELS: { id: DipDepth; label: string; percent: number }[] = [
  { id: 'drizzle', label: 'Drizzle (35%)', percent: 35 },
  { id: 'deep', label: 'Deep Dip (65%)', percent: 65 },
  { id: 'drowned', label: 'Drowned (95%)', percent: 95 },
];

interface FlyingCrumb {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderNow,
  onExploreMenu,
  onAddProductToCart,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [dipDepth, setDipDepth] = useState<DipDepth>('deep');
  const [bites, setBites] = useState<number>(0);
  const [isCrunching, setIsCrunching] = useState<boolean>(false);
  const [flyingCrumbs, setFlyingCrumbs] = useState<FlyingCrumb[]>([]);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, subtle spring tilt physics
  const springConfig = { damping: 24, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const currentFlavor = FLAVORS[selectedIdx];
  const activePercent = DIP_LEVELS.find((d) => d.id === dipDepth)?.percent || 65;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Fun & tactile interactive bite
  const handleBite = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (bites >= 4) {
      handleReset();
      return;
    }

    soundEffects.playCrunch();
    setIsCrunching(true);
    setBites((prev) => prev + 1);

    // Subtle, clean crumb sparks
    const crumbs: FlyingCrumb[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 120 + 10,
      size: Math.random() * 5 + 3,
      rotation: Math.random() * 360,
      color: i % 2 === 0 ? '#F59E0B' : '#361A17',
    }));
    setFlyingCrumbs(crumbs);

    setTimeout(() => {
      setIsCrunching(false);
      setFlyingCrumbs([]);
    }, 700);
  };

  const handleReset = () => {
    soundEffects.playPop();
    setBites(0);
  };

  const handleDipChange = (level: DipDepth) => {
    soundEffects.playDip();
    setDipDepth(level);
  };

  const handleQuickAdd = () => {
    soundEffects.playChime();
    if (onAddProductToCart) {
      const product: any = {
        id: currentFlavor.id,
        name: currentFlavor.name,
        price: currentFlavor.price,
        rating: currentFlavor.rating,
        image: currentFlavor.image,
        badge: 'Master Fondue',
        category: 'Signature Drip',
        calories: 380,
        tagline: currentFlavor.tagline,
        base: { name: 'Classic Golden Pearl', price: 99 },
        sauce: { name: currentFlavor.name, price: 49 },
        toppings: [{ name: 'Hand-Crushed Crunch', price: 41 }],
      };
      onAddProductToCart(product);
    } else {
      onOrderNow();
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 pb-14 lg:pt-32 lg:pb-16 overflow-hidden bg-[#FAF5EE] select-none flex flex-col justify-center"
    >
      {/* Soft, minimal ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-3xl pointer-events-none -z-0 opacity-15"
        animate={{
          backgroundColor: currentFlavor.accentColor,
        }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* =========================================================
            CLEAN, ELEGANT HEADLINE & TAGLINE
           ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-mono uppercase tracking-widest text-[#361A17]/60 mb-2 font-bold"
        >
          Belgian Liege Waffles • Warm Couverture Fondue
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-[#361A17] font-brand tracking-tight leading-none uppercase mb-2.5"
        >
          STICK. DIP.{' '}
          <span
            className="transition-colors duration-500"
            style={{ color: currentFlavor.accentColor }}
          >
            CRUNCH.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs sm:text-sm text-[#361A17]/75 font-semibold max-w-md leading-relaxed mb-6"
        >
          Crispy caramelized Belgian pearl sugar waffle on a beechwood stick, dipped hot into flowing melted fondue.
        </motion.p>

        {/* =========================================================
            THE LINE: MINIMAL, CLEAN INTERACTIVE FLAVOR LINE
            "a line and the options floating around it"
           ========================================================= */}
        <div className="w-full max-w-xl relative mb-6">
          {/* Subtle line track */}
          <div className="absolute top-1/2 left-2 right-2 -translate-y-1/2 h-[1px] bg-[#361A17]/15 pointer-events-none" />

          {/* Flavor Nodes on the Line */}
          <div className="relative z-10 flex items-center justify-between sm:justify-center sm:gap-3 px-1 py-1">
            {FLAVORS.map((f, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playDip();
                    setSelectedIdx(idx);
                    setBites(0);
                  }}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-white text-[#361A17] shadow-sm border border-[#361A17]/25 scale-105'
                      : 'bg-white/60 hover:bg-white text-[#361A17]/60 hover:text-[#361A17] border border-[#361A17]/10'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full transition-transform"
                    style={{ backgroundColor: f.accentColor }}
                  />
                  <span className="font-brand font-black text-[11px] sm:text-xs">
                    {f.shortName}
                  </span>

                  {isSelected && (
                    <motion.div
                      layoutId="cleanLinePill"
                      className="absolute inset-0 rounded-full border border-[#361A17] pointer-events-none"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            CENTERPIECE & CLEAN FLOATING OPTIONS
            Tactile waffle + simple dip levels & order button
           ========================================================= */}
        <div className="w-full flex flex-col items-center">
          
          {/* THE WAFFLE STAGE */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[280px] sm:max-w-[310px] relative"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                y: [-3, 3, -3],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }}
              onClick={handleBite}
              className="relative rounded-2xl bg-white border border-[#361A17]/20 shadow-xl p-3 cursor-pointer select-none group"
            >
              {/* Image Canvas */}
              <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {bites < 4 ? (
                    <motion.img
                      key={currentFlavor.id}
                      src={currentFlavor.image}
                      alt={currentFlavor.name}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35 }}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isCrunching ? 'scale-95' : 'group-hover:scale-102'
                      }`}
                    />
                  ) : (
                    /* Clean Beechwood Stick State */
                    <motion.div
                      key="eaten"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-[#FAF5EE] flex flex-col items-center justify-center p-4 text-center z-20"
                    >
                      <div className="w-4 h-36 bg-[#D4A373] rounded-full border border-[#A2673B] relative flex flex-col items-center justify-center">
                        <span className="text-[8px] font-mono font-bold text-[#361A17] -rotate-90">
                          DRIPSTICK
                        </span>
                      </div>
                      <div className="font-brand font-black text-sm text-[#361A17] mt-3">
                        Finished! ✨
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReset();
                        }}
                        className="mt-2.5 px-3 py-1 rounded-full bg-[#361A17] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3 text-amber-400" />
                        <span>Another Waffle</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtle Liquid Dip Level Wave */}
                {bites < 4 && (
                  <motion.div
                    className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-500 overflow-hidden"
                    style={{ height: `${activePercent}%` }}
                  >
                    <div
                      className="w-full h-full opacity-30 relative"
                      style={{
                        background: `linear-gradient(to top, ${currentFlavor.chocolateColor} 0%, transparent 100%)`,
                      }}
                    >
                      <div className="absolute top-0 inset-x-0 h-1 bg-white/40" />
                    </div>
                  </motion.div>
                )}

                {/* Flying Crumb Particles */}
                {flyingCrumbs.map((crumb) => (
                  <motion.div
                    key={crumb.id}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: crumb.x,
                      y: crumb.y,
                      scale: 1,
                      opacity: 0,
                      rotate: crumb.rotation,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute rounded-full pointer-events-none z-30"
                    style={{
                      width: `${crumb.size}px`,
                      height: `${crumb.size}px`,
                      backgroundColor: crumb.color,
                    }}
                  />
                ))}

                {/* Micro Bite Cue / Counter */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[10px] font-bold z-20">
                  <span className="bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[#361A17] shadow-2xs border border-[#361A17]/10">
                    {currentFlavor.name}
                  </span>
                  <span className="bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-amber-900 shadow-2xs border border-[#361A17]/10">
                    {bites < 4 ? `Tap to bite (${bites}/4)` : 'All eaten'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =========================================================
              CLEAN OPTIONS STRIP (Dip Depth, Flavor Tagline, CTAs)
             ========================================================= */}
          <div className="mt-5 w-full max-w-md flex flex-col items-center gap-3">
            
            {/* Dip Depth Selector (Minimal 3 options) */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 border border-[#361A17]/15 shadow-2xs">
              {DIP_LEVELS.map((level) => {
                const isActive = dipDepth === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => handleDipChange(level.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#361A17] text-[#FAF5EE] shadow-2xs'
                        : 'text-[#361A17]/70 hover:text-[#361A17]'
                    }`}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>

            {/* Flavor Tagline & Price */}
            <p className="text-xs text-[#361A17]/75 font-semibold text-center max-w-sm">
              {currentFlavor.tagline}
            </p>

            {/* Clean Action Buttons */}
            <div className="flex items-center gap-2.5 mt-1">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleQuickAdd}
                className="bg-[#361A17] text-[#FAF5EE] px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider shadow-md hover:bg-amber-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {addedToast ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Order Hot • ₹{currentFlavor.price}</span>
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundEffects.playDip();
                  onExploreMenu();
                }}
                className="bg-white text-[#361A17] border border-[#361A17]/30 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#FAF5EE] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Menu</span>
                <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>

            {/* Micro Quality Note */}
            <div className="flex items-center gap-3 text-[10px] font-medium text-[#361A17]/50 mt-1">
              <span>✦ 100% Belgian Couverture</span>
              <span>✦ Baked Fresh</span>
              <span>✦ Ready in 3 mins</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
