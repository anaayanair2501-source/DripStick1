import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Flame,
  Volume2,
  Check,
  Plus,
  ArrowRight,
  RotateCcw,
  Sliders,
  Star,
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
  emoji: string;
  tagline: string;
  price: number;
  rating: number;
  accentColor: string;
  chocolateColor: string;
  image: string;
  origin: string;
  temp: string;
  notes: string;
}

const FLAVORS: FlavorOption[] = [
  {
    id: 'prod-oreo-drip',
    name: 'Antwerp Oreo Noir',
    shortName: 'Oreo Noir',
    emoji: '🍪',
    tagline: '38% Belgian milk fondue with crushed dark cocoa biscuits',
    price: 189,
    rating: 4.96,
    accentColor: '#3B82F6',
    chocolateColor: '#361A17',
    image: ASSETS.waffleOreo,
    origin: 'Flemish Cocoa Foundry',
    temp: '45°C Warm Couverture',
    notes: 'Liège caramelized pearl sugar core under dark chocolate wafer shards.',
  },
  {
    id: 'prod-pistachio-dream',
    name: 'Dubai Emerald Pistachio',
    shortName: 'Pistachio Gold',
    emoji: '🟢',
    tagline: 'Toasted golden kadaifi soaked in Sicilian pistachio cream',
    price: 249,
    rating: 4.98,
    accentColor: '#10B981',
    chocolateColor: '#2D5A27',
    image: ASSETS.wafflePistachio,
    origin: 'Sicilian Bronte Harvest',
    temp: '46°C Emerald Tap',
    notes: 'Acoustic phyllo crunch enveloped in stone-ground emerald green pistachio cream.',
  },
  {
    id: 'prod-nutella-royale',
    name: 'Turin Nutella Royale',
    shortName: 'Nutella Royale',
    emoji: '🌰',
    tagline: 'Warm Piedmont hazelnut cocoa spread crowned with crunchy wafer nibs',
    price: 229,
    rating: 4.97,
    accentColor: '#854D0E',
    chocolateColor: '#451A03',
    image: ASSETS.waffleNutella,
    origin: 'Piedmont Hazelnut Valley',
    temp: '47°C Molten Gianduja',
    notes: 'Glossy roasted hazelnut cream cascading over golden Liège pearl sugar waffle.',
  },
  {
    id: 'prod-biscoff',
    name: 'Lotus Speculoos Lava',
    shortName: 'Lotus Biscoff',
    emoji: '🍯',
    tagline: 'Brown sugar spice, white velvet fondue & biscuit crunch',
    price: 219,
    rating: 4.94,
    accentColor: '#D97706',
    chocolateColor: '#8B4513',
    image: ASSETS.waffleBiscoff,
    origin: 'Belgian Speculoos Guild',
    temp: '44°C White Velvet',
    notes: 'Warm speculoos spiced brioche with caramelized molasses biscuit crunch.',
  },
  {
    id: 'prod-strawberry-bliss',
    name: 'Alpine Ruby Strawberry',
    shortName: 'Ruby Berry',
    emoji: '🍓',
    tagline: 'Freeze-dried tart alpine berries over Swiss white chocolate',
    price: 209,
    rating: 4.92,
    accentColor: '#EC4899',
    chocolateColor: '#BE185D',
    image: ASSETS.waffleStrawberry,
    origin: 'Swiss Berry Orchards',
    temp: '43°C Vanilla Velvet',
    notes: 'Crisp mountain berry tartness cutting through sweet vanilla bean white chocolate.',
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
  const [crunchFloater, setCrunchFloater] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for 3D card tilt
  const springConfig = { damping: 20, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

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

    // Spawn 10 dynamic particle crumbs
    const crumbs: FlyingCrumb[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 150 + 20,
      size: Math.random() * 6 + 4,
      rotation: Math.random() * 360,
      color: i % 2 === 0 ? '#F59E0B' : '#4A2C2A',
    }));
    setFlyingCrumbs(crumbs);

    setTimeout(() => {
      setIsCrunching(false);
      setCrunchFloater(false);
      setFlyingCrumbs([]);
    }, 800);
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
    setTimeout(() => setAddedToast(false), 2200);
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-[#FAF5EE] select-none border-b border-[#4A2C2A]/10"
    >
      {/* Dynamic Ambient Background Glow aligned with active flavor */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full blur-3xl pointer-events-none -z-0"
        animate={{
          backgroundColor: currentFlavor.accentColor,
          opacity: [0.10, 0.18, 0.10],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* =======================================================
            TOP STATUS & SENSORY LAB HEADER BAR
           ======================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-[#4A2C2A]/10">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE4E6] border border-[#FECDD3] text-xs font-black uppercase tracking-wider text-[#9F1239] shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-[#E11D48] animate-pulse" />
              <span>210°C Cast-Iron</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#4A2C2A]/70 hidden sm:inline">
              • {currentFlavor.origin}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-[#4A2C2A]">
            <span className="inline-flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-[#4A2C2A]/10 shadow-2xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{currentFlavor.rating} Rating</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-[#4A2C2A]/10 shadow-2xs">
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>32.4 dB Acoustic Crunch</span>
            </span>
          </div>
        </div>

        {/* =======================================================
            EDITORIAL SPATIAL COMPOSITION:
            Not left-text/right-photo, and not center-stacked.
            An interlocking tri-spatial layout with central interactive centerpiece.
           ======================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* ZONE 1 (Left Wing): Bold Typographic Statements & Story */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-brand font-black text-5xl sm:text-6xl lg:text-7xl text-[#4A2C2A] tracking-tight leading-[0.88] uppercase mb-4"
            >
              STICK.<br />
              DIP.
            </motion.h1>

            <p className="text-sm text-[#4A2C2A]/80 font-medium leading-relaxed mb-4">
              Caramelized Liège pearl sugar waffles plunged into warm continuous couverture fondue.
            </p>

            <div className="p-3 rounded-2xl bg-white/60 border border-[#4A2C2A]/10 shadow-2xs">
              <div className="text-[10px] font-mono font-black uppercase text-[#4A2C2A]/60 mb-0.5">
                Current Couverture
              </div>
              <div className="text-xs font-black text-[#4A2C2A]">
                {currentFlavor.name}
              </div>
              <div className="text-[11px] text-amber-900 font-semibold mt-0.5">
                {currentFlavor.temp}
              </div>
            </div>
          </div>

          {/* ZONE 2 (Center Stage): Interactive Waffle Stick Hero Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            
            {/* Floating Crunch Celebration Bubble */}
            <AnimatePresence>
              {crunchFloater && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: -25, scale: 1.15 }}
                  exit={{ opacity: 0, y: -45, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 z-40 bg-[#4A2C2A] text-amber-300 font-brand font-black text-xs px-4 py-2 rounded-full shadow-xl border border-amber-400/40 pointer-events-none flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>CRUNCH! 32.4 dB 🧇</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3D TILT TACTILE WAFFLE CARD */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-[340px] sm:max-w-[380px] relative perspective-1000"
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
                  duration: 5,
                  ease: 'easeInOut',
                }}
                onClick={handleBite}
                className="relative rounded-3xl bg-white border-4 border-white shadow-2xl p-3 sm:p-4 cursor-pointer select-none group overflow-hidden"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-2.5 relative z-20">
                  <span className="font-mono text-[10px] font-black uppercase px-3 py-1 rounded-full bg-[#4A2C2A] text-[#FAF5EE]">
                    {currentFlavor.shortName}
                  </span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {bites < 4 ? `Tap Waffle to Bite (${bites}/4)` : 'Conquered! ✨'}
                  </span>
                </div>

                {/* THE WAFFLE CANVAS STAGE */}
                <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-stone-100 border border-[#4A2C2A]/10 flex items-center justify-center">
                  
                  {/* Dynamic Product Image Crossfade */}
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
                        className="absolute inset-0 bg-[#FAF5EE] flex flex-col items-center justify-center p-6 text-center z-20"
                      >
                        <div className="w-5 h-40 bg-[#D4A373] rounded-full border-2 border-[#A2673B] shadow-md relative flex flex-col justify-between items-center py-2">
                          <div className="w-5 h-5 rounded-full bg-[#4A2C2A] -mt-2.5 shadow-xs" />
                          <span className="text-[8px] font-mono font-bold text-[#4A2C2A] -rotate-90">
                            DRIPSTICK
                          </span>
                        </div>
                        <h4 className="font-brand font-black text-base text-[#4A2C2A] mt-3">
                          Clean Beechwood Stick! ✨
                        </h4>
                        <p className="text-xs text-[#4A2C2A]/70 max-w-[200px] font-medium mt-1">
                          Conquered to the stick.
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReset();
                          }}
                          className="mt-3 px-3.5 py-1.5 rounded-full bg-[#4A2C2A] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3 text-amber-400" />
                          <span>Another Waffle</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* LIQUID DUNK DEPTH WATERLINE OVERLAY */}
                  {bites < 4 && (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-500 overflow-hidden"
                      style={{ height: `${activePercent}%` }}
                    >
                      <div
                        className="w-full h-full opacity-35 relative"
                        style={{
                          background: `linear-gradient(to top, ${currentFlavor.chocolateColor} 0%, transparent 100%)`,
                        }}
                      >
                        <motion.div
                          className="absolute top-0 inset-x-0 h-1.5 bg-white/40 shadow-xs"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* FLYING CRUMB PARTICLES WITH SPRING PHYSICS */}
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
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="absolute rounded-full pointer-events-none z-30"
                      style={{
                        width: `${crumb.size}px`,
                        height: `${crumb.size}px`,
                        backgroundColor: crumb.color,
                      }}
                    />
                  ))}

                  {/* Caption on Image */}
                  <div className="absolute bottom-2.5 inset-x-2.5 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-[#4A2C2A]/10 flex items-center justify-between shadow-sm z-20">
                    <div className="truncate mr-2">
                      <div className="text-xs font-black text-[#4A2C2A] font-brand truncate">
                        {currentFlavor.name}
                      </div>
                      <div className="text-[10px] font-bold text-amber-900 truncate mt-0.5">
                        {currentFlavor.tagline}
                      </div>
                    </div>
                    <span className="text-sm font-mono font-black text-[#4A2C2A] shrink-0">
                      ₹{currentFlavor.price}
                    </span>
                  </div>

                </div>

                {/* Card Interaction Footer */}
                <div className="mt-2.5 pt-2 border-t border-[#4A2C2A]/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-[#4A2C2A]/70">
                    {bites < 4 ? `Click waffle to take a bite` : 'Finished!'}
                  </span>
                  {bites < 4 ? (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.92 }}
                      onClick={handleBite}
                      className="px-2.5 py-1 rounded-full bg-amber-400 hover:bg-amber-500 text-[#4A2C2A] text-[10px] font-black uppercase tracking-wider shadow-2xs cursor-pointer"
                    >
                      Bite ({bites}/4)
                    </motion.button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-2.5 py-0.5 rounded-full bg-stone-200 text-[#4A2C2A] text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

              </motion.div>
            </div>
          </div>

          {/* ZONE 3 (Right Wing): Bold CRUNCH Anchor & Immediate CTA */}
          <div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end text-left lg:text-right">
            <motion.h2
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-brand font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.88] uppercase mb-4"
              style={{ color: currentFlavor.accentColor }}
            >
              CRUNCH.
            </motion.h2>

            <p className="text-xs sm:text-sm text-[#4A2C2A]/80 font-semibold leading-relaxed mb-5 max-w-xs">
              "{currentFlavor.notes}"
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleQuickAdd}
                className="bg-[#4A2C2A] text-[#FAF5EE] px-6 py-3.5 rounded-full font-brand font-black uppercase text-xs tracking-wider shadow-xl hover:bg-[#2D1B19] transition-colors flex items-center justify-center gap-2 cursor-pointer w-full"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                    <span>Added Hot to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-amber-400" />
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
                className="bg-white text-[#4A2C2A] border-2 border-[#4A2C2A] px-5 py-3 rounded-full font-brand font-black uppercase text-xs tracking-wider shadow-2xs hover:bg-[#FAF5EE] transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full"
              >
                <span>Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

        </div>

        {/* =======================================================
            THE HORIZONTAL AXIS ("THE LINE"): SPANNING RUNWAY
            Connecting all 5 flavors along an interactive dipping track
           ======================================================= */}
        <div className="w-full relative my-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#4A2C2A]/60 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>The Dipping Axis — Select Flavor Reserve</span>
            </span>
            <span className="text-xs font-bold text-amber-900 font-mono">
              0{selectedIdx + 1} / 0{FLAVORS.length}
            </span>
          </div>

          {/* The Structural Line Track */}
          <div className="relative p-2 rounded-2xl bg-white/80 border border-[#4A2C2A]/15 shadow-sm">
            <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[2px] bg-[#4A2C2A]/10 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-2">
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
                    className={`relative p-2.5 rounded-xl transition-all cursor-pointer select-none text-left flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-[#4A2C2A] text-[#FAF5EE] shadow-md scale-102'
                        : 'bg-white/60 hover:bg-white text-[#4A2C2A]/70 hover:text-[#4A2C2A]'
                    }`}
                  >
                    <span className="text-xl">{f.emoji}</span>
                    <div className="truncate">
                      <div className="font-brand font-black text-xs truncate">
                        {f.shortName}
                      </div>
                      <div className={`text-[10px] font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-amber-800'}`}>
                        ₹{f.price}
                      </div>
                    </div>

                    {isSelected && (
                      <motion.div
                        layoutId="activeAxisPill"
                        className="absolute inset-0 rounded-xl ring-2 ring-amber-400/50 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM TACTILE CONTROLS (Dip Depth & Craft Credentials)
           ======================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#4A2C2A]/10">
          
          {/* Molten Dip Depth 3-Way Pill */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#4A2C2A]/70 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-amber-600" />
              <span>Dip Depth:</span>
            </span>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-[#4A2C2A]/10 shadow-2xs">
              {DIP_LEVELS.map((level) => {
                const isActive = dipDepth === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => handleDipChange(level.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#4A2C2A] text-[#FAF5EE] shadow-xs'
                        : 'text-[#4A2C2A]/70 hover:text-[#4A2C2A]'
                    }`}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Micro Credentials */}
          <div className="flex items-center gap-4 text-xs font-semibold text-[#4A2C2A]/70">
            <span>✦ 100% Belgian Cocoa</span>
            <span>✦ Liège Brioche Dough</span>
            <span>✦ Ready in 3 Mins</span>
          </div>

        </div>

      </div>
    </section>
  );
};
