import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Star,
  Plus,
  Check,
  Flame,
  Layers,
  Volume2,
  Coffee,
  ChefHat,
  Award,
  SlidersHorizontal,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkle,
} from 'lucide-react';
import { SHOW_STOPPERS } from '../data/mockData';
import { ShowStopperProduct } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface ShowStoppersSectionProps {
  onAddShowStopperToCart: (product: ShowStopperProduct) => void;
}

interface ArtisanDripProfile {
  waxSeal: string;
  sealSub: string;
  origin: string;
  crunchScore: number; // out of 5
  sweetnessScore: number; // out of 5
  richnessScore: number; // out of 5
  temperature: string;
  pairing: string;
  chefNotes: string;
  accentColor: string;
  layers: {
    number: string;
    name: string;
    detail: string;
    icon: string;
  }[];
  verifiedReview: {
    quote: string;
    author: string;
    location: string;
  };
}

const ARTISAN_PROFILES: Record<string, ArtisanDripProfile> = {
  'prod-oreo-drip': {
    waxSeal: 'ANTWERP NO. 1',
    sealSub: 'CRUNCH KING',
    origin: 'Belgian Foundry & Cocoa Lab',
    crunchScore: 5.0,
    sweetnessScore: 4.2,
    richnessScore: 4.8,
    temperature: '45°C Warm Couverture',
    pairing: 'Iced Double Vanilla Cold Foam or Dark Espresso',
    accentColor: '#3B82F6',
    chefNotes:
      'Submerged in 38% Belgian milk couverture while waffle pockets are steaming hot, locking in the molten center beneath double-stuffed cocoa wafer crumbles and a Bourbon vanilla lattice.',
    layers: [
      { number: '01', name: 'Liège Caramel Base', detail: 'Caramelized Belgian pearl sugar pockets with tender buttery crumb', icon: '🧇' },
      { number: '02', name: '38% Belgian Milk Dip', detail: 'Silky flowing milk chocolate couverture held at constant 45°C', icon: '🍫' },
      { number: '03', name: 'Hand-Crushed Oreos', detail: 'Coarse dark chocolate biscuit shards with creamy vanilla speckles', icon: '🍪' },
      { number: '04', name: 'Vanilla Cream Lattice', detail: 'Fine-piped crosshatch contrast drizzle for the signature finish', icon: '✨' },
    ],
    verifiedReview: {
      quote: 'The contrast between steaming hot waffle dough and crunchy cold Oreos is mind-blowing. The best stick by far.',
      author: 'Aarav Mehta',
      location: 'Bandra, Mumbai',
    },
  },
  'prod-bueno': {
    waxSeal: 'PIEDMONT 42%',
    sealSub: 'PRALINE D’OR',
    origin: 'Italian Hazelnut Reserve',
    crunchScore: 4.6,
    sweetnessScore: 4.5,
    richnessScore: 5.0,
    temperature: '42°C Hazelnut Ganache',
    pairing: 'Affogato or Hazelnut Cortado',
    accentColor: '#F59E0B',
    chefNotes:
      'Slow-roasted Italian Piedmont hazelnuts stone-ground into silky white-and-milk chocolate ganache, encrusted with crackling Belgian duo pearls and roasted nutty crunch.',
    layers: [
      { number: '01', name: 'Vanilla Liège Cone', detail: 'Golden pocketed cone waffle rolled hot from cast-iron grates', icon: '🧇' },
      { number: '02', name: 'Bueno Praline Dip', detail: '42% roasted Piedmont hazelnut ganache with silky milk chocolate', icon: '🌰' },
      { number: '03', name: 'Belgian Duo Pearls', detail: 'Crisp puffed cereal centers coated in dual milk and white chocolate', icon: '⚪' },
      { number: '04', name: 'Salted Caramel Ribbons', detail: 'Deep amber caramel swirl balancing the rich hazelnut profile', icon: '🍯' },
    ],
    verifiedReview: {
      quote: 'Tastes like high-end European patisserie on a stick. The hazelnut cream is velvety smooth and not cloying.',
      author: 'Priya Sharma',
      location: 'Indiranagar, BLR',
    },
  },
  'prod-biscoff': {
    waxSeal: 'SPECULOOS 1932',
    sealSub: 'CARAMEL SPICE',
    origin: 'Flemish Speculoos Guild',
    crunchScore: 4.9,
    sweetnessScore: 4.5,
    richnessScore: 4.7,
    temperature: '44°C White Velvet',
    pairing: 'Spiced Chai Latte or Dirty Matcha',
    accentColor: '#D97706',
    chefNotes:
      'Waffle batter infused with authentic brown-sugar speculoos spices, draped in Bourbon vanilla white velvet and loaded with caramelized Lotus biscuit crumb.',
    layers: [
      { number: '01', name: 'Speculoos Spiced Base', detail: 'Infused with roasted cinnamon, ginger, and caramelized brown sugar', icon: '🍪' },
      { number: '02', name: 'Madagascar White Velvet', detail: 'Pure cocoa butter white chocolate with aromatic vanilla bean specks', icon: '🍦' },
      { number: '03', name: 'Crushed Lotus Biscoff', detail: 'Shards of caramelized Belgian speculoos with deep molasses crunch', icon: '✨' },
      { number: '04', name: 'Sea Salt Caramel Lava', detail: 'Warm fleur-de-sel caramel glaze laced over the biscuit crumbles', icon: '🍯' },
    ],
    verifiedReview: {
      quote: 'The sea-salt caramel cuts right through the sweet Biscoff. Disappeared in literally 60 seconds.',
      author: 'Rohan Deshmukh',
      location: 'Koramangala, BLR',
    },
  },
  'prod-strawberry-bliss': {
    waxSeal: 'VALRHONA RUBY',
    sealSub: 'ALPINE CRUNCH',
    origin: 'Swiss Berry Orchards',
    crunchScore: 4.3,
    sweetnessScore: 3.8,
    richnessScore: 4.0,
    temperature: '43°C Vanilla Couverture',
    pairing: 'Iced Hibiscus Berry Spritz or Rose Milkshake',
    accentColor: '#EC4899',
    chefNotes:
      'Silky white chocolate velvet blanketed in freeze-dried alpine strawberry shards that crackle with tart berry brightness, offset by golden pearl sugar waffle dough.',
    layers: [
      { number: '01', name: 'Golden Pearl Waffle', detail: 'Crisp exterior with caramelized sugar crunch and soft warm core', icon: '🧇' },
      { number: '02', name: 'Pure White Velvet Dip', detail: 'Rich Swiss cocoa butter fondue poured generously over the upper stick', icon: '🤍' },
      { number: '03', name: 'Alpine Strawberry Flakes', detail: 'Freeze-dried tart ruby berries bursting with intense natural flavor', icon: '🍓' },
      { number: '04', name: 'Sparkling Rose Dust', detail: 'Luminescent edible pink sugar crystals for a playful crunch', icon: '✨' },
    ],
    verifiedReview: {
      quote: 'So refreshing and not overly sweet! The freeze-dried berries pop with tart flavor against the rich white chocolate.',
      author: 'Ananya Kapur',
      location: 'Juhu, Mumbai',
    },
  },
  'prod-pistachio-dream': {
    waxSeal: 'DUBAI RESERVE',
    sealSub: 'VIRAL GREEN GOLD',
    origin: 'Sicilian Bronte Pistachio Harvest',
    crunchScore: 5.0,
    sweetnessScore: 3.6,
    richnessScore: 4.9,
    temperature: '46°C Bronte Pistachio Tap',
    pairing: 'Turkish Cardamom Coffee or Moroccan Mint Tea',
    accentColor: '#10B981',
    chefNotes:
      'The viral dessert masterpiece reinvented on a hot waffle stick: golden clarified-butter toasted kadaifi phyllo dough drenched in 100% stone-ground Sicilian emerald pistachio cream.',
    layers: [
      { number: '01', name: 'Classic Liège Cone', detail: 'Traditional cast-iron baked cone with embedded caramelized sugar pearls', icon: '🧇' },
      { number: '02', name: 'Bronte Pistachio Velvet', detail: 'Stone-ground emerald green pistachio paste whipped with white ganache', icon: '🍵' },
      { number: '03', name: 'Crispy Butter Kadaifi', detail: 'Oven-toasted golden shredded phyllo pastry delivering maximum acoustic crunch', icon: '🌾' },
      { number: '04', name: 'Roasted Nut Slivers', detail: 'Toasted almond and pistachio fragments for an earthy roasted finish', icon: '🥜' },
    ],
    verifiedReview: {
      quote: 'The kadaifi crunch is louder than potato chips! Pure pistachio luxury that blows the viral Dubai bar away.',
      author: 'Vikram Nambiar',
      location: 'CyberCity, Gurgaon',
    },
  },
  'prod-dark-velvet': {
    waxSeal: 'ALBA NOIR',
    sealSub: 'TRIPLE HAZELNUT',
    origin: 'Piedmont Dark Roastery',
    crunchScore: 4.8,
    sweetnessScore: 4.8,
    richnessScore: 5.0,
    temperature: '48°C Hot Nutella Reservoir',
    pairing: 'Dark Roast Cold Brew or Whole Milk',
    accentColor: '#8B5CF6',
    chefNotes:
      'Thick, velvety warmed Nutella blanketing a dark Dutch cocoa waffle stick, studded with chunky KitKat wafer blocks and roasted hazelnut brittle.',
    layers: [
      { number: '01', name: 'Dutch Dark Cocoa Waffle', detail: 'Made with 100% alkalized Belgian cocoa powder and raw sugar pearls', icon: '🧇' },
      { number: '02', name: 'Warm Pure Nutella Bath', detail: 'Served directly from continuous 48°C heated fondue fountain wells', icon: '🍫' },
      { number: '03', name: 'Chunky KitKat Fingers', detail: 'Layered milk chocolate wafer fingers cut into bite-sized crunch blocks', icon: '🍫' },
      { number: '04', name: 'Roasted Hazelnut Brittle', detail: 'Golden roasted hazelnut fragments offering a deep nutty snap', icon: '🌰' },
    ],
    verifiedReview: {
      quote: 'Unapologetic comfort food. It’s warm, gooey, crunchy, and chocolate heaven on a wooden stick.',
      author: 'Sneha Patil',
      location: 'Koregaon Park, Pune',
    },
  },
};

export const ShowStoppersSection: React.FC<ShowStoppersSectionProps> = ({
  onAddShowStopperToCart,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const [crunchPlaying, setCrunchPlaying] = useState<boolean>(false);
  const lineContainerRef = useRef<HTMLDivElement>(null);

  const currentProduct = SHOW_STOPPERS[selectedIndex] || SHOW_STOPPERS[0];
  const currentArtisan = ARTISAN_PROFILES[currentProduct.id] || ARTISAN_PROFILES['prod-oreo-drip'];

  const handleSelectProduct = (index: number) => {
    soundEffects.playDip();
    setSelectedIndex(index);
    setActiveLayerIndex(0);
  };

  const handlePrev = () => {
    const nextIdx = (selectedIndex - 1 + SHOW_STOPPERS.length) % SHOW_STOPPERS.length;
    handleSelectProduct(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % SHOW_STOPPERS.length;
    handleSelectProduct(nextIdx);
  };

  const handleQuickAdd = (product: ShowStopperProduct) => {
    soundEffects.playChime();
    onAddShowStopperToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleHearCrunch = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEffects.playCrunch();
    setCrunchPlaying(true);
    setTimeout(() => setCrunchPlaying(false), 550);
  };

  // Scroll active item into view on mobile if needed
  useEffect(() => {
    const element = document.getElementById(`floating-node-${selectedIndex}`);
    if (element && lineContainerRef.current) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedIndex]);

  return (
    <section
      id="showstoppers"
      className="py-16 sm:py-24 bg-[#FAF5EE] border-b-2 border-[#D5C2AF] relative overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-200/25 via-orange-200/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div
        className="absolute top-1/2 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: currentArtisan.accentColor }}
      />
      <div
        className="absolute bottom-10 -right-20 w-96 h-96 rounded-full blur-3xl opacity-25 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: currentArtisan.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* COMPACT STAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-10 pb-5 border-b border-[#D5C2AF]/70">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#361A17] text-[#FAF5EE] text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm border border-amber-400/30">
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Continuous Chocolate Tap Atelier</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#361A17] font-brand">
              THE SHOWSTOPPERS LINE
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#361A17]/75 mt-1 max-w-xl">
              Follow the flowing molten chocolate line. The creations float along its path—click any waffle stick to taste-test its sensory profile and deconstruct its layers.
            </p>
          </div>

          {/* Quick Flow Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="text-[11px] font-bold text-[#361A17]/70 mr-1 hidden sm:block">
              Stick <span className="font-black text-[#361A17] font-mono">{selectedIndex + 1}</span> of{' '}
              <span className="font-mono">6</span>
            </div>
            <button
              type="button"
              onClick={handlePrev}
              title="Previous Waffle Stick"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#EFE4D6] text-[#361A17] border-2 border-[#D5C2AF] flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              title="Next Waffle Stick"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#EFE4D6] text-[#361A17] border-2 border-[#D5C2AF] flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UNIFIED INTERACTIVE AREA: THE MOLTEN CHOCOLATE LINE & FLOATING OPTIONS   */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF4ED] to-[#EFE2D2] rounded-3xl border-2 border-[#D5C2AF] shadow-2xl p-4 sm:p-7 relative overflow-hidden">
          
          {/* Subtle line background track */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-700 opacity-80" />

          {/* 1. THE FLOATING CONVEYOR SYSTEM (Cards floating above and below the line) */}
          <div
            ref={lineContainerRef}
            className="relative py-8 sm:py-12 px-2 sm:px-4 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {/* THE CENTRAL MOLTEN CHOCOLATE LINE (Visible spine running horizontally) */}
            <div className="relative min-w-[760px] lg:min-w-full h-80 flex items-center">
              
              {/* Continuous Molten SVG Line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 pointer-events-none z-0">
                {/* Chocolate River Pipe Base */}
                <div className="w-full h-3 rounded-full bg-[#361A17] shadow-inner relative overflow-hidden">
                  {/* Glowing Animated Liquid Flow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5B2E28] via-amber-600 to-[#361A17] animate-pulse opacity-90" />
                  {/* Flowing golden caramel streaks */}
                  <div className="absolute top-0.5 inset-x-0 h-0.5 bg-amber-400/70 blur-2xs" />
                </div>

                {/* Pulsing Active Node Highlight Glow along the line */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-48 h-8 rounded-full blur-md transition-all duration-700 pointer-events-none"
                  style={{
                    backgroundColor: currentArtisan.accentColor,
                    opacity: 0.5,
                    left: `calc(${(selectedIndex / (SHOW_STOPPERS.length - 1)) * 82}% + 10px)`,
                  }}
                />
              </div>

              {/* 6 FLOATING OPTIONS (Even floating ABOVE, Odd floating BELOW) */}
              <div className="relative z-10 w-full grid grid-cols-6 gap-3 sm:gap-4 items-center">
                {SHOW_STOPPERS.map((product, idx) => {
                  const isSelected = selectedIndex === idx;
                  const isAbove = idx % 2 === 0; // Alternates: 0, 2, 4 above | 1, 3, 5 below
                  const artisan = ARTISAN_PROFILES[product.id] || ARTISAN_PROFILES['prod-oreo-drip'];
                  const isAdded = addedId === product.id;

                  return (
                    <div
                      key={product.id}
                      id={`floating-node-${idx}`}
                      onClick={() => handleSelectProduct(idx)}
                      className={`group cursor-pointer flex flex-col items-center transition-all duration-500 select-none relative ${
                        isAbove ? '-translate-y-6 sm:-translate-y-9' : 'translate-y-6 sm:translate-y-9'
                      }`}
                    >
                      {/* CONNECTING DRIP ROPE (Anchors floating card to the chocolate line) */}
                      {isAbove ? (
                        // Card is above -> Drip string hangs down to the line
                        <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-0">
                          <div
                            className={`w-1 transition-all duration-500 rounded-full ${
                              isSelected
                                ? 'h-9 sm:h-12 bg-gradient-to-b from-[#361A17] to-amber-500 shadow-sm'
                                : 'h-6 sm:h-9 bg-[#361A17]/40'
                            }`}
                          />
                          {/* Drip Bead */}
                          <div
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              isSelected ? 'scale-125 bg-amber-400 shadow-md' : 'bg-[#361A17]'
                            }`}
                          />
                        </div>
                      ) : (
                        // Card is below -> Drip string extends up to the line
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-0">
                          {/* Drip Bead */}
                          <div
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              isSelected ? 'scale-125 bg-amber-400 shadow-md' : 'bg-[#361A17]'
                            }`}
                          />
                          <div
                            className={`w-1 transition-all duration-500 rounded-full ${
                              isSelected
                                ? 'h-9 sm:h-12 bg-gradient-to-t from-[#361A17] to-amber-500 shadow-sm'
                                : 'h-6 sm:h-9 bg-[#361A17]/40'
                            }`}
                          />
                        </div>
                      )}

                      {/* FLOATING CARD CAPSULE */}
                      <div
                        className={`w-full max-w-[175px] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 transition-all duration-400 border-2 relative backdrop-blur-md shadow-lg ${
                          isSelected
                            ? 'bg-white border-[#361A17] scale-108 sm:scale-112 shadow-2xl ring-4 ring-amber-400/40 z-20 animate-float'
                            : 'bg-white/90 border-[#D5C2AF] hover:border-[#361A17]/60 hover:scale-104 hover:bg-white z-10'
                        }`}
                      >
                        {/* Selected Active Glow Halo */}
                        {isSelected && (
                          <div
                            className="absolute -inset-1 rounded-3xl blur-md opacity-35 -z-10 transition-colors"
                            style={{ backgroundColor: artisan.accentColor }}
                          />
                        )}

                        {/* Top Mini Badge & Number Pin */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span
                            className={`text-[9px] font-black font-mono px-1.5 py-0.5 rounded-md ${
                              isSelected
                                ? 'bg-[#361A17] text-amber-300'
                                : 'bg-[#EFE4D6] text-[#361A17]'
                            }`}
                          >
                            0{idx + 1}
                          </span>

                          <span
                            className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full truncate max-w-[70px] sm:max-w-[90px] ${
                              isSelected
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {product.badge}
                          </span>
                        </div>

                        {/* Floating Stick Image */}
                        <div className="relative w-full h-20 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-black/5 mb-2 border border-[#D5C2AF]/80">
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                              isSelected ? 'scale-110' : 'group-hover:scale-105'
                            }`}
                          />

                          {/* Quick Hear Crunch Icon Button on floating card */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectProduct(idx);
                              handleHearCrunch(e);
                            }}
                            title="Hear crunch sound"
                            className="absolute bottom-1 right-1 p-1 rounded-full bg-white/90 hover:bg-amber-400 text-[#361A17] transition-all shadow-xs"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Waffle Name & Price */}
                        <div className="text-center">
                          <h4 className="font-brand font-black text-xs sm:text-sm text-[#361A17] truncate leading-tight">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-center gap-1.5 mt-0.5 text-[11px]">
                            <span className="font-black text-[#361A17]">₹{product.price}</span>
                            <span className="text-[10px] text-amber-600 font-bold flex items-center">
                              ★{product.rating}
                            </span>
                          </div>
                        </div>

                        {/* Direct 1-Click Quick Add on card */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(product);
                          }}
                          className={`w-full mt-2 py-1 px-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-xs ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : isSelected
                              ? 'bg-[#361A17] text-white hover:bg-amber-700'
                              : 'bg-[#FAF5EE] text-[#361A17] hover:bg-[#361A17] hover:text-white border border-[#D5C2AF]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-2.5 h-2.5 animate-bounce-cute" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-2.5 h-2.5" />
                              <span>{isSelected ? 'Quick Add' : 'Add'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. THE LIVE TASTING & DECONSTRUCTION CONSOLE (Directly integrated in this one area) */}
          <div className="mt-4 pt-6 border-t-2 border-[#D5C2AF]/80 bg-white/70 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-inner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Column: Spotlight Image with Temperature Badge & Crunch Audio */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="w-full max-w-xs relative group">
                  {/* Backdrop glow */}
                  <div
                    className="absolute inset-0 rounded-3xl blur-xl opacity-35 transition-colors duration-500"
                    style={{ backgroundColor: currentArtisan.accentColor }}
                  />

                  <div className="relative rounded-3xl overflow-hidden border-2 border-[#361A17] shadow-xl bg-[#FAF5EE] aspect-square">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#361A17]/90 backdrop-blur-md text-amber-300 font-mono text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-400/40 shadow-sm">
                        {currentArtisan.waxSeal}
                      </span>
                      <span className="bg-white/95 backdrop-blur-md text-[#361A17] text-[10px] font-black px-2.5 py-1 rounded-full border border-[#D5C2AF] shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{currentProduct.rating}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                      <span className="bg-[#FAF5EE]/95 backdrop-blur-md text-[#361A17] text-[10px] font-black px-2.5 py-1 rounded-full border border-[#D5C2AF] shadow-sm flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-600 animate-pulse" />
                        <span>{currentArtisan.temperature}</span>
                      </span>

                      {/* Interactive Crunch Audio Button */}
                      <button
                        type="button"
                        onClick={(e) => handleHearCrunch(e)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                          crunchPlaying
                            ? 'bg-amber-500 text-[#361A17] scale-105'
                            : 'bg-[#361A17] text-white hover:bg-amber-800'
                        }`}
                      >
                        <Volume2 className="w-3 h-3 text-amber-400" />
                        <span>{crunchPlaying ? 'Crunch! 🧇' : 'Hear Crunch'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full max-w-xs mt-3 px-1 text-xs">
                  <span className="font-extrabold text-[#361A17]/70">
                    Origin: {currentArtisan.origin}
                  </span>
                  <span className="font-black text-[#361A17] bg-[#EFE4D6] px-2.5 py-0.5 rounded-full border border-[#D5C2AF]">
                    ~{currentProduct.calories} kcal
                  </span>
                </div>
              </div>

              {/* Center Column: Culinary Story & Sensory Profile */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-800">
                    <span>{currentArtisan.sealSub}</span>
                    <span>•</span>
                    <span>{currentProduct.category} signature</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#361A17] font-brand leading-tight mt-0.5">
                    {currentProduct.name}
                  </h3>

                  <p className="text-xs font-bold text-amber-700 italic mt-0.5">
                    "{currentProduct.tagline}"
                  </p>

                  <p className="text-xs text-[#361A17]/85 leading-relaxed mt-2">
                    {currentArtisan.chefNotes}
                  </p>
                </div>

                {/* SENSORY TASTE PROFILE METRICS */}
                <div className="bg-[#FAF5EE] p-3 sm:p-4 rounded-2xl border border-[#D5C2AF] space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#361A17] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <SlidersHorizontal className="w-3 h-3 text-amber-600" />
                      <span>Sensory Bite Profile</span>
                    </span>
                    <span className="text-[9px] text-stone-500 font-mono">Atelier Tested</span>
                  </div>

                  {/* 3 Metric Bars */}
                  <div className="space-y-1.5 text-[10px] font-bold text-[#361A17]">
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span>Acoustic Crunch Factor</span>
                        <span className="font-black text-amber-600">{currentArtisan.crunchScore}/5</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${(currentArtisan.crunchScore / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span>Sweetness Balance</span>
                        <span className="font-black text-rose-600">{currentArtisan.sweetnessScore}/5</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full transition-all duration-500"
                          style={{ width: `${(currentArtisan.sweetnessScore / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span>Couverture Richness</span>
                        <span className="font-black text-emerald-600">{currentArtisan.richnessScore}/5</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${(currentArtisan.richnessScore / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chef Drink Pairing */}
                <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#D5C2AF] text-xs">
                  <Coffee className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-[#361A17]/60">
                      Chef's Drink Pairing
                    </div>
                    <div className="font-bold text-[#361A17] text-xs leading-tight">
                      {currentArtisan.pairing}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive 4-Layer Inspection & Actions */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                
                {/* 4 Layers Chips */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#361A17] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>Deconstruct The 4 Layers</span>
                    </span>
                    <span className="text-[9px] text-[#361A17]/60 font-bold">Click to inspect</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    {currentArtisan.layers.map((layer, lIdx) => {
                      const isActive = activeLayerIndex === lIdx;
                      return (
                        <button
                          key={layer.number}
                          type="button"
                          onClick={() => {
                            soundEffects.playDip();
                            setActiveLayerIndex(lIdx);
                          }}
                          className={`p-2 rounded-xl text-left border transition-all text-xs ${
                            isActive
                              ? 'bg-[#361A17] text-white border-black shadow-xs'
                              : 'bg-white text-[#361A17] border-[#D5C2AF] hover:bg-[#FAF5EE]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] font-mono font-bold opacity-70">L-{layer.number}</span>
                            <span>{layer.icon}</span>
                          </div>
                          <div className="font-black text-[11px] truncate">{layer.name}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Layer Detail Box */}
                  <div className="p-3 rounded-xl bg-[#EFE4D6] border border-[#D5C2AF] text-xs text-[#361A17] flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#361A17] text-amber-400 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                      {currentArtisan.layers[activeLayerIndex].number}
                    </div>
                    <div>
                      <span className="font-black">{currentArtisan.layers[activeLayerIndex].name}: </span>
                      <span className="text-[#361A17]/85 text-[11px]">
                        {currentArtisan.layers[activeLayerIndex].detail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Snippet */}
                <div className="p-2.5 rounded-xl bg-white border border-[#D5C2AF] text-xs">
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-rose-700 mb-0.5">
                    <Quote className="w-3 h-3" />
                    <span>Verified Drip Club Member</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#361A17] italic">
                    "{currentArtisan.verifiedReview.quote}"
                  </p>
                  <p className="text-[9px] text-[#361A17]/60 font-semibold mt-0.5">
                    — {currentArtisan.verifiedReview.author}, {currentArtisan.verifiedReview.location}
                  </p>
                </div>

                {/* Ordering CTAs */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(currentProduct)}
                    className={`w-full py-3.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-98 ${
                      addedId === currentProduct.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#361A17] text-[#FAF5EE] hover:bg-amber-700'
                    }`}
                  >
                    {addedId === currentProduct.id ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce-cute" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Order Hot & Fresh • ₹{currentProduct.price}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
