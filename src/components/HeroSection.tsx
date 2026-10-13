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

  // Bites handling: clicking directly on the photo carves out a bite
  // We can support realistic progressive bite cutouts using SVG clipPath or bite marks
  const handleBite = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (bites >= 5) {
      handleReset();
      return;
    }

    soundEffects.playCrunch();
    setIsCrunching(true);
    setCrunchFloater(true);
    const nextBites = bites + 1;
    setBites(nextBites);

    // Spawn 12 playful crumb particles around the bite area
    const crumbs: FlyingCrumb[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.6) * 160 + 20,
      size: Math.random() * 8 + 3,
      rotation: Math.random() * 360,
      color: i % 3 === 0 ? currentFlavor.accentColor : i % 3 === 1 ? '#F59E0B' : '#4A2C2A',
    }));
    setFlyingCrumbs(crumbs);

    setTimeout(() => {
      setIsCrunching(false);
      setCrunchFloater(false);
      setFlyingCrumbs([]);
    }, 750);
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

  // SVG clip-path IDs or polygon/circle masks for progressive bites
  // Bites 1 to 5 progressively chomp pieces off the waffle corners and top
  // Bite 1: Top-right corner chomp
  // Bite 2: Top-center chomp
  // Bite 3: Top-left chomp
  // Bite 4: Right-side deeper bite
  // Bite 5: Left-side deeper bite / almost all eaten!
  const getBiteClipPath = (count: number) => {
    switch (count) {
      case 1:
        // Top right bite taken out
        return 'polygon(0% 0%, 72% 0%, 72% 14%, 82% 20%, 94% 12%, 100% 28%, 100% 100%, 0% 100%)';
      case 2:
        // Top right and top center bites taken
        return 'polygon(0% 0%, 36% 0%, 40% 18%, 56% 22%, 65% 12%, 72% 16%, 82% 24%, 94% 15%, 100% 32%, 100% 100%, 0% 100%)';
      case 3:
        // Top completely chomped into
        return 'polygon(0% 28%, 14% 34%, 26% 22%, 38% 30%, 55% 26%, 66% 32%, 84% 28%, 100% 38%, 100% 100%, 0% 100%)';
      case 4:
        // Deeper bites from both sides, midway eaten
        return 'polygon(0% 50%, 18% 46%, 28% 54%, 48% 48%, 62% 58%, 78% 44%, 88% 56%, 100% 62%, 100% 100%, 0% 100%)';
      case 5:
        // Almost all eaten, just the bottom stick and last bite remaining!
        return 'polygon(15% 78%, 32% 72%, 46% 82%, 64% 75%, 82% 80%, 88% 88%, 100% 90%, 100% 100%, 0% 100%, 0% 86%)';
      default:
        return 'none';
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F2] to-[#FFF5EC] pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-[#F0E6D8]/80">
      {/* Gentle ambient glow tied to the selected flavor */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentFlavor.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Responsive Layout: Photo on Left, Text & Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Interactive Waffle Photo Card with Bite Chomping */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-3xl bg-white p-3.5 sm:p-5 shadow-2xl border border-[#4A2C2A]/10 transition-shadow hover:shadow-3xl cursor-pointer group select-none"
              onClick={handleBite}
            >
              {/* Top Bar on Card */}
              <div className="flex items-center justify-between px-2 pt-1 pb-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A2C2A]/85 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                  {currentFlavor.name}
                </span>
                <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-[#FFF5EC] text-[#4A2C2A] border border-[#E07A5F]/20 shadow-xs">
                  ₹{currentFlavor.price}
                </span>
              </div>

              {/* High-Resolution Waffle Photo Container with Interactive Bite Cutouts */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#FAF6F0] flex items-center justify-center shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentFlavor.id}-${bites}`}
                    initial={{ scale: 0.97 }}
                    animate={{
                      scale: isCrunching ? [1, 0.95, 1.02, 1] : 1,
                      rotate: isCrunching ? [0, -1.5, 1.5, 0] : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full relative"
                    style={{
                      clipPath: getBiteClipPath(bites),
                      WebkitClipPath: getBiteClipPath(bites),
                      transition: 'clip-path 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <img
                      src={currentFlavor.image}
                      alt={currentFlavor.name}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable={false}
                    />

                    {/* Scalloped bite-mark edge tooth impression overlays when bitten */}
                    {bites > 0 && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 border-t-4 border-[#FFF5EC]/40 mix-blend-overlay" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Floating Bite Counter Badge with Reset */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 bg-[#4A2C2A]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg z-30">
                  <span>
                    {bites === 0
                      ? 'Fresh & Whole'
                      : bites === 5
                      ? 'All Eaten! 😋'
                      : `${bites} / 5 Bites`}
                  </span>
                  {bites > 0 && (
                    <button
                      onClick={handleReset}
                      className="ml-1 hover:text-[#E07A5F] hover:rotate-180 transition-all p-0.5 rounded cursor-pointer"
                      title="Get a fresh waffle"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Flying Crumb Particles */}
                <AnimatePresence>
                  {flyingCrumbs.map((crumb) => (
                    <motion.div
                      key={crumb.id}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1.3, 0],
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
                        borderRadius: crumb.size > 7 ? '3px' : '50%',
                      }}
                      className="absolute pointer-events-none z-30 shadow-sm"
                    />
                  ))}
                </AnimatePresence>

                {/* Dynamic Bite SFX Word Popup */}
                <AnimatePresence>
                  {crunchFloater && (
                    <motion.div
                      initial={{ scale: 0.4, y: 10, opacity: 0, rotate: -8 }}
                      animate={{ scale: 1.25, y: -25, opacity: 1, rotate: 6 }}
                      exit={{ scale: 0.8, y: -50, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute z-40 bg-[#4A2C2A] text-white px-4 py-1.5 rounded-full text-sm font-black tracking-wider uppercase shadow-2xl border-2 border-[#E07A5F]"
                    >
                      {bites === 1
                        ? 'CRUNCH! 💥'
                        : bites === 2
                        ? 'CHOMP! 😋'
                        : bites === 3
                        ? 'NOM NOM! ✨'
                        : bites === 4
                        ? 'SO CRISPY! 🔥'
                        : 'ALL GONE! 🎉'}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Interactive Prompt Hint */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-center pointer-events-none z-20">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md group-hover:bg-[#4A2C2A] group-hover:scale-105 transition-all">
                    {bites === 0
                      ? '👉 Click anywhere on waffle to take a bite!'
                      : bites < 5
                      ? 'Tap again for another bite!'
                      : 'Click to grab a fresh hot waffle'}
                  </span>
                </div>
              </div>

              {/* Bottom Card Footer: Crispiness Level & Bite Gauge */}
              <div className="flex items-center justify-between px-2 pt-3.5 pb-1 text-xs text-[#4A2C2A]/70">
                <span className="font-semibold text-[#4A2C2A]/80">Waffle Remaining</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        lvl > bites
                          ? 'w-4 bg-[#E07A5F]'
                          : 'w-2 bg-[#4A2C2A]/20 opacity-40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Text, Headlines, Flavor Switcher & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Top Badge: Bakery Foundry Status */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#4A2C2A]/75 bg-white/70 px-4 py-1.5 rounded-full border border-[#4A2C2A]/10 shadow-xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-ping" />
              <span>Belgian Liège Waffle Foundry</span>
              <span className="text-[#4A2C2A]/30">•</span>
              <span className="text-[#4A2C2A]/60">Fresh Off The Cast Iron</span>
            </div>

            {/* Flavor Switcher Chips */}
            <div className="flex items-center flex-wrap gap-2 pt-0.5">
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
                    className={`group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#4A2C2A] text-white shadow-md scale-105'
                        : 'bg-white/80 text-[#4A2C2A]/80 hover:bg-white hover:text-[#4A2C2A] border border-[#4A2C2A]/10 hover:shadow-xs'
                    }`}
                  >
                    <span className="text-sm">{flavor.emoji}</span>
                    <span>{flavor.shortName}</span>
                    {isActive && (
                      <motion.span
                        layoutId="flavorIndicator"
                        className="w-1.5 h-1.5 rounded-full bg-[#E07A5F] ml-0.5"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Headline: STICK. DIP. CRUNCH. */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="font-brand font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#4A2C2A] leading-none">
                  STICK.
                </span>
                <span className="font-brand font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#E07A5F] leading-none">
                  DIP.
                </span>
                <span
                  className="font-brand font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-none transition-colors duration-300"
                  style={{ color: currentFlavor.accentColor }}
                >
                  CRUNCH.
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#4A2C2A] font-brand pt-1 flex items-center gap-2">
                <span>{currentFlavor.name}</span>
                <span className="text-lg font-normal text-[#4A2C2A]/40">—</span>
                <span className="text-lg font-bold text-[#E07A5F]">₹{currentFlavor.price}</span>
              </h2>

              <p className="text-base sm:text-lg text-[#4A2C2A]/75 max-w-xl leading-relaxed">
                {currentFlavor.tagline}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md pt-2">
              <button
                onClick={handleOrder}
                className="flex-1 flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#4A2C2A] text-white font-semibold text-base shadow-xl shadow-[#4A2C2A]/20 hover:bg-[#381F1E] active:scale-[0.98] transition-all cursor-pointer group"
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
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/90 hover:bg-white text-[#4A2C2A] font-medium text-sm border border-[#4A2C2A]/15 hover:border-[#4A2C2A]/30 shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust & Craft Guarantee Badges */}
            <div className="flex items-center flex-wrap gap-4 pt-1 text-xs text-[#4A2C2A]/75">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="font-medium">Ready in 3 minutes</span>
              </div>
              <span className="text-[#4A2C2A]/30">•</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="font-medium">100% Belgian pearl sugar</span>
              </div>
              <span className="text-[#4A2C2A]/30 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="font-medium">Baked fresh to order</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

