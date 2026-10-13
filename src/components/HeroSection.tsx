import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  Check,
} from 'lucide-react';
import { ASSETS, SHOW_STOPPERS } from '../data/mockData';
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
  emoji: string;
  tagline: string;
  price: number;
  accentColor: string;
  image: string;
}

const FLAVORS: FlavorOption[] = [
  {
    id: 'prod-oreo-drip',
    name: 'Antwerp Oreo Noir',
    shortName: 'Oreo Noir',
    emoji: '🍪',
    tagline: 'Warm milk chocolate fondue with crushed dark cocoa cookies.',
    price: 189,
    accentColor: '#3B82F6',
    image: ASSETS.waffleOreo,
  },
  {
    id: 'prod-pistachio-dream',
    name: 'Dubai Emerald Pistachio',
    shortName: 'Pistachio Gold',
    emoji: '🟢',
    tagline: 'Toasted golden kadaifi soaked in Sicilian pistachio cream.',
    price: 249,
    accentColor: '#10B981',
    image: ASSETS.wafflePistachio,
  },
  {
    id: 'prod-nutella-royale',
    name: 'Turin Nutella Royale',
    shortName: 'Nutella Royale',
    emoji: '🌰',
    tagline: 'Warm Piedmont hazelnut gianduja crowned with crisp wafer nibs.',
    price: 229,
    accentColor: '#92400E',
    image: ASSETS.waffleNutella,
  },
  {
    id: 'prod-biscoff',
    name: 'Lotus Speculoos Lava',
    shortName: 'Lotus Biscoff',
    emoji: '🍯',
    tagline: 'Warm caramel speculoos cream & crunchy spiced Belgian biscuits.',
    price: 219,
    accentColor: '#D97706',
    image: ASSETS.waffleBiscoff,
  },
  {
    id: 'prod-strawberry-bliss',
    name: 'Alpine Ruby Strawberry',
    shortName: 'Ruby Berry',
    emoji: '🍓',
    tagline: 'Tart freeze-dried alpine berries over Swiss white chocolate.',
    price: 209,
    accentColor: '#EC4899',
    image: ASSETS.waffleStrawberry,
  },
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
  const [bites, setBites] = useState<number>(0);
  const [isCrunching, setIsCrunching] = useState<boolean>(false);
  const [flyingCrumbs, setFlyingCrumbs] = useState<FlyingCrumb[]>([]);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [crunchFloater, setCrunchFloater] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth subtle 3D card tilt for a tactile feel
  const springConfig = { damping: 24, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const currentFlavor = FLAVORS[selectedIdx];

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

  // Fun Interactive Crunch Bite
  const handleBite = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (bites >= 4) {
      handleReset();
      return;
    }

    soundEffects.playCrunch();
    setIsCrunching(true);
    setCrunchFloater(true);
    setBites((prev) => prev + 1);

    // Spawn 8 playful particle crumbs
    const crumbs: FlyingCrumb[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 120 + 20,
      size: Math.random() * 6 + 4,
      rotation: Math.random() * 360,
      color: i % 2 === 0 ? currentFlavor.accentColor : '#4A2C2A',
    }));
    setFlyingCrumbs(crumbs);

    setTimeout(() => {
      setIsCrunching(false);
      setCrunchFloater(false);
      setFlyingCrumbs([]);
    }, 700);
  };

  const handleReset = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEffects.playPop();
    setBites(0);
  };

  const handleOrder = () => {
    soundEffects.playSuccess();
    const product = SHOW_STOPPERS.find((p) => p.id === currentFlavor.id);
    if (product && onAddProductToCart) {
      onAddProductToCart(product);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2200);
    } else {
      onOrderNow();
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F2] to-[#FFF5EC] pt-6 pb-14 sm:pb-20 border-b border-[#F0E6D8]/80">
      {/* Gentle ambient glow tied to the selected flavor */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentFlavor.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Ribbon: Minimal category badge & user-friendly flavor switch */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-6 border-b border-[#4A2C2A]/10">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#4A2C2A]/70">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-ping" />
            <span>Belgian Liège Waffle Foundry</span>
            <span className="text-[#4A2C2A]/30">•</span>
            <span className="text-[#4A2C2A]/50 hidden sm:inline">Fresh Off The Cast Iron</span>
          </div>

          {/* User-friendly flavor tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FLAVORS.map((flavor, idx) => {
              const isActive = selectedIdx === idx;
              return (
                <button
                  key={flavor.id}
                  onClick={() => {
                    soundEffects.playDip();
                    setSelectedIdx(idx);
                    setBites(0);
                  }}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#4A2C2A] text-white shadow-sm'
                      : 'bg-white/80 text-[#4A2C2A]/80 hover:bg-white hover:text-[#4A2C2A] border border-[#4A2C2A]/10'
                  }`}
                >
                  <span className="text-sm">{flavor.emoji}</span>
                  <span>{flavor.shortName}</span>
                  {isActive && (
                    <motion.span
                      layoutId="flavorIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-white ml-0.5"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unique Tri-Spatial Architectural Layout (Neither left-only nor center-stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Anchor: STICK. DIP. typographic statement */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="space-y-1">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-1 rounded-full mb-3">
                01 / The Ritual
              </span>
              <h1 className="font-brand font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#4A2C2A] leading-[0.88]">
                STICK.
              </h1>
              <h1 className="font-brand font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#4A2C2A] leading-[0.88] pl-3 sm:pl-4">
                DIP.
              </h1>
            </div>

            <p className="mt-6 text-sm sm:text-base text-[#4A2C2A]/70 leading-relaxed font-sans max-w-sm">
              Caramelized Belgian pearl sugar brioche grilled golden, ready for molten couverture immersion.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-[#4A2C2A]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A2C2A]/40" />
              <span>100% Belgian chocolate</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A2C2A]/40" />
              <span>Baked to order</span>
            </div>
          </div>

          {/* Center Anchor: The Luscious Interactive Waffle Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-3xl bg-white p-3 sm:p-4 shadow-xl border border-[#4A2C2A]/10 transition-shadow hover:shadow-2xl cursor-pointer group"
              onClick={handleBite}
            >
              {/* Top Tag on Card */}
              <div className="flex items-center justify-between px-2 pt-1 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A2C2A]/80 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                  {currentFlavor.name}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FFF5EC] text-[#4A2C2A] border border-[#E07A5F]/20">
                  ₹{currentFlavor.price}
                </span>
              </div>

              {/* High-Resolution Waffle Photo Container */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#FAF6F0] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentFlavor.id}
                    src={currentFlavor.image}
                    alt={currentFlavor.name}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{
                      opacity: 1,
                      scale: isCrunching ? 0.98 : 1,
                    }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Simulated bite marks */}
                {bites > 0 && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#4A2C2A]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-md">
                    <span>{bites} {bites === 1 ? 'bite' : 'bites'}</span>
                    <button
                      onClick={handleReset}
                      className="ml-1 hover:text-[#E07A5F] transition-colors p-0.5"
                      title="Reset bites"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Flying Crumb Particles */}
                <AnimatePresence>
                  {flyingCrumbs.map((crumb) => (
                    <motion.div
                      key={crumb.id}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1.2, 0],
                        x: crumb.x,
                        y: crumb.y,
                        opacity: [1, 0.9, 0],
                        rotate: crumb.rotation,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                      style={{
                        width: crumb.size,
                        height: crumb.size,
                        backgroundColor: crumb.color,
                        borderRadius: crumb.size > 7 ? '2px' : '50%',
                      }}
                      className="absolute pointer-events-none z-30 shadow-sm"
                    />
                  ))}
                </AnimatePresence>

                {/* "CRUNCH!" popup floater */}
                <AnimatePresence>
                  {crunchFloater && (
                    <motion.div
                      initial={{ scale: 0.5, y: 15, opacity: 0 }}
                      animate={{ scale: 1.15, y: -20, opacity: 1 }}
                      exit={{ scale: 0.9, y: -40, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute z-40 bg-[#4A2C2A] text-white px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-lg border border-white/20"
                    >
                      CRUNCH!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover hint to tap/bite */}
                {bites === 0 && (
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-center">
                    <span className="bg-black/60 backdrop-blur-sm text-white/90 text-[11px] font-medium px-3 py-1 rounded-full shadow-sm group-hover:bg-[#4A2C2A]/90 transition-colors">
                      Click waffle to take a bite
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer: Quick bite dots */}
              <div className="flex items-center justify-between px-2 pt-3 pb-1 text-xs text-[#4A2C2A]/60">
                <span className="font-medium text-[#4A2C2A]/70">Crispiness Level</span>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        dotIdx < (bites || 4)
                          ? 'bg-[#E07A5F]'
                          : 'bg-[#4A2C2A]/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Anchor: CRUNCH. headline & Clear, User-Friendly Order Actions */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
            <div className="space-y-1">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-1 rounded-full mb-3">
                02 / The Climax
              </span>
              <h1
                className="font-brand font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] transition-colors duration-300"
                style={{ color: currentFlavor.accentColor }}
              >
                CRUNCH.
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[#4A2C2A]/80 leading-relaxed font-sans">
              {currentFlavor.tagline}
            </p>

            {/* Clear, High-Affordance Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#4A2C2A] text-white font-semibold text-base shadow-lg shadow-[#4A2C2A]/20 hover:bg-[#381F1E] active:scale-[0.98] transition-all cursor-pointer group"
              >
                {addedToast ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-[#F5DEB3] group-hover:scale-110 transition-transform" />
                    <span>Order Now • ₹{currentFlavor.price}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  onExploreMenu();
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/80 hover:bg-white text-[#4A2C2A] font-medium text-sm border border-[#4A2C2A]/15 hover:border-[#4A2C2A]/30 transition-all cursor-pointer group"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Subtle Reassurance Tags */}
            <div className="pt-2 flex flex-col gap-1 text-xs text-[#4A2C2A]/60">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Ready for pickup / dine-in in 3 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Crafted fresh from Liege pearl sugar dough</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
