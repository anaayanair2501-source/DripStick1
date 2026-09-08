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
  Flame,
  Volume2,
  Check,
  Plus,
  ArrowRight,
  RotateCcw,
  Sliders,
  Award,
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
  temp: string;
  notes: string;
}

const FLAVORS: FlavorOption[] = [
  {
    id: 'prod-oreo-drip',
    name: 'Antwerp Oreo Noir',
    shortName: 'Oreo Noir',
    tagline: '38% Belgian milk fondue with hand-crushed dark cocoa biscuits',
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
    tagline: 'Clarified-butter toasted kadaifi soaked in Sicilian pistachio velvet',
    price: 249,
    rating: 4.98,
    accentColor: '#10B981',
    chocolateColor: '#2D5A27',
    image: ASSETS.realisticDripstick,
    origin: 'Sicilian Bronte Harvest',
    temp: '46°C Emerald Tap',
    notes: 'Acoustic phyllo crunch enveloped in stone-ground emerald green pistachio cream.',
  },
  {
    id: 'prod-biscoff',
    name: 'Lotus Speculoos Lava',
    shortName: 'Lotus Biscoff',
    tagline: 'Infused brown sugar spice, white velvet fondue & sea salt caramel',
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
    tagline: 'Freeze-dried tart alpine berries over pure Swiss white cocoa butter',
    price: 209,
    rating: 4.92,
    accentColor: '#EC4899',
    chocolateColor: '#BE185D',
    image: ASSETS.waffleWhiteDip,
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
  onBuildCustom,
  onAddProductToCart,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [dipDepth, setDipDepth] = useState<DipDepth>('deep');
  const [bites, setBites] = useState<number>(0);
  const [isCrunching, setIsCrunching] = useState<boolean>(false);
  const [flyingCrumbs, setFlyingCrumbs] = useState<FlyingCrumb[]>([]);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [soundBarsActive, setSoundBarsActive] = useState<boolean>(false);
  const [crunchFloater, setCrunchFloater] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring tilt physics
  const springConfig = { damping: 20, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

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

  // Fun Interactive Bite
  const handleBite = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (bites >= 4) {
      handleReset();
      return;
    }

    soundEffects.playCrunch();
    setIsCrunching(true);
    setSoundBarsActive(true);
    setCrunchFloater(true);
    setBites((prev) => prev + 1);

    // Spawn 10 dynamic particle crumbs flying out
    const crumbs: FlyingCrumb[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 160 + 20,
      size: Math.random() * 7 + 4,
      rotation: Math.random() * 360,
      color: i % 2 === 0 ? '#F59E0B' : '#361A17',
    }));
    setFlyingCrumbs(crumbs);

    setTimeout(() => {
      setIsCrunching(false);
      setSoundBarsActive(false);
      setCrunchFloater(false);
      setFlyingCrumbs([]);
    }, 850);
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
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF5EE] select-none flex flex-col justify-center"
    >
      {/* Dynamic Ambient Color Mesh Glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] rounded-full blur-3xl pointer-events-none -z-0"
        animate={{
          backgroundColor: currentFlavor.accentColor,
          opacity: [0.15, 0.22, 0.15],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute top-12 right-16 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Subtle waffle texture pattern */}
      <div className="absolute inset-0 bg-waffle-grid opacity-40 pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* TOP MINIMAL STATUS PILL */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 pb-4 border-b border-[#361A17]/10"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/90 border border-[#361A17]/15 text-xs font-bold text-[#361A17] shadow-2xs backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase">
              210°C Cast-Iron • 45°C Belgian Fondue
            </span>
          </div>

          {/* Audio snap wave indicator */}
          <button
            type="button"
            onClick={handleBite}
            className="flex items-center gap-2 text-xs font-bold text-[#361A17]/70 hover:text-[#361A17] transition-colors group cursor-pointer"
          >
            <span className="hidden sm:inline text-[11px] font-mono">32dB Acoustic Crunch:</span>
            <div className="flex items-end gap-0.5 h-3.5 px-1.5 py-0.5 rounded-sm bg-white/80 border border-[#361A17]/10">
              {[0.4, 0.9, 0.6, 0.7].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 bg-[#361A17] rounded-full"
                  animate={{
                    height: soundBarsActive ? [4, 14 * h, 3, 12, 4] : 4,
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: soundBarsActive ? Infinity : 0,
                    delay: i * 0.08,
                  }}
                />
              ))}
            </div>
          </button>
        </motion.div>

        {/* MAIN MINIMAL STAGE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: SCULPTURAL EDITORIAL TYPOGRAPHY & CONTROLS */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Minimal Sub-heading Tag */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[11px] font-black uppercase tracking-widest text-amber-800 mb-2 font-mono flex items-center gap-1.5"
            >
              <span>{currentFlavor.origin}</span>
              <span>•</span>
              <span>Single-Origin Fondue</span>
            </motion.div>

            {/* Bold Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#361A17] font-brand tracking-tight leading-[0.94] mb-4 uppercase"
            >
              STICK. DIP.<br />
              <span
                className="transition-colors duration-500"
                style={{ color: currentFlavor.accentColor }}
              >
                CRUNCH.
              </span>
            </motion.h1>

            {/* Concise, Sensory Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm sm:text-base text-[#361A17]/80 leading-relaxed font-semibold max-w-lg mb-6"
            >
              Caramelized Belgian pearl sugar pockets hot from antique irons, submerged into continuous flowing couverture fondue.
            </motion.p>

            {/* TACTILE DUNK LEVEL SELECTOR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="w-full max-w-md p-2.5 rounded-2xl bg-white/90 border border-[#361A17]/15 shadow-sm mb-6"
            >
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#361A17]/70 flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-amber-600" />
                  <span>Molten Dip Depth</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-800">
                  {activePercent}% Submerged
                </span>
              </div>

              {/* 3 Pill Selector with Sliding Motion */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#FAF5EE] border border-[#361A17]/10">
                {DIP_LEVELS.map((level) => {
                  const isActive = dipDepth === level.id;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => handleDipChange(level.id)}
                      className={`relative py-1.5 px-2 rounded-lg text-[11px] font-black tracking-wide transition-colors cursor-pointer select-none ${
                        isActive ? 'text-[#361A17]' : 'text-[#361A17]/60 hover:text-[#361A17]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="dipDepthPill"
                          className="absolute inset-0 bg-white rounded-lg shadow-xs border border-[#361A17]/15"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{level.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* ACTIONS BAR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-6"
            >
              {/* Primary 1-Click Order */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleQuickAdd}
                className="bg-[#361A17] text-[#FAF5EE] px-7 py-3.5 rounded-full font-black tracking-wider uppercase text-xs shadow-xl transition-colors hover:bg-amber-800 flex items-center gap-2 cursor-pointer"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 animate-bounce-cute" />
                    <span>Added Hot to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Order Hot • ₹{currentFlavor.price}</span>
                  </>
                )}
              </motion.button>

              {/* Secondary Clean Menu Explorer */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundEffects.playDip();
                  onExploreMenu();
                }}
                className="bg-white text-[#361A17] border-2 border-[#361A17] px-5 py-3 rounded-full font-black tracking-wider uppercase text-xs shadow-2xs hover:bg-[#FAF5EE] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>

            {/* Minimalist Micro Badges */}
            <div className="flex items-center gap-4 text-[11px] font-bold text-[#361A17]/70">
              <span>✦ 100% Belgian Cocoa</span>
              <span>✦ Real Pearl Sugar</span>
              <span>✦ Ready in 3 Mins</span>
            </div>

          </div>

          {/* RIGHT: THE INTERACTIVE TACTILE WAFFLE STAGE */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* 3D FLOATING WAFFLE STAGE CONTAINER */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-sm relative perspective-1000"
            >
              
              {/* Floating Crunch Celebration Bubble */}
              <AnimatePresence>
                {crunchFloater && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.8 }}
                    animate={{ opacity: 1, y: -25, scale: 1.15 }}
                    exit={{ opacity: 0, y: -45, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 bg-[#361A17] text-amber-300 font-brand font-black text-xs px-4 py-1.5 rounded-full shadow-xl border border-amber-400/40 pointer-events-none flex items-center gap-1.5"
                  >
                    <span>CRUNCH! 32.4 dB 🧇</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TACTILE 3D CARD WRAPPER */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: [-4, 4, -4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                }}
                onClick={handleBite}
                className="relative rounded-3xl bg-white border-2 border-[#361A17] shadow-2xl p-4 cursor-pointer group select-none overflow-hidden"
              >
                {/* Background Hue Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-25 blur-xl pointer-events-none"
                  animate={{ backgroundColor: currentFlavor.accentColor }}
                  transition={{ duration: 0.6 }}
                />

                {/* Top Corner Details */}
                <div className="flex items-center justify-between mb-3 relative z-20">
                  <span className="font-mono text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-[#361A17] text-[#FAF5EE] border border-amber-400/30">
                    {currentFlavor.origin}
                  </span>
                  <span className="text-xs font-black text-[#361A17] bg-[#FAF5EE] px-2.5 py-1 rounded-full border border-[#361A17]/15">
                    ★ {currentFlavor.rating}
                  </span>
                </div>

                {/* THE WAFFLE STICK STAGE */}
                <div className="relative w-full h-88 sm:h-96 rounded-2xl overflow-hidden bg-stone-100 border border-[#361A17]/15 flex items-center justify-center">
                  
                  {/* Dynamic Product Image Crossfade */}
                  <AnimatePresence mode="wait">
                    {bites < 4 ? (
                      <motion.img
                        key={currentFlavor.id}
                        src={currentFlavor.image}
                        alt={currentFlavor.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          isCrunching ? 'scale-95' : 'group-hover:scale-103'
                        }`}
                      />
                    ) : (
                      /* Clean Beechwood Stick State */
                      <motion.div
                        key="eaten"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-[#FAF5EE] flex flex-col items-center justify-center p-6 text-center z-20"
                      >
                        <div className="w-5 h-44 bg-[#D4A373] rounded-full border-2 border-[#A2673B] shadow-md relative flex flex-col justify-between items-center py-2">
                          <div className="w-5 h-5 rounded-full bg-[#361A17] -mt-2.5 shadow-xs" />
                          <span className="text-[8px] font-mono font-bold text-[#361A17] -rotate-90">
                            DRIPSTICK
                          </span>
                        </div>
                        <h4 className="font-brand font-black text-base text-[#361A17] mt-3">
                          Clean Beechwood Stick! ✨
                        </h4>
                        <p className="text-[11px] text-[#361A17]/70 max-w-[200px] font-semibold mt-0.5">
                          Every morsel conquered.
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReset();
                          }}
                          className="mt-3 px-3 py-1.5 rounded-full bg-[#361A17] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm active:scale-95"
                        >
                          <RotateCcw className="w-3 h-3 text-amber-400" />
                          <span>Bake Another Waffle</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* LIQUID DUNK DEPTH WATERLINE OVERLAY (Smooth Wave) */}
                  {bites < 4 && (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-500 overflow-hidden"
                      style={{ height: `${activePercent}%` }}
                    >
                      {/* Glossy liquid glaze gradient */}
                      <div
                        className="w-full h-full opacity-35 backdrop-blur-[0.5px] relative"
                        style={{
                          background: `linear-gradient(to top, ${currentFlavor.chocolateColor} 0%, transparent 100%)`,
                        }}
                      >
                        {/* Shimmering surface liquid wave line */}
                        <motion.div
                          className="absolute top-0 inset-x-0 h-1.5 bg-white/40 shadow-xs"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* BITE CUTOUT STAGES */}
                  {bites >= 1 && bites < 4 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-24 h-24 rounded-full bg-[#FAF5EE] border-2 border-dashed border-amber-600 shadow-inner flex items-center justify-center pointer-events-none z-10"
                    >
                      <span className="text-[9px] font-black text-amber-900 -rotate-12 uppercase">
                        CRUNCH
                      </span>
                    </motion.div>
                  )}
                  {bites >= 2 && bites < 4 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-20 left-3 w-28 h-28 rounded-full bg-[#FAF5EE] border-2 border-dashed border-amber-600 shadow-inner flex items-center justify-center pointer-events-none z-10"
                    >
                      <span className="text-[9px] font-black text-amber-900 rotate-12 uppercase">
                        SNAP!
                      </span>
                    </motion.div>
                  )}
                  {bites >= 3 && bites < 4 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-40 right-4 w-32 h-32 rounded-full bg-[#FAF5EE] border-2 border-dashed border-amber-600 shadow-inner flex items-center justify-center pointer-events-none z-10"
                    >
                      <span className="text-[9px] font-black text-amber-900 -rotate-6 uppercase">
                        MOLTEN
                      </span>
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

                  {/* Bottom Minimal Info Pill */}
                  <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-[#361A17]/10 flex items-center justify-between shadow-sm z-20">
                    <div>
                      <div className="text-[11px] font-black text-[#361A17] font-brand leading-none">
                        {currentFlavor.name}
                      </div>
                      <div className="text-[9px] font-bold text-amber-800 mt-0.5">
                        {currentFlavor.notes}
                      </div>
                    </div>

                    <span className="text-xs font-black font-mono text-[#361A17]">
                      ₹{currentFlavor.price}
                    </span>
                  </div>

                </div>

                {/* BOTTOM INTERACTION BAR */}
                <div className="mt-3 pt-2.5 border-t border-[#361A17]/10 flex items-center justify-between text-xs">
                  <div className="text-[11px] font-bold text-[#361A17]/70">
                    {bites < 4 ? `Tap waffle to take a bite (${bites}/4)` : 'Waffle conquered!'}
                  </div>

                  {bites < 4 ? (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.92 }}
                      onClick={handleBite}
                      className="px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-500 text-[#361A17] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Take Bite</span>
                    </motion.button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-2.5 py-1 rounded-full bg-stone-200 text-[#361A17] text-[10px] font-black uppercase tracking-wider"
                    >
                      Reset
                    </button>
                  )}
                </div>

              </motion.div>

            </div>

          </div>

        </div>

        {/* BOTTOM FLUID FLAVOR SELECTOR DOCK */}
        <div className="mt-10 pt-6 border-t border-[#361A17]/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#361A17]/60">
              Master Fondue Reserve Flavors:
            </span>
            <span className="text-[11px] font-bold text-amber-900">
              {currentFlavor.tagline}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                  className={`relative p-3 rounded-2xl text-left border transition-all cursor-pointer select-none overflow-hidden ${
                    isSelected
                      ? 'bg-white border-[#361A17] shadow-sm'
                      : 'bg-white/60 hover:bg-white border-[#361A17]/10 text-[#361A17]/70 hover:text-[#361A17]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="flavorIndicator"
                      className="absolute inset-0 bg-white rounded-2xl border-2 border-[#361A17] -z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono font-bold text-[#361A17]/50">
                        0{idx + 1}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: f.accentColor }}
                      />
                    </div>
                    <div className="font-brand font-black text-xs text-[#361A17] truncate">
                      {f.shortName}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-amber-700 mt-0.5">
                      ₹{f.price}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
